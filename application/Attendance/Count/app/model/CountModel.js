Ext.define('Attendance_Count.model.CountModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcStuNo' },
        { name: 'nvcStuName' },
          { name: 'nvcCollege' },
        { name: 'nvcMajor' },
         { name: 'nvcGrade' },
       { name: 'nvcClass' },
         { name: 'IntCount' }
    ]

});