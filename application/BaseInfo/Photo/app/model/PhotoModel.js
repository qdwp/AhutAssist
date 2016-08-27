Ext.define('BaseInfo_Photo.model.PhotoModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcStuNo' },
        { name: 'nvcStuName' },
         { name: 'nvcSex' },
        { name: 'nvcClass' },
        { name: 'nvcStuPhoto' },
       { name: 'nvcNewPhoto' },
          { name: 'nvcCheckResult' }
    ]

});