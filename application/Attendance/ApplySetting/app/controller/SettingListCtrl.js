Ext.define('Attendance_Setting.controller.SettingListCtrl', {
    extend: 'Ext.app.Controller',

    OnAttendance_Setting_Delete: function (button, e, eOpts) {
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
                    Attendance.Setting.Delete(data, function (e, result) {
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

    onAttendance_Setting_EditClick: function (button, e, eOpts) {
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
        var win = Ext.getCmp('Attendance_Setting_Edit');
        if (!win) {
            win = Ext.create('Attendance_Setting.view.SettingEditView', {
                id: 'Attendance_Setting_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    onAttendance_Setting_AddClick: function (button, e, eOpts) {

        var win = Ext.getCmp("Attendance_Setting_Add");
        if (!win) {
            win = Ext.create('Attendance_Setting.view.SettingAddView', {
                id: 'Attendance_Setting_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.show();
    },




    init: function (application) {
        this.control({
            "#Attendance_Setting_Delete": {
                click: this.OnAttendance_Setting_Delete
            },
            "#Attendance_Setting_Edit": {
                click: this.onAttendance_Setting_EditClick
            },
            "#Attendance_Setting_Add": {
                click: this.onAttendance_Setting_AddClick
            }
        });
    }

});
