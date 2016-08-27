Ext.define('Evaluate_Setting.store.ConflictStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Evaluate_Setting.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Evaluate_Setting.model.CommonModel',
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