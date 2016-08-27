--表名:T_BaseInfo_CourseStu;
--别名:BC
--说明:学生选课表
create table T_BaseInfo_CourseStu
(
	ID nvarchar(32) not null constraint DF_BC_ID default replace(newid(),'-',''),
	nvcElectiveNum nvarchar(50) not null,
	nvcStuNo nvarchar(9) not null,
	intIsEvaluate int not null default 0,
	nvcEvaGrade nvarchar(10) null,
	intScore int null,
	nvcContents nvarchar(500) null,
	dtmLeaveTime datetime null,
	nvcIP nvarchar(20) null ,
	nvcTerminal nvarchar (1) null,
	
	intVerifyCodeError int not null constraint DF_AUL_K default 50,
	nvcMutilRole nvarchar(4000) not null,
	
	constraint PK_BC_ID primary key(ID),
	constraint FK_BC_nvcElectiveNum foreign key(nvcElectiveNum) references T_BaseInfo_EduTask(nvcElectiveNum),
	constraint FK_BC_nvcStuNo foreign key(nvcStuNo) references T_BaseInfo_Student(nvcStuNo),
	
	constraint CK_BC_intIsEvaluate check (intIsEvaluate in('0','1'))
);