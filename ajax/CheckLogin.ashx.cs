
using AhutAssist.Model.BaseInfo;
using LingHaiFramework.DataBase;
using LingHaiFramework.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace AhutAssist.ajax
{
     //<summary>
     //检查用户名密码，验证码保存在Session["SecurityCode"]中，使用小写字符，SHA256加密保存
    
     //Post调用
     
     //参数：
     //uc：用户名
     //ps：密码
     //vc：验证码
     //[mac]：MAC地址
     //[loc]：登陆地点
     //[pubip]：公网IP地址
     
     //返回值：
     //1：用户名密码正确
     //0：系统错误
     //-1：用户名不存在
     //-2：用户已失效
     //-3：您已经多次密码错误账号被锁
     //-4：您多次验证码错误账号被锁
     //-5：用户名密码错误
     //-6：验证码错误
     //-7：用户名、密码、验证码不能为空
     
     //Get调用
     //不支持
     //</summary>
    public class CheckLogin :  IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {

            string usercode = String.Empty;
            string password = String.Empty;
            string verifycode = String.Empty;

            string lan_ip = "";
            string mac = "";
            string location = "未知地址";
            string pubip = "未知IP";
            string now = String.Empty;

            DBServer dbserver = null;

            Teacher tul = null;
            Student sul = null;



            #region 可选参数的获取
            try
            {
                mac = context.Request["mac"].Trim();
            }
            catch
            { }

            try
            {
                location = context.Request["loc"].Trim();
            }
            catch
            { }
            try
            {
                pubip = context.Request["pubip"].Trim();
            }
            catch
            { }
            #endregion
            #region 必选参数
            try
            {
                usercode = context.Request["uc"].Trim();
                password = context.Request["ps"].Trim();
                verifycode = context.Request["vc"].ToString().ToLower().Trim();

                lan_ip = context.Request.UserHostAddress.Trim();
                now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                dbserver = new SqlServer();

                tul = new Teacher(dbserver);
                sul = new Student(dbserver);

            }
            catch
            {
                context.Response.Write("0");
                return;
            }
            #endregion

            #region 空数据检测
            if (usercode.Trim() == String.Empty || password.Trim() == String.Empty || verifycode.Trim() == String.Empty)
            {
                context.Response.Write("-7");
                return;
            }

            #endregion

            #region 验证验证码
            try
            {
                if (context.Session["SecurityCode"].ToString().Trim() != Encrypt.SHA256(verifycode))
                {
                    string psw = password;
                    context.Response.Write("-6");
                    return;
                }
            }
            catch
            {
                context.Response.Write("0");
                return;
            }
            #endregion

            #region 用户验证并保存用户信息的Session
           string rolecode =String.Empty;
            int check = 0;

            if (usercode.Length == 9)
            {
                check = sul.CheckLogin(usercode, password);
            }

            else {
                check = tul.CheckLogin(usercode, password);
            }

                switch (check)
                {
                    case 1:
                        {
                            //  保存用户信息的Session
                            context.Session["UserCode"] = usercode;
                            context.Session["RoleCode"] = rolecode;
                            context.Session["UserPsw"] = password;

                            context.Response.Write("1");
                            break;
                        }
                    case 0:
                        {
                            context.Response.Write("0");
                            break;
                        }
                    case -1:
                        {
                            context.Response.Write("-1");
                            break;
                        }
                    case -2:
                        {
                            context.Response.Write("-2");
                            break;
                        }
                    case -3:
                        {
                            context.Response.Write("-3");
                            break;
                        }
                    case -4:
                        {
                            context.Response.Write("-4");
                            break;
                        }
                    case -5:
                        {
                            context.Response.Write("-5");
                            break;
                        }
                    default:
                        {
                            context.Response.Write("0");
                            break;
                        }
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

