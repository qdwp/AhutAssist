using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using System.Web.SessionState;
using LingHaiFramework.DataBase;
using AhutAssist.Model.Architecture;
using System.Data;


namespace AhutAssist.handler
{
    /// <summary>
    /// BaseHandler 的摘要说明
    /// -1:代码执行异常
    /// -2:二次验证失败，需要重新登陆
    /// -3:权限不足
    /// -4:数据库数据加载失败
    /// -5:拒绝执行
    /// 0:未知错误
    /// 1:成功
    /// </summary>
    public abstract class BaseHandler : DirectHandler, IRequiresSessionState
    {
        /// <summary>
        /// 返回操作的错误信息
        /// </summary>
        /// <param name="msg">消息</param>
        /// <param name="state">状态，用户可自定义，前台读取做不同的操作,-1表示系统异常</param>
        /// <returns></returns>
        protected virtual JObject ShowExecuteError(string msg, int state = -1)
        {
            JObject obj = new JObject(
                new JProperty("data", "[]"),
                new JProperty("success", false),
                new JProperty("message", msg),
                new JProperty("state", state.ToString())
                );
            return obj;
        }
        /// <summary>
        /// 登陆验证错误返回相应的相应JSON
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        protected virtual JObject ShowLoginCheckError(string msg = "登陆失败，请重新登陆。", int state = -2)
        {
            JObject obj = new JObject(
                new JProperty("data", "[]"),
                new JProperty("success", false),
                new JProperty("message", msg),
                new JProperty("state", state.ToString())
                );
            return obj;
        }
        /// <summary>
        /// 权限验证错误返回相应的相应JSON
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        protected virtual JObject ShowAuthorityCheckError(string msg = "权限不足。", int state = -3)
        {
            JObject obj = new JObject(
                new JProperty("data", "[]"),
                new JProperty("success", false),
                new JProperty("message", msg),
                new JProperty("state", state.ToString())
                );
            return obj;
        }

        protected virtual JObject ShowDataLoadError(string msg = "数据库加载错误。", int state = -4)
        {
            JObject obj = new JObject(
                new JProperty("data", "[]"),
                new JProperty("message", msg),
                new JProperty("success", false),
                new JProperty("state", state.ToString())
                );
            return obj;
        }
        /// <summary>
        /// 返回操作的正确消息
        /// </summary>
        /// <param name="msg">消息</param>
        /// <param name="state">状态，用户可自定义，前台读取做不同的操作</param>
        /// <returns></returns>
        protected virtual JObject ShowSuccess(string msg = "操作成功。", int state = 1)
        {
            JObject obj = new JObject(
                new JProperty("data", "[]"),
                new JProperty("success", true),
                new JProperty("message", msg),
                new JProperty("state", state.ToString())
                );
            return obj;
        }
        /// <summary>
        /// Handler操作验证登陆状态
        /// </summary>
        /// <returns>1：验证成功，-1：验证失败</returns>
        protected virtual bool LoginCheck()
        {
            if (Global.debug)
            {
                return true;
            }
            //验证登录
            try
            {
                string logincode = String.Empty;
                string password = String.Empty;
                string cmdText = String.Empty;
                DBServer dbserver = null;
                UserLogin ul = null;

                logincode = HttpContext.Current.Session["UserCode"].ToString().Trim();
                password = HttpContext.Current.Session["UserPsw"].ToString().Trim();

                dbserver = new SqlServer();
                ul = new UserLogin(dbserver);

                cmdText = String.Format("select Count(*) from {0} where nvcLoginCode=@nvcLoginCode and nvcPassword=@nvcPassword", ul.GetView());
                object o = dbserver.ExecuteScalar(cmdText,
                    dbserver.CreateInputParam("@nvcLoginCode", logincode),
                    dbserver.CreateInputParam("@nvcPassword", LingHaiFramework.Security.Encrypt.SHA256(password)));
                if (Convert.ToInt32(o) <= 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Handler操作验证权限
        /// </summary>
        /// <param name="catalogcode">目录编码</param>
        /// <param name="isopt">是否是操作按钮发起的请求</param>
        /// <returns>1：验证成功，-1：权限不足</returns>
        protected virtual bool AuthorityCheck(string catalogcode, bool isopt = true)
        {
            if (Global.debug)
            {
                return true;
            }
            //验证登录
            try
            {
                string rolecode = String.Empty;
                string cmdText = String.Empty;
                DBServer dbserver = null;
                UserRole ur = null;

                rolecode = HttpContext.Current.Session["RoleCode"].ToString().Trim();

                dbserver = new SqlServer();

                ur = new UserRole(dbserver);
                if (isopt)
                {
                    cmdText = String.Format("select nvcFunAuth as result from {0} where nvcRoleCode=@nvcRoleCode", ur.GetView());
                }
                else
                {
                    cmdText = String.Format("select nvcPageAuth as result from {0} where nvcRoleCode=@nvcRoleCode", ur.GetView());
                }
                DataRow row = dbserver.ExecuteRow(cmdText,
                    dbserver.CreateInputParam("@nvcRoleCode", rolecode));
                string result = row["result"].ToString().Trim();
                string[] tran = result.Split(';');
                foreach (string item in tran)
                {
                    if (item.Trim() == catalogcode)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}