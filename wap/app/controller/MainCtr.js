/*
*跳转主控
*/
Ext.define('app.controller.MainCtr', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['MainView', 'HomeView', 'Home'],
        //引用
        refs: {
            main: 'main',
            home: 'home',
            homeView: 'homeView',
            //所有action=redirect按钮
            redirectBtn: 'button[action=redirect]',
            redirectParamsBtn: 'button[action=redirectParams]'
        },
        //路由
        routes: {
            'redirect': 'showView',
            'redirect/:view': 'showView',
            'redirect/:view/:isPop': 'showView'
        },
        control: {
            //跳转按钮
            redirectBtn: {
                tap: function (t, value) {
                    this.redirectTo('redirect/' + t.config.redirect);
                }
            },
            //带参数的按钮
            redirectParamsBtn: {
                tap: function (t, value) {
                    config.tmp = {
                        params: t.config.params,
                        title: t.config.text
                    }
                    this.redirectTo('redirect/' + t.config.redirect);
                }
            }
        }
    },
    init: function () {
        //Ext.Viewport.add(Ext.create('app.view.MainView'));
    },
    //初始
    launch: function () {
        var me = this;
        // 等待加载PhoneGap
        document.addEventListener("deviceready", onDeviceReady, false);
        // PhoneGap加载完毕
        function onDeviceReady() {
            // 注册回退按钮事件监听器
            document.addEventListener("backbutton", backTap, false);
            function backTap() {
                me.onbackTap();
            }
        }
    },
    //展示页面
    showView: function (view, isPop) {
        var main = this.getMain(),
        params = config.tmp;
        if (main) {
            if (!view) {
                isPop = true;
            }
            if (config.ckLogin[view] && !config.user) {
                params = params || {};
                params.redirect = view;
                view = 'userLogin';
            }
            if (isPop) {
                main.popAndPush(view, params);
            } else {
                main.push(view, params);
            }
        }
        delete config.tmp;
    },
    //监听安卓返回键
    onbackTap: function () {
        var me = this,
        cardPanel = me.getMain();
        if (cardPanel) {
            if (me.isBack) {
                util.showMessage('亲,你点的太快了哦...', true);
            } else {
                var back = cardPanel.viewStack;
                if (back.length != 1) {
                    me.isBack = true;
                    util.hideMessage();
                    cardPanel.onBackButtonTap();
                    setTimeout(function () {
                        me.isBack = false;
                    },
                    800)
                } else {
                    me.appExit();
                }
            }
        } else {
            me.appExit();
        }
    },
    //退出应用
    appExit: function () {
        var me = this;
        if (me.isExit) {
            navigator.app.exitApp();
        } else {
            me.isExit = true;
            util.showMessage('再按一次退出程序', true);
            setTimeout(function () {
                me.isExit = false;
            },
            1500)
        }
    }
});