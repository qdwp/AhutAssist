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

namespace AhutAssist.ajax.wap.student
{
    /// <summary>
    /// EvaluateInfo 的摘要说明
    /// </summary>
    public class EvaluateInfo : IHttpHandler
    {
        string BCTable = "T_BaseInfo_CourseStu";
        string BCView = "V_BaseInfo_CourseStu";
        string ELTable = "T_Evaluate_Level";
        string ESTable = "T_Evaluate_Setting";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string action = context.Request.QueryString["act"];
            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "init": CourseInit(context); break;
                    case "valid": CourseValid(context); break;
                    case "list": CourseList(context); break;
                    case "info": CourseInfo(context); break;
                    case "level": CourseLevel(context); break;
                    case "submit":
                        {
                            string ID = context.Request.Form["ID"];
                            string nvcEvaGrade = context.Request.Form["nvcEvaGrade"];
                            string intScore = context.Request.Form["intScore"];
                            string nvcContents = context.Request.Form["nvcContents"];
                            string nvcIP = context.Request.Form["nvcIP"];
                            string nvcTerminal = context.Request.Form["nvcTerminal"];
                            switch (nvcEvaGrade)
                            {
                                case "1": nvcEvaGrade = "优"; break;
                                case "2": nvcEvaGrade = "良"; break;
                                case "3": nvcEvaGrade = "中"; break;
                                case "4": nvcEvaGrade = "一般"; break;
                                case "5": nvcEvaGrade = "差"; break;
                            }
                            JObject obj = new JObject(
                                new JProperty("ID", ID),
                                new JProperty("nvcEvaGrade", nvcEvaGrade),
                                new JProperty("intScore", intScore),
                                new JProperty("intIsEvaluate", "1"),
                                new JProperty("nvcContents", nvcContents),
                                new JProperty("nvcIP", nvcIP),
                                new JProperty("nvcTerminal", nvcTerminal)
                                );
                            CourseStuHandler handler = new AhutAssist.handler.BaseInfo.CourseStuHandler();
                            string json = handler.Edit(obj).ToString();
                            context.Response.Write(json);
                        }; break;
                }
            }
            else
            {
                context.Response.Write(null);
            }

        }

        /// <summary>
        ///  2015年8月29日15:57:35
        /// </summary>
        /// <param name="context"></param>
        public void CourseInit(HttpContext context)
        {
            string json = "{\"success\":false}";
            string year = context.Request.Form["nvcYear"];
            string term = context.Request.Form["nvcTerm"];
            string nvcStuNo = context.Request.Form["nvcStuNo"];
            string getTerm = year + "-" + term;
            try
            {
                string cmdText = string.Format("select COUNT(intIsEvaluate) AS notCount from {0} where nvcElectiveNum LIKE '%{1}%' AND nvcStuNo='{2}' AND intIsEvaluate='0';", BCTable, getTerm, nvcStuNo);
                DBServer server = new SqlServer();
                DataRow row = server.ExecuteRow(cmdText);
                string notCount = row["notCount"].ToString();
                //int count = Convert.ToInt32(notCount);
                json = new JObject(
                    new JProperty("count",notCount)
                    ).ToString();
            }
            catch
            {
                json = new JObject(
                    new JProperty("count", "0")
                    ).ToString();
            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 验证是否处于可评教时间 2015年8月29日15:57:35
        /// </summary>
        /// <param name="context"></param>
        public void CourseValid(HttpContext context)
        {
            string json = "{\"success\":false}";
            string year = context.Request.Form["nvcYear"];
            string term = context.Request.Form["nvcTerm"];
            //string getTerm = year + "-" + term;
            try
            {
                string cmdText = string.Format("select dtmBeginTime,dtmEndTime from {0} where nvcYear='{1}' AND nvcTerm='{2}';", ESTable, year, term);
                DBServer server = new SqlServer();
                DataRow row = server.ExecuteRow(cmdText);
                DateTime dtmBeginTime = DateTime.Parse(row["dtmBeginTime"].ToString());
                DateTime dtmEndTime = DateTime.Parse(row["dtmEndTime"].ToString());
                DateTime now = DateTime.Now;

                int com1 = DateTime.Compare(dtmBeginTime, now);
                int com2 = DateTime.Compare(now, dtmEndTime);

                if (com1 <= 0 && com2 <= 0)
                {
                    json = "{\"success\":true}";
                }
            }
            catch
            {

            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 获取学生课程信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void CourseInfo(HttpContext context)
        {
            string json = "{\"success\":false}";
            string id = context.Request.Form["ID"];

            DBServer server = new SqlServer();
            string cmdText = string.Format("select * from {0} where ID='{1}';", BCView, id);
            DataRow row = server.ExecuteRow(cmdText);
            JArray arr = new JArray();
            if (row != null)
            {
                string ID = string.Empty;
                string nvcElectiveNum = string.Empty;
                string nvcCourseName = string.Empty;
                string nvcStuNo = string.Empty;
                string nvcStuName = string.Empty;
                string nvcLoginCode = string.Empty;
                string nvcName = string.Empty;
                string nvcYear = string.Empty;
                string nvcTerm = string.Empty;
                string intIsEvaluate = string.Empty;
                string nvcTeaPhoto = string.Empty;

                ID = row["ID"].ToString();
                nvcElectiveNum = row["nvcElectiveNum"].ToString();
                nvcCourseName = row["nvcCourseName"].ToString();
                nvcStuNo = row["nvcStuNo"].ToString();
                nvcStuName = row["nvcStuName"].ToString();
                nvcLoginCode = row["nvcLoginCode"].ToString();
                nvcName = row["nvcName"].ToString();
                nvcYear = row["nvcYear"].ToString();
                nvcTerm = row["nvcTerm"].ToString();
                intIsEvaluate = row["intIsEvaluate"].ToString();
                nvcTeaPhoto = row["nvcTeaPhoto"].ToString();

                JObject obj = new JObject(
                    new JProperty("ID", ID),
                    new JProperty("nvcElectiveNum", nvcElectiveNum),
                    new JProperty("nvcCourseName", nvcCourseName),
                    new JProperty("nvcStuNo", nvcStuNo),
                    new JProperty("nvcStuName", nvcStuName),
                    new JProperty("nvcLoginCode", nvcLoginCode),
                    new JProperty("nvcName", nvcName),
                    new JProperty("nvcYear", nvcYear),
                    new JProperty("nvcTerm", nvcTerm),
                    new JProperty("intIsEvaluate", intIsEvaluate),
                    new JProperty("nvcTeaPhoto", nvcTeaPhoto)
                    );

                json = obj.ToString();
            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 获取学生课程列表
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void CourseList(HttpContext context)
        {
            string json = "{\"success\":false}";
            string stuNo = context.Request.QueryString["userno"];
            string term = getTerm();
            string cmdText = string.Format("select * from {0} where nvcStuNo='{1}' AND nvcElectiveNum like '%{2}%';", BCView, stuNo, term);
            DBServer server = new SqlServer();
            DataTable table = server.ExecuteTable(cmdText);

            JArray arr = new JArray();
            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    string ID = string.Empty;
                    string nvcElectiveNum = string.Empty;
                    string nvcCourseName = string.Empty;
                    string nvcCourseNature = string.Empty;
                    string nvcStuNo = string.Empty;
                    string nvcStuName = string.Empty;
                    string nvcLoginCode = string.Empty;
                    string nvcName = string.Empty;
                    string nvcYear = string.Empty;
                    string nvcTerm = string.Empty;
                    string intIsEvaluate = string.Empty;
                    string nvcTeaPhoto = string.Empty;

                    ID = (row["ID"] != null) ? row["ID"].ToString() : null;
                    nvcElectiveNum = (row["nvcElectiveNum"] != null) ? row["nvcElectiveNum"].ToString() : null;
                    nvcCourseName = (row["nvcCourseName"] != null) ? row["nvcCourseName"].ToString() : null;
                    nvcCourseNature = (row["nvcCourseNature"] != null) ? row["nvcCourseNature"].ToString() : null;
                    nvcStuNo = (row["nvcStuNo"] != null) ? row["nvcStuNo"].ToString() : null;
                    nvcStuName = (row["nvcStuName"] != null) ? row["nvcStuName"].ToString() : null;
                    nvcLoginCode = (row["nvcLoginCode"] != null) ? row["nvcLoginCode"].ToString() : null;
                    nvcName = (row["nvcName"] != null) ? row["nvcName"].ToString() : null;
                    nvcYear = (row["nvcYear"] != null) ? row["nvcYear"].ToString() : null;
                    nvcTerm = (row["nvcTerm"] != null) ? row["nvcTerm"].ToString() : null;
                    intIsEvaluate = (row["intIsEvaluate"] != null) ? row["intIsEvaluate"].ToString() : null;
                    nvcTeaPhoto = (row["nvcTeaPhoto"] != null) ? row["nvcTeaPhoto"].ToString() : null;

                    JObject obj = new JObject(
                        new JProperty("ID", ID),
                        new JProperty("nvcElectiveNum", nvcElectiveNum),
                        new JProperty("nvcCourseName", nvcCourseName),
                        new JProperty("nvcCourseNature", nvcCourseNature),
                        new JProperty("nvcStuNo", nvcStuNo),
                        new JProperty("nvcStuName", nvcStuName),
                        new JProperty("nvcLoginCode", nvcLoginCode),
                        new JProperty("nvcName", nvcName),
                        new JProperty("nvcYear", nvcYear),
                        new JProperty("nvcTerm", nvcTerm),
                        new JProperty("intIsEvaluate", intIsEvaluate),
                        new JProperty("nvcTeaPhoto", nvcTeaPhoto)
                        );
                    arr.Add(obj);

                }
                json = new JObject(
                    new JProperty("success", true),
                    new JProperty("result", arr)
                    ).ToString();
            }
            context.Response.Write(json);
        }

        #region 注释提交评价
        ///// <summary>
        ///// 提交评价信息
        ///// </summary>
        ///// <param name="context"></param>
        //public void CourseSubmit(HttpContext context)
        //{
        //    string json = "{\"success\":false}";
        //    int res = 0;
        //    try
        //    {
        //        string ID = context.Request.Form["ID"];
        //        string nvcEvaGrade = context.Request.Form["nvcEvaGrade"];
        //        string intScore = context.Request.Form["intScore"];
        //        string nvcContents = context.Request.Form["nvcContents"];
        //        string nvcIP = context.Request.Form["nvcIP"];
        //        string nvcTerminal = context.Request.Form["nvcTerminal"];
        //        switch (nvcEvaGrade)
        //        {
        //            case "1": nvcEvaGrade = "优"; break;
        //            case "2": nvcEvaGrade = "良"; break;
        //            case "3": nvcEvaGrade = "中"; break;
        //            case "4": nvcEvaGrade = "一般"; break;
        //            case "5": nvcEvaGrade = "差"; break;
        //        }

        //        string cmdText = string.Format("update {0} set intIsEvaluate=1,nvcEvaGrade='{1}',intScore='{2}',nvcContents='{3}',dtmLeaveTime='{4}',nvcIP='{5}',nvcTerminal='{6}' where ID='{7}' AND intIsEvaluate!=1;", BCTable, nvcEvaGrade, intScore, nvcContents, DateTime.Now.ToString(), nvcIP, nvcTerminal, ID);

        //        res = SqlServer.ExecuteNonQuery(cmdText);
        //        if (1 == res)
        //        {
        //            json = "{\"success\":true}";
        //        }
        //    }
        //    catch
        //    {
        //        json = "{\"success\":false}";
        //    }
        //    context.Response.Write(json);
        //}
        #endregion

        /// <summary>
        /// 获取评教等级
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void CourseLevel(HttpContext context)
        {
            string json = "{\"success\":false}";
            string cmdText = string.Format("select * from {0} order by intSort;", ELTable);//order by intSort
            DBServer server = new SqlServer();
            DataTable table = server.ExecuteTable(cmdText);

            JArray arr = new JArray();
            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    string ID = string.Empty;
                    string nvcEvaGrade = string.Empty;
                    string intLowMark = string.Empty;
                    string intHighMark = string.Empty;
                    string intSort = string.Empty;

                    ID = row["ID"].ToString();
                    nvcEvaGrade = row["nvcEvaGrade"].ToString();
                    intLowMark = row["intLowMark"].ToString();
                    intHighMark = row["intHighMark"].ToString();
                    intSort = row["intSort"].ToString();

                    JObject obj = new JObject(
                        new JProperty("ID", ID),
                        new JProperty("nvcEvaGrade", nvcEvaGrade),
                        new JProperty("intLowMark", intLowMark),
                        new JProperty("intHighMark", intHighMark),
                        new JProperty("intSort", intSort)
                        );
                    arr.Add(obj);

                }
                json = arr.ToString();
            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 后台自动获取当前学期（齐敦伟 2015年8月11日19:51:43）
        /// </summary>
        /// <returns></returns>
        private string getTerm()
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

            return term;
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