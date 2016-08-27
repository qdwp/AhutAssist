Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'MajorModel',
        'CommonModel',
        'QDModel',
       'DetailModel'
    ],
    stores: [
        'MajorStore',
        'MeasureStore',
        'DMStore',
       'XQStore',
       'ReasonStore',
    'DetailStore',
    'states'
    ],
    views: [
        'MajorListView',
         'MajorAddView',
        'MajorDetailView'
    ],
    controllers: [
    'MajorListCtrl',
    'MajorAddCtrl',
   'MajorDetailCtrl'
    ],
    name: 'Attendance_Major',
    launch: function () {
        Ext.create('Attendance_Major.view.MajorListView', { renderTo: Ext.getBody() });
    }
});