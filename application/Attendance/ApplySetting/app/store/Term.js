Ext.define('Attendance_Setting.store.Term', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_Setting.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_Setting.model.CommonModel',
            storeId: 'Term',
            data: [
                {
                    text: '第一学期',
                    value: '1'
                }, {
                    text: '第二学期',
                    value: '2'
                }
            ]
        }, cfg)]);
    }

});