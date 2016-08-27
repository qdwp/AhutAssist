Ext.define('app.model.teacher.attendance.AttendanceListModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
            name: 'nvcCourseName',
            type: 'string'
        }, {
            name: 'nvcElectiveNum',
            type: 'string'
        }, {
            name: 'timeAndPlace',
            type: 'string'
        }, {
            name: 'attendanceCount',
            type: 'string'
        }, {
            name: 'totalCount',
            type: 'string'
        }]
    }
});
