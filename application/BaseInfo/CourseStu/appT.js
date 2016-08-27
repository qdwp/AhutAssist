Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'CourseStuModel_T'
    ],
    stores: [
        'CourseStuStore_T',
        'CourseStuStore',
        'MessageStore',
        'YearStore',
        'TermStore'
    ],
    views: [
        'CourseStuListView_T'
    ],
    controllers: [
        'CourseStuListCtrl'
    ],
    name: 'BaseInfo_CourseStu',
    launch: function () {
        Ext.create('BaseInfo_CourseStu.view.CourseStuListView_T', { renderTo: Ext.getBody() });
    }
});