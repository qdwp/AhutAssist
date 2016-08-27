Ext.define('app.store.student.attendance.AttendanceListStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'attendanceListStore',
    config: {
        model: 'app.model.student.attendance.AttendanceListModel',
        storeId: 'attendanceListStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: config.attendance.list,
            reader: {
                type: "json"
            }
        }
    }
});