Ext.define('Evaluate_Vote.model.VoteModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcElectiveNum'},
        { name: 'nvcStuNo'},
         { name: 'nvcCourseName'},
        { name: 'nvcCourseNature'},
          { name: 'nvcStuName'},
         { name: 'nvcName'},
        { name: 'nvcIP'},
        { name: 'nvcTerminal'},
          { name: 'nvcTeacher'},
         { name: 'nvcTeaPhoto'},
         { name: 'nvcCount' },
         { name: 'nvcIsvote' }
    ]

});