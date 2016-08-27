Ext.define('Attendance_Apply.controller.ApplyAddCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_ApplyAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        ApplyTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        var type = Ext.getCmp('MT_type').getValue();
        var values = form.getValues();
        var data = {
            nvcYear: values.nvcYear,
            nvcTerm: values.nvcTerm,
            nvcElectiveNum: values.nvcElectiveNum,
            nvcCollege: values.nvcCollege,
            nvcWeekHours: values.nvcWeekHours,
            nvcToTalHours: values.nvcToTalHours,
            nvcCourseTime: values.nvcCourseTime,
            nvcCoursePlace: values.nvcCoursePlace,
            nvcCampus: values.nvcCampus,
            nvcFreeListenType: type,
            dtmApplyTime: ApplyTime,
            nvcStuNo: gbl_logincode
        };
        Attendance.Apply.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('Attendance_Apply_List').down('gridpanel');
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

    onAttendance_ApplyAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_ApplyAdd_OK": {
                click: this.onAttendance_ApplyAdd_OKClick
            },
            "#Attendance_ApplyAdd_Cancel": {
                click: this.onAttendance_ApplyAdd_CancelClick
            }
        });
    }
});