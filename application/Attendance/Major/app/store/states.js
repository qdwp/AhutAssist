Ext.define('Attendance_Major.store.states', {
    extend: 'Ext.data.Store',
    requires:
        [
            'Attendance_Major.model.DetailModel',
            'Ext.data.proxy.Direct',
            'Attendance_Major.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'Attendance_Major.model.DetailModel',
            remoteSort: true,
            storeId: 'states',
            pageSize: 5,
            proxy: {
                type: 'direct',
                directFn: 'Attendance.Major.TimeLoad',
                paramOrder: [
                    'start',
                    'limit',
                    'Field',
                    'Direction',
                    'SearchInfo',
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
        var grid = Ext.getCmp('Attendance_Major_main');
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        var num = row.get('nvcElectiveNum');
        store.getProxy().setExtraParam('Field', sort.property);
        store.getProxy().setExtraParam('Direction', sort.direction);
        store.getProxy().setExtraParam('SearchInfo', num);
    },

    onDirectstoreLoad: function (store, records, successful, eOpts) {
        var record = store.getAt(0);
        var data = {
            "intRollCount": "总览"
        }
        store.add(data);
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