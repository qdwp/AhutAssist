Ext.define("app.view.userinfo.LoginView", {
    alternateClassName: 'userLogin',
    extend: 'Ext.form.Panel',
    id: 'panel',
    xtype: 'userLogin',
    requires: ['Ext.field.Toggle', 'Ext.form.FieldSet', 'Ext.field.Password'],
    config: {
        scrollable: null,
        title: '登录',
        redirect: null,
        items: [{
            xtype: 'fieldset',
            title: '<div style=font-size:15px>请输入用户名和密码</div>',
            instructions:'用户名为学号（工号）',
            defaults: {
                labelwidth: '40%',
                clearIcon: true
            },
            items: [{
                xtype: 'textfield',
                label: '帐号:',
                name: 'username',
                placeHolder: '请输入用户名'
            },
            {
                xtype: 'passwordfield',
                label: '密码:',
                name: 'password',
                placeHolder: '请输入密码'
            }
            ,
            {
                xtype: 'togglefield',
                label: '记住我',
                labelWidth: '60%',
                name: 'keepUser',
                value: true
            }
            ]
        },
        {
            layout: 'hbox',
            defaults: {
                ui: 'action'
            },
            items: [{
                xtype: 'button',
                action: 'login',
                style: 'margin-left:10%;',
                text: '登录',
                flex: 1,
                width: 100
            }, {
                xtype: 'spacer',
                width: 30
            },
            {
                xtype: 'button',
                action: 'reset',
                style: 'margin-right:10%;',
                text: '重置',
                flex: 1,
                width: 100,
                handler: function () {
                    panel.reset();
                }
            }]
        }]
    }
});