using AhutAssist.Model.BaseInfo;
using Ext.Direct;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.Public
{
    /// <summary>
    /// SIndexHandler 的摘要说明
    /// </summary>
    /// 
           [DirectAction("Index")]
    public class SIndexHandler  : BaseHandler
    {
        public override string ProviderName
        {
            get
            {
                return "Public.Index.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Public";
            }
        }


        [DirectMethod]
        [ParseAsJson]
        public JObject ChangePsw(JObject o)
        {
            //if (!LoginCheck())
            //{
            //    return ShowLoginCheckError();
            //}

            try
            {
                string oldPsw = o["oldpsw"].ToString().Replace("\"", "").Trim();
                string newPsw = o["newpsw"].ToString().Replace("\"", "").Trim();
                string userName = o["logincode"].ToString().Replace("\"", "").Trim();


                DBServer dbserver = new SqlServer();
                if (userName.Length == 9)
                {
                    Student model = new Student(dbserver);
                    // oldPsw = Encrypt.SHA256(oldPsw);
                    if (!model.Exists("nvcStuNo", userName, new KeyValuePair<string, object>("nvcPwd", oldPsw)))
                    {
                        return ShowExecuteError("密码错误.");
                    }

                    if (ChangePsw(userName, newPsw))
                    {
                        return ShowSuccess("修改密码成功.");
                    }
                }
                else
                {
                    Teacher model = new Teacher(dbserver);
                    // oldPsw = Encrypt.SHA256(oldPsw);
                    if (!model.Exists("nvcLoginCode", userName, new KeyValuePair<string, object>("nvcPwd", oldPsw)))
                    {
                        return ShowExecuteError("密码错误.");
                    }

                    if (ChangePsw(userName, newPsw))
                    {
                        return ShowSuccess("修改密码成功.");
                    }
                }
            }
            catch (Exception ex)
            {
                return ShowExecuteError(ex.Message);
            }
            return ShowExecuteError("系统原因导致错误.");
        }

        private bool ChangePsw(string userName, string newPsw)
        {
            JToken jtoken = null;

            DBServer dbserver = new SqlServer();
            Student userloginmodel = new Student(dbserver);
            Teacher loginmodel = new Teacher(dbserver);
            string filter = null;
            JObject userlogindata = null;

            if (userName.Length == 9)
            {
                 filter = String.Format("nvcStuNo='{0}'", userName);
                  userlogindata = userloginmodel.Load(filter);
            }
            else
            {
                 filter = String.Format("nvcLoginCode='{0}'", userName);
                  userlogindata = loginmodel.Load(filter);
            }
           

            string ID = String.Empty;
            if (userlogindata.TryGetValue("data", out jtoken))
            {
                List<JObject> j_coll = new List<JObject>();
                j_coll.AddRange(jtoken.Values<JObject>());
                j_coll[0].TryGetValue("ID", out jtoken);
                ID = jtoken.ToString().Replace("\"", "").Trim();
              //  newPsw = Encrypt.SHA256(newPsw);
                JObject data = new JObject(
                    new JProperty("ID", ID),
                    new JProperty("nvcPwd", newPsw)
                    );
                if (userName.Length == 9)
                {
                    return userloginmodel.Update(data);
                }
                else
                    return loginmodel.Update(data);
            }
            else
            {
                return false;
            }

        }
  
    }
    }
