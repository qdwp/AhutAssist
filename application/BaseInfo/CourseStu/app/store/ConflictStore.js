
Ext.define('BaseInfo_CourseStu.store.ConflictStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_CourseStu.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_CourseStu.model.CommonModel',
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