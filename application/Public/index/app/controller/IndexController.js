Ext.define('Index.controller.IndexController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'changepswbutton',
            selector: '#changepswbutton'
        },
        {
            ref: 'changpswview',
            selector: '#changpswview'
        },
        {
            ref: 'exitsysbutton',
            selector: '#exitsysbutton'
        },
        {
            ref: 'changepswsaveokbutton',
            selector: '#changepswsaveokbutton'
        }
    ],

    onExitsysbuttonClick: function (button, e, eOpts) {
        Ext.Msg.show({
            title: '操作提示',
            msg: '你确定要执行操作吗？',
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.OKCANCEL,
            fn: function (btn) {
                if (btn === 'ok') {
                    delCookie('id');
                    delCookie('uc');
                    delCookie('ln');
                    delCookie('rc');
                    delCookie('rn');
                    location.href = "/application/Logout.aspx";
                }
                else return;
            }
        });
    },

    onChangepswbuttonClick: function (button, e, eOpts) {
        var view = Ext.getCmp("Index_ChangePsw");
        if (!view) {
            view = Ext.create("Index.view.IndexChangePswView", {
                id: 'Index_ChangePsw'
            });
        }
        view.show();
    },
    onChangepswsaveokbuttonClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();

        var oldpsw = values.oldpsw.toString();
        var newpsw1 = values.newpsw1.toString();
        var newpsw2 = values.newpsw2.toString();

        if (!form.form.isValid()) {
            return;
        }

        if (newpsw1 !== newpsw2) {
            Ext.MessageBox.show({
                title: '提示',
                message: '新密码不一致',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }

        var data = {
            oldpsw: oldpsw,
            newpsw: newpsw1,
            logincode: gbl_logincode
        }

        Public.Index.ChangePsw(data, function (e, result) {
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
                win.close();
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

    },
    init: function (application) {
        this.control({
            "#exitsysbutton": {
                click: this.onExitsysbuttonClick
            },
            "#changepswbutton": {
                click: this.onChangepswbuttonClick
            },
            "#changepswsaveokbutton": {
                click: this.onChangepswsaveokbuttonClick
            }
        });
    }

});
