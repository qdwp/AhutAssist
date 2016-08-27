Ext.define('BaseInfo_Teacher.store.SexStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Teacher.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Teacher.model.CommonModel',
            storeId: 'SexStore',
            data: [
                {
                    text: '男',
                    value: '男'
                },
                {
                    text: '女',
                    value: '女'
                }
            ]
        }, cfg)]);
    }

});