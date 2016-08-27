Ext.define('BaseInfo_EduTask.view.EduTaskAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.EduTaskAdd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 370,
    width: 600,
    minHeight: 370,
    minWidth: 600,
    layout: 'fit',
    title: '增加',
    maximizable: true,
    closeAction: 'hide',
    modal: true,

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
                items: [{
                    xtype: 'form',
                    layout: 'column',
                    bodyPadding: 10,
                    items: [
                         {
                             xtype: 'combobox',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '学年<span style="color:red;">*</span>',
                             name: 'nvcYear',
                             labelWidth: 75,
                             editable: false,
                             forceSelection: true,
                             queryMode: 'local',
                             store: 'YearStore',
                             displayField: 'text',
                             valueField: 'value'
                         },
                     {
                         xtype: 'combobox',
                         columnWidth: 0.5,
                         padding: 5,
                         fieldLabel: '学期<span style="color:red;">*</span>',
                         name: 'nvcTerm',
                         labelWidth: 75,
                         editable: false,
                         forceSelection: true,
                         queryMode: 'local',
                         store: 'TermStore',
                         displayField: 'text',
                         valueField: 'value'

                     },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            padding: 5,
                            fieldLabel: '选课课号<span style="color:red;">*</span>',
                            name: 'nvcElectiveNum',
                            labelWidth: 75,
                            allowBlank: false,
                            allowOnlyWhitespace: false,

                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            padding: 5,
                            fieldLabel: '课程代码<span style="color:red;">*</span>',
                            name: 'nvcCourseCode',
                            labelWidth: 75,
                            allowBlank: false,
                            allowOnlyWhitespace: false,

                        },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '课程名称<span  style="color:red;">*</span>',
                             name: 'nvcCourseName',
                             labelWidth: 75,
                             allowBlank: false,
                             allowOnlyWhitespace: false,

                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '课程性质<span style="color:red;">*</span>',
                             name: 'nvcCourseNature',
                             labelWidth: 75,
                             allowBlank: false,
                             allowOnlyWhitespace: false,

                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '选课人数<span style="color:red;">*</span>',
                             name: 'intStuNumber',
                             labelWidth: 75
                         
                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '开课学院<span style="color:red;">*</span>',
                             name: 'nvcCollege',
                             labelWidth: 75
                          

                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '开课系<span style="color:red;">*</span>',
                             name: 'nvcFaculty',
                             labelWidth: 75
                          

                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '教师职工号<span style="color:red;">*</span>',
                             name: 'nvcTeacherCode',
                             labelWidth: 75,
                             allowBlank: false,
                             allowOnlyWhitespace: false,
                             regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/,
                             regexText: '只能输入数字和字母和汉字,且最多8个'
                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '上课地点<span style="color:red;">*</span>',
                             name: 'nvcCoursePlace',
                             labelWidth: 75
                          

                         },
                         {
                             xtype: 'textfield',
                             columnWidth: 0.5,
                             padding: 5,
                             fieldLabel: '上课时间<span style="color:red;">*</span>',
                             name: 'nvcCourseTime',
                             labelWidth: 75
                         

                         },
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
                                itemId: 'BaseInfo_EduTaskAdd_OK',
                                text: '确 定'
                            },
                            {
                                xtype: 'button',
                                itemId: 'BaseInfo_EduTaskAdd_Cancel',
                                text: '取 消'
                            }, '->'
                        ]
                    }
                ]

        })
        ;
        me.callParent(arguments);
    }
});