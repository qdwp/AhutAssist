--����:T_Attendance_Class;
--����:AC
--˵��:�༶��
create table T_Attendance_Class
(
	ID nvarchar(32) not null constraint DF_AC_ID default replace(newid(),'-',''),
	nvcClass nvarchar(20) not null,
	nvcTeacherCode nvarchar(8) not null,
	nvcCollege nvarchar(50) not null,
	nvcFaculty nvarchar(50) not null,
	
	constraint PK_AC_ID primary key(ID),
	constraint FK_AC_nvcTeacherCode foreign key(nvcTeacherCode) references T_BaseInfo_Teacher(nvcTeacherCode)
);