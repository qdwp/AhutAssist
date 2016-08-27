--表名:T_Attendance_Detail;
--别名:AD
--说明:考勤明细表
create table T_Attendance_Detail
(
	ID nvarchar(32) not null constraint DF_AD_ID default replace(newid(),'-',''),
	nvcAttendanceID nvarchar(32) not null,
	nvcStuNo nvarchar(9) not null,
	nvcReason nvarchar(50) not null,
	
	constraint PK_AD_ID primary key(ID),
	constraint FK_AD_nvcAttendanceID foreign key(nvcAttendanceID) references T_Attendance_Major(ID),
	constraint FK_AD_nvcStuNo foreign key(nvcStuNo) references T_BaseInfo_Student(nvcStuNo)
);