Ext.define('Attendance_PriorityWatch.controller.PriorityWatchListCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_PriorityWatch_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        grid.down('#Attendance_PriorityWatch_SearchText').setValue("");
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    OnAttendance_PriorityWatch_Delete: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length != 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '只能选中任何行操作',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var nvcID = row.get("ID");
        var displayText = row.get("nvcStuNo");
        var data = {
            data: nvcID
        };
        Ext.Msg.show({
            tiltle: '确定删除',
            msg: '确定删除学号<br/><br/>' + displayText,
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,

            fn: function (buttonId) {
                if (buttonId == "yes") {
                    Attendance.PriorityWatch.Delete(data, function (e, result) {
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

    onAttendance_PriorityWatch_Search_Click: function (button, e, eOpts) {

        var grid = button.up('grid');
        var store = grid.getStore();
        var searchText = grid.down('#Attendance_PriorityWatch_SearchText').getValue();
        var array = new Array();
        var i = 0;
        if (searchText !== null && searchText !== "") {

            store.getProxy().setExtraParam('SearchInfo', searchText);
            store.load();

        }

    },

    onAttendance_PriorityWatchSearch_ClickSpecialkey: function (button, e, eOpts) {

        if (e.keyCode == 13) {
            var grid = field.up('gridpanel');
            var button = grid.down('#Attendance_PriorityWatch_Search');
            button.fireEvent("click", button);
        }
    },

    onAttendance_PriorityWatch_AddClick: function (button, e, eOpts) {
        var win = Ext.getCmp("Attendance_PriorityWatch_Add");
        if (!win) {
            win = Ext.create('Attendance_PriorityWatch.view.PriorityWatchAddView', {
                id: 'Attendance_PriorityWatch_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        var grid = Ext.getCmp('PriorityWatchAdd_Stu');
        var store=grid.getStore();
        store.reload();
        win.show();
    },

    init: function (application) {
        this.control({
            "#Attendance_PriorityWatch_Display": {
                click: this.onAttendance_PriorityWatch_Display
            },
            "#Attendance_PriorityWatch_Delete": {
                click: this.OnAttendance_PriorityWatch_Delete
            },
            "#Attendance_PriorityWatch_SearchText": {
                specialkey: this.onAttendance_PriorityWatchSearch_ClickSpecialkey
            },
            "#Attendance_PriorityWatch_Search": {
                click: this.onAttendance_PriorityWatch_Search_Click
            },
            "#Attendance_PriorityWatch_Add": {
                click: this.onAttendance_PriorityWatch_AddClick
            }
        });
    }

});