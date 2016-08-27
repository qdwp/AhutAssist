using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AhutAssist.ajax
{
    public partial class GetVerificationCode : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string sid = Session.SessionID;
            string timeseed = DateTime.Now.Ticks.ToString();
            string pngPath = "~/temp/" + sid + timeseed + ".png";
            string pngPathReturn = "/temp/" + sid + timeseed + ".png";
            try
            {
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/temp/")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/temp/"));
                }
                try
                {
                    DirectoryInfo di = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/temp/"));
                    FileInfo[] files = di.GetFiles();
                    foreach (FileInfo fi in files)
                    {
                        if (fi.LastAccessTime.AddHours(1) < DateTime.Now)
                        {
                            fi.Delete();
                        }
                    }
                }
                catch
                {
                }
                char[] codeList = new char[26] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
                Random random = new Random(DateTime.Now.Second);
                string secCode = "";
                for (int i = 0; i < 4; i++)
                {
                    int r = random.Next(26);
                    secCode += codeList[r].ToString() + " ";
                }
                Bitmap bmp = new Bitmap(100, 25);

                Session["SecurityCode"] = secCode.Replace(" ", "").ToLower();

                Graphics grap = Graphics.FromImage(bmp);
                //字体
                InstalledFontCollection fontColl = new InstalledFontCollection();
                FontFamily[] fontFamily = fontColl.Families;
                int index = random.Next(fontFamily.Length);
                Font font = new Font("Euphemia", 15);

                SolidBrush sbrush = new SolidBrush(Color.Red);

                grap.DrawString(secCode, font, sbrush, new PointF(1, 1));

                System.Drawing.Image photo = new Bitmap(bmp);
                MemoryStream ms = new System.IO.MemoryStream();//内存流
                photo.Save(ms, ImageFormat.Png);
                byte[] imagedata = ms.GetBuffer();//buffer缓冲区

                FileStream fileStream = new FileStream(HttpContext.Current.Server.MapPath(pngPath), FileMode.Create);
                fileStream.Write(imagedata, 0, imagedata.Length);

                fileStream.Close();
                ms.Close();
            }
            catch
            {
                Response.Write("");
                return;
            }
            Response.Write(pngPathReturn);
            return;
        }
    }
}