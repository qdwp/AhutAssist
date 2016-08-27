Ext.define('BaseInfo_CourseStu.model.CourseStuModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcCourseName' },
        { name: 'nvcStuNo' },
        { name: 'nvcStuName' },
        { name: 'nvcName' },
        { name: 'nvcEvaGrade' },
        { name: 'intScore' },
        { name: 'nvcElectiveNum' },
        { name: 'intIsEvaluate' },
        { name: 'nvcContents' },
        { name: 'dtmLeaveTime' },
        { name: 'nvcIP' },
        { name: 'nvcTerminal' },
        { name: 'nvcCourseNature' },
        { name: 'avgScore' },
    ]

});