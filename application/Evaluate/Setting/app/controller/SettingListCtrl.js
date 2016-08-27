Ext.define('Evaluate_Setting.controller.SettingListCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_Setting_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    OnEvaluate_Setting_Delete: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length != 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '未选中任何行',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var nvcID = row.get("ID");
        var displayText = row.get("ID");
        var data = {
            data: nvcID
        };
        Ext.Msg.show({
            tiltle: '确定删除',
            msg: '确定删除以下项<br/><br/>' + displayText,
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,

            fn: function (buttonId) {
                if (buttonId == "yes") {
                    Evaluate.Setting.Delete(data, function (e, result) {
                        var res = result.result;
                        if (res.success) {
                            var msgbox = Ext.Msg.show({
                                title: '提示',
                                msg: res.message,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                            var tag = setTimeout(function () {
                                msgbox.hide();
                                clearTimeout(tag);
                            }, 5000);
                            var store = grid.getStore();
                            store.getProxy().setExtraParam('SearchInfo', null);
                            store.reload();
                        }
                        else {
                            Ext.Msg.show({
                                title: '错误',
                                msg: res.massage,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        });
    },

    onEvaluate_Setting_EditClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '有且仅有一行被选中才能编辑',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var win = Ext.getCmp('Evaluate_Setting_Edit');
        if (!win) {
            win = Ext.create('Evaluate_Setting.view.SettingEditView', {
                id: 'Evaluate_Setting_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    onEvaluate_Setting_AddClick: function (button, e, eOpts) {
        var win = Ext.getCmp("Evaluate_Setting_Add");
        if (!win) {
            win = Ext.create('Evaluate_Setting.view.SettingAddView', {
                id: 'Evaluate_Setting_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.show();
    },
    //保存注意事项
    onEvaluate_Setting_SaveClick: function (button, e, eOpts) {
        var grid = Ext.getCmp('Evaluate_Setting');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '有且仅有一行被选中才能保存数据',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var content = Ext.getCmp('bio').getValue();
        var data = {
            ID: row.get('ID'),
            nvcYear: row.get('nvcYear'),
            nvcTerm: row.get('nvcTerm'),
            dtmBeginTime: row.get('dtmBeginTime'),
            dtmEndTime: row.get('dtmEndTime'),
            nvcNoteOpen: row.get('nvcNoteOpen'),
            nvcResultOpen: row.get('nvcResultOpen'),
            nvcValid: row.get('nvcValid'),
            txtMatter: content
        };
        Evaluate.Setting.EditMessage(data, function (e, result) {
            var res = result.result;
            if (res.success) {
                var msgbox = Ext.MessageBox.show({
                    title: '提示',
                    msg: res.message,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                var tag = setTimeout(function () {
                    msgbox.hide();
                    clearTimeout(tag);
                }, 5000);
                var store = grid.getStore();
                store.reload();
            }
            else {
                Ext.Msg.show({
                    title: '错误',
                    msg: res.message,
                    buttons: Ext.Msg.OK
                });
            }
        })
    },

    onEvaluate_SettingClick: function (grid , record, item, index, e, eOpts)
    {
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        var matter = row.get('txtMatter');
        console.log(matter);
        Ext.getCmp('bio').setValue(matter);
    },

    //导入，导出没写
    //高级查找没写

    init: function (application) {
        this.control({
            "#Evaluate_Setting_Display": {
                click: this.onEvaluate_Setting_Display
            },
            "#Evaluate_Setting_Delete": {
                click: this.OnEvaluate_Setting_Delete
            },
            "#Evaluate_Setting_Edit": {
                click: this.onEvaluate_Setting_EditClick
            },
            "#Evaluate_Setting_Add": {
                click: this.onEvaluate_Setting_AddClick
            },
            "#Evaluate_Setting_Save": {
                click: this.onEvaluate_Setting_SaveClick
            },
            "#Evaluate_Setting": {
                itemclick:this.onEvaluate_SettingClick
            }
        });
    }

});