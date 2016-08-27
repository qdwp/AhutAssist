Ext.define('BaseInfo_CourseStu.model.MessageModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
         { name: 'nvcCourseName' },
         { name: 'nvcContents'},
        { name: 'dtmLeaveTime'}
    ]

});