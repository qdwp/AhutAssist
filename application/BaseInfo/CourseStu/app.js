Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'CourseStuModel',
      'CommonModel',
      'LevelModel'
    ],
    stores: [
        'CourseStuStore',
       'LevelStore',
         'ConflictStore'
    ],
    views: [
        'CourseStuListView',
        'CourseStuEditView'
    ],
    controllers: [
        'CourseStuListCtrl',
        'CourseStuEditCtrl'
    ],
    name: 'BaseInfo_CourseStu',
    launch: function () {
        Ext.create('BaseInfo_CourseStu.view.CourseStuListView', { renderTo: Ext.getBody() });
    }
});