Ext.define('app.view.student.attendance.AttendanceListView', {
    alternateClassName: 'attendanceList',
    extend: 'Ext.List',
    xtype: 'attendanceList',
    config: {
        title: '学生考勤记录',
        store: 'attendanceListStore',
        cls: 'list',
        selectedCls: '',
        items: [{
            xtype: 'toolbar',
            id: 'selectTimeBar',
            name: 'yearAndTerm',
            height: '20',
            docked: 'top',
            items: [{
                xtype: 'selectfield',
                usePicker: true,
                id: 'selectYear',
                name: 'selectYear',
                width: '55%',
                height: '20',
                style: {
                    'font-size': '18px',
                },
                store: 'attendanceYearStore',
                valueField: 'nvcYear',
                displayField: 'nvcYear'
            }, {
                xtype: 'selectfield',
                usePicker: true,
                id: 'selectTerm',
                name: 'selectTerm',
                width: '30%',
                height: '20',
                style: {
                    'font-size': '18px',
                },
                store: 'attendanceTermStore',
                valueField: 'nvcTerm',
                displayField: 'nvcTerm'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                action: 'selectBtn',
                cls: 'selectbtn',
                width: '15%',
                iconCls: 'search',
                iconAlign: 'center'
            }, {
                xtype: 'spacer'
            }]
        }],
        itemTpl: new Ext.XTemplate(
            '<div class="bh">',
                '<div class="b1">',
                    '<div>{nvcCourseName}</div><div class="sm gray">任课教师：{nvcName}</div>',
                '</div>',
                '<div class="right w7" style="width:auto;"><div class="gray"><font color=FF0000>{nvcReason}</font></div><div class="sm">{dtmRollTime}</div></div>',
            '</div>'
            //,



        //    '<tpl if="nvcCourseName!=null">',
        //'<div class="class">',
        //    //'<h3>{nvcCourseName} - {nvcName} - <font color=FF0000>{intCount}</font></h3>',
        //    '<div class="listHeader">',
        //        '<div class="title" style="width:10%">序号</div>',
        //        '<div class="title" style="width:35%">考勤时间</div>',
        //        //'<div class="title" style="width:25%">考勤方式</div>',
        //        '<div class="title" style="width:30%">缺勤原因</div>',
        //    '</div>',
        //    '<tpl for="attendanceInfoModels">',
        //        '<div class="detail">',
        //            '<div style="width:10%">{#}</div>',
        //            '<div style="width:35%">{dtmRollTime}</div>',
        //            //'<div style="width:25%">{nvcRollWay}</div>',
        //            '<div style="width:30%">{nvcReason}</div>',
        //        '</div>',
        //    '</tpl>',
        //'</div>',
        //    '</tpl>',
        //'<tpl if="nvcCourseName==null">',
        //    '<div style="text-align:center;line-height: 200px;color:#333333;">恭喜您，当前学期没有缺勤记录</div>',
        //'</tpl>'
        )
    }
});
