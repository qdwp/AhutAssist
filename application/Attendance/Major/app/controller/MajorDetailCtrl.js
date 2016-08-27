Ext.define('Attendance_Major.controller.MajorDetailCtrl', {
    extend: 'Ext.app.Controller',


    onDM_comboChange: function (combo, records, Opts) {
        var num = Ext.getCmp('DM_combo').getValue();
        var grid_main = Ext.getCmp('Attendance_Major_main');
        var rows = grid_main.getSelectionModel().getSelection();
        var row = rows[0];
        var ElectiveNum = row.get('nvcElectiveNum');
        var data = ElectiveNum + ";" + num;
        if (num == "总览") {
            Ext.getCmp('Attendance_Major_DE').hide();
            Ext.getCmp('Attendance_Major_All').show();
            var grid = Ext.getCmp('Attendance_Major_All');
            var store = grid.getStore();
        }
        else {
            Ext.getCmp('Attendance_Major_All').hide();
            Ext.getCmp('Attendance_Major_DE').show();
            var grid = Ext.getCmp('Attendance_Major_DE');
            var store = grid.getStore();
        }
        store.getProxy().setExtraParam('SearchInfo', data);

        store.on('load', function () {
            var record = store.getAt(0);
            if (record) {
                Ext.getCmp('XQ_Time').setValue(record.get('dtmRollTime'));
                Ext.getCmp('XQ_Way').setValue(record.get('nvcRollWay'));
                Ext.getCmp('XQ_Peo').setValue(record.get('nvcCoutPeo'));
                Ext.getCmp('XQ_Per').setValue(record.get('Percentage'));
            }
        }, this);
        store.load();
        var store_time = Ext.getCmp('DM_combo').store;
        store_time.load();
    },

    onAttendance_MajorDetail_Cancel: function (button, e, eOpts) {
        var store_DE = Ext.getCmp('DM_combo').store;
        store_DE.removeAll();
        button.up("window").hide();
    },

    onAttendance_XQ_SAVE_Click: function (button, e, eOpts) {
        var grid = Ext.getCmp('Attendance_Major_DE');
        var array = new Array();
        var store=grid.getStore();
        for (var i = 0; i < store.getCount() ; i++)
        {
            var record = store.getAt(i);
            array[i] = {
                ID: record.get('ID'),
                nvcReason: record.get('nvcReason'),
            };
        }
        var data = {
            detail:array
        }
        Attendance.Major.Edit(data, function (e, result) {
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
                //win.hide();
            }
            else {
                Ext.Msg.show({
                    title: '错误',
                    msg: res.message,
                    buttons: Ext.Msg.OK
                });
            }
        })
        },
 
    init: function (application) {
        this.control({
            '#DM_combo': {
                change: this.onDM_comboChange
            },
            '#Attendance_Detail_Cancel': {
                click: this.onAttendance_MajorDetail_Cancel
            },
            '#XQ_SAVE': {
                click: this.onAttendance_XQ_SAVE_Click
            }

        });
    }
});

