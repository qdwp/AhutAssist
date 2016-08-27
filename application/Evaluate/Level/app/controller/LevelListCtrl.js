Ext.define('Evaluate_Level.controller.LevelListCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_Level_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    OnEvaluate_Level_Delete: function (button, e, eOpts) {
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
                    Evaluate.Level.Delete(data, function (e, result) {
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


    onEvaluate_Level_EditClick: function (button, e, eOpts) {
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
        var win = Ext.getCmp('Evaluate_Level_Edit');
        if (!win) {
            win = Ext.create('Evaluate_Level.view.LevelEditView', {
                id: 'Evaluate_Level_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    onEvaluate_Level_AddClick: function (button, e, eOpts) {
        var win = Ext.getCmp("Evaluate_Level_Add");
        if (!win) {
            win = Ext.create('Evaluate_Level.view.LevelAddView', {
                id: 'Evaluate_Level_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.show();
    },

    //导入，导出没写
    //高级查找没写

    init: function (application) {
        this.control({
            "#Evaluate_Level_Display": {
                click: this.onEvaluate_Level_Display
            },
            "#Evaluate_Level_Delete": {
                click: this.OnEvaluate_Level_Delete
            },
            "#Evaluate_Level_Edit": {
                click: this.onEvaluate_Level_EditClick
            },

            "#Evaluate_Level_Add": {
                click: this.onEvaluate_Level_AddClick
            }
        });
    }

});