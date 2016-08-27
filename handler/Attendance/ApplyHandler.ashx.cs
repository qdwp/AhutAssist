using AhutAssist.Model.Attendance;
using AhutAssist.Model.BaseInfo;
using Ext.Direct;
using LingHaiFramework.Auto;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.Attendance
{
           [DirectAction("Apply")]
    public class ApplyHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Attendance.Apply.Handler";
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
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string searchText = string.Format("select  distinct  nvcYear,nvcTerm,nvcElectiveNum,nvcCollege,nvcWeekHours,nvcToTalHours,nvcCourseTime,nvcCoursePlace,nvcCampus,nvcName,nvcCourseName,nvcCourseNature,(select COUNT(*) from V_Attendance_ApplyApproval AA where AA.nvcElectiveNum=BC.nvcElectiveNum) As IsApply  from V_BaseInfo_CourseStu BC where nvcStuNo='{0}'", searchInfo);
                  DataTable table=dbserver.ExecuteTable(searchText);
                     return CreateJsonInstance_Apply(table);
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
                ApplyApproval model = new ApplyApproval(dbserver);

                data.Remove("ID");
                data.Add(new JProperty("ID", GUID.NewGuid()));
                if (model.Create(data))
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

        public JObject CreateJsonInstance_Apply(DataTable table)
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
                        jobj_C.Add(new JProperty("nvcYear", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcTerm", row[1].ToString()));
                        jobj_C.Add(new JProperty("nvcElectiveNum", row[2].ToString()));
                        jobj_C.Add(new JProperty("nvcCollege", row[3].ToString()));
                        jobj_C.Add(new JProperty("nvcWeekHours", row[4].ToString()));
                        jobj_C.Add(new JProperty("nvcToTalHours", row[5].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseTime", row[6].ToString()));
                        jobj_C.Add(new JProperty("nvcCoursePlace", row[7].ToString()));
                        jobj_C.Add(new JProperty("nvcCampus", row[8].ToString()));
                        jobj_C.Add(new JProperty("nvcName", row[9].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseName", row[10].ToString()));
                        jobj_C.Add(new JProperty("nvcCourseNature", row[11].ToString()));
                        jobj_C.Add(new JProperty("IsApply", row[12].ToString()));
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