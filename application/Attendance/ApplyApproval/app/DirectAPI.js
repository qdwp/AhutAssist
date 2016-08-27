Ext.define('Attendance_Apply.DirectAPI', {
    requires: ['Ext.direct.*', 'Ext.Ajax']
}, function () {
    Ext.Ajax.request({
        url: "/handler/Attendance/ApplyHandler.ashx",
        async: false,
        success: function (xhr) {
            Ext.globalEval(xhr.responseText);
        },
        failure: function (xhr) {
            throw "Direct API load failed with error code " + xhr.status + ": " + xhr.statusText;
        }
    });
    Ext.direct.Manager.addProvider(Attendance.Apply.Handler);
});