/*
*教师考勤执行 2015-08-15 16:06:47
*/
Ext.define('app.controller.teacher.AttendanceCtr', {
    extend: 'Ext.app.Controller',
    requires: ['ux.NavigationView'],
    config: {
        models: [
            'teacher.attendance.AttendanceListModel',
            'teacher.attendance.AttendanceDetailModel'
        ],
        stores: [
            'teacher.attendance.AttendanceListStore',
            'teacher.attendance.AttendanceDetailStore'
        ],
        views: [
            'teacher.attendance.AttendanceListView',
            'teacher.attendance.AttendanceInfoView',
            'teacher.attendance.AttendanceDetailView'
        ],
        refs: {
            main: 'main',
            teaAttendanceList: 'teaAttendanceList',
            teaAttendanceInfo: 'teaAttendanceInfo',
            teaAttendanceDetail: 'teaAttendanceDetail',
            cancelAtt: 'button[name=cancelAtt]',
            submitAtt: 'button[name=submitAtt]',
            absent: 'teaAttendanceInfo button[id=absent]',
            attend: 'teaAttendanceInfo button[id=attend]',
            leave: 'teaAttendanceInfo button[id=leave]'
        },
        control: {
            teaAttendanceList: {
                initialize: function (list) {
                    if (!config.user.nvcLoginCode) {
                        util.showMessage("请先登录...", true);
                    } else {
                        var params = {
                            userno: config.user.nvcLoginCode,
                            term: config.time.nvcYear + "-" + config.time.nvcTerm
                        };
                        util.storeLoad(list, params);
                    }
                },
                //List单击事件 【开始点名】
                itemtap: function (list, index, target, record, e) {
                    //如果在多选状态停止后续事件的执行
                    if (list.isSimple) {
                        e.stopEvent();
                        list.isSimple = false;
                    } else {
                        var me = this;
                        var picker = new Ext.field.Select({
                            label: '点名方式',
                            autoSelect: false,
                            usePicker: true,
                            options: [
                                { text: '全点', value: '1' },
                                { text: '随机', value: '2' },
                                { text: '学分绩点', value: '3' },
                                { text: '课堂缺勤', value: '4' },
                                { text: '重点考察', value: '5' }
                            ],
                            listeners: {
                                change: function (newValue, oldValue, eOpts) {
                                    var sel = this.getRecord().getData().value;
                                    switch (sel) {
                                        case "1": me.Attend_First(record, me); break;
                                        case "2": me.Attend_Second(record, me); break;
                                        case "3": me.Attend_Third(record, me); break;
                                        case "4": me.Attend_Fourth(record, me); break;
                                        case "5": me.Attend_Fifth(record, me); break;
                                    }
                                }
                            }
                        });
                        picker.showPicker();
                    }
                },
                //List长按事件 【查看详情】
                itemtaphold: function (list, index, target, record, e) {
                    list.isSimple = true;
                    this.redirectTo('redirect/teaAttendanceDetail');
                    var view = this.getTeaAttendanceDetail();
                    var params = {
                        nvcElectiveNum: record.get('nvcElectiveNum')
                    };
                    util.storeLoad(view, params);
                }
            },
            //初始化 点名页
            teaAttendanceInfo: {
                initialize: function () {
                    //保存缺勤学生学号 全局变量
                    absentNo = null;
                    Ext.getCmp('backBtn').hide();
                }
            },
            //取消 按钮
            cancelAtt: {
                tap: function (t) {
                    var me = this;
                    if (Ext.getCmp('slider')) {
                        Ext.getCmp('slider').hide();
                        Ext.getCmp('slidernumber').hide();
                    }
                    var confirm = Ext.Msg.show({
                        title: '是否确认取消本次点名？',
                        buttons: [{
                            text: '取消', itemId: 'cancel'
                        }, {
                            text: '确认', itemId: 'ok'
                        }],
                        width: 300,
                        fn: function (buttonId) {
                            if (buttonId === "ok") {
                                absentNo = null;
                                me.attBack();
                            }
                        }
                    });
                    confirm.show();
                }
            },
            //提交 按钮
            submitAtt: {
                tap: function (t) {
                    if (Ext.getCmp('slider')) {
                        Ext.getCmp('slider').hide();
                        Ext.getCmp('slidernumber').hide();
                    }
                    var me = this,
                        v = this.getTeaAttendanceInfo();
                    if (!absentNo && !total) {
                        Ext.Msg.alert('没有加载到数据，请点击【取消】返回');
                        Ext.Msg.show({
                            title: '没有加载到数据',
                            message: '请点击【确认】返回课程列表',
                            width: 300,
                            buttons: [{
                                text: '取消', itemId: 'cancel'
                            }, {
                                text: '确认', itemId: 'ok'
                            }],
                            fn: function (buttonId) {
                                if (buttonId === "ok") {
                                    me.attBack();
                                }
                            }
                        });
                        return;
                    }
                    Ext.Ajax.request({
                        url: config.teaattendance.att,
                        method: 'POST',
                        params: {
                            nvcElectiveNum: nvcElectiveNum,
                            nvcLoginCode: config.user.nvcLoginCode,
                            absentNo: absentNo,
                            nvcIP: util.getIP(),
                            nvcTerminal: util.getTerminalType()
                        },
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                Ext.Msg.alert("保存成功,本次点名共缺勤 " + result.index + " 人");
                            } else {
                                Ext.Msg.alert("错误信息", "服务器操作失败");
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert("错误信息", "请求服务器失败");
                        }
                    });
                    this.attBack();
                }
            },
            //缺勤 按钮
            absent: {
                tap: function () {
                    if (!absentNo && !total) {
                        return;//没有数据时，点击无效【已隐藏按钮】
                    }
                    if (index + 1 > total) {
                        util.showMessage("点名结束，请提交点名结果", true);
                    } else {
                        var me = this;
                        var store = Ext.create("Ext.data.Store", {
                            storeId: 'pickerStore',
                            data: [
                                { text: '无故旷课', value: '无故旷课' },
                                { text: '事假', value: '事假' },
                                { text: '病假', value: '病假' },
                                { text: '迟到', value: '迟到' }
                            ]
                        });
                        var picker = new Ext.field.Select({
                            label: '缺勤原因',
                            store: 'pickerStore',
                            autoSelect: false,
                            valueField: 'value',
                            displayField: 'text',
                            usePicker: true,
                            listeners: {
                                change: function (t, record, eOpts) {
                                    //获取缺勤学生的学号 2015-08-17 20:26:03 [html = view.getActiveItem().getHtml(),]
                                    var view = me.getTeaAttendanceInfo(),
                                        html = view.getHtml(),
                                        arr = html.split('：'),
                                        stuNo = arr[2].substring(0, 9),
                                        val = this.getRecord().getData().value;
                                    if (absentNo == null) {
                                        absentNo = stuNo + "," + val;
                                    } else {
                                        absentNo += ";" + stuNo + "," + val;
                                    }

                                    index += 1;
                                    if (index < total) {
                                        me.loadRecord();
                                    }
                                    if (index + 1 > total) {
                                        util.showMessage("点名结束，请提交点名结果", true);
                                    }
                                }
                            }
                        });
                        picker.showPicker();

                    }
                }
            },
            //已到 按钮
            attend: {
                tap: function () {
                    if (!absentNo && !total) {
                        return;//没有数据时，点击无效【已隐藏按钮】
                    }
                    index += 1;
                    if (index > total) {
                        util.showMessage("点名结束，请提交点名结果", true);
                    } else {
                        if (index < total) {
                            this.loadRecord();
                        }
                        if (index + 1 > total) {
                            util.showMessage("点名结束，请提交点名结果", true);
                        }
                    }
                }
            }

        }
    },
    //执行显示下一条学生记录
    loadRecord: function () {
        var tpl = new Ext.XTemplate(
            '<div >',
            '<br/><br/>',
                '<div class="pic"><img src="{nvcStuPhoto}"/></div>',
                '<div class="stuInfo">姓名：{nvcStuName}</div>',
                '<div class="stuInfo">学号：{nvcStuNo}</div>',
                '<div class="stuInfo">班级：{nvcClass}</div>',
                '<div class="stuInfo" id="rate"></div>',
            '</div>'
            )
        if (index <= total) {
            var html = null;
            if (flag == 2) {
                html = tpl.apply(data[tempArray[index]]);
            } else {
                html = tpl.apply(data[index]);
            }
            //Ext.getCmp('stuInfo').setHtml(html);
            var view = this.getTeaAttendanceInfo();
            view.setHtml(html);
            //追加显示进度
            this.appendRate();
        }
    },
    //开始点名，且只执行一次，显示第一个学生的记录
    Attendance: function (view, record, me) {
        //定义全局变量
        nvcElectiveNum = record.get('nvcElectiveNum');
        data = record.get('student');
        index = 0;
        total = data.length;
        //total = record.get('totalCount');
        //点名时可选人数，将显示的最大值设置为选定的值
        if (flag == 2) {
            tempArray = me.getRandom(total);
            if (total > Ext.getCmp('slider').getValue()) {
                total = Ext.getCmp('slider').getValue();
            }
        } else if (flag == 3 || flag == 4) {
            if (total > Ext.getCmp('slider').getValue()) {
                total = Ext.getCmp('slider').getValue();
            }
        }
        me.loadRecord();

    },
    //追加 点名进度显示
    appendRate: function () {
        Ext.DomHelper.append('rate', {
            html: '进度：' + (index + 1) + ' / ' + total
        });
    },
    //“提交” 或 “取消” 后执行
    attBack: function () {
        Ext.getCmp('cancelAtt').destroy();
        Ext.getCmp('submitAtt').destroy();
        Ext.getCmp('backBtn').show();
        this.getMain().doPop(true);
        var params = {
            userno: config.user.nvcLoginCode,
            term: config.time.nvcYear + "-" + config.time.nvcTerm
        };
        util.storeLoad(this.getTeaAttendanceList(), params);
    },
    //点名方式 全点
    Attend_First: function (record, me) {
        flag = 1;
        me.redirectTo('redirect/teaAttendanceInfo');
        var view = me.getTeaAttendanceInfo();
        me.doRequest(config.attendways.first, view, record, me);
    },
    //点名方式 随机
    Attend_Second: function (record, me) {
        flag = 2;
        me.sliderMembers(config.attendways.first, record, me);
    },
    //点名方式 学分绩点
    Attend_Third: function (record, me) {
        flag = 3;
        me.sliderMembers(config.attendways.cecond, record, me);
    },
    //点名方式 课堂缺勤
    Attend_Fourth: function (record, me) {
        flag = 4;
        me.sliderMembers(config.attendways.third, record, me);
    },
    //点名方式 重点考察
    Attend_Fifth: function (record, me) {
        flag = 5;
        me.redirectTo('redirect/teaAttendanceInfo');
        var view = me.getTeaAttendanceInfo();
        me.doRequest(config.attendways.fourth, view, record, me);
    },
    //显示Slider滑动条，确定选择人数
    sliderMembers: function (url, record, me) {
        var slider = Ext.Msg.show({
            title: '请选择人数',
            width: 300,
            buttons: [{
                text: '取消', itemId: 'cancel'
            }, {
                text: '确认', itemId: 'ok'
            }],
            items: [{
                margin: '0 auto 0 3',
                items: [{
                    xtype: 'numberfield',
                    label: '选定人数',
                    labelWidth: '45%',
                    disabled: true,
                    width: 280,
                    value: 10,       /////////////// 默认设置为 10 【待修改】
                    id: 'slidernumber'
                }, {
                    xtype: 'sliderfield',
                    id: 'slider',
                    value: 10,       /////////////// 默认设置为 10 【待修改】
                    increment: 1,
                    width: 280,
                    minValue: 1,
                    maxValue: record.get('totalCount'),
                    listeners: {
                        drag: function (sl, thumb, e, eOpts) {
                            Ext.getCmp('slidernumber').setValue(this.getValues());
                        },
                        change: function (value, eOpts) {
                            Ext.getCmp('slidernumber').setValue(this.getValues());
                        }
                    }
                }]
            }],
            fn: function (buttonId) {
                console.log(buttonId);
                if (buttonId === "ok") {
                    me.redirectTo('redirect/teaAttendanceInfo');
                    var view = me.getTeaAttendanceInfo();
                    me.doRequest(url, view, record, me);
                }
            },
            scope: this
        });
        slider.show();
    },
    //获取随机数
    getRandom: function (count) {
        var originalArray = new Array;
        for (var i = 0; i < count; i++) {
            originalArray[i] = i;
        }
        originalArray.sort(function () {
            return 0.5 - Math.random();
        });
        return originalArray;
    },
    //执行请求数据
    doRequest: function (url, view, record, me) {
        //随机时和全点时同样获取所有学生信息
        Ext.Ajax.request({
            url: url,
            params: { nvcElectiveNum: record.get('nvcElectiveNum') },
            success: function (result, request) {
                var result = Ext.decode(result.responseText);
                if (result.success && result.total != 0) {
                    record.set(result);
                    me.Attendance(view, record, me);
                } else {
                    util.showMessage("没有获取到数据！", true);
                    Ext.getCmp('absent').hide();
                    Ext.getCmp('attend').hide();
                    total = false;
                }
            }
        });
    }

});