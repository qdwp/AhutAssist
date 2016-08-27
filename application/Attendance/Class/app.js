Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'ClassModel',

    ],
    stores: [
        'ClassStore',

    ],
    views: [
        'ClassListView',
          'ClassAddView',
     'ClassEditView'
 

    ],
    controllers: [
        'ClassListCtrl',
   'ClassAddCtrl',
    'ClassEditCtrl'

    ],
    name: 'Attendance_Class',
    launch: function () {
        Ext.create('Attendance_Class.view.ClassListView', { renderTo: Ext.getBody() });
    }
});