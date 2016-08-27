Ext.define('app.controller.student.ExtraCtr', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            homeView: 'homeView'
        },
        control: {
            homeView: {
                initialize: function () {
                    var param = {
                        nvcYear: config.time.nvcYear,
                        nvcTerm: config.time.nvcTerm
                    }
                    //验证当前时间是否可评教
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
                                    }
                                });
                            } else {

                            }
                        },
                        failure: function (response, opts) {
                            //Ext.Msg.alert("错误信息", "请求服务器失败");
                        }
                    });
                    //Ext.getCmp('homeAtt').setBadgeText("5");
                    //Ext.getCmp('homeAtt').setBadgeText("");
                }
            }
        }
    }
});