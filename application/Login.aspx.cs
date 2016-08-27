using AhutAssist.Model.BaseInfo;
using AhutAssist.webservice;
using HtmlAgilityPack;
using LingHaiFramework.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LingHaiFramework;
using Microsoft.JScript;

namespace AhutAssist.application
{
    public partial class Login : System.Web.UI.Page
    {
        const string mainUrlStr = "http://211.70.149.135:88/default2.aspx";
        string strCookie = String.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void buttonLogin_Click(object sender, EventArgs e)
        {
            #region 定义变量
            int check = 1;
            #endregion

            #region  获取用户输入信息

            string usercode = textBoxUserCode.Text;
            string password = textBoxPassword.Text;
            string checkCode = textBoxVerificationCode.Text.ToLower();

            #endregion

            #region 匹配自己当地的数据库，check是否为管理员
            if (usercode.Length != 9)
            {
                DBServer dbserver = null;
                dbserver = new SqlServer();
                string cmdText = String.Format("select  nvcRoleType  from T_BaseInfo_Teacher where nvcLoginCode='{0}'", usercode);
                string type=dbserver.ExecuteScalar(cmdText).ToString();
                if (type == "管理员")
                {
                    HttpContext.Current.Session["UserCode"] = usercode;
                    HttpContext.Current.Session["UserPsw"] = password;
                    Response.Redirect("~/application/DefaultT.aspx");
                }
            }
            #endregion


     


            #region 空数据检测

            if (usercode.Trim() == String.Empty || password.Trim() == String.Empty || checkCode.Trim() == String.Empty)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('用户名、密码、验证码不能为空')</script>");
                return;
            }

            #endregion


            #region 模拟登陆正方系统

            strCookie = HttpContext.Current.Session["sessionStrCookie"].ToString();//来自GetVerificationCode.ashx.cs
            string viewstate = "dDwtMTg3MTM5OTI5MTs7PuAtcZrrnHfffJ7bfhfU%2FVhvGwP8";
            string radiobutton = "%BD%CC%CA%A6";
            if (usercode.Length > 4)
            {
                radiobutton = "%D1%A7%C9%FA";
            }
            string post_data = "__VIEWSTATE=" + viewstate + "&TextBox1=" + usercode + "&TextBox2=" + password + "&TextBox3=" + checkCode + "&RadioButtonList1=" + radiobutton + "&Button1=&lbLanguage=";
            string content = clsHtmlOperation.postMethodGBK(mainUrlStr, post_data, strCookie);
            string content1 = clsHtmlOperation.getMethodGBKNew("http://211.70.149.135:88/js_main.aspx?xh=" + usercode, strCookie);
            //content1 = clsHtmlOperation.getMethodGBKNew("http://211.70.149.135:88/content.aspx", strCookie);

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument();
            document.LoadHtml(content);
            HtmlNode rootnode = document.DocumentNode;
            string classname = "";
            string loginname = null;
            #endregion

            try
            {
                check = 1;
                classname = rootnode.SelectSingleNode("//*[@id='xhxm']").InnerText;
                string[] codeName = classname.Split(' ');
                usercode = codeName[0].Trim();
                if (usercode.Length == 9)
                {
                    loginname = codeName[2].Trim().Replace("同学", "");
                }
                else
                {
                    loginname = codeName[2].Trim().Replace("老师", "");
                }

            }
            catch
            {
                if (rootnode.InnerText.ToString().Contains("用户名不存在或未按照要求参加教学活动"))
                {
                    check = -1;
                    #region  无效  不在正方系统的辅导员不管 在数据库辅导员表中匹配用户信息,判别用户是否为辅导员或其他角色 通过ingFlag判别
                    #endregion

                }
                else if (rootnode.InnerText.ToString().Contains("密码错误"))
                {
                    check = -2;
                }
                else
                {
                    check = -3;
                }
            }


            //登录结果处理
            switch (check)
            {
                case 1:
                    {
                        //DBServer dbserver = null;
                        //Teacher tul = null;
                        HttpContext.Current.Session["UserCode"] = usercode;
                        HttpContext.Current.Session["UserPsw"] = password;
                        if (usercode.Length == 9)
                        {
                            Response.Redirect("~/application/Default.aspx");
                        }
                        else
                        {
                            Response.Redirect("~/application/DefaultT.aspx");
                        }
                        break;
                    }
                case 0:
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('登录错误。')</script>");
                        break;
                    }
                case -1:
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('用户名不存在或未按照要求参加教学活动。')</script>");
                        break;
                    }
                case -2:
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('密码错误。')</script>");
                        break;
                    }
                case -3:
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('解析错误。')</script>");
                        break;
                    }
                default:
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "login-error", "<script>LoginError('登录错误。')</script>");
                        break;
                    }
            }
        }

    }
}