using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AhutAssist.handler.Attendance;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax.wap.teacher
{
    /// <summary>
    /// TeaAttendanceWays 的摘要说明
    /// </summary>
    public class TeaAttendanceWays : IHttpHandler
    {

        string BCView = "V_BaseInfo_CourseStu";
        string BSTable = "T_BaseInfo_Student";
        string ADTable = "T_Attendance_Detail";
        string AFView = "V_Attendance_PriorityWatch";
        string AAView = "V_Attendance_AvgCredit";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            string action = context.Request.QueryString["act"];

            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "first": Attend_First(context); break;
                    case "cecond": Attend_Cecond(context); break;
                    case "third": Attend_Third(context); break;
                    case "fourth": Attend_Fourth(context); break;
                }
            }
            else
            {
                context.Response.Write("{\"success\":false}");
            }
        }

        /// <summary>
        /// 根据选课号，获取该课程的所有学生的信息  2015年8月16日16:28:05
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void Attend_First(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            #region try
            try
            {
                string cmdText = string.Format("select BC.nvcStuNo,BC.nvcStuName,BS.nvcClass,BS.nvcStuPhoto,BC.nvcFreeFlag from {0} AS BC,{1} AS BS where BC.nvcFreeFlag='0' AND BC.nvcStuNo=BS.nvcStuNo AND BC.nvcElectiveNum='{2}' ORDER BY BC.nvcStuNo;", BCView, BSTable, nvcElectiveNum);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                foreach (DataRow row in table.Rows)
                {

                    string nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    string nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    string nvcClass = (row["nvcClass"] != null) ? row["nvcClass"].ToString() : null;
                    string nvcStuPhoto = (row["nvcStuPhoto"] != null) ? row["nvcStuPhoto"].ToString() : null;
                    string nvcFreeFlag = (row["nvcFreeFlag"] != null) ? row["nvcFreeFlag"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcStuNo", nvcStuNo),
                            new JProperty("nvcStuName", nvcStuName),
                            new JProperty("nvcClass", nvcClass),
                            new JProperty("nvcStuPhoto", nvcStuPhoto),
                            new JProperty("nvcFreeFlag", nvcFreeFlag)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                    new JProperty("success", true),
                    new JProperty("student", array),
                    new JProperty("total", table.Rows.Count)
                    ).ToString();

                context.Response.Write(json);
            }
            catch
            {
                context.Response.Write(json);
            }
            #endregion
        }

        /// <summary>
        /// 根据选课号，按学分绩点排序【升序】  2015年8月21日16:37:02
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void Attend_Cecond(HttpContext context)
        {
            string json = "{\"success\":false}"; 

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            #region try
            try
            {
                string cmdText = string.Format("select BC.nvcStuNo,BC.nvcStuName,BC.nvcClass,BC.nvcStuPhoto from {0} AS BC,{1} AS AA  where BC.nvcElectiveNum='{2}' and BC.nvcStuNo=AA.nvcStuNo order by AA.nvcCredit,BC.nvcStuNo ASC;", BCView, AAView, nvcElectiveNum);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                foreach (DataRow row in table.Rows)
                {

                    string nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    string nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    string nvcClass = (row["nvcClass"] != null) ? row["nvcClass"].ToString() : null;
                    string nvcStuPhoto = (row["nvcStuPhoto"] != null) ? row["nvcStuPhoto"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcStuNo", nvcStuNo),
                            new JProperty("nvcStuName", nvcStuName),
                            new JProperty("nvcClass", nvcClass),
                            new JProperty("nvcStuPhoto", nvcStuPhoto)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                    new JProperty("success", true),
                    new JProperty("student", array),
                    new JProperty("total", table.Rows.Count)
                    ).ToString();

                context.Response.Write(json);
            }
            catch
            {
                context.Response.Write(json);
            }
            #endregion
        }

        /// <summary>
        /// 根据选课号，获取该课程的有过缺勤记录学生的信息  2015年8月20日16:59:20
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void Attend_Third(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            #region try
            try
            {
                string cmdText = string.Format("select BC.nvcStuNo,BC.nvcStuName,BC.nvcClass,BC.nvcStuPhoto from {0} AS BC where BC.nvcFreeFlag='0' AND BC.nvcElectiveNum='{2}' AND BC.nvcStuNo in (select nvcStuNo from {1});", BCView, ADTable, nvcElectiveNum);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                foreach (DataRow row in table.Rows)
                {

                    string nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    string nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    string nvcClass = (row["nvcClass"] != null) ? row["nvcClass"].ToString() : null;
                    string nvcStuPhoto = (row["nvcStuPhoto"] != null) ? row["nvcStuPhoto"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcStuNo", nvcStuNo),
                            new JProperty("nvcStuName", nvcStuName),
                            new JProperty("nvcClass", nvcClass),
                            new JProperty("nvcStuPhoto", nvcStuPhoto)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                    new JProperty("success", true),
                    new JProperty("student", array),
                    new JProperty("total", table.Rows.Count)
                    ).ToString();

                context.Response.Write(json);
            }
            catch
            {
                context.Response.Write(json);
            }
            #endregion
        }

        /// <summary>
        /// 根据选课号，获取该课程的辅导员重点监控学生  2015年8月20日17:31:31
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void Attend_Fourth(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            #region try
            try
            {
                string cmdText = string.Format("select BC.nvcStuNo,BC.nvcStuName,BC.nvcClass,BC.nvcStuPhoto from {0} AS BC where BC.nvcFreeFlag='0' AND BC.nvcElectiveNum='{2}' AND BC.nvcStuNo in (select nvcStuNo from {1});", BCView, AFView, nvcElectiveNum);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                foreach (DataRow row in table.Rows)
                {

                    string nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    string nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    string nvcClass = (row["nvcClass"] != null) ? row["nvcClass"].ToString() : null;
                    string nvcStuPhoto = (row["nvcStuPhoto"] != null) ? row["nvcStuPhoto"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcStuNo", nvcStuNo),
                            new JProperty("nvcStuName", nvcStuName),
                            new JProperty("nvcClass", nvcClass),
                            new JProperty("nvcStuPhoto", nvcStuPhoto)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                    new JProperty("success", true),
                    new JProperty("student", array),
                    new JProperty("total", table.Rows.Count)
                    ).ToString();

                context.Response.Write(json);
            }
            catch
            {
                context.Response.Write(json);
            }
            #endregion
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}