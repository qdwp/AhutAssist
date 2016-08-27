Ext.define('Attendance_PriorityWatch.controller.PriorityWatchAddCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_PriorityWatchAdd_OKClick: function (button, e, eOpts) {
        var array=new Array();
        var grid = Ext.getCmp('PriorityWatchAdd_Stu');
        var rows = grid.getSelectionModel().getSelection();
        for(var i=0;i<rows.length;i++)
        {
            var logincode=gbl_logincode;
            var stuno=rows[i].get('nvcStuNo');
            array[i]=  {
                nvcLoginCode:logincode,
                nvcStuNo:stuno
            }
        }
        var data = {
            detail:array
        };
        Attendance.PriorityWatch.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('Attendance_PriorityWatch_List').down('gridpanel');
                var store = grid.getStore();
                button.up("window").hide();
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
    onAttendance_PriorityWatchAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#Attendance_PriorityWatchAdd_OK": {
                click: this.onAttendance_PriorityWatchAdd_OKClick
            },
            "#Attendance_PriorityWatchAdd_Cancel": {
                click: this.onAttendance_PriorityWatchAdd_CancelClick
            }
        });
    }
});