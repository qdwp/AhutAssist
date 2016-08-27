Ext.define('Attendance_Major.model.QDModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcStuNo' },
       { name: 'nvcStuName' },
       { name: 'nvcClass' },
        { name: 'nvcReason'},
         { name: 'nvcStuPhoto' }
    ]

});