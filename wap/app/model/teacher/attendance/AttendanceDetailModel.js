Ext.define('app.model.teacher.attendance.AttendanceDetailModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
            name: 'nvcCourseName',
            type: 'string'
        }, {
            name: 'nvcStuNo',
            type: 'string'
        }, {
            name: 'nvcStuName',
            type: 'string'
        }, {
            name: 'absentCount',
            type: 'string'
        }]
    }
});
