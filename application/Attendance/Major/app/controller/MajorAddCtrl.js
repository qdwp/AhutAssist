var i = 0;

Ext.define('Attendance_Major.controller.MajorAddCtrl', {
    extend: 'Ext.app.Controller',
    onAttendance_MajorAdd_OKClick: function (button, e, eOpts) {
        //添加数据到主表
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var ip = returnCitySN["cip"];
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
     dtmRollTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        var Terminal = null;
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent)
                || /Android/i.test(navigator.userAgent)
                || /BlackBerry/i.test(navigator.userAgent)
                || /IEMobile/i.test(navigator.userAgent)
                || (/HTC|MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            Terminal = 1;
        } else {
            Terminal = 0;
        }
        var grid_main = Ext.getCmp('Attendance_Major_main');
        var rows = grid_main.getSelectionModel().getSelection();
        var row = rows[0];
        var rollcount = row.get('attendanceCount');
        if (rollcount == null) {
            rollcount = 1 * 1;
        }
        else
            rollcount = rollcount * 1 + 1 * 1;
        var data = {
            nvcElectiveNum: values.nvcElectiveNum,
            nvcLoginCode: gbl_logincode,
            dtmRollTime: dtmRollTime,
            nvcRollWay: values.nvcRollWay,
            nvcIP: ip,
            nvcTerminal: Terminal,
            intRollCount: rollcount
        };

        var array = new Array();
        var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
        var store_XQ = grid_XQ.getStore();
        for (var j = 0; j < store_XQ.getCount() ; j++) {
            var record = store_XQ.getAt(j);
            var stuno = record.get('nvcStuNo');
            var name = record.get('nvcStuName');
            var Class = record.get('nvcClass');
            var reason = record.get('nvcReason');
            array[j] = {
                nvcStuNo: stuno,
                nvcStuName: name,
                nvcClass: Class,
                nvcReason: reason,
            };
        }
        var postdata = {
            main: data,
            detail: array
        }

        Attendance.Major.Add(postdata, function (e, result) {
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
                var grid = Ext.getCmp('Attendance_Major_List').down('gridpanel');
                var store = grid.getStore();
                store.getProxy().setExtraParam('SearchInfo', null);
                store.reload();
            }
            else {
                Ext.Msg.show({
                    title: '错误',
                    msg: res.message,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });

        //清除Store
        var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
        var store_XQ = grid_XQ.getStore();
        store_XQ.removeAll();
        var grid_DM = Ext.getCmp('Attendance_Major_DM');
        var store_DM = grid_DM.getStore();
        store_DM.removeAll();
        Ext.getCmp('Attendance_MajorAdd_PhotoImage').setSrc('/resource/images/photo.png');
        Ext.getCmp('Attendance_Major_TJ').setText('本次考勤缺勤人数：' + 0 + '人' + ' ');
        i = 0;
    },

    onAttendance_MajorAdd_CancelClick: function (button, e, eOpts) {
        Ext.Msg.show({
            title: '操作提示',
            msg: '你确定不执行保存操作吗？',
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.OKCANCEL,
            fn: function (btn) {
                if (btn === 'ok') {
                    button.up("window").hide();
                    var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
                    var store_XQ = grid_XQ.getStore();
                    store_XQ.removeAll();
                    var grid_DM = Ext.getCmp('Attendance_Major_DM');
                    var store_DM = grid_DM.getStore();
                    store_DM.removeAll();
                    Ext.getCmp('Attendance_MajorAdd_PhotoImage').setSrc('/resource/images/photo.png');
                    Ext.getCmp('Attendance_Major_TJ').setText('本次考勤缺勤人数：' + 0 + '人' + ' ');
                    i = 0;
                }
                else return;
            }
        });
    },

    //点名button
    onAttendance_Major_DMClick: function (button, e, eOpts) {
        i = 0;
        var way = Ext.getCmp('Attendance_Major_RollWay').getValue();
        if (way == null || way.toString().trim() == "")
        {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择点名方式',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var ElectiveNum = Ext.getCmp('Attendance_Major_nvcElectiveNum').getValue();
        var RollNum = null;
        var grid = Ext.getCmp('Attendance_Major_DM');
        var store = grid.getStore();
        var search_Combo = Ext.getCmp('Attendance_Major_RollWay').getValue();

        if (search_Combo !== null && search_Combo.toString().trim() !== "") {
            if (search_Combo == "随机") {
                RollNum = Ext.getCmp('Attendance_Major_RollNum').getValue();
            }
            else {
                RollNum = Ext.getCmp('Attendance_Major_RollNum').setValue(null);
            }
            if ((search_Combo == "随机") && (RollNum == "")) {
                Ext.Msg.show({
                    title: '提示',
                    msg: '请输入人数',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                return;
            }
            var data = ElectiveNum + ";" + search_Combo + ";" + RollNum;

            store.getProxy().setExtraParam('SearchInfo', data);
            loaddata(0);
        }
    },

    //撤销按钮
    onAttendance_Major_CXClick: function (button, e, eOpts) {
        if (i == 0) {
            Ext.Msg.show({
                title: '提示',
                msg: '已经第一位，撤销无效。',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        else {
            loaddata(--i);     
            var grid = Ext.getCmp('Attendance_Major_DM');
            var store = grid.getStore();
            var record_M=store.getAt(i);
          
            var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
            var store_XQ = grid_XQ.getStore();
            var count = store_XQ.getCount();
            var record = store_XQ.getAt(count-1);
 
            if (record_M.get('nvcStuNo') == record.get('nvcStuNo')) {
                store_XQ.removeAt(count - 1);
            }
                        
            var number = store_XQ.getCount();
            Ext.getCmp('Attendance_Major_TJ').setText('本次考勤缺勤人数：' + number + '人' + ' ');
        }
     
    },

    //已到按钮
    onAttendance_Major_YDClick: function (button, e, eOpts) {
        var grid = Ext.getCmp('Attendance_Major_DM');
        var store = grid.getStore();
        var num = store.getCount();
        if (i == num) {
            Ext.Msg.show({
                title: '提示',
                msg: '点名结束！',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        else
            loaddata(++i);
    },

    //缺勤button
    onAttendance_Major_QQClick: function (button, e, eOpts) {
        var grid = Ext.getCmp('Attendance_Major_DM');
        var store = grid.getStore();
        var num = store.getCount();
        if (i == num) {
            Ext.Msg.show({
                title: '提示',
                msg: '这已经是最后一人！',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var grid_DM = Ext.getCmp('Attendance_Major_DM');
        var store_DM = grid_DM.getStore();
        var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
        var store_XQ = grid_XQ.getStore();
        var record = store_DM.getAt(i);
        if (record == null) { return; }

        var data_XQ = {
            nvcStuNo: record.get('nvcStuNo'),
            nvcStuName: record.get('nvcStuName'),
            nvcClass: record.get('nvcClass'),
            nvcReason: '无故旷课',
        };
        store_XQ.add(data_XQ);
        var num = store_XQ.getCount();
        Ext.getCmp('Attendance_Major_TJ').setText('本次考勤缺勤人数：' + num + '人' + ' ');
        loaddata(++i);
    },

    //右击删除点名记录
    onAttendance_Major_XQClick: function (view, record, item, index, e, eOpts) {
        //alert("你确定要删除此条记录吗？")
        Ext.Msg.show({
            title: '注意',
            msg: '你确定要删除此条记录吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    {
                        var grid_XQ = Ext.getCmp('Attendance_Major_XQ');
                        var store_XQ = grid_XQ.getStore();
                        store_XQ.removeAt(index);
                        var number = store_XQ.getCount();
                        Ext.getCmp('Attendance_Major_TJ').setText('本次考勤缺勤人数：' + number + '人' + ' ');
                    }
                }
                if (btn === 'no') {

                }
            }
        })
    },


    init: function (application) {
        this.control({
            "#Attendance_MajorAdd_OK": {
                click: this.onAttendance_MajorAdd_OKClick
            },
            "#Attendance_MajorAdd_Cancel": {
                click: this.onAttendance_MajorAdd_CancelClick
            },
            '#DM_Btm': {
                click: this.onAttendance_Major_DMClick
            },
            '#CX_Btm': {
                click: this.onAttendance_Major_CXClick
            },

            '#YD_BTm': {
                click: this.onAttendance_Major_YDClick
            },
            '#QQ_Btm': {
                click: this.onAttendance_Major_QQClick
            },
            "#Attendance_Major_XQ": {
                itemcontextmenu: this.onAttendance_Major_XQClick,
            }
        });


    }
});
function loaddata(i) {

    var grid = Ext.getCmp('Attendance_Major_DM');
    var store = grid.getStore();
    store.on('load', function () {
        var record = store.getAt(i);
        if (record) {
            var sh = i + 1;
            var num = store.getCount();
            var total = sh + '/' + num;
            Ext.getCmp('Attendance_Major_StuNo').setValue(record.get('nvcStuNo'));
            Ext.getCmp('Attendance_MajorAdd_PhotoImage').setSrc(record.get('nvcStuPhoto'));
            Ext.getCmp('Attendance_Major_nvcStuName').setValue(record.get('nvcStuName'));
            Ext.getCmp('Attendance_Major_nvcClass').setValue(record.get('nvcClass'));
            Ext.getCmp('Attendance_Major_total').setValue(total);
        }
    }, this);
    store.load();
};

