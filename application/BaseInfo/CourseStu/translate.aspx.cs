using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;

namespace AhutAssist.application.BaseInfo.CourseStu
{
    public partial class translate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string data = DateTime.Now.ToLocalTime().ToString(); 
            int year = System.Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = System.Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
            if (month <8&& month>2)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }
            DBServer dbserver = new SqlServer();
            string cmdText = string.Format("select  dtmBeginTime,dtmEndTime  from V_Evaluate_Setting where term='{0}' and '{1}' between dtmBeginTime and dtmEndTime",term,data);
            string re = System.Convert.ToString( dbserver.ExecuteRow(cmdText));
            if (re =="")
            {
                Response.Write("<script type='text/javascript'>alert('现在不是评教时间！');</script>");
                //Response.Write("<script type='text/javascript'>location.href = '/application/Login.aspx';</script>");
                return;
            }
            string result = GetProtocolContent();
            if (result == "")
            {
                Response.Write("<script type='text/javascript'>alert('系统错误,请稍后重试!');</script>");
                Response.Write("<script type='text/javascript'>location.href = '/application/Login.aspx';</script>");
            }
            else
            {
                Response.Clear();
                Response.Write(result);
                ButtonOK.Visible = true;
            }
        }

        protected void ButtonOK_Click(object sender, EventArgs e)
        {
            Response.Write("<script type='text/javascript'>location.href = 'index.html';</script>");
        }
        private string GetProtocolContent()
        {
            string text = "";
            string textContent = "";
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
            DBServer dbserver = new SqlServer();
            string cmdText = string.Format("select txtMatter from V_Evaluate_Setting where term='{0}'", term);
            textContent = System.Convert.ToString(dbserver.ExecuteScalar(cmdText));

            try
            {
                string file = "~/application/Evaluate/Setting/protocol.html";
                FileStream fs = new FileStream(HttpContext.Current.Server.MapPath(file), FileMode.Open, FileAccess.Read);
                StreamReader sr = new StreamReader(fs, Encoding.UTF8);
                text = sr.ReadToEnd();
                string fileContent = textContent;
                FileStream fss = new FileStream(HttpContext.Current.Server.MapPath(fileContent), FileMode.Open, FileAccess.Read);
                StreamReader srr = new StreamReader(fss, Encoding.UTF8);
                textContent = srr.ReadToEnd();
                sr.Close();
                fs.Close();
                srr.Close();
                fss.Close();
            }
            catch
            {

            }
            string result = text.Replace("<!--{Augus:ProtocolContent}-->", textContent);
            return result;

        }
    }
}