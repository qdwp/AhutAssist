Ext.define('Evaluate_Setting.controller.SettingAddCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_SettingAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcYear: values.nvcYear,
            nvcTerm: values.nvcTerm,
            dtmBeginTime: values.dtmBeginTime,
            dtmEndTime: values.dtmEndTime,
            nvcNoteOpen: values.nvcNoteOpen,
            nvcResultOpen: values.nvcResultOpen,
            nvcValid: values.nvcValid
        };
        Evaluate.Setting.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('Evaluate_Setting_List').down('gridpanel');
                var store = grid.getStore();
                store.getProxy().setExtraParam('SearchInfo', null);
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

    onEvaluate_SettingAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Evaluate_SettingAdd_OK": {
                click: this.onEvaluate_SettingAdd_OKClick
            },
            "#Evaluate_SettingAdd_Cancel": {
                click: this.onEvaluate_SettingAdd_CancelClick
            }
        });
    }
});