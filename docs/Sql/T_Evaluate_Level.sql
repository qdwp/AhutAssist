--����:T_Evaluate_Level;
--����:EL
--˵��:���̵ȼ���
create table T_Evaluate_Level
(
	ID nvarchar(32) not null constraint DF_EL_ID default replace(newid(),'-',''),
	nvcEvaGrade nvarchar(10) not null,
	intLowMark int not null,
	intHighMark int not null,
	intSort int not null,
	
	constraint PK_EL_ID primary key(ID),
	constraint UQ_EL_nvcEvaGrade unique(nvcEvaGrade)
);