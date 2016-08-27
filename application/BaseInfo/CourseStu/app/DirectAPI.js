Ext.define('BaseInfo_CourseStu.DirectAPI', {
    requires: ['Ext.direct.*', 'Ext.Ajax']

}, function () {
    Ext.Ajax.request({
        url: "/handler/BaseInfo/CourseStuHandler.ashx",
        async: false,
        success: function (xhr) {
            Ext.globalEval(xhr.responseText);
        },
        failure: function (xhr) {
            throw "Direct API load failed with error code " + xhr.status + ": " + xhr.statusText;
        }
    });
    Ext.direct.Manager.addProvider(BaseInfo.CourseStu.Handler);
});