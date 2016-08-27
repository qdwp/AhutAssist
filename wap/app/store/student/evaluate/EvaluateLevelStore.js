Ext.define('app.store.student.evaluate.EvaluateLevelStore', {
    extend: 'Ext.data.Store',
    alternateClassName: 'evaluateLevelStore',
    config: {
        model: 'app.model.student.evaluate.EvaluateLevelModel',
        storeId: 'evaluateLevelStore',
        autoLoad: false,
        groupDir: 'ASC',
        groupField: 'intSort',
        proxy: {
            type: 'ajax',
            url: config.evaluate.level,
            reader: {
                type: "json",
                rootProperty: 'data'
            }
        }
    }
});