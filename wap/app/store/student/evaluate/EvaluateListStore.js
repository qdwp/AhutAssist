Ext.define('app.store.student.evaluate.EvaluateListStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'evaluateListStore',
    config: {
        model: 'app.model.student.evaluate.EvaluateListModel',
        storeId: 'evaluateListStore',
        autoLoad: false,
        pageSize: 50,
        groupDir: 'ASC',
        groupField: 'intIsEvaluate',
        proxy: {
            type: 'ajax',
            url: config.evaluate.list,
            reader: {
                type: "json",
                rootProperty: 'result'
            }
        }
    }
});