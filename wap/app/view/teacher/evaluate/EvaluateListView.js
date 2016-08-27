Ext.define('app.view.teacher.evaluate.EvaluateListView', {
    alternateClassName: 'teaEvaluateList',
    extend: 'Ext.List',
    xtype: 'teaEvaluateList',
    config: {
        title: '评价课程列表',
        cls: 'list',
        store: 'teaEvaluateListStore',
        selectedCls: '',
        itemTpl: new Ext.XTemplate(
            '<div class="bh">',
                '<div class="b1" style="width:auto;">',
                    '<div>{nvcCourseName}</div>',
                    '<div class="sm gray">{nvcCourseNature}</div>',
                    '<div class="sm gray">已评 {countIsEva} - 未评 {countNotEva}</div>',
                    '<div class="sm gray">{nvcElectiveNum}</div>',
                '</div>',
                '<div class="right w4">',
                    '<div class="sm gray">等级 <font color=ED5F12>{avgGrade}</font></div><div class="sm gray">评分 <font color=ED5F12>{avgScore}</font></div>',
                    '<div class="sm gray">留言 {contentCount}</div>',
                '</div>',
            '</div>'
            ),
        items: [{
            xtype: 'toolbar',
            id: 'selectTimeBar',
            name: 'yearAndTerm',
            height: '20',
            docked: 'top',
            items: [{
                xtype: 'selectfield',
                usePicker: true,
                id: 'selYear',
                name: 'selYear',
                width: '55%',
                height: '20',
                style: {
                    'font-size': '18px',
                },
                store: 'attendanceYearStore',
                valueField: 'nvcYear',
                displayField: 'nvcYear'
            }, {
                xtype: 'selectfield',
                usePicker:true,
                id: 'selTerm',
                name: 'selTerm',
                width: '30%',
                height: '20',
                style: {
                    'font-size': '18px',
                },
                store: 'attendanceTermStore',
                valueField: 'nvcTerm',
                displayField: 'nvcTerm'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                action: 'selBtn',
                cls: 'selectbtn',
                width: '15%',
                iconCls: 'search',
                iconAlign: 'center'
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});
