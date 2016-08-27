Ext.define('Evaluate_Vote.store.VoteStore', {
    extend: 'Ext.data.Store',
    requires:
        [
            'Evaluate_Vote.model.VoteModel',
            'Ext.data.proxy.Direct',
            'Evaluate_Vote.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Evaluate_Vote.model.VoteModel',
            remoteSort: true,
            storeId: 'VoteStore',
            pageSize: 11,
            proxy: {
                type: 'direct',
                directFn: 'Evaluate.Vote.PageLoad',
                paramOrder: [
                    'start',
                    'limit',
                    'Field',
                    'Direction',
                    'SearchInfo'
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
        store.getProxy().setExtraParam('SearchInfo', logincode);
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
            Ext.Msg.show({
                title: '错误',
                msg: message,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    }
});