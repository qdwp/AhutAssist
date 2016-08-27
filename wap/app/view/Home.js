Ext.define('app.view.Home', {
    extend: 'Ext.Container',
    xtype: 'home',
    alternateClassName: 'home',
    config: {
        title: '安工大教辅系统',
        fullscreen: true,
        layout: 'vbox',
        defaults: {
            layout: 'hbox'
        },
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                align: 'right',
                action: 'exit',
                cls: 'exit',
                iconCls: 'exitSystem',
                iconAlign: 'center'
            }]
        },
        items: [{
            xtype: 'spacer',
            html: '<br/><div style=font-size:10px>&nbsp&nbsp当前是<font color=ff0000> 2015-2016 </font>学年第<font color=ff0000> 1 </font>学期</div><br/>'
        }, {
            xtype: 'toolbar',
            cls: 'homeBar',
            docked: 'bottom',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                flex: 1,
                action: 'redirect'
            },
            items: [{
                iconCls: 'user green',
                text: '教师',
                redirect: 'userInfo'
            }
            , {
                iconCls: 'compose blue',
                text: '考勤',
                redirect: 'teaAttendanceList'
            },
            {
                iconCls: 'star orange',
                text: '评教',
                redirect: 'teaEvaluateList'
            }, {
                iconCls: 'action blue',
                text: '投票',
                redirect: ''//'teaEvaluateVote'
            },
            {
                iconCls: 'supervisor roseRed',
                text: '督导',
                redirect: ''
            }
            ]
        }]
    }
});