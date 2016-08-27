--����:T_Attendance_AvgCredit;
--����:AA
--˵��:ѧ��ѧ�ּ����
create table T_Attendance_AvgCredit
(
	ID nvarchar(32) not null constraint DF_AA_ID default replace(newid(),'-',''),
	nvcYear	nvarchar(20) not null,
    nvcTerm	nvarchar(2)not null,
    nvcStuNo	nvarchar(9)not null,
    intCredit		float null,	
    nvcFlag	nvarchar(1)not null,

	constraint PK_AA_ID primary key(ID),
	constraint Pk_AA_nvcStuNo unique(nvcStuNo),
	constraint FK_AA_nvcStuNo foreign key (nvcStuNo) references T_BaseInfo_Student(nvcStuNo),
	constraint CK_AA_nvcFlag check (nvcFlag in ('0','1')),
);