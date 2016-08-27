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
    name: 'Attendance_Manage',

    launch: function () {
        Ext.create('Attendance_Manage.view.ManageListView', { renderTo: Ext.getBody() });
    }

});
