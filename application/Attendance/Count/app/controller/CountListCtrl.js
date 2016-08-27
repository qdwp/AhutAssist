Ext.define('Attendance_Count.controller.CountListCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_Count_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        grid.down('#Attendance_Count_SearchText').setValue("");
        grid.down('#TJ_Main_Condition').setValue("");
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    onAttendance_Count_Search_Click: function (button, e, eOpts) {
        var grid = button.up('grid');
        var store = grid.getStore();
        var searchText = grid.down('#Attendance_Count_SearchText').getValue();
        var condition = grid.down('#TJ_Main_Condition').getValue();
        if (searchText !== null && searchText.toString().trim() !== "" && condition !== null && condition.toString().trim() !== "") {
            var data = condition + ";" + searchText;
            store.getProxy().setExtraParam('SearchInfo', data);
            store.load();
        }
        else {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择查询条件或输入查询内容',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
       
        },

    onAttendance_Count_ClickSpecialkey: function (button, e, eOpts) {

        if (e.keyCode == 13) {
            var grid = button.up('gridpanel');
            var button = grid.down('#Attendance_Count_Search');
            button.fireEvent("click", button);
        }
    },

    onTJ_main_wayChange: function (combo, records, Opts) {
        var way = Ext.getCmp('TJ_main_way').getValue();
        if (way == "全院学生旷课") {
            Ext.getCmp('TJ_Main_Stu').setTitle('全院学生旷课统计' + '');
            Ext.getCmp('TJ_Main_Stu').show();
            Ext.getCmp('TJ_Main_Class').hide();
            Ext.getCmp('TJ_Main_Major').hide();
        }
        if (way == "全院班级倒叙") {
            Ext.getCmp('TJ_Main_Class').setTitle('全院班级倒序统计' + '');
            Ext.getCmp('TJ_Main_Stu').hide();
            Ext.getCmp('TJ_Main_Class').show();
            Ext.getCmp('TJ_Main_Major').hide();
        }
        if (way == "全院专业倒叙") {
            Ext.getCmp('TJ_Main_Major').setTitle('全院专业倒序统计' + '');
            Ext.getCmp('TJ_Main_Stu').hide();
            Ext.getCmp('TJ_Main_Class').hide();
            Ext.getCmp('TJ_Main_Major').show();
        }
    },

    onTJ_main_Assist_wayChange: function (combo, records, Opts) {
        var way = Ext.getCmp('TJ_main_Assist_way').getValue();
        if (way == "学生旷课") {
            Ext.getCmp('TJ_Main_Assist_Stu').setTitle('学生旷课统计' + '');
            Ext.getCmp('TJ_Main_Assist_Stu').show();
            Ext.getCmp('TJ_Main_Assist_Class').hide();
        }
        if (way == "班级倒叙") {
            Ext.getCmp('TJ_Main_Assist_Class').setTitle('班级倒序统计' + '');
            Ext.getCmp('TJ_Main_Assist_Stu').hide();
            Ext.getCmp('TJ_Main_Assist_Class').show();
        }
    },

    onTJ_main_School_wayChange: function (combo, records, Opts) {
        var way = Ext.getCmp('TJ_main_School_way').getValue();
        if (way == "全校学生旷课") {
            Ext.getCmp('TJ_Main_School_Stu').setTitle('全校学生旷课统计' + '');
            Ext.getCmp('TJ_Main_School_Stu').show();
            Ext.getCmp('TJ_Main_School_Class').hide();
            Ext.getCmp('TJ_Main_School_Major').hide();
        }
        if (way == "全校班级倒叙") {
            Ext.getCmp('TJ_Main_School_Class').setTitle('全校班级倒序统计' + '');
            Ext.getCmp('TJ_Main_School_Stu').hide();
            Ext.getCmp('TJ_Main_School_Class').show();
            Ext.getCmp('TJ_Main_School_Major').hide();
        }
        if (way == "全校专业倒叙") {
            Ext.getCmp('TJ_Main_School_Major').setTitle('全校专业倒序统计' + '');
            Ext.getCmp('TJ_Main_School_Stu').hide();
            Ext.getCmp('TJ_Main_School_Class').hide();
            Ext.getCmp('TJ_Main_School_Major').show();
        }
    },




    init: function (application) {
        this.control({
            "#Attendance_Count_Display": {
                click: this.onAttendance_Count_Display
            },
            "#Attendance_Count_SearchText": {
                specialkey: this.onAttendance_Count_ClickSpecialkey
            },
            "#Attendance_Count_Search": {
                click: this.onAttendance_Count_Search_Click
            },
            '#TJ_main_way': {
                change: this.onTJ_main_wayChange
            },
            '#TJ_main_Assist_way': {
                change: this.onTJ_main_Assist_wayChange
            },
            '#TJ_main_School_way': {
                change: this.onTJ_main_School_wayChange
            }

        });
    }

});