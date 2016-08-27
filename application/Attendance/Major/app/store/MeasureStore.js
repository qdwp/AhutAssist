Ext.define('Attendance_Major.store.MeasureStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_Major.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_Major.model.CommonModel',
            storeId: 'MeasureStore',
            data: [
                 {
                     text: '全点',
                     value: '全点'
                 }, {
                     text: '随机',
                     value: '随机'
                 }, {
                     text: '学分绩',
                     value: '学分绩'
                 }, {
                     text: '课堂缺勤',
                     value: '课堂缺勤'
                 }, {
                     text: '重点考察',
                     value: '重点考察'
                 }
            ]
        }, cfg)]);
    }

});