Ext.define('app.view.student.evaluate.EvaluateListView', {
    alternateClassName: 'evaluateList',
    extend: 'Ext.List',
    xtype: 'evaluateList',
    //requires: ['Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging'],
    config: {
        title: '评价课程列表',
        cls: 'list',
        store: 'evaluateListStore',
        selectedCls: '',
        //plugins: ['pullrefresh', 'listpaging'],
        itemTpl: new Ext.XTemplate(
        '<div class="bh">',
            '<div class="b1">',
                '<div>课程名称: {nvcCourseName}</div>',
                '<div class="sm gray" style="float:left">任课教师: <font color=ED5F12>{nvcName}</font></div>',
            '<tpl if="intIsEvaluate == 1">',
                '<div class="right green">✔</div>',//√✔
            '</tpl>',
            '<tpl if="intIsEvaluate == 0">',
                '<div class="right bigred">未评</div>',//✘✖
            '</tpl>',
            '</div>',
        '</div>'
        )
    }
});
