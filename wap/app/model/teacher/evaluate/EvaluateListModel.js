Ext.define('app.model.teacher.evaluate.EvaluateListModel',
{
    extend: 'Ext.data.Model',
    config:
    {
        fields: [{
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
            //评教总数
            name: 'total',
            type: 'string'
        }, {
            //学年
            name: 'nvcYear',
            type: 'string'
        }, {
            //学期
            name: 'nvcTerm',
            type: 'string'
        }, {
            //已评
            name: 'countIsEva',
            type: 'string'
        }, {
            //未评
            name: 'countNotEva',
            type: 'string'
        }, {
            //评教等级
            name: 'avgGrade',
            type: 'string'
        }, {
            //评教得分
            name: 'avgScore',
            type: 'string'
        }, {
            //留言条数
            name: 'contentCount',
            type: 'string'
        }]
    }
});
