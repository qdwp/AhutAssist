Ext.define('app.store.teacher.attendance.AttendanceDetailStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'teaAttendanceDetailStore',
    config: {
        model: 'app.model.teacher.attendance.AttendanceDetailModel',
        storeId: 'teaAttendanceDetailStore',
        pageSize: 100,
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: config.teaattendance.detail,
            reader: {
                type: "json",
                rootProperty: 'student'
            }
        }
    }
});