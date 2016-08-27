/*
*跳转主控
*/
Ext.define('app.controller.student.EvaluateCtr', {
    extend: 'Ext.app.Controller',
    config: {
        models: [
            'student.evaluate.EvaluateListModel',
            'student.evaluate.EvaluateVoteModel',
            'student.evaluate.EvaluateLevelModel'
        ],
        stores: [
            'student.evaluate.EvaluateListStore',
            'student.evaluate.EvaluateVoteStore',
            'student.evaluate.EvaluateLevelStore'
        ],
        views: [
            'student.evaluate.EvaluateListView',
            'student.evaluate.EvaluateInfoView',
            'student.evaluate.EvaluateVoteView'
        ],
        //引用
        refs: {
            evaluateInfo: 'evaluateInfo',
            evaluateList: 'evaluateList',
            evaluateVote: 'evaluateVote',
            evaluateBtn: 'evaluateInfo button[action=evaAct]'
        },
        control: {
            //
            evaluateList: {
                initialize: function (list) {
                    var me = this;
                    var param = {
                        nvcYear: config.time.nvcYear,
                        nvcTerm: config.time.nvcTerm
                    }
                    Ext.Ajax.request({
                        url: config.evaluate.valid,
                        method: 'POST',
                        params: {
                            nvcYear: config.time.nvcYear,
                            nvcTerm: config.time.nvcTerm
                        },
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                var param = {
                                    userno: config.user.nvcStuNo,
                                    nvcYear: config.time.nvcYear,     // 【待修改】
                                    nvcTerm: config.time.nvcTerm
                                    //nvcYear: '2015-2016',
                                    //nvcTerm: '1'
                                };
                                util.storeLoad(list, param);
                                if (!config.user.nvcStuNo) {
                                    util.showMessage("请先登录...", true);
                                }
                            } else {
                                Ext.Msg.alert("错误信息", "现在不是评教时间");
                                me.redirectTo('redirect');
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert("错误信息", "请求服务器失败");
                        }
                    });

                },
                itemtap: function (list, index, target, record, e) {
                    //评教后不得再次评教
                    if (record.getData().intIsEvaluate == "1") {
                        util.showMessage("您已评价该课程...", true);
                        return;
                    }
                    this.redirectTo('redirect/evaluateInfo');
                    util.recordLoad(record, this.getEvaluateInfo(), config.evaluate.info, {
                        id: record.get('ID')
                    },
                    'intIsEvaluate');
                    var levelStore = Ext.getCmp('nvcEvaGrade').getStore();
                    levelStore.load();
                }
            }
            ,
            evaluateBtn: {
                tap: function () {
                    Ext.Msg.show({
                        title: "确认",
                        message: "是否确认评价该课程？",
                        width: 300,
                        buttons: [{
                            text: '取消', itemId: 'cancel'
                        }, {
                            text: '确认', itemId: 'ok'
                        }],
                        fn: function (buttonId) {
                            if (buttonId === "ok") {
                                var eva = this.getEvaluateInfo().getRecord().getData();
                                //获取IP,终端类型
                                var ip = util.getIP(),
                                    Terminal = util.getTerminalType(),
                                    list = this.getEvaluateList();
                                var me = this;
                                Ext.Ajax.request({
                                    url: config.evaluate.submit,
                                    method: 'POST',
                                    //timeout: 10000,
                                    params: {
                                        ID: eva.ID,
                                        nvcEvaGrade: Ext.getCmp("nvcEvaGrade").getValue(),
                                        intScore: Ext.getCmp("intScore").getValue(),
                                        nvcContents: Ext.getCmp("nvcContents").getValue(),
                                        nvcIP: ip,
                                        nvcTerminal: Terminal
                                    },
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.success) {
                                            //刷新列表并跳转返回
                                            me.freshList(list);
                                            me.redirectTo('redirect');
                                            //显示小图标，表示当前未评教课程数
                                            Ext.Ajax.request({
                                                url: config.evaluate.init,
                                                method: 'POST',
                                                params: {
                                                    nvcStuNo: config.user.nvcStuNo,
                                                    nvcYear: config.time.nvcYear,     // 【待修改】
                                                    nvcTerm: config.time.nvcTerm
                                                    //nvcYear: '2015-2016',
                                                    //nvcTerm: '1'
                                                },
                                                success: function (res) {
                                                    var r = Ext.decode(res.responseText);
                                                    if (r.count > 0) {
                                                        Ext.getCmp('homeAtt').setBadgeText(r.count);
                                                    }
                                                    else {
                                                        Ext.getCmp('homeAtt').setBadgeText("");
                                                    }
                                                }
                                            });
                                        } else {
                                            Ext.Msg.alert("错误信息", "服务器操作失败");
                                        }
                                    },
                                    failure: function (response, opts) {
                                        Ext.Msg.alert("错误信息", "请求服务器失败");
                                    }
                                });
                            }
                        },
                        scope: this
                    });

                }
            },
            evaluateVote: {
                initialize: function (list) {
                    var me = this;
                    var param = {
                        nvcYear: config.time.nvcYear,
                        nvcTerm: config.time.nvcTerm
                    }
                    Ext.Ajax.request({
                        url: config.evaluate.valid,
                        method: 'POST',
                        params: {
                            nvcYear: config.time.nvcYear,
                            nvcTerm: config.time.nvcTerm
                        },
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result.success) {

                                var param = { userno: config.user.nvcStuNo };
                                util.storeLoad(list, param);

                                if (!config.user.nvcStuNo) {
                                    util.showMessage("请先登录...", true);
                                }
                            } else {
                                Ext.Msg.alert("错误信息", "现在不是投票时间");
                                me.redirectTo('redirect');
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert("错误信息", "请求服务器失败");
                        }
                    });
                },
                //点击项
                itemtap: function (list, index, target, record, e) {
                    var me = this;
                    if (record.getData().isVote == "1") {
                        return;
                    }
                    me.voteValid(me, list, record.getData().nvcElectiveNum, record.getData().nvcStuNo);
                }
            }
        }
    },
    freshList: function (list) {
        var param = {
            userno: config.user.nvcStuNo,
            nvcYear: config.time.nvcYear,     // 【待修改】
            nvcTerm: config.time.nvcTerm
            //nvcYear: '2015-2016',
            //nvcTerm: '1'
        };
        util.storeLoad(list, param);
    },
    voteValid: function (me, list, nvcElectiveNum, nvcStuNo) {
        Ext.Ajax.request({
            url: config.vote.valid,
            method: 'POST',
            params: {
                nvcStuNo: nvcStuNo,
                nvcYear: config.time.nvcYear,     // 【待修改】
                nvcTerm: config.time.nvcTerm
                //nvcYear: '2015-2016',
                //nvcTerm: '1'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (!result.success) {
                    Ext.Msg.alert("提示信息", result.message);
                } else {
                    Ext.Msg.show({
                        title: '提示',
                        message: '是否确认为该课程投票？',
                        width: 250,
                        buttons: [{
                            text: '取消', itemId: 'cancel'
                        }, {
                            text: '确认', itemId: 'ok'
                        }],
                        fn: function (buttonId) {
                            if (buttonId === "ok") {
                                console.log("OK");
                                me.voteForTeacher(me, list, nvcElectiveNum, nvcStuNo, util.getIP(), util.getTerminalType());
                            }
                        }
                    });
                }
            },
            failure: function (response, opts) {
                var result = Ext.decode(response.responseText);
                Ext.Msg.alert("错误信息", "请求服务器失败");
            }
        });
    },
    voteForTeacher: function (me, list, nvcElectiveNum, nvcStuNo, ip, Terminal) {
        Ext.Ajax.request({
            url: config.vote.vote,
            method: 'POST',
            //timeout: 10000,
            params: {
                nvcElectiveNum: nvcElectiveNum,
                nvcStuNo: nvcStuNo,
                nvcIP: ip,
                Terminal: Terminal,
                nvcStuNo: config.user.nvcStuNo
            },
            success: function (response) {
                me.freshList(list);
            },
            failure: function (response, opts) {
                var result = Ext.decode(response.responseText);
                Ext.Msg.alert("错误信息", "请求服务器失败");
            }
        });
    }
});