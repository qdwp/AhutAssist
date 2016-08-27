Ext.define('Attendance_Manage.controller.ManageListCtrl', {
    extend: 'Ext.app.Controller',



    onAttendance_Manage_EditClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
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
        var win = Ext.getCmp('Attendance_Manage_Edit');
        if (!win) {
            win = Ext.create('Attendance_Manage.view.ManageEditView', {
                id: 'Attendance_Manage_Edit'
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
            "#Attendance_Manage_Edit": {
                click: this.onAttendance_Manage_EditClick
            }
        });
    }

});
