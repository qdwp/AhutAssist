Ext.define('BaseInfo_Manage.model.ManageModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
           { name: 'ID' },
         { name: 'nvcStuNo' },
        { name: 'nvcStuName' },
        { name: 'nvcStuPhoto' },
        { name: 'nvcNewPhoto' },
       { name: 'dtmEditTime' },
       { name: 'dtmCheckTime' },
        { name: 'nvcCheckResult' }
    ]

});