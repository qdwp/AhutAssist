Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    models: [
  'PhotoModel'
    ],
    stores: [
   'PhotoStore'
    ],
    views: [
      'PhotoListView'
    ],
    controllers: [
      'PhotoListCtrl'
    ],
    name: 'BaseInfo_Photo',

    launch: function () {
        Ext.create('BaseInfo_Photo.view.PhotoListView', { renderTo: Ext.getBody() });
    }

});
