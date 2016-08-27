Ext.define('app.store.teacher.evaluate.EvaluateListStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'teaEvaluateListStore',
    config: {
        model: 'app.model.teacher.evaluate.EvaluateListModel',
        storeId: 'teaEvaluateListStore',
        autoLoad: false,
        pageSize: 50,
        groupDir: 'ASC',
        groupField: 'nvcElectiveNum',
        proxy: {
            type: 'ajax',
            url: config.teaevaluate.list,
            reader: {
                type: "json",
                rootProperty: 'result'
            }
        }
    }
});