Ext.define('Evaluate_Level.model.LevelModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcEvaGrade' },
        { name: 'intLowMark' },
        { name: 'intHighMark' },
        { name: 'intSort' }

    ]

});