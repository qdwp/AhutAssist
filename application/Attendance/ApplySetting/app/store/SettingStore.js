Ext.define('Attendance_Setting.store.SettingStore', {
    extend: 'Ext.data.Store',
    requires:
        [
            'Attendance_Setting.model.SettingModel',
            'Ext.data.proxy.Direct',
            'Attendance_Setting.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Attendance_Setting.model.SettingModel',
            remoteSort: true,
            storeId: 'SettingStore',
            pageSize: 5,
            proxy: {
                type: 'direct',
                directFn: 'Attendance.Setting.PageLoad',
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
        store.getProxy().setExtraParam('Direction', sort.direction);
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