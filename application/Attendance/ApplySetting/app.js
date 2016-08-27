Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    models: [
    'SettingModel',
    'CommonModel'
    ],
    stores: [
   'SettingStore',
   'Year',
   'Term'
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
    name: 'Attendance_Setting',

    launch: function () {
        Ext.create('Attendance_Setting.view.SettingListView', { renderTo: Ext.getBody() });
    }

});
