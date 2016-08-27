Ext.define('app.view.teacher.evaluate.EvaluateInfoView', {
    alternateClassName: 'teaEvaluateInfo',
    extend: 'Ext.Container',
    xtype: 'teaEvaluateInfo',
    config: {
        cls: 'info',
        title: '课程留言',
        scrollable: {
            direction: 'auto',
            directionLock: true
        },
        tpl: new Ext.XTemplate(
            '<div class="bgdiv ">',
            '   <div class="sm">&nbsp&nbsp当前是<font color=ff0000> {nvcYear} </font>学年第<font color=ff0000> {nvcTerm} </font>学期</div>',
            '</div>',
            '<div class="sm bh bgdiv ">&nbsp&nbsp当前课程 <div class="bigred" style="font-size:15px;">{nvcCourseName}</div></div>',
            '<div class="sm bgdiv ">&nbsp&nbsp选课课号 <span class="gray">{nvcElectiveNum}</span></div>',
            '<div class="sm bh bgdiv ">&nbsp&nbsp已评人数 <span class="bigred">{countIsEva}&nbsp</span>-&nbsp未评人数 <span class="bigred">{countNotEva}</span></div>',
            '<div class="sm bgdiv "><br/>您有 <span class="bigred">{contentCount}</span> 条评教留言:</div>',
            '<div class="divline "></div>',
            '<tpl if="contentCount!=0">',
            '   <tpl for="result">',
            '       <div class="item">',
            '           <div class="head">',
            '               <img src=/resources/images/photo.png>',
            '           </div>',
            '           <div class="cont" comment-type="itemCont">',
            '               <div class="info">',
            '                   <span class="area sm">[ {dtmLeaveTime} ]</span>',
            '               </div>',
            '               <div class="txt" comment-type="itemTxt">{nvcContents}</div>',
            '               ',
            '           </div>',
            '       </div>',
            '   </tpl>',
            '</tpl>'

            )
    }
});