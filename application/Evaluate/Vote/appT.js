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
      'VoteListView_T',
    ],
    controllers: [
    ],
    name: 'Evaluate_Vote',

    launch: function () {
        Ext.create('Evaluate_Vote.view.VoteListView_T', { renderTo: Ext.getBody() });
    }

});
