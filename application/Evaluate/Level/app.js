Ext.Loader.setConfig({
    enabled: true
});


Ext.application({


    models: [

    'LevelModel',
  'CommonModel',
    ],
    stores: [
   'LevelStore',
  'EvaStore',
 'SortStore'
    ],
    views: [
      'LevelListView',
    'LevelAddView',
 'LevelEditView'
    ],
    controllers: [
 'LevelListCtrl',
    'LevelAddCtrl',
   'LevelEditCtrl'
    ],
    name: 'Evaluate_Level',

    launch: function () {
        Ext.create('Evaluate_Level.view.LevelListView', { renderTo: Ext.getBody() });
    }

});
