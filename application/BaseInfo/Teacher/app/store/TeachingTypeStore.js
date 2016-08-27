Ext.define('BaseInfo_Teacher.store.TeachingTypeStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_Teacher.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_Teacher.model.CommonModel',
            storeId: 'TeachingTypeStore',
            data: [
                {
                    text: '专业课',
                    value: '专业课'
                },
                {
                    text: '公选课',
                    value: '公选课'
                }
            ]
        }, cfg)]);
    }

});