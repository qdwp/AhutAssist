using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using LingHaiFramework.Auto;
using AhutAssist.Model.Evaluate;

namespace AhutAssist.handler.Evaluate
{
    /// <summary>
    /// LevelHandler 的摘要说明
    /// </summary>
        [DirectAction("Level")]
    public class LevelHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "Evaluate.Level.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Evaluate";
            }
        }

        [DirectMethod]
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                Level mybase = new Level(dbserver);
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
                Level model = new Level(dbserver);

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
                Level model = new Level(dbserver);

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
                Level rolemodel = new Level(dbserver);
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