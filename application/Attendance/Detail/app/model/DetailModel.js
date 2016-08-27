Ext.define('Attendance_Detail.model.DetailModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcReason' },
        { name: 'nvcStuNo' },
          { name: 'dtmRollTime' },
        { name: 'nvcCourseName' },
         { name: 'nvcName' },
       { name: 'timePlace' }
    ]

});