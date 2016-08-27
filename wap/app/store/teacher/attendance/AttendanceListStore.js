Ext.define('app.store.teacher.attendance.AttendanceListStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'teaAttendanceListStore',
    config: {
        model: 'app.model.teacher.attendance.AttendanceListModel',
        storeId: 'teaAttendanceListStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: config.teaattendance.list,
            reader: {
                type: "json"
            }
        }
    }
});