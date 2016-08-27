Ext.define('Evaluate_Vote.controller.VoteAddCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_VoteAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
   //     var ip = returnCitySN["cip"];
      //  values.nvcIP = ip;
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
        var data = {
            nvcElectiveNum: values.nvcElectiveNum,
            nvcStuNo: gbl_logincode,
            nvcName: values.nvcName,
            nvcIP: values.nvcIP,
            nvcTerminal: Terminal,
            nvcTeacher: values.nvcTeacher
        };
        Evaluate.Vote.Add(data, function (e, result) {
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
                win.down('#Evaluate_VoteAdd_PhotoImage').setSrc("/resource/images/photo.png");
                win.hide();
                var grid = Ext.getCmp('Evaluate_Vote_List').down('gridpanel');
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
    onEvaluate_VoteAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    onEvaluate_VoteAdd_PhotoFilesChange: function (textfield, e, eOpts) {
        var win = textfield.up('window');
        var src = textfield.getValue();
        if (src.trim() == "") {
            src = "/resource/images/photo.png";
        }
        win.down('#Evaluate_VoteAdd_PhotoImage').setSrc(src);
    },

    init: function (application) {
        this.control({

            "#Evaluate_VoteAdd_OK": {
                click: this.onEvaluate_VoteAdd_OKClick
            },
            "#Evaluate_VoteAdd_Cancel": {
                click: this.onEvaluate_VoteAdd_CancelClick
            },
            '#Evaluate_VoteAdd_PhotoFiles': {
                 change: this.onEvaluate_VoteAdd_PhotoFilesChange
        }
        });
    }
});