using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AhutAssist.handler.BaseInfo;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax.wap.teacher
{
    /// <summary>
    /// TeaEvaluateList 的摘要说明
    /// </summary>
    public class TeaEvaluateList : IHttpHandler
    {
        string BEView = "V_BaseInfo_EduTask";
        string ELTable = "T_Evaluate_Level";
        string BCTable = "T_BaseInfo_CourseStu";
        string BCView = "V_BaseInfo_CourseStu";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string action = context.Request.QueryString["act"];
            string json = string.Empty;
            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "list": TeaCourseList(context); break;
                    case "info": TeaCourseInfo(context); break;
                }
            }
        }

        /// <summary>
        /// 获取教师课程列表 2015年8月12日11:32:18
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void TeaCourseList(HttpContext context)
        {
            string json = "{\"success\":false}";
            string teaNo = context.Request.QueryString["userno"];
            string year = context.Request.QueryString["nvcYear"];
            string term = context.Request.QueryString["nvcTerm"];
            string getTerm = year + "-" + term;
            try
            {
                string cmdText = string.Format("select A.nvcElectiveNum,A.nvcCourseName,A.nvcCourseNature,A.nvcYear,A.nvcTerm,count(0) AS total from {0} AS A,{1} AS B group by A.nvcElectiveNum,A.nvcCourseName,A.nvcCourseNature,A.nvcLoginCode,A.nvcYear,A.nvcTerm,B.nvcElectiveNum having A.nvcLoginCode='{2}' AND A.nvcElectiveNum like '%{3}%' AND A.nvcElectiveNum=B.nvcElectiveNum AND COUNT(B.nvcElectiveNum)>0;", BEView, BCTable, teaNo, getTerm);
                DBServer server = new SqlServer();
                DataTable table = server.ExecuteTable(cmdText);
                JArray array = new JArray();
                if (table.Rows.Count > 0)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        string nvcElectiveNum = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                        string nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                        string nvcCourseNature = (row["nvcCourseNature"] != null) ? row["nvcCourseNature"].ToString() : null;
                        string nvcYear = (row["nvcYear"] != null) ? row["nvcYear"].ToString() : null;
                        string nvcTerm = (row["nvcTerm"] != null) ? row["nvcTerm"].ToString() : null;
                        int total = (row["total"] != null) ? Convert.ToInt32(row["total"]) : -1;

                        string cmd = string.Format("select (select avg(C.intScore) from {1} AS C where C.nvcElectiveNum='{2}' AND C.intIsEvaluate=1) AS nvcScore,(select B.nvcEvaGrade from {0} AS B where (select avg(C.intScore) from {1} AS C where C.nvcElectiveNum='{2}' AND C.intIsEvaluate=1) Between B.intLowMark AND B.intHighMark) AS avgGrade,(select COUNT(A.nvcContents) from {1} AS A where A.nvcElectiveNum='{2}' AND A.intIsEvaluate=1 AND A.nvcContents<>'') AS contentCount ,(select COUNT(D.intIsEvaluate) from {1} AS D where D.nvcElectiveNum='{2}' AND D.intIsEvaluate=1) AS countIsEva;", ELTable, BCTable, nvcElectiveNum);
                        
                        DBServer dbserver = new SqlServer();
                        DataRow scoreRow = dbserver.ExecuteRow(cmd);
                        string avgGrade = string.Empty;
                        string nvcScore = string.Empty;
                        if (scoreRow["avgGrade"].ToString() != "")
                        {
                            avgGrade = scoreRow["avgGrade"].ToString();
                        }
                        else
                        {
                            avgGrade = "未评";
                        }
                        if (scoreRow["nvcScore"].ToString() != "")
                        {
                            nvcScore = scoreRow["nvcScore"].ToString();
                        }
                        else
                        {
                            nvcScore = "0";
                        }
                        int contentCount = Convert.ToInt32(scoreRow["contentCount"]);
                        int countIsEva = Convert.ToInt32(scoreRow["countIsEva"]);
                        int countNotEva = total - countIsEva;
                        int avgScore = Convert.ToInt32(nvcScore);
                        JObject obj = new JObject(
                            new JProperty("nvcElectiveNum", nvcElectiveNum),
                            new JProperty("nvcCourseName", nvcCourseName),
                            new JProperty("nvcCourseNature", nvcCourseNature),
                            new JProperty("nvcYear", nvcYear),
                            new JProperty("nvcTerm", nvcTerm),
                            new JProperty("total", total),
                            new JProperty("avgGrade", avgGrade),
                            new JProperty("avgScore", avgScore),
                            new JProperty("contentCount", contentCount),
                            new JProperty("countIsEva", countIsEva),
                            new JProperty("countNotEva", countNotEva)
                            );
                        array.Add(obj);
                    }
                    json = array.ToString();
                }
                context.Response.Write(json);
            }
            catch
            {
                context.Response.Write(json);
            }
        }

        /// <summary>
        /// 获取课程留言列表 2015年8月13日20:43:54
        /// </summary>
        /// <param name="context"></param>
        public void TeaCourseInfo(HttpContext context)
        {
            string json = "{\"success\":false}";
            string ElectiveNum = context.Request.Form["nvcElectiveNum"];

            DBServer server = new SqlServer();
            string cmdText = string.Format("select nvcContents,dtmLeaveTime from {0} where nvcElectiveNum='{1}' AND intIsEvaluate=1 AND nvcContents<>'' order by dtmLeaveTime ASC;", BCView, ElectiveNum);
            DataTable table = server.ExecuteTable(cmdText);
            JArray array = new JArray();
            if (table.Rows.Count != 0)
            {
                foreach (DataRow row in table.Rows)
                {
                    string nvcContents = string.Empty;
                    string dtmLeaveTime = string.Empty;

                    nvcContents = row["nvcContents"].ToString();
                    dtmLeaveTime = row["dtmLeaveTime"].ToString();

                    JObject obj = new JObject(
                        new JProperty("nvcContents", nvcContents),
                        new JProperty("dtmLeaveTime", dtmLeaveTime)
                        );
                    array.Add(obj);
                }
                json = new JObject(
                        new JProperty("result", array)
                    ).ToString();
            }
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