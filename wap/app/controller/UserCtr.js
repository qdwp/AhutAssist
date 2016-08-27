Ext.define('app.controller.UserCtr', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['UserModel'],
        views: [
            'userinfo.LoginView',
            'userinfo.InfoView'
        ],
        refs: {
            main: 'main',
            userLogin: 'userLogin',
            userInfo: 'userInfo',
            login: 'userLogin [action=login]',
            exit: 'button[action=exit]'
        },
        control: {
            //开始登录
            login: {
                tap: function () {
                    var login = this.getUserLogin(),
                    model = Ext.create('app.model.UserModel');
                    if (this.valid(model, login)) {
                        this.logCheck(login.getValues());
                    }
                }
            },
            exit: {
                tap: function (t) {
                    Ext.Msg.show({
                        title: "退出",
                        message: "是否确认退出登录？",
                        width: 250,
                        buttons: [{
                            text: '取消', itemId: 'cancel'
                        }, {
                            text: '确认', itemId: 'ok'
                        }],
                        fn: function (buttonId) {
                            if (buttonId === "ok") {
                                this.logOut();
                            }
                        },
                        scope: this
                    });
                }
            },
            //用户详细页
            userInfo: {
                activate: function (t) {
                    t.setData(config.user);
                }
            }
        }
    },
    launch: function () {
        //检测是否自动登录
        Ext.ModelMgr.getModel('app.model.UserModel').load(1, {
            scope: this,
            success: function (cachedLoggedInUser) {
                util.showMessage("正在验证自动登录...");
                this.logCheck(cachedLoggedInUser.data, true);
            }
        });
        this.redirectTo('redirect/homeView');
    },
    //登录成功
    logUserIn: function (user) {
        config.user = user;
        config.time = util.getYearandTerm();

        console.log("user:", config.user);
        console.log("time:", config.time);

        var login = this.getUserLogin();
        var main = this.getMain();
        if (config.user.nvcStuNo && login) {
            this.redirectTo('redirect');
            this.redirectTo('redirect/homeView');
        }
        else if (config.user.nvcLoginCode && login) {
            this.redirectTo('redirect');
            this.redirectTo('redirect/home');
        }

    },
    //开始登录
    logCheck: function (user, isHid) {
        Ext.Ajax.request({
            url: config.login,
            params: user,
            hidMessage: isHid,
            scope: this,
            success: function (result) {
                result = Ext.decode(result.responseText);
                if (!result.ID) {
                    util.showMessage('用户名或者密码不正确!', true);
                } else {
                    this.logUserIn(result);
                    user.keepUser && this.keepUser(user);
                }
            },
            failure: function (response, opts) {
                console.log(response);
                util.showMessage("服务器操作失败..", true);
            }
        });
    },
    //保存用户信息
    keepUser: function (user) {
        /*不这样写无法储存数据*/
        var logUser = Ext.create('app.model.UserModel', {
            id: 1
        });
        logUser.set(user);
        logUser.save();
    },
    //验证模型
    valid: function (model, from) {
        from.updateRecord(model);
        var me = this,
        errors = model.validate(),
        valid = errors.isValid();
        if (!valid) {
            errors.each(function (err) {
                alert(err.getMessage());
                return false;
            });
        }
        return valid;
    },
    //退出登录
    logOut: function (user) {
        var main = this.getMain();
        Ext.ModelMgr.getModel('app.model.UserModel').load(1, {
            success: function (user) {
                user.erase();
            }
        });
        config.user = false;
        location.reload(true);
    }
});