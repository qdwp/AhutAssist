Ext.define('Attendance_AvgCredit.controller.AvgCreditEditCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_AvgCreditEdit_OKClick: function (button, e, eOpts) {

        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }

        var values = form.getValues();
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),
            nvcYear: values.nvcYear,
            nvcTerm: values.nvcTerm,
            nvcStuNo: values.nvcStuNo,
            nvcCredit: values.nvcCredit,
            nvcFlag: values.nvcFlag
        };

        Attendance.AvgCredit.Edit(data, function (e, result) {
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
                var grid = Ext.getCmp('Attendance_AvgCredit_List').down('gridpanel');
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

    onAttendance_AvgCredit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_AvgCreditEdit_OK": {
                click: this.onAttendance_AvgCreditEdit_OKClick
            },
            "#Attendance_AvgCreditEdit_Cancel": {
                click: this.onAttendance_AvgCreditEdit_CancelClick
            }
        });
    }

});
