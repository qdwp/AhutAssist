using LingHaiFramework.Auto;
using LingHaiFramework.Security;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Web;
using AhutAssist.webservice;
using System.Web.SessionState;

namespace AhutAssist.ajax
{
    /// <summary>
    /// GetVerificationCode1 的摘要说明
    /// </summary>
    public class GetVerificationCode1 : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string sid = GUID.NewGuid();
            try
            {
                Random random = new Random(DateTime.Now.Second);
                int start = random.Next(sid.Length - 8);
                string secCode = sid.Substring(start, 4).ToLower();
                Bitmap bmp = new Bitmap(200, 50);

                context.Session["SecurityCode"] = Encrypt.SHA256(secCode.ToLower().Trim());//进行加密保存，不区分大小写
                char[] codeChar = secCode.ToCharArray();


                Graphics grap = Graphics.FromImage(bmp);
                //字体
                InstalledFontCollection fontColl = new InstalledFontCollection();
                Font font = new Font("Euphemia", 30);

                SolidBrush sbrush = new SolidBrush(Color.Red);
                int i = 1;
                foreach (char code in codeChar)
                {
                    grap.DrawString(code.ToString(), font, sbrush, new PointF(i, 1));
                    i += 50;
                }

                grap.DrawLine(new Pen(Color.Blue, 1), new Point(0, 15), new Point(200, 15));
                grap.DrawLine(new Pen(Color.Blue, 1), new Point(0, 35), new Point(200, 35));

                //System.Drawing.Image photo = new Bitmap(bmp);

                string mainUrlStr = "http://211.70.149.135:88/default2.aspx";
                string strCookie = AhutAssist.webservice.clsHtmlOperation.getMethod(mainUrlStr);

                string checkCodeUrl = "http://211.70.149.135:88/CheckCode.aspx";
                System.Drawing.Image photo = AhutAssist.webservice.clsHtmlOperation.getCheckCode(checkCodeUrl, strCookie);

                HttpContext.Current.Session["sessionStrCookie"] = strCookie;

                MemoryStream ms = new System.IO.MemoryStream();

                photo.Save(ms, ImageFormat.Png);

                byte[] imagedata = ms.GetBuffer();


                //FileStream fileStream = new FileStream(HttpContext.Current.Server.MapPath("~" + pngPath), FileMode.Create);
                //fileStream.Write(imagedata, 0, imagedata.Length);

                //fileStream.Close();
                //ms.Close();
                context.Response.ContentType = "image/x-png";
                context.Response.BinaryWrite(imagedata);
                return;
            }
            catch
            {
                context.Response.Write("");
                return;
            }
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