Ext.define('Evaluate_Level.controller.LevelEditCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_LevelEdit_OKClick: function (button, e, eOpts) {

        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }

        var values = form.getValues();
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),
            nvcEvaGrade: values.nvcEvaGrade,
            intLowMark: values.intLowMark,
            intHighMark: values.intHighMark,
            intSort: values.intSort
        };

        Evaluate.Level.Edit(data, function (e, result) {
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

    onEvaluate_LevelEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Evaluate_LevelEdit_OK": {
                click: this.onEvaluate_LevelEdit_OKClick
            },
            "#Evaluate_LevelEdit_Cancel": {
                click: this.onEvaluate_LevelEdit_CancelClick
            }
        });
    }

});
