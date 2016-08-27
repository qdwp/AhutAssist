Ext.define('Attendance_Apply.controller.ApplyListCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_Apply_AddClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var store = grid.getStore();
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '有且仅有一行被选中才能编辑',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        if (row.get('IsApply') === "1")
        {
            Ext.Msg.show({
                title: '错误',
                msg: '你已经完成该门课的预约',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var win = Ext.getCmp("Attendance_Apply_Add");
        if (!win) {
            win = Ext.create('Attendance_Apply.view.ApplyAddView', {
                id: 'Attendance_Apply_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    init: function (application) {
        this.control({
            "#Attendance_Apply_Add": {
                click: this.onAttendance_Apply_AddClick
            }

        });
    }

});