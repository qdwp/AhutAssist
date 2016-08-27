--表名:T_Evaluate_Vote;
--别名:EV
--说明:学生投票表
create table T_Evaluate_Vote
(
	ID nvarchar(32) not null constraint DF_EV_ID default replace(newid(),'-',''),
	nvcElectiveNum nvarchar(50) not null,
	nvcStuNo nvarchar(9) not null,
	nvcIP nvarchar(20) not null,
	nvcTerminal nvarchar(1) not null,
	
	constraint PK_EV_ID primary key(ID),
	constraint FK_EV_nvcElectiveNum foreign key(nvcElectiveNum) references T_BaseInfo_EduTask(nvcElectiveNum),
	constraint FK_EV_nvcStuNo foreign key(nvcStuNo) references T_BaseInfo_Student(nvcStuNo),
);