using LingHaiFramework.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AhutAssist.application.Evaluate.Vote
{
    public partial class translate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string data = DateTime.Now.ToLocalTime().ToString();
            int year = System.Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = System.Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
            if (month < 8 && month > 2)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }
            DBServer dbserver = new SqlServer();
            string cmdText = string.Format("select  dtmBeginTime,dtmEndTime  from V_Evaluate_Setting where term='{0}' and '{1}' between dtmBeginTime and dtmEndTime", term, data);
            string re = System.Convert.ToString(dbserver.ExecuteRow(cmdText));
            if (re == "")
            {
                Response.Write("<script type='text/javascript'>alert('现在不是投票时间！');</script>");
                return;
            }
            else {
                Response.Write("<script type='text/javascript'>location.href = 'index.html';</script>");
            }
        }
    }
}