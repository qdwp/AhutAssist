Ext.define('BaseInfo_Teacher.view.TeacherListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.TeacherList',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.Label',

    ],
    id: 'BaseInfo_Teacher_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 500,
                width: '100%',
                scroll: 'vertical',
                store: 'TeacherStore',
                columns: [

                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcTeacherCode',
                         text: '教师职工号',
                         flex: 1

                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcName',
                         text: '姓名',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcSex',
                         text: '性别',
                         flex: 1,
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCollege',
                         text: '学院',
                         flex: 1
                     },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcDepartment',
                         text: '系',
                         flex: 1
                     },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcDiscipline',
                         text: '学科方向',
                         flex: 1
                     }

                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {

                }),
                plugins: [
                    Ext.create('Ext.grid.plugin.RowExpander', {
                        rowBodyTpl: [
                              '<table style="width: 100%;margin-left: 20px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #99ccff;border-left: 1px solid #99ccff;" cellspacing="0">',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '                角色类型:',
                              '            </div>{nvcRoleType}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               督导类型:',
                              '            </div>{intAuditorType:this.FormatAuditor}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               是否授课:',
                              '            </div>{nvcIsTeaching:this.FormatIsTeaching}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               授课类型:',
                              '            </div>{nvcTeachingType}',
                              '        </td>',
                               '        <td style="width: 10% ;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" rowspan="4">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               个人照片:',
                              '            </div><img align="middle" width="150" height="195" src={nvcTeaPhoto:this.FormatnvcPhoto}',
                              '        </td>',
                              '    </tr>',

                                '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               登录密码:',
                              '            </div>{nvcPwd}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               名族:',
                              '            </div>{nvcNationality}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               出生日期:',
                              '            </div>{dtmBirth}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               政治面貌:',
                              '            </div>{nvcPolitics}',
                              '        </td>',
                               '    </tr>',

                                '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               联系电话:',
                              '            </div>{nvcPhone}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               E-mail地址:',
                              '            </div>{nvcMail}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               毕业院校:',
                              '            </div>{nvcGraduate}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               毕业专业:',
                              '            </div>{nvcMajor}',
                              '        </td>',
                               '    </tr>',

                                 '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学历:',
                              '            </div>{nvcEducation}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学位:',
                              '            </div>{nvcDegree}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               职称:',
                              '            </div>{nvcJobTitle}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               职务:',
                              '            </div>{nvcJob}',
                              '        </td>',
                                '    </tr>',
                                '</table>',
                               '<table style="width: 100%;margin-left: 20px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #99ccff;border-left: 1px solid #99ccff;" cellspacing="0">',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                                '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               教师资格证号:',
                              '            </div>{nvcQualifyCode}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               主讲教师资格证号:',
                              '            </div>{nvcMQualifyCode}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               人事职工号:',
                              '            </div>{nvcPerStaffCode}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               是否实验室人员:',
                              '            </div>{nvcLabMan}',
                              '        </td>',   
                              '    </tr>',

                               '</table>',
                               '<table style="width: 100%;margin-left: 20px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #99ccff;border-left: 1px solid #99ccff;" cellspacing="0">',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 50%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               教学质量评价:',
                              '            </div>{nvcEvaluation}',
                              '        </td>',
                              '        <td style="width: 50%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               教师简介（1500字以内）:',
                              '            </div>{nvcTeacher}',
                              '        </td>',
                                '    </tr>',
                              '</table>',
                                {
                                    FormatIsTeaching: function (value) {
                                        if (value.toString().trim() === "0") {
                                            return "不授课";
                                        }
                                        else {
                                            return "授课";
                                        }
                                    },
                                    FormatnvcPhoto: function (value) {
                                        if (value.toString().trim() == "") {
                                            return "/resource/images/photo.png";
                                        }
                                        else {
                                            return value;
                                        }
                                    },

                                    FormatAuditor: function (value) {
                                        if (value.toString().trim() == "0") {
                                            return "非督导员";
                                        }
                                        if (value.toString().trim() == "1") {
                                            return "学院督导员";
                                        }
                                        if (value.toString().trim() == "0") {
                                            return "校督导员";
                                        }
                                    },
                                }

                        ]
                    })
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'TeacherStore'

                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        itemId: 'BaseInfo_Teacher_Display',
                        text: '全显'
                    }, {
                        xtype: 'textfield',
                        itemId: 'BaseInfo_Teacher_SearchText',
                        emptyText: '教师职工号，姓名',
                        width: 240
                    }, {
                        xtype: 'button',
                        itemId: 'BaseInfo_Teacher_Search',
                        text: '查询'
                    },
                    {
                        xtype: 'tbfill'
                    },
                     {
                         xtype: 'button',
                         itemId: 'BaseInfo_Teacher_Edit',
                         text: '修改'
                     },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_Teacher_Add',
                        text: '增加'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_Teacher_Delete',
                        text: '删除'
                    }
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_Teacher_Lead',
                    //    text: '导入'
                    //},
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_Teacher_Export',
                    //    text: '导出'
                    //},
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_Teacher_AdvanceQuery',
                    //    text: '高级查询'
                    //},
                    ]
                }]
            }]
        });

        me.callParent(arguments);
    }

});