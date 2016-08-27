Ext.define('BaseInfo_Teacher.model.CommonModel', {
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