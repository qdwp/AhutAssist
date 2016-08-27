Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    models: [
    'ApplyModel',
    ],
    stores: [
   'ApplyStore',
    ],
    views: [
      'ApplyListView',
      'ApplyAddView'
    ],
    controllers: [
    'ApplyAddCtrl',
      'ApplyListCtrl'
    ],
    name: 'Attendance_Apply',

    launch: function () {
        Ext.create('Attendance_Apply.view.ApplyListView', { renderTo: Ext.getBody() });
    }

});
