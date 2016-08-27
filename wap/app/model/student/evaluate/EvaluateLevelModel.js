//招聘
Ext.define('app.model.student.evaluate.EvaluateLevelModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
            name: 'ID',
            type: 'string'
        }, {
            name: 'nvcEvaGrade',
            type: 'string'
        }, {
            name: 'intLowMark',
            type: 'int'
        }, {
            name: 'intHighMark',
            type: 'int'
        }, {
            name: 'intSort',
            type: 'int'
        }]
    }
});