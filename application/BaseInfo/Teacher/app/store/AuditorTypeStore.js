Ext.define('BaseInfo_Teacher.store.AuditorTypeStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Teacher.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Teacher.model.CommonModel',
            storeId: 'AuditorTypeStore',
            data: [
                {
                    text: '非督导员',
                    value: '0'
                },
                {
                    text: '学院督导员',
                    value: '1'
                },
                {
                    text: '学校督导员',
                    value: '2'
                }
            ]
        }, cfg)]);
    }

});