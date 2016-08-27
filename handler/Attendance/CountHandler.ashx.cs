using AhutAssist.Model.Attendance;
using Ext.Direct;
using LingHaiFramework.DataBase;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AhutAssist.handler.Attendance
{
          [DirectAction("Count")]
    public class CountHandler : BaseHandler
    {

        public override string ProviderName
        {
            get
            {
                return "Attendance.Count.Handler";
            }
        }
        public override string Namespace
        {
            get
            {
                return "Attendance";
            }
        }
        private string getTerm()
        {
            int year = Convert.ToInt32(DateTime.Now.Year.ToString());
            int month = Convert.ToInt32(DateTime.Now.Month.ToString());
            string term = string.Empty;
            if (month < 8&&month>2)
            {
                term = (year - 1) + "-" + year + "-" + 2;
            }
            else
            {
                term = year + "-" + (year + 1) + "-" + 1;
            }
            return term;
        }

        [DirectMethod]
        public JObject StuLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf=string.Empty;
                string[] data = null;
                string  year =DateTime.Now.Year.ToString();
                if (searchInfo != null)
                {
                  data= searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and nvcElectiveNum like '%{0}%' order by Temp.IntCount desc ", term);         
                }
                else {
                    if(data[0]=="学号")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and nvcElectiveNum like '%{0}%'  and VAD.nvcStuNo like'%{1}%'", term, data[1]);
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and nvcElectiveNum like '%{0}%'  and nvcGrade like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and nvcElectiveNum like '%{0}%'  and nvcClass like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "月")
                    {
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                             monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                             mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{0}' and '{1}'  group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and dtmRollTime between '{0}' and '{1}'  order by Temp.IntCount desc", monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{0}' and '{1}' group by nvcStuNo) AS Temp(nvcStuNo,IntCount),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and dtmRollTime between '{0}' and '{1}'  order by Temp.IntCount desc", StartTime, EndTime);
                    }
                 
                      
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Stu(table); 
                return jobj;        
          
            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject CollegeStuLoad(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                string year = DateTime.Now.Year.ToString();
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and nvcElectiveNum like '%{1}%' order by Temp.IntCount desc ", logincode,term);
                }
                else
                {
                    if (data[0] == "学号")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and nvcElectiveNum like '%{1}%'   and VAD.nvcStuNo like'%{2}%'",logincode, term, data[1]);
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and nvcElectiveNum like '%{1}%'  and nvcMajor like'%{2}%' order by Temp.IntCount desc", logincode,term, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and nvcElectiveNum like '%{1}%'   and nvcGrade like'%{2}%' order by Temp.IntCount desc", logincode, term, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and nvcElectiveNum like '%{1}%'   and nvcClass like'%{2}%' order by Temp.IntCount desc", logincode, term, data[1]);
                    if (data[0] == "月")
                    {
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{1}' and '{2}'  group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", logincode, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{1}' and '{2}'  group by nvcStuNo) AS Temp(nvcStuNo,IntCount), (select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{0}') As ABT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcCollege=ABT.nvcCollege and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", logincode, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Stu(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject AssistStuLoad(long start, long limit, string field, string direction, string searchInfo, string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                string year = DateTime.Now.Year.ToString();
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{1}%' order by Temp.IntCount desc ", logincode,term);
                }
                else
                {
                    if (data[0] == "学号")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{1}%'  and VAD.nvcStuNo like'%{2}%'", logincode, term, data[1]);
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{1}%'  and nvcMajor like'%{2}%' order by Temp.IntCount desc",logincode, term, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{1}%'   and nvcGrade like'%{2}%' order by Temp.IntCount desc",logincode, term, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{1}%'   and VAD.nvcClass like'%{2}%' order by Temp.IntCount desc", logincode, term, data[1]);
                    if (data[0] == "月")
                    {
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{1}' and '{2}' group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", logincode, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct VAD.nvcStuNo,nvcStuName,VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcStuNo,count(nvcStuNo)  from V_Attendance_Detail where  dtmRollTime between '{1}' and '{2}' group by nvcStuNo) AS Temp(nvcStuNo,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{0}') As VAC(nvcClass),V_Attendance_Detail AS VAD  where Temp.nvcStuNo=VAD.nvcStuNo and VAD.nvcClass=VAC.nvcClass and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", logincode, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Stu(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }


        [DirectMethod]
        public JObject ClassLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                string year = DateTime.Now.Year.ToString();
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and nvcElectiveNum like '%{0}%'  order by Temp.IntCount desc", term);
                }
                else
                {
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and nvcElectiveNum like '%{0}%' and nvcGrade like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and nvcElectiveNum like '%{0}%'  and VAD.nvcClass like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "月")
                    {
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{1}' and '{2}' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", term, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{1}' and '{2}' group by nvcClass) AS Temp(nvcClass,IntCount),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and dtmRollTime between '{1}' and '{2}'  order by Temp.IntCount desc", term, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Class(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject CollegeClassLoad(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%'  order by Temp.IntCount desc", term,logincode);
                }
                else
                {
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{2}%' order by Temp.IntCount desc", term, logincode,data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%' and nvcGrade like'%{2}%' order by Temp.IntCount desc", term,logincode, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%'  and VAD.nvcClass like'%{2}%' order by Temp.IntCount desc", term, logincode,data[1]);

                    if (data[0] == "月")
                    {
                        string year = DateTime.Now.Year.ToString();
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%'  and dtmRollTime between '{2}' and '{3}'  group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and dtmRollTime between '{2}' and '{3}'  order by Temp.IntCount desc", term, logincode, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%'  and dtmRollTime between '{2}' and '{3}'  group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}') As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcCollege=VBT.nvcCollege and dtmRollTime between '{2}' and '{3}'  order by Temp.IntCount desc", term, logincode, StartTime, EndTime);
                    }

                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Class(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject AssistClassLoad(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{0}%' order by Temp.IntCount desc", term,logincode);
                }
                else
                {
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{2}%' order by Temp.IntCount desc", term,logincode, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{0}%' and nvcGrade like'%{2}%' order by Temp.IntCount desc", term,logincode, data[1]);
                    if (data[0] == "班级")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and nvcElectiveNum like '%{0}%'  and VAD.nvcClass like'%{2}%' order by Temp.IntCount desc", term, logincode,data[1]);
                    if (data[0] == "月")
                    {
                        string year = DateTime.Now.Year.ToString();
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{2}' and '{3}'  group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and dtmRollTime between '{2}' and '{3}'  order by Temp.IntCount desc", term, logincode, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,nvcGrade,VAD.nvcClass,Temp.IntCount from (select nvcClass,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{2}' and '{3}'  group by nvcClass) AS Temp(nvcClass,IntCount),(select nvcClass from V_Attendance_Class where nvcLoginCode='{1}') As VAC(nvcClass),V_Attendance_Detail AS VAD where Temp.nvcClass=VAD.nvcClass and VAD.nvcClass=VAC.nvcClass and dtmRollTime between '{2}' and '{3}'  order by Temp.IntCount desc", term, logincode, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Class(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject MajorLoad(long start, long limit, string field, string direction, string searchInfo)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and nvcElectiveNum like '%{0}%'  order by Temp.IntCount desc ", term);
                }
                else
                {
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and nvcElectiveNum like '%{0}%'  and VAD.nvcGrade like'%{1}%' order by Temp.IntCount desc", term, data[1]);
                    if (data[0] == "月")
                    {
                        string year = DateTime.Now.Year.ToString();
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{1}' and '{2}' group by nvcGrade) AS Temp(nvcGrade,IntCount),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and dtmRollTime between '{1}' and '{2}' order by Temp.IntCount desc", term, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%'  and dtmRollTime between '{1}' and '{2}' group by nvcGrade) AS Temp(nvcGrade,IntCount),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and dtmRollTime between '{1}' and '{2}' order by Temp.IntCount desc", term, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Major(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }

        [DirectMethod]
        public JObject CollegeMajorLoad(long start, long limit, string field, string direction, string searchInfo,string logincode)
        {
            try
            {
                DBServer dbserver = new SqlServer();
                string term = getTerm();
                JObject jobj = null;
                DataTable table = null;
                string filterf = string.Empty;
                string[] data = null;
                if (searchInfo != null)
                {
                    data = searchInfo.Split(';');
                }
                if (searchInfo == null)
                {
                    filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}')  As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%' order by Temp.IntCount desc ", term,logincode);
                }
                else
                {
                    if (data[0] == "专业")
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}')  As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%'  and nvcMajor like'%{2}%' order by Temp.IntCount desc", term, logincode,data[1]);
                    if (data[0] == "年级")
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' group by nvcGrade) AS Temp(nvcGrade,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}')  As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and VAD.nvcCollege=VBT.nvcCollege and nvcElectiveNum like '%{0}%'  and VAD.nvcGrade like'%{2}%' order by Temp.IntCount desc", term,logincode,data[1]);
                    if (data[0] == "月")
                    {
                        string year = DateTime.Now.Year.ToString();
                        string monh = null;
                        string mont = null;
                        if (data[1] != "12")
                        {
                            int nextmonth = Convert.ToInt32(data[1]) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = year + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        else
                        {
                            int nextmonth = 1;
                            int nextyear = Convert.ToInt32(year) + 1;
                            monh = year + '-' + 0 + data[1] + '-' + 1 + " 00:00:00.000";
                            mont = nextyear + '-' + 0 + nextmonth + '-' + 1 + " 00:00:00.000";
                        }
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%' and dtmRollTime between '{2}' and '{3}'  group by nvcGrade) AS Temp(nvcGrade,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}')  As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and VAD.nvcCollege=VBT.nvcCollege and dtmRollTime between '{2}' and '{3}' order by Temp.IntCount desc", term, logincode, monh, mont);
                    }
                    if (data[0] == "周")
                    {
                        string search_S = string.Format("select dtmBeginTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string StartTime = dbserver.ExecuteScalar(search_S).ToString();
                        string search_E = string.Format("select dtmEndTime From V_BaseInfo_Week where term='{0}' and nvcWeek='{1}' ", term, data[1]);
                        string EndTime = dbserver.ExecuteScalar(search_E).ToString();
                        filterf = string.Format("select distinct VAD.nvcCollege,nvcMajor,VAD.nvcGrade,Temp.IntCount from (select nvcGrade,count(nvcStuNo)  from V_Attendance_Detail where   nvcElectiveNum like '%{0}%'  and dtmRollTime between '{2}' and '{3}' group by nvcGrade) AS Temp(nvcGrade,IntCount),(select nvcCollege from V_BaseInfo_Teacher where nvcLoginCode='{1}')  As VBT(nvcCollege),V_Attendance_Detail AS VAD where Temp.nvcGrade=VAD.nvcGrade and VAD.nvcCollege=VBT.nvcCollege and dtmRollTime between '{2}' and '{3}' order by Temp.IntCount desc", term, logincode, StartTime, EndTime);
                    }
                }
                table = dbserver.ExecuteTable(filterf);
                jobj = CreateJsonInstance_Major(table);
                return jobj;

            }
            catch (Exception ex)
            {
                return ShowDataLoadError(ex.Message);
            }
        }





        public JObject CreateJsonInstance_Stu(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {

                        jobj_R.Add(new JProperty("nvcStuNo", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcStuName", row[1].ToString()));
                        jobj_R.Add(new JProperty("nvcCollege", row[2].ToString()));
                        jobj_R.Add(new JProperty("nvcMajor", row[3].ToString()));
                        jobj_R.Add(new JProperty("nvcGrade", row[4].ToString()));
                        jobj_R.Add(new JProperty("nvcClass", row[5].ToString()));
                        jobj_R.Add(new JProperty("IntCount", row[6].ToString()));
                    }
                    JObject objT = jobj_R;
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

        public JObject CreateJsonInstance_Class(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {

                        jobj_R.Add(new JProperty("nvcCollege", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcMajor", row[1].ToString()));
                        jobj_R.Add(new JProperty("nvcGrade", row[2].ToString()));
                        jobj_R.Add(new JProperty("nvcClass", row[3].ToString()));
                        jobj_R.Add(new JProperty("IntCount", row[4].ToString()));
                    }
                    JObject objT = jobj_R;
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

        public JObject CreateJsonInstance_Major(DataTable table)
        {
            JObject jobj = new JObject();
            JArray array = new JArray();
            try
            {
                foreach (DataRow row in table.Rows)
                {
                    JObject jobj_R = new JObject();
                    if (row != null)
                    {

                        jobj_R.Add(new JProperty("nvcCollege", row[0].ToString()));
                        jobj_R.Add(new JProperty("nvcMajor", row[1].ToString()));
                        jobj_R.Add(new JProperty("nvcGrade", row[2].ToString()));
                        jobj_R.Add(new JProperty("IntCount", row[3].ToString()));
                    }
                    JObject objT = jobj_R;
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