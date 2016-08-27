/*
*学生考勤结果查询
*/
Ext.define('app.controller.student.AttendanceCtr', {
    extend: 'Ext.app.Controller',
    config: {
        models: [
            'student.attendance.AttendanceListModel',
            'student.attendance.AttendanceYearModel',
            'student.attendance.AttendanceTermModel'
        ],
        stores: [
            'student.attendance.AttendanceListStore',
            'student.attendance.AttendanceYearStore',
            'student.attendance.AttendanceTermStore'
        ],
        views: [
            'student.attendance.AttendanceListView'
        ],
        refs: {
            attendanceList: 'attendanceList',
            selectBtn: 'attendanceList button[action=selectBtn]'
        },
        control: {
            attendanceList: {
                initialize: function (list) {
                    console.log("year and term Store", Ext.getCmp('selectYear').getStore());
                    if (!config.user.nvcStuNo) {
                        util.showMessage("请先登录...", true);
                    } else {
                        var params = {
                            userno: config.user.nvcStuNo,
                            nvcYear: config.time.nvcYear,
                            nvcTerm: config.time.nvcTerm
                        };
                        util.getStoreLoad(list, params);
                        var yearStore = Ext.getCmp('selectYear').getStore();
                        var termStore = Ext.getCmp('selectTerm').getStore();
                        yearStore.load();
                        termStore.load();
                    }
                },
                itemtap: function (list, index, target, record, e) {
                    //如果在多选状态停止后续事件的执行
                    if (list.isSimple) {
                        e.stopEvent();
                        list.isSimple = false;
                    } else {
                        console.log("单击");

                    }
                },
                itemtaphold: function (list, index, target, record, e) {
                    list.isSimple = true;
                    console.log("长按");

                }
            },
            selectBtn: {
                tap: function () {
                    console.log("selectYear", Ext.getCmp('selectYear').getValue());
                    console.log("selectTerm", Ext.getCmp('selectTerm').getValue());
                    if (!config.user.nvcStuNo) {
                        util.showMessage("请先登录...", true);
                    } else {
                        var list = this.getAttendanceList();
                        var params = {
                            userno: config.user.nvcStuNo,
                            nvcYear: Ext.getCmp('selectYear').getValue(),
                            nvcTerm: Ext.getCmp('selectTerm').getValue()
                        };
                        util.getStoreLoad(list, params);
                    }
                }
            }
        }
    }
});