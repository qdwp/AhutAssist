Ext.define('Attendance_Count.model.CountMajorModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
          { name: 'nvcCollege' },
        { name: 'nvcMajor' },
         { name: 'nvcGrade' },
         { name: 'IntCount' }
    ]

});