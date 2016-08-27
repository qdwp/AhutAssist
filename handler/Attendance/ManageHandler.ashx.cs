using AhutAssist.Model.Attendance;
using Ext.Direct;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.Attendance
{
    [DirectAction("Manage")]
    public class ManageHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "Attendance.Manage.Handler";
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
                ApplyApproval mybase = new ApplyApproval(dbserver);
                string filterf = string.Format("nvcLoginCode='{0}' and nvcCheckResult  is null or nvcCheckResult='待议' ", searchInfo);
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
                string[] result=data.Split(';');
                string cmdText = string.Format("Update T_Attendance_ApplyApproval set dtmCheckTime='{0}',nvcCheckResult='{1}' where ID='{2}'",result[1],result[2],result[0]);
                if (result[2] == "通过")
                {
                    string search = string.Format("Update   T_BaseInfo_CourseStu  set nvcFreeFlag=1 where T_BaseInfo_CourseStu.nvcElectiveNum=(select  nvcElectiveNum from T_Attendance_ApplyApproval where ID='{0}')and nvcStuNo='{1}'",result[0],result[3]);
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