
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({


    models: [
    'StudentModel',
    'CommonModel'
    ],
    stores: [
   'StudentStore',
   'SexStore',
   'PolityStore'
    ],
    views: [
      'StudentEditView',
      'StudentListView',
       'StudentAddView'
    ],
    controllers: [
  'StudentEditCtrl',
 'StudentAddCtrl',
      'StudentListCtrl'
    ],
    name: 'BaseInfo_Student',

    launch: function () {
        Ext.create('BaseInfo_Student.view.StudentListView', { renderTo: Ext.getBody() });
    }

});
