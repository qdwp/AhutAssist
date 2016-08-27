Ext.define('Attendance_AvgCredit.controller.AvgCreditAddCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_AvgCreditAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcYear: values.nvcYear,
            nvcTerm: values.nvcTerm,
            nvcStuNo: values.nvcStuNo,
            nvcCredit: values.nvcCredit,
            nvcFlag: values.nvcFlag
        };
        Attendance.AvgCredit.Add(data, function (e, result) {
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
    onAttendance_AvgCreditAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_AvgCreditAdd_OK": {
                click: this.onAttendance_AvgCreditAdd_OKClick
            },
            "#Attendance_AvgCreditAdd_Cancel": {
                click: this.onAttendance_AvgCreditAdd_CancelClick
            }
        });
    }
});