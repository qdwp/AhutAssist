Ext.define('BaseInfo_Teacher.store.RoleTypeStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Teacher.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Teacher.model.CommonModel',
            storeId: 'RoleTypeStore',
            data: [
                {
                    text: '老师',
                    value: '老师'
                },
                {
                    text: '辅导员',
                    value: '辅导员'
                },
                 {
                     text: '院领导',
                     value: '院领导'
                 },
                {
                    text: '校领导',
                    value: '校领导'
                },
                {
                    text: '管理员',
                    value: '管理员'
                }
            ]
        }, cfg)]);
    }

});