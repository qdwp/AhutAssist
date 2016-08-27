Ext.define('BaseInfo_CourseStu.controller.CourseStuEditCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_CourseStuEdit_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        ////断网测试
        //var ip = returnCitySN["cip"];
        //    values.nvcIP = ip;
        var Terminal = values.nvcTerminal;
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent)
                || /Android/i.test(navigator.userAgent)
                || /BlackBerry/i.test(navigator.userAgent)
                || /IEMobile/i.test(navigator.userAgent)
                || (/HTC|MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            Terminal = 1;
        } else {
            Terminal = 0;
        }
        values.nvcTerminal = Terminal;
        values.intIsEvaluate = 1;
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),
            nvcCourseName: values.nvcCourseName,
            nvcStuNo: values.nvcStuNo,
            nvcStuName: values.nvcStuName,
            nvcName: values.nvcName,
            nvcEvaGrade: values.nvcEvaGrade,
            intScore: values.intScore,
            nvcElectiveNum: values.nvcElectiveNum,
            intIsEvaluate: values.intIsEvaluate,
            nvcContents: values.nvcContents,
            dtmLeaveTime: values.dtmLeaveTime,
            nvcIP: values.nvcIP,
            nvcTerminal: values.nvcTerminal
        };
  

        BaseInfo.CourseStu.Edit(data, function (e, result) {
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
                var grid = Ext.getCmp('BaseInfo_CourseStu_List').down('gridpanel');
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

    onBaseInfo_CourseStuEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    onBaseInfo_CourseStuEdit_nvcEvaGradeChange: function (combo, records, Opts) {
        var store = combo.getStore();
        var value = combo.getValue();
        for (var i = 0; i < store.getCount() ; i++) {
            var record = store.getAt(i);
            if (record.get('nvcEvaGrade') == value) {
                Ext.getCmp('BaseInfo_CourseStuEdit_intScore').maxValue = record.get('intHighMark');
                Ext.getCmp('BaseInfo_CourseStuEdit_intScore').minValue = record.get('intLowMark');
                Ext.getCmp('BaseInfo_CourseStuEdit_intScore').setValue(record.get('intLowMark'));
                return;
            }
        }
    },

    init: function (application) {
        this.control({

            "#BaseInfo_CourseStuEdit_OK": {
                click: this.onBaseInfo_CourseStuEdit_OKClick
            },
            "#BaseInfo_CourseStuEdit_Cancel": {
                click: this.onBaseInfo_CourseStuEdit_CancelClick
            },
            '#BaseInfo_CourseStuEdit_nvcEvaGrade': {
                change: this.onBaseInfo_CourseStuEdit_nvcEvaGradeChange
            }
        });
    }

});
