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
    /// AttendanceInfo 的摘要说明
    /// </summary>
    public class TeaAttendanceInfo : IHttpHandler
    {
        string ATView = "V_Attendance_TeaCourse";
        //string ADView = "V_Attendance_Detail";
        string ADEView = "V_Attendance_DatailExtra";
        string AMTable = "T_Attendance_Major";
        string ADTable = "T_Attendance_Detail";

        #region ProcessRequest
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            string action = context.Request.QueryString["act"];

            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "list": AttendanceList(context); break;
                    case "att": AttendanceAtt(context); break;
                    case "detail": AttendanceDetail(context); break;
                }
            }
            else
            {
                context.Response.Write("{\"success\":false}");
            }
        }
        #endregion

        /// <summary>
        /// 教师获取当前学期课程列表 2015-08-15 20:58:41
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceList(HttpContext context)
        {
            string json = "{\"success\":false}";

            string term = context.Request.QueryString["term"];
            //string term = "2015-2016-1";
            string nvcLoginCode = context.Request.QueryString["userno"];
            try
            {
                string cmdText = string.Format("select nvcCourseName,nvcElectiveNum,timeAndPlace,attendanceCount,totalCount from {0} where nvcLoginCode='{1}' AND nvcElectiveNum like '%{2}%'", ATView, nvcLoginCode, term);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                #region if
                if (table != null && table.Rows.Count != 0)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        string nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                        string nvcElectiveNum = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                        string timeAndPlace = (row["timeAndPlace"] != null) ? row["timeAndPlace"].ToString() : null;
                        string attendanceCount = (row["attendanceCount"].ToString() != "") ? row["attendanceCount"].ToString() : "0";
                        string totalCount = (row["totalCount"].ToString() != "") ? row["totalCount"].ToString() : "0";
                        JObject obj = new JObject(
                            new JProperty("nvcCourseName", nvcCourseName),
                            new JProperty("nvcElectiveNum", nvcElectiveNum),
                            new JProperty("timeAndPlace", timeAndPlace),
                            new JProperty("attendanceCount", attendanceCount),
                            new JProperty("totalCount", totalCount)
                            );
                        array.Add(obj);
                    }
                    json = array.ToString();
                    context.Response.Write(json);
                }
                #endregion
            }
            catch
            {
                context.Response.Write(json);
            }
        }



        /// <summary>
        /// 执行考勤结果提交 2015-08-18 15:06:07
        /// </summary>
        /// <param name="context"></param>
        public void AttendanceAtt(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            string nvcLoginCode = context.Request.Form["nvcLoginCode"];
            string absentNo = context.Request.Form["absentNo"];
            string nvcIP = context.Request.Form["nvcIP"];
            string nvcTerminal = context.Request.Form["nvcTerminal"];
            string[] students = absentNo.Split(';');

            DBServer dbserver = new SqlServer();
            try
            {
                dbserver.BeginTranscation();
                string cmd = string.Format("insert into {0} (nvcElectiveNum,nvcLoginCode,nvcRollWay,intRollCount,nvcIP,nvcTerminal) output inserted.ID Values('{1}','{2}','全点',(select MAX(intRollCount) from {0} where nvcElectiveNum='{1}')+1,'{3}','{4}');", AMTable, nvcElectiveNum, nvcLoginCode, nvcIP, nvcTerminal);
                DataRow row = dbserver.ExecuteRow(cmd);
                string attendanceID = row["ID"].ToString();
                int n = 0;
                if (students[0] != "")
                {
                    for (int i = 0; i < students.Length; i++)
                    {
                        string[] temp = students[i].Split(',');
                        string cmdText = string.Format("insert into {0} (nvcAttendanceID,nvcStuNo,nvcReason)Values('{1}','{2}','{3}');", ADTable, attendanceID, temp[0], temp[1]);
                        n += dbserver.ExecuteNonQuery(cmdText);
                    }
                }
                dbserver.Commit();
                json = "{\"success\":true,\"index\":\"" + n + "\"}";
            }
            catch
            {
                dbserver.Rollback();
            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 根据选课号，获取该课程的考勤详细信息  2015-08-19 12:05:56
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceDetail(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.QueryString["nvcElectiveNum"];
            #region try
            try
            {
                string cmdText = string.Format("select nvcCourseName,nvcStuNo,nvcStuName,absentCount from {0} where nvcElectiveNum='{1}' order by absentCount DESC;", ADEView, nvcElectiveNum);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                foreach (DataRow row in table.Rows)
                {
                    string nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                    string nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    string nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    string absentCount = (row["absentCount"] != null) ? row["absentCount"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcCourseName", nvcCourseName),
                            new JProperty("nvcStuNo", nvcStuNo),
                            new JProperty("nvcStuName", nvcStuName),
                            new JProperty("absentCount", absentCount)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                    new JProperty("success",true),
                    new JProperty("student", array)
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