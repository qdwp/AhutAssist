Ext.define('Attendance_Class.controller.ClassAddCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_ClassAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcClass: values.nvcClass,
            nvcLoginCode: values.nvcLoginCode,
            nvcCollege: values.nvcCollege,
            nvcFaculty: values.nvcFaculty
        };
        Attendance.Class.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('Attendance_Class_List').down('gridpanel');
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
    onAttendance_ClassAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_ClassAdd_OK": {
                click: this.onAttendance_ClassAdd_OKClick
            },
            "#Attendance_ClassAdd_Cancel": {
                click: this.onAttendance_ClassAdd_CancelClick
            }
        });
    }
});