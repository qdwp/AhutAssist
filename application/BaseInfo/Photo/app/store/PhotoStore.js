Ext.define('BaseInfo_Photo.store.PhotoStore', {
    extend: 'Ext.data.Store',
    requires:
        [
            'BaseInfo_Photo.model.PhotoModel',
            'Ext.data.proxy.Direct',
            'BaseInfo_Photo.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'BaseInfo_Photo.model.PhotoModel',
            remoteSort: true,
            storeId: 'PhotoStore',
            pageSize: 11,
            proxy: {
                type: 'direct',
                directFn: 'BaseInfo.Photo.PageLoad',
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
        store.getProxy().setExtraParam('Field', sort.property);
        store.getProxy().setExtraParam('Direction', "ASC");
        store.getProxy().setExtraParam('SearchInfo', gbl_logincode);
    },
    onDirectstoreLoad: function (store, records, successful, eOpts) {
        var message = "";
        var record = store.getAt(0);
        Ext.getCmp('BaseInfo_Photo_PhotoImage').setSrc(record.get('nvcStuPhoto'));
        if (record.get('nvcNewPhoto') != "")
        {
            Ext.getCmp('BaseInfo_Photo_NewImage').setSrc(record.get('nvcNewPhoto'));
        }
        else
            Ext.getCmp('BaseInfo_Photo_NewImage').setSrc('/resource/images/photo.png');
        if (record.get('nvcCheckResult')=="通过")
        {
            Ext.getCmp('BaseInfo_Photo_NewImage').setSrc('/resource/images/photo.png');
        }
      
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