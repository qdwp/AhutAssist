Ext.define('BaseInfo_Student.model.CommonModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'text'
        },
        {
            name: 'value'
        }
    ]
});