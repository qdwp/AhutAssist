Ext.define('app.store.student.evaluate.EvaluateVoteStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'evaluateVoteStore',
    config: {
        model: 'app.model.student.evaluate.EvaluateVoteModel',
        storeId: 'evaluateVoteStore',
        autoLoad: false,
        pageSize: 50,
        groupDir: 'ASC',
        groupField: 'nvcCourseName',
        proxy: {
            type: 'ajax',
            url: config.vote.list,
            reader: {
                type: "json",
                rootProperty: 'result'
            }
        }
    }
});