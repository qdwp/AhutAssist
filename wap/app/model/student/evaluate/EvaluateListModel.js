//招聘
Ext.define('app.model.student.evaluate.EvaluateListModel',
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
            //学号
            name: 'nvcStuNo',
            type: 'string'
        }, {
            //学会姓名
            name: 'nvcStuName',
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
            //教师姓名职工号
            name: 'nvcLoginCode',
            type: 'string'
        }, {
            //教师姓名
            name: 'nvcName',
            type: 'string'
        }, {
            //是否评教
            name: 'intIsEvaluate',
            type: 'string'
        }, {
            //教师照片
            name: 'nvcTeaPhoto',
            type: 'string'
        }]
    }
});
