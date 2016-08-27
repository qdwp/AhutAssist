Ext.define('BaseInfo_Teacher.view.TeacherAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.TeacherAdd',
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
                layout: 'fit',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'accordion',
                        items: [
                            {
                                title: '基本信息',
                                xtype: 'panel',
                                layout: 'column',
                                items: [
                                       {
                                           xtype: 'panel',
                                           layout: 'column',
                                           columnWidth: 1,
                                           items: [
                                               {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.5,
                                                   padding: 5,
                                                   fieldLabel: '姓名<span style="color:red;">*</span>',
                                                   name: 'nvcName',
                                                   labelWidth: 75,
                                               }, {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.5,
                                                   padding: 5,
                                                   fieldLabel: '登陆工号<span style="color:red;">*</span>',
                                                   name: 'nvcLoginCode',
                                                   labelWidth: 75,
                                                   allowBlank: false,
                                                   allowOnlyWhitespace: false,
                                                   regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,4}$/,
                                                   regexText: '只能输入数字和字母和汉字,且最多4个'
                                               }, {
                                                   xtype: 'form',
                                                   columnWidth: 1,
                                                   layout: 'column',
                                                   items: [
                                                      {
                                                          xtype: 'textfield',
                                                          padding: '5 0 5 5',
                                                          columnWidth: 0.5,
                                                          padding: 5,
                                                          fieldLabel: '个人照片<span style="color:red;">*</span>',
                                                          name: 'nvcTeaPhoto',
                                                          id: 'BaseInfo_TeacherAdd_PhotoFiles',
                                                          readOnly: true,
                                                          labelWidth: 65
                                                      }, {
                                                          xtype: 'filefield',
                                                          columnWidth: 0.4,
                                                          padding: '5 5 5 0',
                                                          name: 'nvcTeaPhotoChoseFiles',
                                                          labelWidth: 65,
                                                          buttonText: '选择...',
                                                          emptyText: '--请选择头像--',
                                                          anchor: '100%'
                                                      }, {
                                                          xtype: 'button',
                                                          margin: 5,
                                                          columnWidth: 0.1,
                                                          text: '上传',
                                                          itemId: 'BaseInfo_TeacherAdd_PhotoFilesUP'
                                                      }
                                                   ]
                                               }, {
                                                   xtype: 'combobox',
                                                   columnWidth: 0.3,
                                                   padding: 5,
                                                   fieldLabel: '性别<span style="color:red;">*</span>',
                                                   name: 'nvcSex',
                                                   editable: false,
                                                   forceSelection: true,
                                                   queryMode: 'local',
                                                   store: 'SexStore',
                                                   displayField: 'text',
                                                   valueField: 'value'
                                               }, {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.2,
                                                   padding: 5,
                                                   fieldLabel: '名族<span style="color:red;">*</span>',
                                                   name: 'nvcNationality',
                                                   labelWidth: 75,
                                               }, {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.5,
                                                   padding: 5,
                                                   fieldLabel: '教师职工号<span style="color:red;">*</span>',
                                                   name: 'nvcTeacherCode',
                                                   labelWidth: 75,
                                                   allowBlank: false,
                                                   allowOnlyWhitespace: false,
                                                   regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,8}$/,
                                                   regexText: '只能输入数字和字母和汉字,且最多8个'
                                               }, {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.5,
                                                   padding: 5,
                                                   fieldLabel: '登录密码<span style="color:red;">*</span>',
                                                   name: 'nvcPwd',
                                                   labelWidth: 75,
                                               }, {
                                                   xtype: 'textfield',
                                                   columnWidth: 0.5,
                                                   padding: 5,
                                                   fieldLabel: '出生日期<span style="color:red;">*</span>',
                                                   name: 'dtmBirth',
                                                   labelWidth: 75,
                                               }, {
                                                   xtype: 'panel',
                                                   layout: 'column',
                                                   columnWidth: 0.2,
                                                   padding: 5,
                                                   items: [
                                                       {
                                                           xtype: 'image',
                                                           name: 'PhotoImage',
                                                           itemId: 'BaseInfo_TeacherAdd_PhotoImage',
                                                           columnWidth: 1,
                                                           height: 195,
                                                           src: '/resource/images/photo.png'
                                                       }
                                                   ]
                                               }
                                           ]
                                       }
                                ]

                            }, {
                                title: '职工信息',
                                xtype: 'panel',
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '学科方向<span style="color:red;">*</span>',
                                        name: 'nvcDiscipline',
                                        labelWidth: 75
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学院<span style="color:red;">*</span>',
                                        name: 'nvcCollege',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '系<span  style="color:red;">*</span>',
                                        name: 'nvcDepartment',
                                        labelWidth: 75,

                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '政治面貌<span style="color:red;">*</span>',
                                        name: 'nvcPolitics',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '联系电话<span style="color:red;">*</span>',
                                        name: 'nvcPhone',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: 'E-mail地址<span style="color:red;">*</span>',
                                        name: 'nvcMail',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '毕业院校<span style="color:red;">*</span>',
                                        name: 'nvcGraduate',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '毕业专业<span style="color:red;">*</span>',
                                        name: 'nvcMajor',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学历<span style="color:red;">*</span>',
                                        name: 'nvcEducation',
                                        labelWidth: 75,

                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学位<span style="color:red;">*</span>',
                                        name: 'nvcDegree',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '职称<span style="color:red;">*</span>',
                                        name: 'nvcJobTitle',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '职务<span style="color:red;">*</span>',
                                        name: 'nvcJob',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '教师资格证号<span style="color:red;">*</span>',
                                        name: 'nvcQualifyCode',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '主讲教师资格证号<span style="color:red;">*</span>',
                                        name: 'nvcMQualifyCode',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '人事职工号<span style="color:red;">*</span>',
                                        name: 'nvcPerStaffCode',
                                        labelWidth: 75,
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '是否实验室人员<span style="color:red;">*</span>',
                                        name: 'nvcLabMan',
                                        labelWidth: 75,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'ConflictStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }
                                ]
                            }, {
                                title: '类型信息',
                                xtype: 'panel',
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '角色类型<span style="color:red;">*</span>',
                                        name: 'nvcRoleType',
                                        labelWidth: 75,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'RoleTypeStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '督导类型<span style="color:red;">*</span>',
                                        name: 'intAuditorType',
                                        labelWidth: 75,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'AuditorTypeStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '是否授课<span style="color:red;">*</span>',
                                        name: 'nvcIsTeaching',
                                        labelWidth: 75,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'ConflictStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '授课类型<span style="color:red;">*</span>',
                                        name: 'nvcTeachingType',
                                        labelWidth: 75,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'TeachingTypeStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'textareafield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '教学质量评价<span style="color:red;">*</span>',
                                        height: 130,
                                        name: 'nvcEvaluation',
                                        maxLength: 500
                                    }, {
                                        xtype: 'textareafield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '教师简介<span style="color:red;">*</span>',
                                        labelWidth: 75,
                                        height: 130,
                                        name: 'nvcTeacher',
                                        maxLength: 500
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
                                        itemId: 'BaseInfo_TeacherAdd_OK',
                                        text: '确 定'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'BaseInfo_TeacherAdd_Cancel',
                                        text: '取 消'
                                    }, '->'
                                ]
                            }
                        ]
                    }
                ]
            }
            ]
        });
        me.callParent(arguments);
    }
});