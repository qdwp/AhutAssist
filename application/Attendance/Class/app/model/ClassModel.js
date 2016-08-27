Ext.define('Attendance_Class.model.ClassModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcClass' },
        { name: 'nvcLoginCode' },
        {name:'nvcName'},
        { name: 'nvcCollege' },
        { name: 'nvcFaculty' }
    ]

});