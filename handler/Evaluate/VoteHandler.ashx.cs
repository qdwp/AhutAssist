using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using AhutAssist.Model.Evaluate;
using AhutAssist.Model.BaseInfo;
using System.Data;

namespace AhutAssist.handler.Evaluate
{
    [DirectAction("Vote")]
    public class VoteHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Evaluate.Vote.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Evaluate";
            }
        }

        [DirectMethod]
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                CourseStu mybase = new CourseStu(dbserver);
                string logincode = searchInfo;
                string term = getTerm();
                string filterf = null;
                JObject jobj = null;
                DataTable table = null;
                if (logincode.Length == 9)
                {
                    filterf = string.Format("select distinct  VBC.nvcElectiveNum,nvcCourseName,nvcCourseNature,nvcName,(select count(*) from V_Evaluate_Vote  AS VEV where VEV.nvcStuNo+VEV.nvcElectiveNum =VBC.nvcStuNo+VBC.nvcElectiveNum) as isVote,nvcTeaPhoto,nvcTeacher from V_BaseInfo_CourseStu  as VBC where nvcStuNo='{0}'  AND  VBC.nvcElectiveNum like '%{1}%'", logincode, term);
                    table = dbserver.ExecuteTable(filterf);
                    jobj = CreateJsonInstance_S(table);
                }
                else
                {
                    filterf = string.Format("select  nvcElectiveNum,nvcCourseName,nvcCourseNature,COUNT(*) as nvcCount from V_Evaluate_Vote where nvcLoginCode='{0}' and nvcElectiveNum like '%{1}%' group by nvcElectiveNum,nvcLoginCode,nvcCourseName,nvcCourseNature", logincode, term);

                    table = dbserver.ExecuteTable(filterf);
                    jobj = CreateJsonInstance_T(table);
                }
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        private string getTerm()
        {
            string term = string.Empty;
            int year = Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = Convert.ToInt32(DateTime.Now.Month.ToString());
            if (month < 8&&month>2)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }
            return term;
        }

        [DirectMethod]
        [ParseAsJson]
        public JObject Add(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                Vote model = new Vote(dbserver);
                data.Remove("ID");
                data.Add(new JProperty("ID", GUID.NewGuid()));

                string nvcElectiveNum = data["nvcElectiveNum"].ToString().Replace("\"", "").Trim();

                string nvcStuNo = data["nvcStuNo"].ToString().Replace("\"", "").Trim();


                string cmdText = string.Format("select Count(*) from V_Evaluate_Vote where nvcElectiveNum='{0}' and nvcStuNo='{1}'", nvcElectiveNum, nvcStuNo);
                DBServer server = new SqlServer();
                object o = dbserver.ExecuteScalar(cmdText);


                if (Convert.ToInt32(o) != 0)
                {
                    return ShowExecuteError("你已经为该老师投过票！");
                }
                else
                {
                    long count = GetVotedCount(nvcStuNo);

                    if (model.Create(data))
                    {
                        string msg = string.Format("投票成功！(总共3票，还有{0}票)", 2 - count);
                        return ShowSuccess(msg);
                    }
                    else
                    {
                        return ShowExecuteError("保存失败.");
                    }
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

        private long GetVotedCount(string stuNo)
        {
            int year = Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
            if (month < 8)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }
            string objName = "V_Evaluate_Vote";
            string filter = string.Format(" nvcStuNo='{0}' and nvcElectiveNum like '%{1}%'", stuNo, term);
            DBServer server = new SqlServer();
            return server.Count(objName, filter);

        }

        //投票老师界面用
        public JObject CreateJsonInstance_T(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_C = new JObject();
                    if (row != null)
                    {
                        string value = String.Empty;
                        jobj_C.Add(new JProperty("nvcElectiveNum", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseName", row[1].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseNature", row[2].ToString()));
                        jobj_C.Add(new JProperty("nvcCount", row[3].ToString()));
                    }
                    JObject objT = jobj_C;
                    if (objT != null)
                    {
                        array.Add(objT);
                    }
                }
                jobj.Add(new JProperty("data", array));
                jobj.Add(new JProperty("success", true));
                jobj.Add(new JProperty("message", String.Empty));
                jobj.Add(new JProperty("total", array.Count));
            }
            catch (Exception ex)
            {
                jobj.Add(new JProperty("data", new JArray()));
                jobj.Add(new JProperty("success", false));
                jobj.Add(new JProperty("message", ex.Message));
                jobj.Add(new JProperty("total", 0));
            }
            return jobj;
        }

        //投票学生界面用
        public JObject CreateJsonInstance_S(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_C = new JObject();
                    if (row != null)
                    {
                        string value = String.Empty;
                        jobj_C.Add(new JProperty("nvcElectiveNum", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseName", row[1].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseNature", row[2].ToString()));
                        jobj_C.Add(new JProperty("nvcName", row[3].ToString()));
                        jobj_C.Add(new JProperty("nvcIsvote", row[4].ToString()));
                        jobj_C.Add(new JProperty("nvcTeaPhoto", row[5].ToString()));
                        jobj_C.Add(new JProperty("nvcTeacher", row[6].ToString()));
                    }
                    JObject objT = jobj_C;
                    if (objT != null)
                    {
                        array.Add(objT);
                    }
                }
                jobj.Add(new JProperty("data", array));
                jobj.Add(new JProperty("success", true));
                jobj.Add(new JProperty("message", String.Empty));
                jobj.Add(new JProperty("total", array.Count));
            }
            catch (Exception ex)
            {
                jobj.Add(new JProperty("data", new JArray()));
                jobj.Add(new JProperty("success", false));
                jobj.Add(new JProperty("message", ex.Message));
                jobj.Add(new JProperty("total", 0));
            }
            return jobj;
        }
    }
}
