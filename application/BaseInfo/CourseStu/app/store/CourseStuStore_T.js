Ext.define('BaseInfo_CourseStu.store.CourseStuStore_T', {
    extend: 'Ext.data.Store',
    requires:
        [
            'BaseInfo_CourseStu.model.CourseStuModel_T',
            'Ext.data.proxy.Direct',
            'BaseInfo_CourseStu.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'BaseInfo_CourseStu.model.CourseStuModel_T',
            remoteSort: true,
            storeId: 'CourseStuStore_T',
            pageSize: 5,
            proxy: {
                type: 'direct',
                directFn: 'BaseInfo.CourseStu.PageLoad_T',
                paramOrder: [
                'start',
                'limit',
                'Field',
                'Direction',
                'SearchInfo',
                'LoginCode'
                ],
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            sorters: {
                property: 'ID'
            },
            listeners: {
                beforeload: {
                    fn: me.onDirectSoreBeforeLoad,
                    scope: me
                },
                load: {
                    fn: me.onDirectstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onDirectSoreBeforeLoad: function (store, operation, eOpts) {
        var sort = store.sorters.items[0];
        var logincode = gbl_logincode;
        store.getProxy().setExtraParam('Field', sort.property);
        store.getProxy().setExtraParam('Direction', sort.direction);
        store.getProxy().setExtraParam('LoginCode', logincode);

},
    onDirectstoreLoad: function (store, records, successful, eOpts) {
        var message = "";
        try {
            if (!successful) {
                message = store.getProxy().getReader().jsonData.message;
            }
        }
        catch (e) {
            message = "请求超时或服务器错误。";
        }
        if (message !== "") {
            Ext.MessageBox.show({
                title: '错误',
                msg: message,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    }
});