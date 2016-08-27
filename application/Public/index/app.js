Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath({
    'Ext.ux': '/library/ext/examples/ux'
});

Ext.application({
    views: [
        'IndexView'
    ],
    controllers: [
        'IndexController'
    ],
    requires: [
        'Index.DirectAPI',
        'Ext.ux.IFrame'
    ],
    appFolder: '/application/Public/index/app',
    name: 'Index',
    launch: function () {
        if (gbl_rolename == "管理员") {
            Ext.create('Index.view.IndexView_Admin', {
                id: 'Index_IndexView_Admin'
            });
            Ext.getCmp('Index_IndexView_Admin').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
        if (gbl_rolename == "校领导") {
            Ext.create('Index.view.IndexView_SM', {
                id: 'Index_IndexView_SM'
            });
            Ext.getCmp('Index_IndexView_SM').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
        if (gbl_rolename == "院领导") {
            Ext.create('Index.view.IndexView_CM', {
                id: 'Index_IndexView_CM'
            });
            Ext.getCmp('Index_IndexView_CM').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
        if (gbl_rolename == "辅导员") {
            Ext.create('Index.view.IndexView_M', {
                id: 'Index_IndexView_M'
            });
            Ext.getCmp('Index_IndexView_M').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
        if (gbl_rolename == "老师") {
            Ext.create('Index.view.IndexView_T', {
                id: 'Index_IndexView_T'
            });
            Ext.getCmp('Index_IndexView_T').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
        if (gbl_rolename == "学生") {
            Ext.create('Index.view.IndexView', {
                id: 'Index_IndexView'
            });
            Ext.getCmp('Index_IndexView').down('#welcomelabel').setText('姓名：' + gbl_loginname + '，角色：' + gbl_rolename + '');
        }
    }
});



