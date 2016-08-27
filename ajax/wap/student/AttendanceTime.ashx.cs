using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using WebHelper;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax.wap.student
{
    /// <summary>
    /// AttendanceTime 的摘要说明
    /// </summary>
    public class AttendanceTime : IHttpHandler
    {
        string BETable = "T_BaseInfo_EduTask";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            string action = context.Request.QueryString["act"];
            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "year": AttendanceYear(context); break;
                    case "term": AttendanceTerm(context); break;
                }
            }
            else
            {
                context.Response.Write(null);
            }
        }

        /// <summary>
        /// 获取学年信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceYear(HttpContext context)
        {
            string json = null;
            try
            {
                string cmdText = string.Format("select MAX(nvcYear) AS nvcYear from {0} GROUP BY nvcYear order by nvcYear DESC", BETable);
                DBServer server = new SqlServer();
                DataRow row = server.ExecuteRow(cmdText);
                JArray array = new JArray();
                if (row != null)
                {
                    string year = (row["nvcYear"] != null) ? row["nvcYear"].ToString() : null;
                    array.Add(
                        new JObject(
                            new JProperty("nvcYear", year)
                            )
                        );
                    string year_1 = year.Split('-')[0];
                    string year_2 = year.Split('-')[1];
                    for (int i = 1; i < 5; i++)
                    {
                        int y1 = Convert.ToInt32(year_1) - i;
                        int y2 = Convert.ToInt32(year_2) - i;
                        string nvcYear = y1.ToString() + "-" + y2.ToString();
                        array.Add(
                            new JObject(
                                new JProperty("nvcYear", nvcYear)
                                )
                            );
                    }
                    json = array.ToString();
                }
            }
            catch { }
            context.Response.Write(json);
        }

        /// <summary>
        /// 获取学期信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void AttendanceTerm(HttpContext context)
        {
            string json = null;
            try
            {
                string cmdText = string.Format("select distinct Max(nvcTerm) AS nvcTerm from {0} where nvcYear in (select Max(nvcYear) from {0})", BETable);
                DBServer server = new SqlServer();
                DataRow row = server.ExecuteRow(cmdText);
                JArray array = new JArray();
                string nvcTerm = (row["nvcTerm"] != null) ? row["nvcTerm"].ToString() : null;
                array.Add(
                    new JObject(
                        new JProperty("nvcTerm", nvcTerm)
                        )
                    );
                if (nvcTerm == "1")
                {
                    array.Add(
                        new JObject(
                            new JProperty("nvcTerm", "2")
                            )
                        );
                }
                else
                {
                    array.Add(
                        new JObject(
                            new JProperty("nvcTerm", "1")
                            )
                        );
                }
                json = array.ToString();
            }
            catch { }
            context.Response.Write(json);
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