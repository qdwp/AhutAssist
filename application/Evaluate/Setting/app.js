Ext.Loader.setConfig({
    enabled: true
});


Ext.application({


    models: [

    'SettingModel',
    'CommonModel',
    ],
    stores: [
   'SettingStore',
   'ConflictStore',
   'TermStore',
   'YearStore'
    ],
    views: [
      'SettingEditView',
      'SettingListView',
       'SettingAddView'
    ],
    controllers: [
      'SettingEditCtrl',
      'SettingAddCtrl',
      'SettingListCtrl'
    ],
    name: 'Evaluate_Setting',

    launch: function () {
        Ext.create('Evaluate_Setting.view.SettingListView', { renderTo: Ext.getBody() });
    }

});
