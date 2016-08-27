using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using AhutAssist.Model.Attendance;
namespace AhutAssist.handler.Attendance
{
    /// <summary>
    /// DetailHandler 的摘要说明
    /// </summary>
    /// 
        [DirectAction("Detail")]
    public class DetailHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Attendance.Detail.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Attendance";
            }
        }

        [DirectMethod]
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                Detail mybase = new Detail(dbserver);
                DBSearchInfo sinfo = new DBSearchInfo(searchInfo);
                string term = getTerm();
                if (sinfo.Count <= 0)
                {
                    string filterf = string.Format("nvcStuNo='{0}' and nvcElectiveNum like '%{1}%'", logincode, term);
                    return mybase.Load(dbsort, filterf);
                }
                else
                {
                    string filterf = sinfo.GetSiftQueryString();
                    return mybase.Load(dbsort, filterf);
                }
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }
            private string getTerm()
            {
                int year = Convert.ToInt32(DateTime.Now.Year.ToString());
                int month = Convert.ToInt32(DateTime.Now.Month.ToString());
               string term = string.Empty;
                if (month < 8&&month>2)
                {
                    term = (year - 1) + "-" + year + "-" + 2;
                }
                else
                {
                    term = year + "-" + (year + 1) + "-" + 1;
                }
                return term;
            }

    }
}