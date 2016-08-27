Ext.define('Attendance_Class.controller.ClassListCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_Class_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        grid.down('#Attendance_Class_SearchText').setValue("");
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    OnAttendance_Class_Delete: function (button, e, eOpts) {
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
                    Attendance.Class.Delete(data, function (e, result) {
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
    
    onAttendance_Class_Search_Click: function (button, e, eOpts) {

        var grid = button.up('grid');
        var store = grid.getStore();
        var searchText = grid.down('#Attendance_Class_SearchText').getValue();
        var array = new Array();
        var i = 0;
        if (searchText !== null && searchText !== "") {
            array[i++] = {
                field: 'nvcClass',
                value: searchText,
                opt: 9,
                link: false,
                group: 1
            };
          
            store.getProxy().setExtraParam('SearchInfo', Ext.JSON.encode(array));
            store.load();

        }

    },

    onAttendance_ClassSearch_ClickSpecialkey: function (button, e, eOpts) {

        if (e.keyCode == 13) {
            var grid = field.up('gridpanel');
            var button = grid.down('#Attendance_Class_Search');
            button.fireEvent("click", button);
        }
    },

    onAttendance_Class_EditClick: function (button, e, eOpts) {
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
        var win = Ext.getCmp('Attendance_Class_Edit');
        if (!win) {
            win = Ext.create('Attendance_Class.view.ClassEditView', {
                id: 'Attendance_Class_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    onAttendance_Class_AddClick: function (button, e, eOpts) {
        var win = Ext.getCmp("Attendance_Class_Add");
        if (!win) {
            win = Ext.create('Attendance_Class.view.ClassAddView', {
                id: 'Attendance_Class_Add'
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
            "#Attendance_Class_Display": {
                click: this.onAttendance_Class_Display
            },
            "#Attendance_Class_Delete": {
                click: this.OnAttendance_Class_Delete
            },
            "#Attendance_Class_Edit": {
                click: this.onAttendance_Class_EditClick
            },
            "#Attendance_Class_SearchText": {
                specialkey: this.onAttendance_ClassSearch_ClickSpecialkey
            },
            "#Attendance_Class_Search": {
                click: this.onAttendance_Class_Search_Click
            },

            "#Attendance_Class_Add": {
                click: this.onAttendance_Class_AddClick
            }
        });
    }

});