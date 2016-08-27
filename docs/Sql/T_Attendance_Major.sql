--表名:T_Attendance_Major;
--别名:AM
--说明:考勤主表
create table T_Attendance_Major
(
	ID nvarchar(32) not null constraint DF_AM_ID default replace(newid(),'-',''),
	nvcElectiveNum nvarchar(50) not null,
	nvcLoginCode nvarchar(4) not null,
	nvcRollTime nvarchar(50) not null,
	nvcRollWay nvarchar(50) not null,
	intRollCount int not null,
	nvcIP nvarchar(20) not null,
	nvcTerminal nvarchar(1) not null,
	
	constraint PK_AM_ID primary key(ID),
	constraint FK_AM_nvcElectiveNum foreign key(nvcElectiveNum) references T_BaseInfo_EduTask(nvcElectiveNum),
	constraint FK_AM_nvcLoginCode foreign key(nvcLoginCode) references T_BaseInfo_Teacher(nvcLoginCode)
);