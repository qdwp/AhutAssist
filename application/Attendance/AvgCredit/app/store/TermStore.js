Ext.define('Attendance_AvgCredit.store.TermStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_AvgCredit.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_AvgCredit.model.CommonModel',
            storeId: 'TermStore',
            data: [
                {
                    text: '第一学期',
                    value: '1'
                },
                {
                    text: '第二学期',
                    value: '2'
                }
            ]
        }, cfg)]);
    }

});