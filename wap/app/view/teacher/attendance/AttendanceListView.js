Ext.define('app.view.teacher.attendance.AttendanceListView', {
    alternateClassName: 'teaAttendanceList',
    extend: 'Ext.List',
    xtype: 'teaAttendanceList',
    config: {
        title: '课程考勤',
        store: 'teaAttendanceListStore',
        cls: 'list',
        selectedCls: '',
        itemTpl: new Ext.XTemplate(
            '<div class="bgdiv divline">',
                '<div><span class="gray">课程名称: </span><span class="orange">{nvcCourseName}</span></div>',
                '<div><span class="sm gray">课程号码: </span><span class="sm">{nvcElectiveNum}</span></div>',
                '<div><span class="sm gray">课程信息: </span><span class="sm">{timeAndPlace}</span></div>',
                '<div><span class="sm gray">点名次数: </span>{attendanceCount}</div>',
            '</div>'
        )
    }
});
