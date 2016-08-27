Ext.define('BaseInfo_Student.view.StudentEditView', {
    extend: 'Ext.window.Window',
    alias: 'widget.StudentEdit',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 520,
    minHeight: 520,
    width: 800,
    minWidth: 800,
    layout: 'fit',
    title: '修改',
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
                                        fieldLabel: '学号<span style="color:red;">*</span>',
                                        name: 'nvcStuNo',
                                        labelWidth: 65,
                                        maxLength: 20,
                                        regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,9}$/,
                                        regexText: '只能输入数字和字母和汉字,且最多9个'
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '姓名<span style="color:red;">*</span>',
                                        name: 'nvcStuName',
                                        labelWidth: 65,
                                        maxLength: 20
                                    }, {
                                        xtype: 'form',
                                        columnWidth: 0.8,
                                        layout: 'column',
                                        items: [
                                           {
                                               xtype: 'textfield',
                                               padding: '5 0 5 5',
                                               columnWidth: 0.5,
                                               padding: 5,
                                               fieldLabel: '学生照片<span style="color:red;">*</span>',
                                               name: 'nvcStuPhoto',
                                               id: 'BaseInfo_StudentEdit_PhotoFiles',
                                               readOnly: true,
                                               labelWidth: 65
                                           }, {
                                               xtype: 'filefield',
                                               columnWidth: 0.4,
                                               padding: '5 5 5 0',
                                               name: 'nvcStuPhotoChoseFiles',
                                               labelWidth: 65,
                                               buttonText: '选择...',
                                               emptyText: '--请选择头像--',
                                               anchor: '100%'
                                           }, {
                                               xtype: 'button',
                                               margin: 5,
                                               columnWidth: 0.1,
                                               text: '上传',
                                               itemId: 'BaseInfo_StudentEdit_PhotoFilesUP'
                                           }
                                        ]
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '性别<span style="color:red;">*</span>',
                                        name: 'nvcSex',
                                        labelWidth: 65,
                                        editable: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'SexStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '登录密码<span style="color:red;">*</span>',
                                        name: 'nvcPwd',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'datefield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '出生日期<span  style="color:red;">*</span>',
                                        name: 'dtmBirth',
                                        labelWidth: 65,
                                        format: "Y-m-d",
                                        emptyText: "--请选择--"
                                    }, {
                                        xtype: 'combobox',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '政治面貌<span style="color:red;">*</span>',
                                        name: 'nvcPolity',
                                        labelWidth: 65,
                                          queryMode: 'local',
                                        store: 'PolityStore',
                                        displayField: 'text',
                                        valueField: 'value'
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '名族<span style="color:red;">*</span>',
                                        name: 'nvcNationality',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '籍贯<span style="color:red;">*</span>',
                                        name: 'nvcNative',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '生源地<span style="color:red;">*</span>',
                                        name: 'nvcSource',
                                        labelWidth: 65

                                    }, {
                                        xtype: 'panel',
                                        layout: 'column',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        items: [
                                            {
                                                xtype: 'image',
                                                name: 'PhotoImage',
                                                itemId: 'BaseInfo_StudentEdit_PhotoImage',
                                                columnWidth: 1,
                                                height: 195,
                                                src: '/resource/images/photo.png'
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '学院<span style="color:red;">*</span>',
                                        name: 'nvcCollege',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '系<span style="color:red;">*</span>',
                                        name: 'nvcFaculty',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '专业名称<span  style="color:red;">*</span>',
                                        name: 'nvcMajor',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '行政班<span style="color:red;">*</span>',
                                        name: 'nvcClass',
                                        labelWidth: 65
                                    }
                                           ]
                                       }
                                ]

                            }, {
                                title: '学习信息',
                                xtype: 'panel',
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学制<span style="color:red;">*</span>',
                                        name: 'intEducationAge',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '英语等级<span style="color:red;">*</span>',
                                        name: 'nvcEngGrade',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学习年限<span style="color:red;">*</span>',
                                        name: 'nvcStuAge',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '学籍状态<span style="color:red;">*</span>',
                                        name: 'nvcGradeStatus',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.3,
                                        padding: 5,
                                        fieldLabel: '当前所在级<span style="color:red;">*</span>',
                                        name: 'nvcGrade',
                                        labelWidth: 80
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.35,
                                        padding: 5,
                                        fieldLabel: '培养方向<span style="color:red;">*</span>',
                                        name: 'nvcDevelop',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.35,
                                        padding: 5,
                                        fieldLabel: '专业方向<span style="color:red;">*</span>',
                                        name: 'nvcMajorDir',
                                        labelWidth: 65

                                    }, {
                                        xtype: 'datefield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '入学日期<span  style="color:red;">*</span>',
                                        name: 'dtmEntranceTime',
                                        labelWidth: 65,
                                        format: "Y-m-d",
                                        emptyText: "--请选择--"
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '毕业中学<span style="color:red;">*</span>',
                                        name: 'nvcGraduateSch',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '宿舍号<span style="color:red;">*</span>',
                                        name: 'nvcDormNo',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '电子邮箱<span style="color:red;">*</span>',
                                        name: 'nvcMail',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.3,
                                        padding: 5,
                                        fieldLabel: '联系电话<span style="color:red;">*</span>',
                                        name: 'nvcPhone',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '准考证号<span style="color:red;">*</span>',
                                        name: 'nvcAdmCode',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.5,
                                        padding: 5,
                                        fieldLabel: '身份证号<span style="color:red;">*</span>',
                                        name: 'nvcIdentity',
                                        labelWidth: 65,
                                        regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,18}$/,
                                        regexText: '只能输入数字和字母和汉字,且最多18个'
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '港澳台码<span style="color:red;">*</span>',
                                        name: 'nvcHMT',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '健康状况<span style="color:red;">*</span>',
                                        name: 'nvcHealth',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.25,
                                        padding: 5,
                                        fieldLabel: '报到号<span style="color:red;">*</span>',
                                        name: 'nvcRegister',
                                        labelWidth: 65
                                    }
                                ]
                            }, {
                                title: '家庭信息',
                                xtype: 'panel',
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        columnWidth: 0.3,
                                        padding: 5,
                                        fieldLabel: '家庭地址<span style="color:red;">*</span>',
                                        name: 'nvcFamilyAdd',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.3,
                                        padding: 5,
                                        fieldLabel: '家庭邮编<span style="color:red;">*</span>',
                                        name: 'nvcFamilyCode',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '家庭电话<span style="color:red;">*</span>',
                                        name: 'nvcFamilyTel',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '父亲名字<span style="color:red;">*</span>',
                                        name: 'nvcFather',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '父亲单位<span style="color:red;">*</span>',
                                        name: 'nvcFaFirm',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '父亲单位电话或手机<span style="color:red;">*</span>',
                                        name: 'nvcFaFirmTel',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '父亲单位邮编<span style="color:red;">*</span>',
                                        name: 'nvcFaFirmCode',
                                        labelWidth: 55
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '母亲名字<span style="color:red;">*</span>',
                                        name: 'nvcMother',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.4,
                                        padding: 5,
                                        fieldLabel: '母亲单位<span style="color:red;">*</span>',
                                        name: 'nvcMoFirm',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '母亲单位电话或手机<span style="color:red;">*</span>',
                                        name: 'nvcMoFirmTel',
                                        labelWidth: 65
                                    }, {
                                        xtype: 'textfield',
                                        columnWidth: 0.2,
                                        padding: 5,
                                        fieldLabel: '母亲单位邮编<span style="color:red;">*</span>',
                                        name: 'nvcMoFirmCode',
                                        labelWidth: 55
                                    }
                                ]
                            }],
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                ui: 'footer',
                                items: [
                                    '->', {
                                        xtype: 'button',
                                        itemId: 'BaseInfo_StudentEdit_OK',
                                        text: '确 定'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'BaseInfo_StudentEdit_Cancel',
                                        text: '取 消'
                                    }, '->'
                                ]
                            }
                        ]

                    }
                ]
            }
            ]
        }
        );
        me.callParent(arguments);
    }
});