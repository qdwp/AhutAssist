Ext.define('Evaluate_Setting.model.SettingModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcYear' },
        { name: 'nvcTerm' },
        { name: 'dtmBeginTime' },
        { name: 'dtmEndTime' },
        { name: 'nvcNoteOpen' },
         { name: 'nvcResultOpen' },
        { name: 'nvcValid' },
        { name: 'txtMatter' }
    ]

});