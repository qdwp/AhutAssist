Ext.define('Evaluate_Vote.controller.VoteListCtrl', {
    extend: 'Ext.app.Controller',

    onEvaluate_Vote_AddClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var store = grid.getStore();
        var count = 0;
        for (var i = 0; i < store.getCount() ; i++) {
            var record = store.getAt(i);
            var isVote = record.get('nvcIsvote');
            if (isVote == "1") {
                count++;
            }
        }
        if (count >=3)
        {
            Ext.Msg.show({
                title: '错误',
                msg: '你已经完成投票',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '有且仅有一行被选中才能编辑',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var win = Ext.getCmp("Evaluate_Vote_Add");
        if (!win) {
            win = Ext.create('Evaluate_Vote.view.VoteAddView', {
                id: 'Evaluate_Vote_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },

    onEvaluate_VoteStore_VoteClick: function (grid, record, item, index, e, eOpts) {
        var store = grid.getStore();
        var count = 0;
        for (var i = 0; i < store.getCount() ; i++) {
            var record = store.getAt(i);
            var isVote = record.get('nvcIsvote');
            if (isVote == "1") {
                count++;
            }
        }
        if (count >= 3) {
            Ext.Msg.show({
                title: '错误',
                msg: '你已经完成投票',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        var win = Ext.getCmp("Evaluate_Vote_Add");
        if (!win) {
            win = Ext.create('Evaluate_Vote.view.VoteAddView', {
                id: 'Evaluate_Vote_Add'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },



    init: function (application) {
        this.control({
            "#Evaluate_Vote_Add": {
                click: this.onEvaluate_Vote_AddClick
            },
            "#Evaluate_VoteStore_Vote": {
                itemdblclick: this.onEvaluate_VoteStore_VoteClick
            },
        });
    }

});