Ext.define('BaseInfo_CourseStu.model.LevelModel', {
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