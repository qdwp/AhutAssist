Ext.define('Attendance_Major.store.ReasonStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_Major.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_Major.model.CommonModel',
            storeId: 'ReasonStore',
            data: [
                 {
                     text: '迟到',
                     value: '迟到'
                 }, {
                     text: '事假',
                     value: '事假'
                 }, {
                     text: '病假',
                     value: '病假'
                 }, {
                     text: '无故旷课',
                     value: '无故旷课'
                 }
            ]
        }, cfg)]);
    }

});