Ext.define('app.view.teacher.attendance.AttendanceDetailView', {
    alternateClassName: 'teaAttendanceDetail',
    extend: 'Ext.List',
    xtype: 'teaAttendanceDetail',
    config: {
        title: '考勤详情',
        cls: 'info',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        store: 'teaAttendanceDetailStore',
        itemTpl: new Ext.XTemplate(
            '<div class="bh">',
            '   <div class="b1">',
            '       <div>{nvcStuNo}&nbsp&nbsp&nbsp&nbsp{nvcStuName}</div>',
            '   </div>',
            '   <div class="right">缺勤 <font color=ED5F12>{absentCount}</font> 次</div>',
            '</div>'
            )
    }
});
