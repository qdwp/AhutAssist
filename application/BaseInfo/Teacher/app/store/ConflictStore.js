Ext.define('BaseInfo_Teacher.store.ConflictStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Teacher.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Teacher.model.CommonModel',
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