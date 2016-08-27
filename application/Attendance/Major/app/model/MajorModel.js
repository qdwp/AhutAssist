Ext.define('Attendance_Major.model.MajorModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcElectiveNum' },
       { name: 'nvcCourseName' },
       { name: 'timeAndPlace' },
       { name: 'attendanceCount' },
       { name: 'nvcLoginCode' },
        { name: 'dtmRollTime' },
        { name: 'nvcRollWay' },
         { name: 'nvcIP' },
         { name: 'nvcTerminal'}
    ]

});