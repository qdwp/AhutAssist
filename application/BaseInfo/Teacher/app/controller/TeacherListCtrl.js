Ext.define('BaseInfo_Teacher.controller.TeacherListCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_Teacher_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        grid.down('#BaseInfo_Teacher_SearchText').setValue("");
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    OnBaseInfo_Teacher_Delete: function (button, e, eOpts) {
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
                    BaseInfo.Teacher.Delete(data, function (e, result) {
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

    onBaseInfo_Teacher_Search_Click: function (button, e, eOpts) {

        var grid = button.up('grid');
        var store = grid.getStore();
        var searchText = grid.down('#BaseInfo_Teacher_SearchText').getValue();
        var array = new Array();
        var i = 0;
        if (searchText !== null && searchText !== "") {
            array[i++] = {
                field: 'nvcTeacherCode',
                value: searchText,
                opt: 9,
                link: false,
                group: 1
            };
            array[i++] = {
                field: 'nvcName',
                value: searchText,
                opt: 9,
                link: false,
                group: 1
            };

            //array[i++] = {
            //    field: 'BM_nvcTrueName',
            //    value: searchText,
            //    opt: 9,
            //    link: false,
            //    group: 1
            //};
            store.getProxy().setExtraParam('SearchInfo', Ext.JSON.encode(array));
            store.load();

        }

    },

    onBaseInfo_TeacherSearch_ClickSpecialkey: function (button, e, eOpts) {

        if (e.keyCode == 13) {
            var grid = field.up('gridpanel');
            var button = grid.down('#BaseInfo_Teacher_Search');
            button.fireEvent("click", button);
        }
    },


    onBaseInfo_Teacher_AddClick: function (button, e, eOpts) {
      
        var win = Ext.getCmp("BaseInfo_Teacher_Add");
        if (!win) {
            win = Ext.create('BaseInfo_Teacher.view.TeacherAddView', {
                id: 'BaseInfo_Teacher_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.show();
    },

    onBaseInfo_Teacher_EditClick: function (button, e, eOpts) {
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
        var win = Ext.getCmp('BaseInfo_Teacher_Edit');
        if (!win) {
            win = Ext.create('BaseInfo_Teacher.view.TeacherEditView', {
                id: 'BaseInfo_Teacher_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },
 

    init: function (application) {
        this.control({
            "#BaseInfo_Teacher_Display": {
                click: this.onBaseInfo_Teacher_Display
            },
            "#BaseInfo_Teacher_Delete": {
                click: this.OnBaseInfo_Teacher_Delete
            },
            "#BaseInfo_Teacher_SearchText": {
                specialkey: this.onBaseInfo_TeacherSearch_ClickSpecialkey
            },
            "#BaseInfo_Teacher_Search": {
                click: this.onBaseInfo_Teacher_Search_Click
            },
            "#BaseInfo_Teacher_Edit": {
                click: this.onBaseInfo_Teacher_EditClick
            },
            "#BaseInfo_Teacher_Add": {
                click: this.onBaseInfo_Teacher_AddClick
            }
        });
    }

});