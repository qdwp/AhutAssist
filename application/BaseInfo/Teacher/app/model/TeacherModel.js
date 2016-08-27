Ext.define('BaseInfo_Teacher.model.TeacherModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
         { name: 'nvcIsTeaching' },
        { name: 'nvcTeachingType' },
        { name: 'nvcRoleType' },
       { name: 'intAuditorType' },
       { name: 'nvcTeacherCode' },
       { name: 'nvcLoginCode' },
        { name: 'nvcPwd' },
        { name: 'nvcName' },
        { name: 'nvcSex' },
        { name: 'nvcNationality' },
        { name: 'dtmBirth' },
        { name: 'nvcPolitics' },
         { name: 'nvcCollege' },
       { name: 'nvcDepartment' },
        { name: 'nvcPhone' },
        { name: 'nvcMail' },
        { name: 'nvcGraduate' },
        { name: 'nvcMajor' },
        { name: 'nvcEducation' },
        { name: 'nvcDegree' },
        { name: 'nvcJobTitle' },
        { name: 'nvcJob' },
        { name: 'nvcDiscipline' },
        { name: 'nvcQualifyCode' },
          { name: 'nvcMQualifyCode' },
        { name: 'nvcPerStaffCode' },
        { name: 'nvcLabMan' },
        { name: 'nvcEvaluation' },
        { name: 'nvcTeacher' },
        { name: 'nvcTeaPhoto' }  
    ]

});