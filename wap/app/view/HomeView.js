Ext.define('app.view.HomeView', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    alternateClassName: 'homeView',
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
                text: '个人',
                redirect: 'userInfo'
            }, {
                iconCls: 'compose blue',
                text: '考勤',
                redirect: 'attendanceList'
            }, {
                iconCls: 'star orange',
                id: 'homeAtt',
                text: '评教',
                redirect: 'evaluateList'
            }, {
                iconCls: 'action blue',
                id: 'homeVote',
                text: '投票',
                redirect: 'evaluateVote'
            }, {
                iconCls: 'supervisor roseRed',
                text: '更多',
                redirect: ''
            }]
        }]
    }
});