Ext.define('app.model.student.attendance.AttendanceListModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
            name: 'nvcElectiveNum',
            type: 'string'
        }, {
            name: 'nvcCourseName',
            type: 'string'
        }, {
            name: 'nvcName',
            type: 'string'
        }, {
            name: 'intCount', //该课程缺勤次数
            type: 'string'
        }, {
            name: 'dtmRollTime',
            type: 'string'
        }, {
            name: 'nvcReason',
            type: 'string'
        }]
    }
});
