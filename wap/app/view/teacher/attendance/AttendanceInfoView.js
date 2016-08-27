Ext.define('app.view.teacher.attendance.AttendanceInfoView', {
    alternateClassName: 'teaAttendanceInfo',
    extend: 'Ext.Container',
    xtype: 'teaAttendanceInfo',
    config: {
        title: '课程考勤',
        cls: 'info',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                align: 'left',
                ui: 'back',
                name: 'cancelAtt',
                id: 'cancelAtt',
                text: '取消'
            }, {
                xtype: 'button',
                align: 'right',
                ui: 'forward',
                name: 'submitAtt',
                id: 'submitAtt',
                text: '提交'
            }]
        },
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                docked:'bottom',
                items: [{ xtype: 'spacer', width: '50px' },
                    {
                        xtype: 'button',
                        name: 'absent',
                        id: 'absent',
                        text: '缺勤',
                        ui: 'decline',
                        flex: 1,
                        height: 30
                    }, { xtype: 'spacer', width: '50px' },
                    {
                        xtype: 'button',
                        name: 'attend',
                        id: 'attend',
                        text: '已到',
                        ui: 'action',
                        flex: 1,
                        height: 30
                    }, { xtype: 'spacer', height: 100, width: '50px' }
                ]
            }]
    }
});
