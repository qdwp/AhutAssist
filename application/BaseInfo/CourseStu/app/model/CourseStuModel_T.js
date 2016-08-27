Ext.define('BaseInfo_CourseStu.model.CourseStuModel_T', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcCourseName' },
        { name: 'nvcElectiveNum' },
        { name: 'nvcCourseNature' },
        { name: 'avgScore' },
          { name: 'nvcEvaGrade' },
        { name: 'intEvaPeo' },
        { name: 'intNotEvaPeo' },
        { name: 'nvcConPeo' },
          { name: 'nvcLoginCode' }
    ]
});