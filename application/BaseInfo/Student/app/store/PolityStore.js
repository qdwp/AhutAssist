Ext.define('BaseInfo_Student.store.PolityStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Student.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Student.model.CommonModel',
            storeId: 'SexStore',
            data: [
                {
                    text: '群众',
                    value: '群众'
                },
                {
                    text: '团员',
                    value: '团员'
                },
                   {
                       text: '党员',
                       value: '党员'
                   }
            ]
        }, cfg)]);
    }

});