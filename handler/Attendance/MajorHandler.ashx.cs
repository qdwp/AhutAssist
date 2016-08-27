using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using AhutAssist.Model.Attendance;
using System.Data;

namespace AhutAssist.handler.Attendance
{
    [DirectAction("Major")]
    public class MajorHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Attendance.Major.Handler";
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
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                string filterf = string.Format("select nvcElectiveNum,nvcCourseName,timeAndPlace,attendanceCount from V_Attendance_TeaCourse where nvcLoginCode='{0}'", searchInfo);
                JObject jobj = null;
                DataTable table = null;
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Major(table);
                return jobj;
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }


        [DirectMethod]
        public JObject DMLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                string[] data = searchInfo.Split(';');
                DBServer dbserver = new SqlServer();
                string filterf_message = String.Empty;
                JObject jobj = null;
                if (data[1] == "全点")
                {
                    filterf_message = string.Format("select distinct  nvcStuNo,nvcStuName,nvcClass,nvcStuPhoto from V_BaseInfo_CourseStu  where  nvcFreeFlag=0 and nvcElectiveNum='{0}'", data[0]);
                }
                if (data[1] == "学分绩")
                {
                    filterf_message = string.Format("select  distinct  V_BaseInfo_CourseStu.nvcStuNo,nvcStuName,nvcClass,nvcStuPhoto,V_Attendance_AvgCredit.nvcCredit from V_BaseInfo_CourseStu,V_Attendance_AvgCredit  where  nvcFreeFlag=0 and nvcElectiveNum='{0}' and V_BaseInfo_CourseStu.nvcStuNo=V_Attendance_AvgCredit.nvcStuNo order by V_Attendance_AvgCredit.nvcCredit,V_BaseInfo_CourseStu.nvcStuNo asc", data[0]);
                }
                if (data[1] == "随机")
                {
                    filterf_message = string.Format("select  TOP {0} nvcStuNo,nvcStuName,nvcClass,nvcStuPhoto,newid() as   Random from V_BaseInfo_CourseStu where nvcFreeFlag=0 and nvcElectiveNum='{1}' order by Random", data[2], data[0]);
                }
                if (data[1] == "课堂缺勤")
                {
                    filterf_message = string.Format("select  distinct V_BaseInfo_CourseStu.nvcStuNo,V_BaseInfo_CourseStu.nvcStuName,V_BaseInfo_CourseStu.nvcClass,nvcStuPhoto from V_BaseInfo_CourseStu,T_Attendance_Detail where  nvcFreeFlag=0 and V_BaseInfo_CourseStu.nvcElectiveNum='{0}' and V_BaseInfo_CourseStu.nvcStuNo=T_Attendance_Detail.nvcStuNo order by V_BaseInfo_CourseStu.nvcStuNo ", data[0]);
                }
                if (data[1] == "重点考察")
                {
                    filterf_message = string.Format("select  distinct nvcStuNo,nvcStuName,nvcClass,nvcStuPhoto from V_BaseInfo_CourseStu  where nvcFreeFlag=0 and nvcElectiveNum='{0}' and nvcStuNo in(select nvcStuNo from V_Attendance_PriorityWatch)", data[0]);
                }

                DataTable table_DM = null;
                table_DM = dbserver.ExecuteTable(filterf_message);
                jobj = CreateJsonInstance_QD(table_DM);
                return jobj;
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }

        }


        [DirectMethod]
        public JObject DetailLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                string[] data = searchInfo.Split(';');
                DBServer dbserver = new SqlServer();
                JObject jobj = null;
                DataTable table = null;
                string searchText = string.Empty;
                if (data[1] == "总览")
                {
                    searchText = string.Format("select distinct VAD.nvcStuNo,nvcStuName,Temp.IntCount from (select nvcStuNo,COUNT(nvcStuNo) from V_Attendance_Detail where   nvcElectiveNum='{0}'  group by nvcStuNo) As Temp(nvcStuNo,IntCount), V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and   nvcElectiveNum='{0}' order by IntCount desc", data[0]);
                    table = dbserver.ExecuteTable(searchText);
                    jobj = CreateJsonInstance_All(table);
                }
                else {
                    searchText = string.Format("select    V_Attendance_MajorXQ.dtmRollTime,nvcRollWay,nvcCoutPeo,cast((nvcCoutPeo*100.0/totalPeo*1) as dec(18,2)) as Percentage,nvcStuNo,nvcStuName,nvcReason,V_Attendance_Detail.ID from V_Attendance_MajorXQ,V_Attendance_Detail where V_Attendance_MajorXQ.nvcElectiveNum='{0}' and V_Attendance_MajorXQ.intRollCount={1} and V_Attendance_MajorXQ.ID=V_Attendance_Detail.nvcAttendanceID order by V_Attendance_MajorXQ.intRollCount asc", data[0], data[1]);
                    table = dbserver.ExecuteTable(searchText);
                    jobj = CreateJsonInstance_Detail(table);
                }
            
               
                return jobj;
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }


        [DirectMethod]
        public JObject TimeLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                string filterf = string.Format("select distinct intRollCount from V_Attendance_Detail where nvcElectiveNum='{0}'", searchInfo);
                JObject jobj = null;
                DataTable table = null;
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Time(table);
                return jobj;
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
            DBServer dbserver = new SqlServer();
            try
            {
                String gbl_ID = String.Empty;
                dbserver.BeginTranscation();
                Major model = new Major(dbserver);
                Detail model_D = new Detail(dbserver);
                JToken token = null;
                JArray data_detail = null;
                JObject data_mian = null;
                if (data.TryGetValue("main", out  token) == true)
                {
                    data_mian = (JObject)token;
                    data_mian.Add(new JProperty("ID", GUID.NewGuid()));
                    gbl_ID = data_mian["ID"].ToString().Replace("\"", "").Trim();
                }
                if (data.TryGetValue("detail", out token) == true)
                {
                    data_detail = (JArray)token;
                    foreach (JObject items in data_detail)
                    {
                        items.Remove("ID");
                        items.Add(new JProperty("ID", GUID.NewGuid()));
                        items.Add(new JProperty("nvcAttendanceID", gbl_ID));
                    }

                }
                if (model.Create(data_mian) && (model_D.Save(data_detail) == 0))
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
                dbserver.Rollback();
                return ShowExecuteError(ex.Message);
            }
        }


        [DirectMethod]
        [ParseAsJson]
        public JObject Edit(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                JArray detail = null;
                JToken token = null;
                string cmdText = string.Empty;

                if (data.TryGetValue("detail", out token) == true)
                {
                    detail = (JArray)token;
                    foreach (JObject items in detail)
                    {
                        string id=items["ID"].ToString().Replace("\"", "").Trim();
                         string reason=items["nvcReason"].ToString().Replace("\"", "").Trim();
                        cmdText = string.Format("Update T_Attendance_Detail  set nvcReason='{0}' where ID='{1}'",reason,id);
                      dbserver.ExecuteNonQuery(cmdText);
                    }    
                }

                return ShowSuccess("保存成功.");

            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
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


        public JObject CreateJsonInstance_Major(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {
                        jobj_R.Add(new JProperty("nvcElectiveNum", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcCourseName", row[1].ToString()));
                        jobj_R.Add(new JProperty("timeAndPlace", row[2].ToString()));
                        jobj_R.Add(new JProperty("attendanceCount", row[3].ToString()));
                    }
                    JObject objT = jobj_R;
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

        public JObject CreateJsonInstance_QD(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {
                        jobj_R.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcStuName", row[1].ToString()));
                        jobj_R.Add(new JProperty("nvcClass", row[2].ToString()));
                        jobj_R.Add(new JProperty("nvcStuPhoto", row[3].ToString()));
                    }
                    JObject objT = jobj_R;
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


        public JObject CreateJsonInstance_Detail(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {

                        jobj_R.Add(new JProperty("dtmRollTime", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcRollWay", row[1].ToString()));
                        jobj_R.Add(new JProperty("nvcCoutPeo", row[2].ToString()));
                        jobj_R.Add(new JProperty("Percentage", row[3].ToString()+"%"));
                        jobj_R.Add(new JProperty("nvcStuNo", row[4].ToString()));
                        jobj_R.Add(new JProperty("nvcStuName", row[5].ToString()));
                        jobj_R.Add(new JProperty("nvcReason", row[6].ToString()));
                        jobj_R.Add(new JProperty("ID", row[7].ToString()));
                    }
                    JObject objT = jobj_R;
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

        public JObject CreateJsonInstance_Time(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {
                        jobj_R.Add(new JProperty("intRollCount", row[0].ToString()));             
                    }
                    JObject objT = jobj_R;
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

        public JObject CreateJsonInstance_All(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {
                        jobj_R.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcStuName", row[1].ToString()));
                        jobj_R.Add(new JProperty("IntCount", row[2].ToString()));
                    }
                    JObject objT = jobj_R;
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