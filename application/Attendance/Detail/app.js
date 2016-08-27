Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'DetailModel',
    ],
    stores: [
        'DetailStore',
    ],
    views: [
        'DetailListView'
    ],
    controllers: [
      'DetailListCtrl',
    ],
    name: 'Attendance_Detail',
    launch: function () {
        Ext.create('Attendance_Detail.view.DetailListView', { renderTo: Ext.getBody() });
    }
});