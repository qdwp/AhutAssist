Ext.define('Attendance_AvgCredit.store.ConflictStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_AvgCredit.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_AvgCredit.model.CommonModel',
            storeId: 'ConflictStore',
            data: [
                {
                    text: '否',
                    value: '0'
                },
                {
                    text: '是',
                    value: '1'
                }
            ]
        }, cfg)]);
    }

});