//指定ux起调目录
Ext.Loader.setPath(
{
    'ux': 'app/ux'
});

Ext.application({
    name: 'app',

    requires: [
        'app.config',
        'app.util',
        'Ext.MessageBox'
    ],

    controllers: [
        'UserCtr',
        'MainCtr',
        'student.ExtraCtr',
        'student.AttendanceCtr',
        'student.EvaluateCtr',
        'teacher.EvaluateCtr',
        'teacher.AttendanceCtr'
    ],

    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        util.inIt();
        //2015-08-14 15:51:31
        //sencha touch 在新版谷歌浏览器中painted事件无法触发解决方案以及carousel 控件、togglefield控件、滚动条失效
        Ext.override(Ext.util.SizeMonitor, {
            constructor: function (config) {
                var namespace = Ext.util.sizemonitor;

                if (Ext.browser.is.Firefox) {
                    return new namespace.OverflowChange(config);
                } else if (Ext.browser.is.WebKit) {
                    if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36')) {
                        return new namespace.OverflowChange(config);
                    } else {
                        return new namespace.Scroll(config);
                    }
                } else if (Ext.browser.is.IE11) {
                    return new namespace.Scroll(config);
                } else {
                    return new namespace.Scroll(config);
                }
            }
        });
        Ext.override(Ext.util.PaintMonitor, {
            constructor: function (config) {
                if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
                    return new Ext.util.paintmonitor.OverflowChange(config);
                }
                else {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            }
        });
        // Initialize the main view
        Ext.Viewport.add(Ext.create('app.view.MainView'));
    }
});