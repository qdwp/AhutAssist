Ext.define('app.view.student.evaluate.EvaluateInfoView', {
    alternateClassName: 'evaluateInfo',
    extend: 'Ext.Container',
    requires: ['Ext.form.FieldSet', 'Ext.field.TextArea', 'Ext.field.Select'],
    xtype: 'evaluateInfo',
    config: {
        cls: 'info',
        title: '评教详情',
        scrollable: {
            direction: 'auto',
            directionLock: true
        },
        tpl: new Ext.XTemplate(
            '<div class="bgdiv ">',//divline
            '   <div style=font-size:12px>&nbsp&nbsp当前是<font color=ff0000> {nvcYear} </font>学年第<font color=ff0000> {nvcTerm} </font>学期</div>',
            '</div>',
            '<div class="bgdiv ">',
            '   <div style=font-size:12px>&nbsp&nbsp当前评教课程为</div><div  style="font-size:15px;text-align:center;"><font color=ff0000> {nvcCourseName} </font></div>',
            '</div>',
            '   <div class="bgdiv " style="text-align:center;">任课教师：<font color=ff0000>&nbsp&nbsp{nvcName}</font></div>',
            '<div class="bgdiv ">',
            '   <div class="pic"><img src="{nvcTeaPhoto}"/></div>',
            '</div>'
            )
        ,
        items: [{
            xtype: 'fieldset',
            id: 'evaluateField',
            docked: 'bottom',
            defaults: {
                labelWidth: '40%'
            },
            items: [{
                xtype: 'selectfield',
                usePicker: true,
                name: 'nvcEvaGrade',
                id: 'nvcEvaGrade',
                label: '评教等级',
                store: 'evaluateLevelStore',
                valueField: 'intSort',
                displayField: 'nvcEvaGrade',
                listeners: {
                    change: function (select, newValue, oldValue) {
                        var scoreid = Ext.getCmp('intScore'),
                            data = this.getRecord().getData(),
                            minValue = data.intLowMark,
                            maxValue = data.intHighMark;
                        scoreid.setMaxValue(maxValue); scoreid.setMinValue(minValue); scoreid.setValue(maxValue);
                    }
                }
            }, {
                xtype: 'spinnerfield',
                name: 'intScore',
                id: 'intScore',
                label: '评教分数',
                cycle: false,
                stepValue: 1,
                maxValue: 95,
                minValue: 90,
                value: 95
            }, {
                xtype: 'textfield',
                label: '学生留言',
                name: 'nvcContents',
                id: 'nvcContents',
                placeHolder: '请输入留言',
                maxLength: 1000
            }, {
                xtype: 'button',
                docked: 'bottom',
                id:'evaAct',
                action: 'evaAct',
                text: '确认评教',
                ui: 'action'
            }]
        }]
    }
});