--表名:T_Evaluate_Setting;
--别名:ES
--说明:评教设置表
create table T_Evaluate_Setting
(
	ID nvarchar(32) not null constraint DF_ES_ID default replace(newid(),'-',''),
	nvcYear nvarchar(20) not null,
	nvcTerm nvarchar(2) not null,
	dtmBeginTime datetime not null,
	dtmEndTime datetime not null,
	nvcNoteOpen nvarchar(1) not null,
	nvcResultOpen nvarchar(1) not null,
	nvcValid nvarchar(1) not null,
	
	constraint PK_ES_ID primary key(ID),
	constraint CK_ES_nvcNoteOpen check (nvcNoteOpen in('0','1')),
	constraint CK_ES_nvcResultOpen check (nvcResultOpen in('0','1')),
	constraint CK_ES_nvcValid check (nvcValid in('0','1'))
);