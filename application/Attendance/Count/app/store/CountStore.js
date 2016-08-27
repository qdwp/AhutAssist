Ext.define('Attendance_Count.store.CountStore', {
    extend: 'Ext.data.Store',
    requires:
        [
            'Attendance_Count.model.CountModel',
            'Ext.data.proxy.Direct',
            'Attendance_Count.DirectAPI',
            'Ext.data.reader.Json',
            'Ext.util.Sorter'
        ],
    constructor: function (cfg) {
        if (gbl_rolename == "校领导") {
            var me = this;
            cfg = cfg || {};
            me.callParent([Ext.apply({
                autoLoad: true,
                model: 'Attendance_Count.model.CountModel',
                remoteSort: true,
                storeId: 'CountStore',
                pageSize: 5,
                proxy: {
                    type: 'direct',
                    directFn: 'Attendance.Count.StuLoad',
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
                    property: 'IntCount'
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
        }
        if (gbl_rolename == "院领导") {
            var me = this;
            cfg = cfg || {};
            me.callParent([Ext.apply({
                autoLoad: true,
                model: 'Attendance_Count.model.CountModel',
                remoteSort: true,
                storeId: 'CountStore',
                pageSize: 5,
                proxy: {
                    type: 'direct',
                    directFn: 'Attendance.Count.CollegeStuLoad',
                    paramOrder: [
                        'start',
                        'limit',
                        'Field',
                        'Direction',
                        'SearchInfo',
                        'logincode'
                    ],
                    reader: {
                        type: 'json',
                        messageProperty: 'message',
                        root: 'data'
                    }
                },
                sorters: {
                    property: 'IntCount'
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
        }
        if (gbl_rolename == "辅导员") {
            var me = this;
            cfg = cfg || {};
            me.callParent([Ext.apply({
                autoLoad: true,
                model: 'Attendance_Count.model.CountModel',
                remoteSort: true,
                storeId: 'CountStore',
                pageSize: 5,
                proxy: {
                    type: 'direct',
                    directFn: 'Attendance.Count.AssistStuLoad',
                    paramOrder: [
                        'start',
                        'limit',
                        'Field',
                        'Direction',
                        'SearchInfo',
                        'logincode'
                    ],
                    reader: {
                        type: 'json',
                        messageProperty: 'message',
                        root: 'data'
                    }
                },
                sorters: {
                    property: 'IntCount'
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
        }
    },
    onDirectSoreBeforeLoad: function (store, operation, eOpts) {
        var sort = store.sorters.items[0];
        store.getProxy().setExtraParam('Field', sort.property);
        store.getProxy().setExtraParam('logincode', gbl_logincode);
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