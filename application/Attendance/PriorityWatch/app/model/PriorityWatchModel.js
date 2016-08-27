Ext.define('Attendance_PriorityWatch.model.PriorityWatchModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcLoginCode' },
        {name:'nvcName'},
        { name: 'nvcStuNo' },
        { name: 'nvcStuName' }        
    ]

});