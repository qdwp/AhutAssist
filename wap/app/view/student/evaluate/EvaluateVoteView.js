Ext.define('app.view.student.evaluate.EvaluateVoteView', {
    alternateClassName: 'evaluateVote',
    extend: 'Ext.List',
    xtype: 'evaluateVote',
    config: {
        title: '投票课程列表',
        cls: 'list',
        store: 'evaluateVoteStore',
        itemTpl: new Ext.XTemplate(
            '<div class="bh">',
            '<div class="b1">',
            '   <div>课程名称: {nvcCourseName}</div>',
            '   <div class="sm">任课教师: <span class="orange">{nvcName}</span></div>',
            '</div>',
            '   <tpl if="isVote==1">',
            '       <div class="right"><img class="_icon" src="/resources/icons/good-ok.jpg"></div>',
            '   </tpl>',
            '</div>'
        )
    }
});