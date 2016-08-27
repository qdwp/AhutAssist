using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using AhutAssist.Model.Attendance;
using AhutAssist.Model.BaseInfo;
using System.Data;

namespace AhutAssist.handler.Attendance
{
    /// <summary>
    /// PriorityWatchHandler 的摘要说明
    /// </summary>
           [DirectAction("PriorityWatch")]
    public class PriorityWatchHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Attendance.PriorityWatch.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Attendance";
            }
        }

        [DirectMethod]
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo, string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                PriorityWatch mybase = new PriorityWatch(dbserver);
                string filterf = string.Empty;
                if (searchInfo ==null)
                {
                    filterf = string.Format("nvcLoginCode='{0}'", logincode);
                    return mybase.Load( filterf);
                }
                else
                {
                    filterf = string.Format("nvcLoginCode='{0}' and nvcStuNo like '%{1}%' ", logincode, searchInfo);
                    return mybase.Load(filterf);
                }
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject LoadStu(long start, long limit, string field, string direction, string searchInfo )
        {
            try
            {   
                DBServer dbserver = new SqlServer();
                Student mybase = new Student(dbserver);
                string filterf = string.Empty;
                filterf = string.Format("select distinct VBS.nvcStuNo,VBS.nvcStuName from V_BaseInfo_Student VBS where VBS.nvcLoginCode='{0}' and VBS.nvcStuNo not in (select VAP.nvcStuNo from V_Attendance_PriorityWatch VAP)", searchInfo);
                DataTable table = dbserver.ExecuteTable(filterf);
                return CreateJsonInstance_Stu(table);
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        [ParseAsJson]
        public JObject Add(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                dbserver.BeginTranscation();
                PriorityWatch model = new PriorityWatch(dbserver);
                JArray data_detail = null;
                JToken token = null;
                if (data.TryGetValue("detail", out token) == true)
                {
                    data_detail = (JArray)token;
                    foreach (JObject items in data_detail)
                    {
                        items.Remove("ID");
                        items.Add(new JProperty("ID", GUID.NewGuid()));        
                    }

                }
                if ( (model.Save(data_detail) == 0))
                {
                    dbserver.Commit();
                    return ShowSuccess("保存成功.");
                }
                else
                {
                    dbserver.Rollback();
                    return ShowExecuteError("保存失败.");
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

        [DirectMethod]
        [ParseAsJson]
        public JObject Delete(JObject data)
        {
            //if (!LoginCheck())
            //{
            //    return ShowLoginCheckError();
            //}
            //if (!AuthorityCheck("131460"))
            //{
            //    return ShowAuthorityCheckError();
            //}
            try
            {
                DBServer dbserver = new SqlServer();
                PriorityWatch rolemodel = new PriorityWatch(dbserver);
                string ID = data["data"].ToString().Replace("\"", "");

                string filter = String.Format("ID='{0}'", ID);
                int res = rolemodel.Delete("ID", ID);

                if (res > 0)
                {
                    return ShowSuccess("成功删除" + res + "条记录.");
                }
                else
                {
                    return ShowExecuteError("删除失败.");
                }
            }

            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

        public JObject CreateJsonInstance_Stu(DataTable table)
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
                        jobj_C.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcStuName", row[1].ToString()));
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