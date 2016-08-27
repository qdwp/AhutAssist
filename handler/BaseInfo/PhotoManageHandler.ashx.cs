using AhutAssist.Model.BaseInfo;
using Ext.Direct;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.BaseInfo
{
   [DirectAction("Manage")]
    public class PhotoManageHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "BaseInfo.Manage.Handler";
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
                PhotoManage mybase = new PhotoManage(dbserver);
                 string filterf = string.Format("nvcLoginCode='{0}' and nvcCheckResult !='通过' ",searchInfo);
                  return mybase.Load(dbsort, filterf);
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }



        [DirectMethod]

        public JObject Edit(string data)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string[] result = data.Split(';');
                string cmdText = string.Format("Update T_BaseInfo_PhotoManage set dtmCheckTime='{0}',nvcCheckResult='{1}' where ID='{2}'", result[1], result[2], result[0]);
                if (result[2] == "通过")
                {
                    string search = string.Format("Update   T_BaseInfo_Student  set nvcStuPhoto='{0}' where  T_BaseInfo_Student.nvcStuNo='{1}'", result[4], result[3]);
                    dbserver.ExecuteNonQuery(search);
                }
                dbserver.ExecuteNonQuery(cmdText);
                return ShowSuccess("保存成功.");
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
        }

    }
}