Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    models: [
    'ManageModel'
    ],
    stores: [
   'ManageStore'
    ],
    views: [
     'ManageListView',
     'ManageEditView'
    ],
    controllers: [
     'ManageListCtrl',
     'ManageEditCtrl'
    ],
    name: 'BaseInfo_Manage',

    launch: function () {
        Ext.create('BaseInfo_Manage.view.ManageListView', { renderTo: Ext.getBody() });
    }

});
