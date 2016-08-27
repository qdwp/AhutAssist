Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'PriorityWatchModel'
    ],
    stores: [
        'PriorityWatchStore',
        'AddWatchStore'
    ],
    views: [
        'PriorityWatchListView',
          'PriorityWatchAddView'
    ],
    controllers: [
        'PriorityWatchListCtrl',
   'PriorityWatchAddCtrl'
    ],
    name: 'Attendance_PriorityWatch',
    launch: function () {
        Ext.create('Attendance_PriorityWatch.view.PriorityWatchListView', { renderTo: Ext.getBody() });
    }
});