Ext.define('Attendance_Manage.model.ManageModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
           { name: 'ID' },
         { name: 'nvcName' },
         {name:'nvcStuName'},
         { name: 'nvcCollege' },
        { name: 'nvcWeekHours' },
        { name: 'nvcCoursePlace' },
         { name: 'nvcCourseTime' },
         { name: 'nvcCampus' },
         { name: 'nvcYear' },
         { name: 'nvcTerm' },
        { name: 'nvcElectiveNum' },
        { name: 'nvcCollege' },
         { name: 'nvcToTalHours' },
         { name: 'nvcCampus' },
         { name: 'nvcFreeListenType' },
        { name: 'dtmApplyTime' },
         { name: 'nvcStuNo' },
        { name: 'nvcCourseName' },
         { name: 'nvcCourseNature' },
      { name: 'dtmCheckTime' },
         { name: 'nvcCheckResult' },
    ]

});