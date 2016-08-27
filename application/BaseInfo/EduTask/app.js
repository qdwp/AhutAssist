Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'EduTaskModel',
       'CommonModel'
    ],
    stores: [
        'EduTaskStore',
       'YearStore',
      'TermStore'
      
    ],
    views: [
       'EduTaskListView',
        'EduTaskAddView',
        'EduTaskEditView'
    ],
    controllers: [
      'EduTaskListCtrl',
        'EduTaskAddCtrl',
       'EduTaskEditCtrl'
    ],
    name: 'BaseInfo_EduTask',
    launch: function () {
        Ext.create('BaseInfo_EduTask.view.EduTaskListView', { renderTo: Ext.getBody() });
    }
});