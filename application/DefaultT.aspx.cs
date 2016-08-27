using AhutAssist.Model.BaseInfo;
using LingHaiFramework.DataBase;
using Microsoft.JScript;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AhutAssist.application
{
    public partial class DefaultT : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Global.debug)
            {
                return;
            }
            //学年学期
            int year = System.Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = System.Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
            if (month < 9 && month >= 3)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }

            //检查是否已经登录
            string logincode = String.Empty;
             string loginname = String.Empty;      
             string rolecode = String.Empty;
            string password = String.Empty;
             string rolename= String.Empty;
            DBServer dbserver = null;
            Teacher ul = null;

            try
            {
                dbserver = new SqlServer();
                ul = new Teacher(dbserver);
                logincode = HttpContext.Current.Session["UserCode"].ToString().Trim();
                password = HttpContext.Current.Session["UserPsw"].ToString().Trim();

                //string cmdText = String.Format("select Count(*) from {0} where nvcLoginCode=@nvcLoginCode and nvcPwd=@nvcPwd", ul.GetView());
                //object obj = dbserver.ExecuteScalar(cmdText,
                //    dbserver.CreateInputParam("@nvcLoginCode", logincode),
                //    dbserver.CreateInputParam("@nvcPwd", password));

                //if (obj == null || System.Convert.ToInt32(obj) <= 0)
                //{
                //    Response.Redirect("~/application/Login.aspx");
                //}
                //else
                //{
                  string   cmdText = String.Format("select ID,nvcName as loginname,nvcRoleType as rolename from {0} where nvcLoginCode=@nvcLoginCode", ul.GetView());
                    DataRow row = dbserver.ExecuteRow(cmdText, dbserver.CreateInputParam("@nvcLoginCode", logincode));
                    if (row != null)
                    {
                        string userguid = row["ID"].ToString();
                         loginname = row["loginname"].ToString();
                         rolename = row["rolename"].ToString();

                        HttpContext.Current.Request.Cookies.Remove("id");
                        HttpContext.Current.Request.Cookies.Remove("uc");
                        HttpContext.Current.Request.Cookies.Remove("ln");
                        HttpContext.Current.Request.Cookies.Remove("rc");
                        HttpContext.Current.Request.Cookies.Remove("rn");
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("id", GlobalObject.escape(userguid)));
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("uc", GlobalObject.escape(logincode)));
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("ln", GlobalObject.escape(loginname)));
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("rc", GlobalObject.escape(rolecode)));
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("rn", GlobalObject.escape(rolename)));
                        HttpContext.Current.Response.Cookies.Add(new HttpCookie("term", GlobalObject.escape(term)));
                    }
                }
            //}
            catch
            {
                Response.Redirect("~/application/Login.aspx");
            }
        }
    }
}