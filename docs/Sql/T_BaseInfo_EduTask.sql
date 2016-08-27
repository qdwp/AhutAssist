--表名:T_BaseInfo_EduTask;
--别名:BE
--说明:教学任务表
CREATE TABLE T_BaseInfo_EduTask(
	ID nvarchar(32) not null constraint DF_BE_ID default (replace(newid(),'-','')),
	[nvcYear] [nvarchar](20) NULL,
	[nvcTerm] [nvarchar](2) NULL,
	[nvcElectiveNum] [nvarchar](50) NULL,
	[nvcCourseCode] [nvarchar](20) NULL,
	[nvcCourseName] [nvarchar](50) NULL,
	[nvcCourseNature] [nvarchar](10) NULL,
	[intStuNumber] [int] NULL,
	[nvcCollege] [nvarchar](50) NULL,
	[nvcFaculty] [nvarchar](50) NULL,
	[nvcTeacherCode] [nvarchar](8) NULL,
	[nvcsCoursePlace] [nvarchar](20) NULL,
	[nvcsCourseTime] [nvarchar](50) NULL,
	constraint PK_BE_ID primary key(ID),
	constraint UQ_BE_nvcElectiveNum unique(nvcElectiveNum),
	constraint FK_BE_nvcTeacherCode foreign key(nvcTeacherCode) references T_BaseInfo_Teacher(nvcTeacherCode),
	);