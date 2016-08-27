using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using AhutAssist.Model.BaseInfo;
using LingHaiFramework.Auto;
using AhutAssist.Model.Evaluate;
using LingHaiFramework.MVC;

namespace AhutAssist.handler.BaseInfo
{
    /// <summary>
    /// CourseStuHandler 的摘要说明
    /// </summary>
    [DirectAction("CourseStu")]
    public class CourseStuHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "BaseInfo.CourseStu.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "BaseInfo";
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
                string term = getTerm();
                string filterf = string.Format("nvcStuNo='{0}' and nvcElectiveNum like '%{1}%'", searchInfo, term);
                return mybase.Load(dbsort, filterf);
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject PageLoad_T(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                CourseStu mybase = new CourseStu(dbserver);

               string term = String.Empty;
               if (searchInfo == null)
               {
                   term = getTerm();
               }
               else
               {
                   string[] data = searchInfo.Split(';');
                   term = data[0] + "-" + data[1];
               }   
            
                //对同一个同一学年教授多门课
                string cmdText = string.Format("select nvcElectiveNum from V_BaseInfo_EduTask where nvcLoginCode='{0}' and nvcElectiveNum like '%{1}%'", logincode, term);
                DataTable table = dbserver.ExecuteTable(cmdText);
  
                   JArray array = new JArray();
                    JObject jobj = null;
                    DataTable dt = new DataTable();
                    dt.Columns.Add("nvcElectiveNum");
                    dt.Columns.Add("nvcCourseName");
                    dt.Columns.Add("nvcCourseNature");
                    dt.Columns.Add("nvcEvaGrade");
                    dt.Columns.Add("avgScore");
                    dt.Columns.Add("intEvaPeo");
                    dt.Columns.Add("intNotEvaPeo");
                    dt.Columns.Add("nvcConPeo");
                    foreach (DataRow row in table.Rows)
                    {
                        string nums = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                        string filterf = string.Format("select nvcElectiveNum,nvcCourseName,nvcCourseNature,(select nvcEvaGrade from V_Evaluate_Level where (select avg(intScore) from V_BaseInfo_CourseStu where nvcElectiveNum ='{0}' )between intLowMark and intHighMark)as nvcEvaGrade,avg(intScore) AS avgScore,(select count(nvcStuNo) from V_BaseInfo_CourseStu where intIsEvaluate=1 and  nvcElectiveNum ='{0}') AS intEvaPeo,(select count(nvcStuNo) from V_BaseInfo_CourseStu where intIsEvaluate=0 and nvcElectiveNum ='{0}') AS intNotEvaPeo,(select count(nvcStuNo) from V_BaseInfo_CourseStu  where nvcElectiveNum ='{0}' and (intIsEvaluate=1 and (nvcContents!='' or nvcContents!=NULL))) As nvcConPeo from V_BaseInfo_CourseStu where  nvcElectiveNum ='{0}' group by nvcElectiveNum,nvcLoginCode,nvcCourseName,nvcCourseNature", nums);
                        DataRow dr = dbserver.ExecuteRow(filterf);
                        if (dr != null)
                         {
                            dt.Rows.Add(dr["nvcElectiveNum"], dr["nvcCourseName"], dr["nvcCourseNature"], dr["nvcEvaGrade"], dr["avgScore"], dr["intEvaPeo"], dr["intNotEvaPeo"], dr["nvcConPeo"]);
                        } 
                    }
                    jobj = CreateJsonInstance_T(dt);
                    return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        private string getTerm()
        {
            int year = Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
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
        public JObject EvaLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                Level mybase = new Level(dbserver);
                DBSearchInfo sinfo = new DBSearchInfo(searchInfo);
                if (sinfo.Count <= 0)
                {
                    return mybase.Load(dbsort);
                }
                else
                {
                    string filterf = sinfo.GetSiftQueryString();
                    return mybase.Load(dbsort, filterf);
                }
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject MessageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                string searchText = string.Format("select dtmLeaveTime,nvcContents from V_BaseInfo_CourseStu  where nvcElectiveNum='{0}' and (nvcContents!='NULL' or nvcContents!='') and intIsEvaluate=1", searchInfo);
                DataTable table = dbserver.ExecuteTable(searchText);
                return CreateJsonInstance_M(table);
  
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        [ParseAsJson]
        public JObject Edit(JObject data)
        {

            try
            {
                DBServer dbserver = new SqlServer();
                CourseStu model = new CourseStu(dbserver);
                if (model.Update(data))
                {
                    return ShowSuccess("保存成功.");
                }
                else
                {
                    return ShowExecuteError("保存失败.");
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

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
                        jobj_C.Add(new JProperty("nvcEvaGrade", row[3].ToString()));
                        jobj_C.Add(new JProperty("avgScore", row[4].ToString()));
                        jobj_C.Add(new JProperty("intEvaPeo", row[5].ToString()));
                        jobj_C.Add(new JProperty("intNotEvaPeo", row[6].ToString()));
                        jobj_C.Add(new JProperty("nvcConPeo", row[7].ToString()));
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

        public JObject CreateJsonInstance_M(DataTable table)
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
                        jobj_C.Add(new JProperty("dtmLeaveTime", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcContents", row[1].ToString()));
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