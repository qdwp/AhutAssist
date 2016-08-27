using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using LingHaiFramework.DataBase;
using AhutAssist.Model.BaseInfo;
using LingHaiFramework.Auto;

namespace AhutAssist.handler.BaseInfo
{

    [DirectAction("Teacher")]
    public class TeacherHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "BaseInfo.Teacher.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "BaseInfo";
            }
        }
        [DirectMethod]
        public JObject PageLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBSortPage dbsort = new DBSortPage(start, limit, field, direction);
                DBServer dbserver = new SqlServer();
                Teacher mybase = new Teacher(dbserver);
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
                Teacher model = new Teacher(dbserver);

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
                Teacher model = new Teacher(dbserver);

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
                Teacher rolemodel = new Teacher(dbserver);
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