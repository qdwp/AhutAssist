--����:T_Attendance_PriorityWatch;
--����:AP
--˵��:����Ա�ص���ѧ����
create table T_Attendance_PriorityWatch
(
	ID nvarchar(32) not null constraint DF_AP_ID default replace(newid(),'-',''),
	nvcTeacherCode nvarchar(8) not null,
	nvcStuNo nvarchar(9) not null,
	
	constraint PK_AP_ID primary key(ID),
	constraint FK_AP_nvcTeacherCode foreign key(nvcTeacherCode) references T_BaseInfo_Teacher(nvcTeacherCode),
	constraint FK_AP_nvcStuNo foreign key(nvcStuNo) references T_BaseInfo_Student(nvcStuNo)
);