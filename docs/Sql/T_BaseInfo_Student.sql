--������T_BaseInfo_Student; 
--������BS 
--˵����ѧ��������Ϣ�� 
CREATE TABLE T_BaseInfo_Student 
  ( 
     ID nvarchar(32) not null constraint DF_BS_ID default (replace(newid(),'-','')),
	nvcStuNo nvarchar(9) not null ,
	nvcStuName nvarchar(10) not null,
	nvcSex nvarchar(2) not null,
	nvcPwd nvarchar(50) not null,
	nvcBirth nvarchar(20) not null,
	nvcPolity nvarchar(20) not null,
	nvcNationality nvarchar(20) not null,
	nvcNative nvarchar(20) not null,
	nvcSource nvarchar(50) not null,
	nvcCollege nvarchar(20) not null,
	nvcFaculty nvarchar(20) not null,
	nvcMajor nvarchar(50) not null,
	nvcClass nvarchar(10) not null,
	intEducationAge int not null,
	nvcEngGrade nvarchar(10) null,
	nvcStuAge nvarchar(10) null,
	nvcGradeStatus nvarchar(50) null,
	nvcGrade nvarchar(10) not null,
	nvcDevelop nvarchar(50) not null,
	nvcMajorDir nvarchar(50) null,
	nvcEntranceTime nvarchar(20) not null,
	nvcGraduateSch nvarchar(50) null,
	nvcDormNo nvarchar(20) null,
	nvcMail nvarchar(50) null,
	nvcPhone nvarchar(20) null,
	nvcAdmCode nvarchar(20) null,
	nvcIdentity nvarchar(18) null,
	nvcHMT nvarchar(50) null,
	nvcHealth nvarchar(20) null,
	nvcRegister nvarchar(20) not null,
	nvcFamilyAdd nvarchar(100) null,
	nvcFamilyCode nvarchar(6) null,
	nvcFamilyTel nvarchar(20) null,
	nvcFather nvarchar(20) not null,
	nvcFaFirm nvarchar(50) null,
	nvcFaFirmTel nvarchar(20) null,
	nvcFaFirmCode nvarchar(6) null,
	nvcMother nvarchar(20) not null,
	nvcMoFirm nvarchar(50) null,
	nvcMoFirmTel nvarchar(20) null,
	nvcMoFirmCode nvarchar(6) null,
	nvcStuPhoto nvarchar(500) null,
	
	constraint PK_BS_ID primary key(ID),
	constraint UQ_BS_nvcStuNo unique(nvcStuNo) 
  ); 