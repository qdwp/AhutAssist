using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using LitJson;
using System.Collections;
using System.Globalization;
using System.IO;
using System.Web.UI;
using LingHaiFramework.Auto;

namespace AhutAssist.ajax
{
    /// <summary>
    /// 上传文件
    /// 
    ///
    /// Post调用
    /// 
    /// 不支持
    /// 
    /// 
    /// Get调用
    /// 
    /// 参数：
    /// user：用户名
    /// dir：文件类型，包括image、file、video、audio
    /// 
    /// 返回值：
    /// JSON数据：成功与否（success），错误信息（error），文件保存的服务器虚拟路径（file）
    /// 
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        private HttpContext context;
        public void ProcessRequest(HttpContext context)
        {
            this.context = context;
            //允许上传的文件列表
            Hashtable extTable = new Hashtable();
            extTable.Add("image", "gif,jpg,jpeg,png,bmp,ico");
            extTable.Add("document", "doc,htm,html,xml,css,js");
            extTable.Add("video", "mp4");
            extTable.Add("audio", "mp3");
            //文件大小限制（单位：KB）
            int maxSize = 10240;
            #region 获取参数
            int index = 0;
            String guid = string.Empty;
            String dirName = string.Empty;
            try
            {
                guid = Microsoft.JScript.GlobalObject.unescape(context.Request.QueryString["guid"].Trim());
                dirName = Microsoft.JScript.GlobalObject.unescape(context.Request.QueryString["dir"].Trim());
            }
            catch
            {
                ShowError("参数不正确。");
            }
            try
            {
                index = Convert.ToInt32(Microsoft.JScript.GlobalObject.unescape(context.Request.QueryString["index"].Trim()));
            }
            catch
            {
                index = 0;
            }

            if (guid == "" || dirName == "")
            {
                ShowError("参数（guid、dir）不能为空。");
            }
            #endregion
            #region 路径的确定以及创建
            String savePath = "~/upload/" + dirName + "/";
            String saveUrl = "/upload/" + dirName + "/";
            savePath = context.Server.MapPath(savePath);
            if (!Directory.Exists(savePath))
            {
                Directory.CreateDirectory(savePath);
            }
            HttpFileCollection files = context.Request.Files;
            if (files.Count <= index)
            {
                ShowError("请选择文件.");
            }
            HttpPostedFile upload_file = files[index];
            String fileName = upload_file.FileName;
            String fileExt = Path.GetExtension(fileName).ToLower();
            if (fileExt.Length <= 1)
            {
                ShowError("文件扩展名不正确。");
            }
            string ext = fileExt.Substring(1, fileExt.Length - 1);
            savePath += ext + "/";
            saveUrl += ext + "/";
            if (!Directory.Exists(savePath))
            {
                Directory.CreateDirectory(savePath);
            }
            //savePath += guid + "/";
            //saveUrl += guid + "/";
            //if (!Directory.Exists(savePath))
            //{
            //    Directory.CreateDirectory(savePath);
            //}
            DateTime now = DateTime.Now;
            String year_month = now.ToString("yyyy", DateTimeFormatInfo.InvariantInfo) + now.ToString("MM", DateTimeFormatInfo.InvariantInfo);
            savePath += year_month + "/";
            saveUrl += year_month + "/";
            if (!Directory.Exists(savePath))
            {
                Directory.CreateDirectory(savePath);
            }
            #endregion
            #region 约束检查
            if (!extTable.ContainsKey(dirName))
            {
                ShowError("目录名不在允许的范围内.");
                return;
            }
            if (upload_file.InputStream == null || upload_file.InputStream.Length / 1024 > maxSize)
            {
                ShowError("上传文件大小超过限制,文件大小限制:" + maxSize + "KB");
            }
            if (String.IsNullOrEmpty(fileExt) || Array.IndexOf(((String)extTable[dirName]).Split(','), fileExt.Substring(1).ToLower()) == -1)
            {
                ShowError("上传文件扩展名不在允许的范围内.\n允许范围:" + ((String)extTable[dirName]) + ".");
            }
            #endregion
            string newFileName = SerialNo.NewSerialNo() + fileExt;

            String filePath = savePath + newFileName;
            upload_file.SaveAs(filePath);
            String fileUrl = saveUrl + newFileName;

            Hashtable hash = new Hashtable();
            hash["success"] = true;
            hash["error"] = String.Empty;
            hash["file"] = fileUrl;
            context.Response.AddHeader("Content-Type", "text/html;charset=UTF-8");
            context.Response.Write(JsonMapper.ToJson(hash));
            context.Response.End();
        }

        private void ShowError(string message)
        {
            Hashtable hash = new Hashtable();
            hash["success"] = false;
            hash["error"] = message;
            hash["file"] = String.Empty;
            context.Response.AddHeader("Content-Type", "text/html;charset=UTF-8");
            context.Response.Write(JsonMapper.ToJson(hash));
            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}