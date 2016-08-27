Ext.define('Evaluate_Level.store.SortStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Evaluate_Level.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Evaluate_Level.model.CommonModel',
            storeId: 'SortStore',
            data: [
                {
                    text: '5',
                    value: '5'
                },
                {
                    text: '4',
                    value: '4'
                },
                {
                    text: '3',
                    value: '3'
                },
                 {
                     text: '2',
                     value: '2'
                 },
                {
                    text: '1',
                    value: '1'
                }
            ]
        }, cfg)]);
    }

});