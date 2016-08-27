Ext.define('BaseInfo_CourseStu.view.CourseStuEditView', {
    extend: 'Ext.window.Window',
    alias: 'widget.CourseStuEdit',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 400,
    width: 550,
    minHeight: 400,
    minWidth: 550,
    layout: 'fit',
    title: '学生评教',
    maximizable: true,
    closeAction: 'hide',
    modal: true,


    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                //id:'BaseInfo_CourseStu_S_from',
                layout: 'column',
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '课程名称<span style="color:red;">*</span>',
                        name: 'nvcCourseName',
                        readOnly:true,
                        labelWidth: 75
                    }, {
                        xtype: 'textfield',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '任课教师<span style="color:red;">*</span>',
                        name: 'nvcName',
                        labelWidth: 75,
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '学号<span style="color:red;">*</span>',
                        name: 'nvcStuNo',
                        labelWidth: 75,
                        allowBlank: false,
                        allowOnlyWhitespace: false,
                        regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/,
                        regexText: '只能输入数字和字母和汉字,且最多9个' ,
                        hidden: true
                    },  {
                        xtype: 'combobox',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '评教等级<span style="color:red;">*</span>',
                        name: 'nvcEvaGrade',
                        id: 'BaseInfo_CourseStuEdit_nvcEvaGrade',
                        labelWidth: 75,
                        editable: false,
                        forceSelection: true,
                        store: 'LevelStore',
                        displayField: 'nvcEvaGrade',
                        valueField: 'nvcEvaGrade'
                    }, {

                        xtype: 'numberfield',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '评教得分<span style="color:red;">*</span>',
                        name: 'intScore',
                        id: 'BaseInfo_CourseStuEdit_intScore',
                        labelWidth: 75
                    },
                    {
                        xtype: 'textareafield',
                        columnWidth: 1,
                        padding: 5,
                        fieldLabel: '留言内容<span style="color:red;">*</span>',
                        name: 'nvcContents',
                        labelWidth: 75,
                        height:200
                        //maxLength: 500
                    }
                ],
            }],
            dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: [
                    '->', {
                        xtype: 'button',
                        itemId: 'BaseInfo_CourseStuEdit_OK',
                        text: '确 定'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_CourseStuEdit_Cancel',
                        text: '取 消'
                    }, '->'
                ]
            }]

        });
        me.callParent(arguments);
    }
});