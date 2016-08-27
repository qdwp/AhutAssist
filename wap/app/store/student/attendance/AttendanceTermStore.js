Ext.define('app.store.student.attendance.AttendanceTermStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'attendanceTermStore',
    config: {
        model: 'app.model.student.attendance.AttendanceTermModel',
        storeId: 'attendanceTermStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: config.attendance.term,
            reader: {
                type: "json"
            }
        }
    }
});