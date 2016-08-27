Ext.Loader.setConfig({
    enabled: true
});


Ext.application({


    models: [
    'VoteModel',
    ],
    stores: [
   'VoteStore',
    ],
    views: [
      
      'VoteListView',
      'VoteAddView'
    ],
    controllers: [
    
    'VoteAddCtrl',
      'VoteListCtrl'
    ],
    name: 'Evaluate_Vote',

    launch: function () {
        Ext.create('Evaluate_Vote.view.VoteListView', { renderTo: Ext.getBody() });
    }

});
