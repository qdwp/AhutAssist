Ext.define('BaseInfo_Student.view.StudentListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.StudentList',

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
    id: 'BaseInfo_Student_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 500,
                width: '100%',
                scroll: 'vertical',
                store: 'StudentStore',
                columns: [
                      {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcStuNo',
                         text: '学号',
                         flex: 1

                     }  , {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcStuName',
                         text: '姓名',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcSex',
                         text: '性别',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCollege',
                         text: '学院',
                         flex: 1
                     },  {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcMajor',
                         text: '专业名称',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcClass',
                         text: '行政班',
                         flex: 1
                     },  {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcDormNo',
                          text: '宿舍号',
                          flex: 1
                      }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcPhone',
                         text: '联系电话',
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
                              '                培养方向:',
                              '            </div>{nvcDevelop}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               专业方向:',
                              '            </div>{nvcMajorDir}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               入学日期:',
                              '            </div>{dtmEntranceTime}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               身份证号:',
                              '            </div>{nvcIdentity}',
                              '        </td>',
                              '        <td rowspan="4"; style="width: 10%;height: 150 ;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学生照片:',
                              '            </div><img align="middle" width="150" height="195" src={nvcStuPhoto:this.FormatnvcStuPhoto}',
                              '        </td>',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               登录密码:',
                              '            </div>{nvcPwd}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               出生日期:',
                              '            </div>{dtmBirth}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               政治面貌:',
                              '            </div>{nvcPolity}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               名族:',
                              '            </div>{nvcNationality}',
                              '        </td>',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               籍贯:',
                              '            </div>{nvcNative}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               生源地:',
                              '            </div>{nvcSource}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               系:',
                              '            </div>{nvcFaculty}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学制:',
                              '            </div>{intEducationAge}',
                              '        </td>',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               英语等级:',
                              '            </div>{nvcEngGrade}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学习年限:',
                              '            </div>{nvcStuAge}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               学籍状态:',
                              '            </div>{nvcGradeStatus}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               当前所在级:',
                              '            </div>{nvcGrade}',
                              '        </td>',
                              '    </tr>',
                                '</table>',
                               '<table style="width: 100%;margin-left: 20px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #99ccff;border-left: 1px solid #99ccff;" cellspacing="0">',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               毕业中学:',
                              '            </div>{nvcGraduateSch}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               电子邮箱:',
                              '            </div>{nvcMail}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               准考证号:',
                              '            </div>{nvcAdmCode}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               港澳台码:',
                              '            </div>{nvcHMT}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               健康状况:',
                              '            </div>{nvcHealth}',
                              '        </td>',
                              '    </tr>',
                              '</table>',

                                '<table style="width: 100%;margin-left: 20px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #99ccff;border-left: 1px solid #99ccff;" cellspacing="0">',
                               '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               报到号:',
                              '            </div>{nvcRegister}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               家庭地址:',
                              '            </div>{nvcFamilyAdd}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               家庭邮编:',
                              '            </div>{nvcFamilyCode}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               家庭电话:',
                              '            </div>{nvcFamilyTel}',
                              '        </td>',
                              '    </tr>',
                               '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               父亲名字:',
                              '            </div>{nvcFather}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               父亲单位:',
                              '            </div>{nvcFaFirm}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               父亲单位电话或手机:',
                              '            </div>{nvcFaFirmTel}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               父亲单位邮编:',
                              '            </div>{nvcFaFirmCode}',
                              '        </td>',
                              '    </tr>',
                              '    <tr style="width: 100%;padding-bottom: 20px;vertical-align: top;">',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;">',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               母亲名字:',
                              '            </div>{nvcMother}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               母亲单位:',
                              '            </div>{nvcMoFirm}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               母亲单位电话或手机:',
                              '            </div>{nvcMoFirmTel}',
                              '        </td>',
                              '        <td style="width: 25%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               母亲单位邮编:',
                              '            </div>{nvcMoFirmCode}',
                              '        </td>',
                              '    </tr>',
                             '</table>',
                              {
                                  FormatnvcStuPhoto: function (value) {
                                      if (value.toString().trim() == "") {
                                          return "/resource/images/photo.png";
                                      }
                                      else {
                                          return value;
                                      }
                                  }
                              }
                        ]
                    })
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'StudentStore'

                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        itemId: 'BaseInfo_Student_Display',
                        text: '全显'
                    }, {
                        xtype: 'textfield',
                        itemId: 'BaseInfo_Student_SearchText',
                        emptyText: '学号，姓名',
                        width: 240
                    }, {
                        xtype: 'button',
                        itemId: 'BaseInfo_Student_Search',
                        text: '查询'
                    },
                    {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        itemId: 'BaseInfo_Student_Add',
                        text: '增加'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_Student_Edit',
                        text: '修改'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_Student_Delete',
                        text: '删除'
                    }
                    ]
                }]
            }]
        });

        me.callParent(arguments);
    }

});