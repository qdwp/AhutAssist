using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using AhutAssist.handler.Evaluate;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax.wap.student
{
    /// <summary>
    /// VoteInfo 的摘要说明
    /// </summary>
    public class VoteInfo : IHttpHandler
    {
        string EVTable = "T_Evaluate_Vote";
        string ELView = "V_Evaluate_List";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string action = context.Request.QueryString["act"];
            VoteHandler handler = new AhutAssist.handler.Evaluate.VoteHandler();
            string json = string.Empty;
            if (action != null)
            {
                switch (action.ToLower())
                {
                    //case "init": VoteInit(context); break;
                    case "list": VoteList(context); break;
                    case "valid": VoteValid(context); break;
                    case "vote": VoteVote(context); break;
                }
                context.Response.Write(json);
            }
            else
            {
                context.Response.Write(null);
            }
        }

        public void VoteInit(HttpContext context)
        {
            string json = "{\"success\":false}";
            string StuNo = context.Request.Form["nvcStuNo"];
            string nvcYear = context.Request.Form["nvcYear"];
            string nvcTerm = context.Request.Form["nvcTerm"];
            string term = nvcYear + "-" + nvcTerm;
            try
            {
                string cmdText = string.Format("select ID from {0} where nvcStuNo='{1}' AND nvcElectiveNum like '%{2}%';", EVTable, StuNo, term);
                DBServer server = new SqlServer();
                int count = 3 - server.ExecuteTable(cmdText).Rows.Count;
                json = "{\"success\":true,\"count\":" + count.ToString() + "}";
            }
            catch
            {
                json = "{\"success\":false}";
            }

            context.Response.Write(json);
        }

        /// <summary>
        /// 获取学生课程信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void VoteList(HttpContext context)
        {
            string json = "{\"success\":false}";
            string StuNo = context.Request.QueryString["userno"];
            string strYear = context.Request.QueryString["nvcYear"];
            string strTerm = context.Request.QueryString["nvcTerm"];
            string term = strYear + "-" + strTerm;
            string cmdText = string.Format("SELECT EL.ID,EL.nvcElectiveNum,EL.nvcCourseName,EL.nvcCourseNature,EL.nvcName,EL.nvcStuNo,(select EV.nvcElectiveNum from {0} AS EV where EV.nvcElectiveNum+EV.nvcStuNo=EL.nvcElectiveNum+EL.nvcStuNo) AS isVote FROM {1} AS EL where EL.nvcStuNo='{2}' AND EL.nvcElectiveNum like '%{3}%';", EVTable, ELView, StuNo, term);
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
                    string nvcName = string.Empty;
                    string isVote = string.Empty;

                    ID = row["ID"].ToString();
                    nvcElectiveNum = row["nvcElectiveNum"].ToString();
                    nvcCourseName = row["nvcCourseName"].ToString();
                    nvcCourseNature = row["nvcCourseNature"].ToString();
                    nvcStuNo = row["nvcStuNo"].ToString();
                    nvcName = row["nvcName"].ToString();
                    if (row["isVote"].ToString() == "")
                    {
                        isVote = "0";
                    }
                    else {
                        isVote = "1";
                    }

                    JObject obj = new JObject(
                        new JProperty("ID", ID),
                        new JProperty("nvcElectiveNum", nvcElectiveNum),
                        new JProperty("nvcCourseName", nvcCourseName),
                        new JProperty("nvcCourseNature", nvcCourseNature),
                        new JProperty("nvcStuNo", nvcStuNo),
                        new JProperty("nvcName", nvcName),
                        new JProperty("isVote", isVote)
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

        /// <summary>
        /// 投票验证信息
        /// </summary>
        /// <param name="context"></param>
        public void VoteValid(HttpContext context)
        {
            string json = "{\"success\":false}";
            string StuNo = context.Request.Form["nvcStuNo"];
            string strYear = context.Request.Form["nvcYear"];
            string strTerm = context.Request.Form["nvcTerm"];
            string term = strYear + "-" + strTerm;
            string cmdSelect = string.Format("select ID from {0} where nvcStuNo='{1}' AND nvcElectiveNum like '%{2}%';", EVTable, StuNo, term);
            DBServer server = new SqlServer();
            int count = server.ExecuteTable(cmdSelect).Rows.Count;
            if (count >= 3)
            {
                json = "{\"success\":false,\"message\":\"您已完成为心目中的好老师投票\"}";
                context.Response.Write(json);
                return;
            }
            json = "{\"success\":true,\"message\":\"可投票\"}";
            context.Response.Write(json);
            return;
        }

        /// <summary>
        /// 提交投票信息
        /// </summary>
        /// <param name="context"></param>
        public void VoteVote(HttpContext context)
        {
            string json = "{\"success\":false}";

            string nvcElectiveNum = context.Request.Form["nvcElectiveNum"];
            string nvcIP = context.Request.Form["nvcIP"];
            string nvcTerminal = context.Request.Form["Terminal"];
            string StuNo = context.Request.Form["nvcStuNo"];
            string cmdText = string.Empty;
            try
            {
                DBServer dbserver = new SqlServer();
                cmdText = string.Format("insert into {0} (nvcElectiveNum,nvcStuNo,nvcIP,nvcTerminal)Values('{1}','{2}','{3}','{4}');", EVTable, nvcElectiveNum, StuNo, nvcIP, nvcTerminal);
                dbserver.ExecuteNonQuery(cmdText);
                json = "{\"success\":true}";
            }
            catch { 
                
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