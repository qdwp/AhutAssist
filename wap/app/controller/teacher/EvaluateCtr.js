/*
*教师评教结果查询及逻辑控制 2015年8月15日09:32:35
*/
Ext.define('app.controller.teacher.EvaluateCtr', {
    extend: 'Ext.app.Controller',
    config: {
        models: [
            'teacher.evaluate.EvaluateListModel'
        ],
        stores: [
            'teacher.evaluate.EvaluateListStore'
        ],
        views: [
            'teacher.evaluate.EvaluateListView',
            'teacher.evaluate.EvaluateInfoView'
        ],
        //引用
        refs: {
            teaEvaluateInfo: 'teaEvaluateInfo',
            teaEvaluateList: 'teaEvaluateList',
            teaEvaluateBtn: 'teaEvaluateList button[action=selBtn]'
        },
        control: {
            teaEvaluateList: {
                initialize: function (list) {
                    var param = {
                        userno: config.user.nvcLoginCode,
                        nvcYear: config.time.nvcYear,     // 【待修改】
                        nvcTerm: config.time.nvcTerm
                        //nvcYear: '2015-2016',
                        //nvcTerm: '1'
                    };
                    util.storeLoad(list, param);
                    if (!config.user.nvcLoginCode) {
                        util.showMessage("请先登录...", true);
                    }
                    var yearStore = Ext.getCmp('selYear').getStore();
                    var termStore = Ext.getCmp('selTerm').getStore();
                    yearStore.load();
                    termStore.load();
                },
                itemtap: function (list, index, target, record, e) {
                    this.redirectTo('redirect/teaEvaluateInfo');
                    util.recordLoad(record, this.getTeaEvaluateInfo(), config.teaevaluate.info, {
                        nvcElectiveNum: record.get('nvcElectiveNum')
                    },
                    'nvcElectiveNum');
                }
            }
            ,
            ///学期选择按钮，按学期查询
            teaEvaluateBtn: {
                tap: function () {
                    if (!config.user.nvcLoginCode) {
                        util.showMessage("请先登录...", true);
                    } else {
                        var list = this.getTeaEvaluateList();
                        var params = {
                            userno: config.user.nvcLoginCode,
                            nvcYear: Ext.getCmp('selYear').getValue(),
                            nvcTerm: Ext.getCmp('selTerm').getValue()
                        };
                        util.storeLoad(list, params);
                    }
                }
            }

        }
    }
});