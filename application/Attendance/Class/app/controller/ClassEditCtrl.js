Ext.define('Attendance_Class.controller.ClassEditCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_ClassEdit_OKClick: function (button, e, eOpts) {

        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }

        var values = form.getValues();
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),
            nvcClass: values.nvcClass,
            nvcLoginCode: values.nvcLoginCode,
            nvcCollege: values.nvcCollege,
            nvcFaculty: values.nvcFaculty
        };

        Attendance.Class.Edit(data, function (e, result) {
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

    onAttendance_ClassEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_ClassEdit_OK": {
                click: this.onAttendance_ClassEdit_OKClick
            },
            "#Attendance_ClassEdit_Cancel": {
                click: this.onAttendance_ClassEdit_CancelClick
            }
        });
    }

});
