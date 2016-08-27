Ext.define('Evaluate_Setting.store.TermStore', {
    extend: 'Ext.data.Store',

    requires: [
         'Evaluate_Setting.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Evaluate_Setting.model.CommonModel',
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