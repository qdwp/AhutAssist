using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using WebHelper;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AhutAssist.handler.Attendance;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax.wap.student
{
    /// <summary>
    /// AttendanceInfo 的摘要说明
    /// </summary>
    public class AttendanceInfo : IHttpHandler
    {
        string ASView = "V_Attendance_Stu";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            string action = context.Request.QueryString["act"];
            //new AhutAssist.handler.Attendance.MajorHandler();

            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "list": AttendanceList(context); break;
                    case "info": AttendanceView(context); break;
                }
            }
            else
            {
                context.Response.Write(null);
            }
        }

        /// <summary>
        /// 获取学生缺勤列表信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceView(HttpContext context)
        {
            string json = null;

            string nvcYear = context.Request.QueryString["nvcYear"];
            string nvcTerm = context.Request.QueryString["nvcTerm"];
            string nvcStuNo = context.Request.QueryString["userno"];
            try
            {
                string cmdText = string.Format("select nvcElectiveNum,nvcCourseName,nvcName,dtmRollTime,nvcReason from {0} where nvcStuNo='{1}' AND nvcYear='{2}' AND nvcTerm='{3}' order by dtmRollTime DESC;", ASView, nvcStuNo, nvcYear, nvcTerm);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                #region if
                foreach(DataRow row in table.Rows){

                    string nvcElectiveNum = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                    string nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                    string nvcName = (row["nvcName"] != null) ? row["nvcName"].ToString() : null;
                    string dtmRollTime = (row["dtmRollTime"] != null) ? row["dtmRollTime"].ToString() : null;
                    string nvcReason = (row["nvcReason"] != null) ? row["nvcReason"].ToString() : null;
                    JObject obj = null;
                    obj = new JObject(
                            new JProperty("nvcElectiveNum", nvcElectiveNum),
                            new JProperty("nvcCourseName", nvcCourseName),
                            new JProperty("nvcName", nvcName),
                            new JProperty("dtmRollTime", dtmRollTime),
                            new JProperty("nvcReason", nvcReason)
                        );
                    array.Add(obj);
                }
                    json = array.ToString();

                    context.Response.Write(json);
                #endregion
            }
            catch
            {
                context.Response.Write(null);
            }
        }

        /// <summary>
        /// 获取学生缺勤列表信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceList(HttpContext context)
        {
            string json = null;

            string nvcYear = context.Request.QueryString["nvcYear"];
            string nvcTerm = context.Request.QueryString["nvcTerm"];
            string nvcStuNo = context.Request.QueryString["userno"];
            try
            {
                string cmdText = string.Format("select nvcElectiveNum,nvcCourseName,nvcName,dtmRollTime,nvcRollWay,nvcReason from {0} where nvcStuNo='{1}' AND nvcYear='{2}' AND nvcTerm='{3}' order by nvcCourseName,dtmRollTime ASC;", ASView, nvcStuNo, nvcYear, nvcTerm);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);

                JArray array = new JArray();
                #region if
                if (table != null && table.Rows.Count != 0)
                {
                    DataRow row = table.Rows[0];
                    JObject o = new JObject();
                    JArray arr = new JArray();
                    string nvcElectiveNum = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                    string nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                    string nvcName = (row["nvcName"] != null) ? row["nvcName"].ToString() : null;
                    string dtmRollTime = (row["dtmRollTime"] != null) ? row["dtmRollTime"].ToString().Split(' ')[0] : null;
                    string nvcRollWay = (row["nvcRollWay"] != null) ? row["nvcRollWay"].ToString() : null;
                    string nvcReason = (row["nvcReason"] != null) ? row["nvcReason"].ToString() : null;
                    JObject obj = new JObject(
                        new JProperty("dtmRollTime", dtmRollTime),
                        new JProperty("nvcRollWay", nvcRollWay),
                        new JProperty("nvcReason", nvcReason)
                    );
                    arr.Add(obj);
                    int intCount = 1;
                    for (int i = 1; i < table.Rows.Count; i++)
                    {
                        if (table.Rows[i]["nvcElectiveNum"].ToString() != nvcElectiveNum)
                        {
                            o = null;
                            o = new JObject(
                                new JProperty("nvcElectiveNum", nvcElectiveNum),
                                new JProperty("nvcCourseName", nvcCourseName),
                                new JProperty("nvcName", nvcName),
                                new JProperty("intCount", intCount),
                                new JProperty("attendanceInfoModels", arr)
                                );
                            array.Add(o);
                            nvcElectiveNum = (table.Rows[i]["nvcElectiveNum"] != null) ? table.Rows[i]["nvcElectiveNum"].ToString() : null;
                            nvcCourseName = (table.Rows[i]["nvcCourseName"] != null) ? table.Rows[i]["nvcCourseName"].ToString() : null;
                            nvcName = (table.Rows[i]["nvcName"] != null) ? table.Rows[i]["nvcName"].ToString() : null;
                            arr = new JArray();
                            dtmRollTime = (table.Rows[i]["dtmRollTime"] != null) ? table.Rows[i]["dtmRollTime"].ToString().Split(' ')[0] : null;
                            nvcRollWay = (table.Rows[i]["nvcRollWay"] != null) ? table.Rows[i]["nvcRollWay"].ToString() : null;
                            nvcReason = (table.Rows[i]["nvcReason"] != null) ? table.Rows[i]["nvcReason"].ToString() : null;
                            obj = null;
                            obj = new JObject(
                                 new JProperty("dtmRollTime", dtmRollTime),
                                 new JProperty("nvcRollWay", nvcRollWay),
                                 new JProperty("nvcReason", nvcReason)
                             );
                            arr.Add(obj);
                            intCount = 1;
                        }
                        else
                        {
                            dtmRollTime = (table.Rows[i]["dtmRollTime"] != null) ? table.Rows[i]["dtmRollTime"].ToString().Split(' ')[0] : null;
                            nvcRollWay = (table.Rows[i]["nvcRollWay"] != null) ? table.Rows[i]["nvcRollWay"].ToString() : null;
                            nvcReason = (table.Rows[i]["nvcReason"] != null) ? table.Rows[i]["nvcReason"].ToString() : null;
                            obj = null;
                            obj = new JObject(
                                 new JProperty("dtmRollTime", dtmRollTime),
                                 new JProperty("nvcRollWay", nvcRollWay),
                                 new JProperty("nvcReason", nvcReason)
                             );
                            arr.Add(obj);
                            intCount += 1;
                        }
                    }
                    o = null;
                    o = new JObject(
                            new JProperty("nvcElectiveNum", nvcElectiveNum),
                            new JProperty("nvcCourseName", nvcCourseName),
                            new JProperty("nvcName", nvcName),
                            new JProperty("intCount", intCount),
                            new JProperty("attendanceInfoModels", arr)
                        );
                    array.Add(o);
                    json = array.ToString();

                    context.Response.Write(json);
                }
                #endregion
            }
            catch
            {
                context.Response.Write(null);
            }
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