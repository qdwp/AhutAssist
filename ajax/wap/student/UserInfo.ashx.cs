using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using System.Net;
using System.Text;
using System.IO;

namespace AhutAssist.ajax.wap.student
{
    /// <summary>
    /// UserInfo 的摘要说明
    /// </summary>
    public class UserInfo : IHttpHandler
    {
        string BSTable = "T_BaseInfo_Student";
        string BTTable = "T_BaseInfo_Teacher";
        public const string SERVER_URL = "http://211.70.149.135:88/";
        public static string _viewstate = "";
        public static string _cookie = "";

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            context.Response.ContentType = "application/json";
            string action = context.Request.QueryString["act"];

            if (action != null)
            {
                switch (action.ToLower())
                {
                    case "login":
                        {
                            Login(context);
                        };
                        break;
                }
            }
            else
            {
                context.Response.Write(null);
            }
        }


        public void Login(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string json = "{\"success\":false}";
            string username = context.Request.Form["username"];
            string password = context.Request.Form["password"];

            if (username.Length == 9)
            {
                if (login(0, username, password))
                {
                    try
                    {
                        DBServer dbserver = new SqlServer();
                        string cmdText = string.Format("select ID,nvcStuNo,nvcStuName,nvcCollege,nvcClass,nvcStuPhoto from {0} where nvcStuNo='{1}';", BSTable, username);
                        DataRow row = dbserver.ExecuteRow(cmdText);
                        if (row != null)
                        {
                            string ID = string.Empty;
                            string nvcStuName = string.Empty;
                            string nvcStuNo = string.Empty;
                            string nvcCollege = string.Empty;
                            string nvcClass = string.Empty;
                            string nvcStuPhoto = string.Empty;

                            ID = row["ID"].ToString();
                            nvcStuNo = row["nvcStuNo"].ToString();
                            nvcStuName = row["nvcStuName"].ToString();
                            nvcCollege = row["nvcCollege"].ToString();
                            nvcClass = row["nvcClass"].ToString();
                            nvcStuPhoto = row["nvcStuPhoto"].ToString();

                            JObject obj = new JObject(
                                new JProperty("ID", ID),
                                new JProperty("nvcStuNo", nvcStuNo),
                                new JProperty("nvcStuName", nvcStuName),
                                new JProperty("nvcCollege", nvcCollege),
                                new JProperty("nvcClass", nvcClass),
                                new JProperty("nvcStuPhoto", nvcStuPhoto)
                                );
                            json = obj.ToString();
                        }
                    }
                    catch
                    {
                    }
                }
            }
            else if (username.Length == 4)
            {
                if (login(1, username, password))
                {
                    try
                    {
                        string cmdText = string.Format("select ID,nvcTeacherCode,nvcLoginCode,nvcName,nvcCollege,nvcRoleType,nvcTeaPhoto from {0} where nvcLoginCode='{1}';", BTTable, username);
                        DBServer server = new SqlServer();
                        DataRow row = server.ExecuteRow(cmdText);

                        if (row != null)
                        {
                            string ID = string.Empty;
                            string nvcTeacherCode = string.Empty;
                            string nvcLoginCode = string.Empty;
                            string nvcName = string.Empty;
                            string nvcCollege = string.Empty;
                            string nvcRoleType = string.Empty;
                            string nvcTeaPhoto = string.Empty;

                            ID = row["ID"].ToString();
                            nvcTeacherCode = row["nvcTeacherCode"].ToString();
                            nvcLoginCode = row["nvcLoginCode"].ToString();
                            nvcName = row["nvcName"].ToString();
                            nvcCollege = row["nvcCollege"].ToString();
                            nvcRoleType = row["nvcRoleType"].ToString();
                            nvcTeaPhoto = row["nvcTeaPhoto"].ToString();

                            JObject obj = new JObject(
                                new JProperty("ID", ID),
                                new JProperty("nvcTeacherCode", nvcTeacherCode),
                                new JProperty("nvcLoginCode", nvcLoginCode),
                                new JProperty("nvcName", nvcName),
                                new JProperty("nvcCollege", nvcCollege),
                                new JProperty("nvcRoleTypev", nvcRoleType),
                                new JProperty("nvcTeaPhoto", nvcTeaPhoto)
                                );
                            json = obj.ToString();
                        }
                    }
                    catch
                    {
                    }
                }
            }
            context.Response.Write(json);
        }

        /// <summary>
        /// 模拟登陆正方系统  2015年10月18日21:51:36
        /// </summary>
        /// <param name="flag">学生或教师标志</param>
        /// <param name="_xh">学号/工号</param>
        /// <param name="_pwd">密码</param>
        /// <returns></returns>
        public bool login(int flag, string _xh, string _pwd)
        {
            string viewstate = "dDwtMTM2MTgxNTk4OTs7PnL1r%2B7LZbCnX4r1psASp5IYgc%2Fn";
            string login_url = SERVER_URL + "/default3.aspx";
            string ddl_js = null;
            if (flag == 0)
            {
                ddl_js = "%D1%A7%C9%FA";
            }
            else
            {
                ddl_js = "%BD%CC%CA%A6";
            }

            string post_data = "__VIEWSTATE=" + viewstate + "&TextBox1=" + _xh + "&TextBox2=" + _pwd + "&ddl_js=" + ddl_js + "&Button1=+%B5%C7+%C2%BC+";

            HttpWebRequest httpWReq = (HttpWebRequest)WebRequest.Create(login_url);
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(post_data);
            httpWReq.Method = "POST";
            httpWReq.ContentType = "application/x-www-form-urlencoded";
            httpWReq.ContentLength = data.Length;
            using (Stream stream = httpWReq.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }
            HttpWebResponse response = (HttpWebResponse)httpWReq.GetResponse();
            _cookie = response.Headers["Set-Cookie"];
            _cookie = _cookie.Substring(0, _cookie.IndexOf("; path"));
            Encoding enc = Encoding.GetEncoding("GB2312");
            StreamReader sr = new StreamReader(response.GetResponseStream(), enc);
            string content = sr.ReadToEnd();
            if (content.Contains("用户名不存在"))
                return false;
            else if (content.Contains("密码错误"))
                return false;
            else
                return true;
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