Ext.define('BaseInfo_CourseStu.store.TermStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_CourseStu.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_CourseStu.model.CommonModel',
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