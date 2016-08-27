Ext.define('app.store.student.attendance.AttendanceYearStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'attendanceYearStore',
    config: {
        model: 'app.model.student.attendance.AttendanceYearModel',
        storeId: 'attendanceYearStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: config.attendance.year,
            reader: {
                type: "json"
            }
        }
    }
});