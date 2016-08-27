Ext.define('Attendance_Major.model.DetailModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
       { name: 'ID' },
       { name: 'nvcStuNo' },
       { name: 'nvcStuName' },
       {name:'nvcReason'},
       { name: 'dtmRollTime' },
       { name: 'nvcRollWay' },
       { name: 'nvcCoutPeo' },
       { name: 'Percentage' },
        { name: 'IntCount' },
         { name: 'ID' },
       { name: 'intRollCount' }
    ]

});