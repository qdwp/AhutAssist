Ext.define('Evaluate_Level.controller.LevelAddCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_LevelAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcEvaGrade: values.nvcEvaGrade,
            intLowMark: values.intLowMark,
            intHighMark: values.intHighMark,
            intSort: values.intSort

        };
        Evaluate.Level.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('Evaluate_Level_List').down('gridpanel');
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
    onEvaluate_LevelAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Evaluate_LevelAdd_OK": {
                click: this.onEvaluate_LevelAdd_OKClick
            },
            "#Evaluate_LevelAdd_Cancel": {
                click: this.onEvaluate_LevelAdd_CancelClick
            }
        });
    }
});