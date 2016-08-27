Ext.define('BaseInfo_Manage.controller.ManageEditCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_ManageEdit_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var record = form.getRecord();
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var checkTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        var checkResult = Ext.getCmp('Photo_SH_result').getValue();
        var data = record.get('ID') + ";" + checkTime + ";" + checkResult + ";" + values.nvcStuNo + ";" + values.nvcNewPhoto;
        BaseInfo.Manage.Edit(data, function (e, result) {
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
                win.hide();
                var grid = Ext.getCmp('BaseInfo_Manage_List').down('gridpanel');
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
        });
    },

    onBaseInfo_ManageEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#BaseInfo_ManageEdit_OK": {
                click: this.onBaseInfo_ManageEdit_OKClick
            },
            "#BaseInfo_ManageEdit_Cancel": {
                click: this.onBaseInfo_ManageEdit_CancelClick
            }
        });
    }

});
