Ext.define('BaseInfo_EduTask.model.EduTaskModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcYear' },
        { name: 'nvcTerm' },
        { name: 'nvcElectiveNum' },
        { name: 'nvcCourseCode' },
         { name: 'nvcCourseName' },
        { name: 'nvcCourseNature' },
        { name: 'intStuNumber' },
        { name: 'nvcCollege' },
        { name: 'nvcFaculty' },
        { name: 'nvcTeacherCode' },
          { name: 'nvcName'},
         { name: 'nvcCoursePlace' },
        { name: 'nvcCourseTime' },
    ]

});