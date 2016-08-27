Ext.define('Evaluate_Level.store.EvaStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Evaluate_Level.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Evaluate_Level.model.CommonModel',
            storeId: 'EvaStore',
            data: [
                {
                    text: '差',
                    value: '差'
                },
                {
                    text: '一般',
                    value: '一般'
                },
                {
                    text: '中',
                    value: '中'
                },
                 {
                     text: '良',
                     value: '良'
                 },
                {
                    text: '优',
                    value: '优'
                }
            ]
        }, cfg)]);
    }

});