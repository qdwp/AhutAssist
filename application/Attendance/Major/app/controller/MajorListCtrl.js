Ext.define('Attendance_Major.controller.MajorListCtrl', {
    extend: 'Ext.app.Controller',
  //  点击按钮触发点名事件
    onAttendance_Major_AddClick: function (button, e, eOpts) {    
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择课程.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var win = Ext.getCmp("Attendance_Major_Add");
        if (!win) {
            win = Ext.create('Attendance_Major.view.MajorAddView', {
                id: 'Attendance_Major_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        var name = row.get('nvcCourseName');
        Ext.getCmp('Attendance_Major_Add').setTitle("学期：" + gbl_term + " &nbsp&nbsp" + "课程名称:" + name);
        win.show();
    },
    //双击触发点名事件
    onAttendance_Major_main_dbClick: function (grid, record, item, index, e, eOpts)
    {
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        var win = Ext.getCmp("Attendance_Major_Add");
        if (!win) {
            win = Ext.create('Attendance_Major.view.MajorAddView', {
                id: 'Attendance_Major_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        var name = row.get('nvcCourseName');
        Ext.getCmp('Attendance_Major_Add').setTitle("学期：" + gbl_term + " &nbsp&nbsp" +"课程名称:"+ name);
        win.show();
    },
    //点击按钮触发详情
    onAttendance_Major_DetailClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择课程.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var win = Ext.getCmp("Attendance_Major_Detail");
        if (!win) {
            win = Ext.create('Attendance_Major.view.MajorDetailView', {
                id: 'Attendance_Major_Detail'
            });
        }
        else {
            win.down('form').form.reset();
        }
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        var ElectiveNum = row.get('nvcElectiveNum');
        var CourseName = row.get('nvcCourseName');
        Ext.getCmp('Attendance_Major_Detail').down('#Detail_ElectiveNum').setText('课程号:' + ElectiveNum);
        Ext.getCmp('Attendance_Major_Detail').down('#Detail_CourseName').setText('课程名称:' + CourseName);
        Ext.getCmp('Attendance_Major_Detail').setTitle("学期：" + gbl_term + " &nbsp&nbsp" + CourseName);

        Ext.getCmp('Attendance_Major_All').show();
        Ext.getCmp('Attendance_Major_DE').hide();

        win.show();
    },
    //点击按钮触发导出事件
    onAttendance_Major_callrolloutClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length != 1) {
            Ext.Msg.show({
                title: '提示',
                msg: '有且只能选择一门课程进行导出Excel.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            })
        }
        else {
            msgTip = Ext.MessageBox.show({
                title: '提示',
                width: 250,
                msg: '正在导出,请稍后......'
            });
        }
        var row = rows[0];
        var nvcCourseNo = row.get('nvcElectiveNum');//课程号
        var nvcCourseName = row.get('nvcCourseName');//课程名称
        var nvcCourseDetail = row.get('timeAndPlace');//课程上课时间地点
        var nvcFacultyCode = gbl_logincode;//教师工号
        var nvcFacultyName = gbl_loginname;//教师姓名
        var nvcDepartmentName = gbl_deptname;//教师单位
        var url = "/ajax/Export/CallOutToExcelHandler.ashx?cn=" + escape(nvcCourseNo) + "&cm=" + escape(nvcCourseName) + "&cd=" + escape(nvcCourseDetail) + "&fc=" + escape(nvcFacultyCode) + "&fn=" + escape(nvcFacultyName) + "&dn=" + escape(nvcDepartmentName);
        msgTip.hide();    // 加载完成，关闭提示框
        location.href = url;
    },

    init: function (application) {
        this.control({
            "#Attendance_Major_Add": {
                click: this.onAttendance_Major_AddClick
            },
            "#Attendance_Major_main": {
                itemdblclick: this.onAttendance_Major_main_dbClick
            },
            "#Attendance_Major_Detail": {
                click: this.onAttendance_Major_DetailClick
            },
            "#Attendance_Major_callrollout": {
                click: this.onAttendance_Major_callrolloutClick
            }
        });
    }

});