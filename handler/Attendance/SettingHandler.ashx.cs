using AhutAssist.Model.Attendance;
using Ext.Direct;
using LingHaiFramework.Auto;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.Attendance
{
      [DirectAction("Setting")]
    public class SettingHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "Attendance.Setting.Handler";
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
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                Setting mybase = new Setting(dbserver);
                DBSearchInfo sinfo = new DBSearchInfo(searchInfo);

                if (sinfo.Count <= 0)
                {
                    return mybase.Load(dbsort);
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

        [DirectMethod]
        [ParseAsJson]
        public JObject Add(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                Setting model = new Setting(dbserver);

                data.Remove("ID");
                data.Add(new JProperty("ID", GUID.NewGuid()));
                if (model.Create(data))
                {
                    return ShowSuccess("保存成功.");
                }
                else
                {
                    return ShowExecuteError("保存失败.");
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }



        [DirectMethod]
        [ParseAsJson]
        public JObject Edit(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                Setting model = new Setting(dbserver);

                if (model.Update(data))
                {
                    return ShowSuccess("保存成功.");
                }
                else
                {
                    return ShowExecuteError("保存失败.");
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

        [DirectMethod]
        [ParseAsJson]
        public JObject Delete(JObject data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                Setting rolemodel = new Setting(dbserver);
                string ID = data["data"].ToString().Replace("\"", "");

                string filter = String.Format("ID='{0}'", ID);
                int res = rolemodel.Delete("ID", ID);

                if (res > 0)
                {
                    return ShowSuccess("成功删除" + res + "条记录.");
                }
                else
                {
                    return ShowExecuteError("删除失败.");
                }
            }

            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }
    }
}