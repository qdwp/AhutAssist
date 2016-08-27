Ext.define('Attendance_Setting.model.SettingModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcYear' },
        { name: 'nvcTerm' },
        { name: 'dtmStartTime' },
        { name: 'dtmEndTime' }
    ]

});