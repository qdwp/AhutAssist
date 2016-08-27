//招聘
Ext.define('app.model.student.evaluate.EvaluateVoteModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
            //选课ID
            name: 'ID',
            type: 'string'
        }, {
            //选课课号
            name: 'nvcElectiveNum',
            type: 'string'
        }, {
            //课程名称 
            name: 'nvcCourseName',
            type: 'string'
        }, {
            //课程性质 
            name: 'nvcCourseNature',
            type: 'string'
        }, {
            //教师姓名
            name: 'nvcName',
            type: 'string'
        }, {
            //学号
            name: 'nvcStuNo',
            type: 'string'
        }, {
            //是否投票
            name: 'isVote',
            type: 'string'
        }]
    }
});
