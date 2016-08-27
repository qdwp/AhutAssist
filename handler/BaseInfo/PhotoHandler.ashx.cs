using AhutAssist.Model.BaseInfo;
using Ext.Direct;
using LingHaiFramework.Auto;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.BaseInfo
{
    [DirectAction("Photo")]
    public class PhotoHandler : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "BaseInfo.Photo.Handler";
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

                JObject jobj = new JObject();
                DBServer dbserver = new SqlServer();
                string search = string.Empty;
                DataTable table = null;
                search = string.Format("select   distinct VBS.nvcStuNo,VBS.nvcStuName,nvcSex,nvcClass,VBS.nvcStuPhoto,nvcCheckResult,nvcNewPhoto from V_BaseInfo_Student VBS,V_BaseInfo_PhotoManage VBP where VBS.nvcStuNo=VBP.nvcStuNo and  VBS.nvcStuNo='{0}'", searchInfo);
                table = dbserver.ExecuteTable(search);
                if (table.Rows.Count == 0)
                {
                    search = string.Format("select   distinct nvcStuNo,nvcStuName,nvcSex,nvcClass,nvcStuPhoto from V_BaseInfo_Student  where  nvcStuNo='{0}'", searchInfo);
                    table = dbserver.ExecuteTable(search);
                    return CreateJsonInstance_Photo_Base(table);
                }
                return CreateJsonInstance_Photo(table);
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
                PhotoManage model = new PhotoManage(dbserver);
                string nvcStuNo = data["nvcStuNo"].ToString().Replace("\"", "").Trim();
                string cmd = string.Format("delete from T_BaseInfo_PhotoManage where nvcStuNo='{0}'", nvcStuNo);
                dbserver.ExecuteNonQuery(cmd);
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

        public JObject CreateJsonInstance_Photo(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_C = new JObject();
                    if (row != null)
                    {
                        string value = String.Empty;
                        jobj_C.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcStuName", row[1].ToString()));
                        jobj_C.Add(new JProperty("nvcSex", row[2].ToString()));
                        jobj_C.Add(new JProperty("nvcClass", row[3].ToString()));
                        jobj_C.Add(new JProperty("nvcStuPhoto", row[4].ToString()));
                        jobj_C.Add(new JProperty("nvcCheckResult", row[5].ToString()));
                        jobj_C.Add(new JProperty("nvcNewPhoto", row[6].ToString()));
                    }
                    JObject objT = jobj_C;
                    if (objT != null)
                    {
                        array.Add(objT);
                    }
                }
                jobj.Add(new JProperty("data", array));
                jobj.Add(new JProperty("success", true));
                jobj.Add(new JProperty("message", String.Empty));
                jobj.Add(new JProperty("total", array.Count));
            }
            catch (Exception ex)
            {
                jobj.Add(new JProperty("data", new JArray()));
                jobj.Add(new JProperty("success", false));
                jobj.Add(new JProperty("message", ex.Message));
                jobj.Add(new JProperty("total", 0));
            }
            return jobj;
        }

        public JObject CreateJsonInstance_Photo_Base(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_C = new JObject();
                    if (row != null)
                    {
                        string value = String.Empty;
                        jobj_C.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_C.Add(new JProperty("nvcStuName", row[1].ToString()));
                        jobj_C.Add(new JProperty("nvcSex", row[2].ToString()));
                        jobj_C.Add(new JProperty("nvcClass", row[3].ToString()));
                        jobj_C.Add(new JProperty("nvcStuPhoto", row[4].ToString()));
                    }
                    JObject objT = jobj_C;
                    if (objT != null)
                    {
                        array.Add(objT);
                    }
                }
                jobj.Add(new JProperty("data", array));
                jobj.Add(new JProperty("success", true));
                jobj.Add(new JProperty("message", String.Empty));
                jobj.Add(new JProperty("total", array.Count));
            }
            catch (Exception ex)
            {
                jobj.Add(new JProperty("data", new JArray()));
                jobj.Add(new JProperty("success", false));
                jobj.Add(new JProperty("message", ex.Message));
                jobj.Add(new JProperty("total", 0));
            }
            return jobj;
        }

    }
}