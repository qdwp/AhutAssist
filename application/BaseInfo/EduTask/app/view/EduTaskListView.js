Ext.define('BaseInfo_EduTask.view.EduTaskListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.EduTaskList',

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
    id: 'BaseInfo_EduTask_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 500,
                width: '100%',
                scroll: 'vertical',
                store: 'EduTaskStore',
                columns: [
                      {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcYear',
                          text: '学年',
                          flex: 1,  

                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcTerm',
                          text: '学期',
                          flex: 1,
                          renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                              if (value.toString().trim() === "1") {
                                  return '第一学期';
                              }
                              else if (value.toString().trim() === '2') {
                                  return "第二学期";
                              }
                          }

                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCourseName',
                          text: '课程名称',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'intStuNumber',
                          text: '选课人数',
                          flex: 1
                      },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCollege',
                         text: '开课学院',
                         flex: 1
                     },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcFaculty',
                         text: '开课系',
                         flex: 1
                     },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcTeacherCode',
                         text: '教师职工号',
                         flex: 1
                     },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCoursePlace',
                         text: '上课地点',
                         flex: 1
                     },
                      {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCourseTime',
                          text: '上课时间',
                          flex: 1
                      },

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
                              '                选课课号:',
                              '            </div>{nvcElectiveNum}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               课程代码:',
                              '            </div>{nvcCourseCode}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               课程性质:',
                              '            </div>{nvcCourseNature}',
                              '        </td>',
                              '    </tr>',
                              '</table>',
                        ]
                    })
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'EduTaskStore'

                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        itemId: 'BaseInfo_EduTask_Display',
                        text: '全显'
                    }, {
                        xtype: 'textfield',
                        itemId: 'BaseInfo_EduTask_SearchText',
                        emptyText: '教师职工号，课程名称',
                        width: 240
                    }, {
                        xtype: 'button',
                        itemId: 'BaseInfo_EduTask_Search',
                        text: '查询'
                    },
                    {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        itemId: 'BaseInfo_EduTask_Add',
                        text: '增加'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_EduTask_Edit',
                        text: '修改'
                    },
                    {
                        xtype: 'button',
                        itemId: 'BaseInfo_EduTask_Delete',
                        text: '删除'
                    }
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_EduTask_Lead',
                    //    text: '导入'
                    //},
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_EduTask_Export',
                    //    text: '导出'
                    //},
                    //{
                    //    xtype: 'button',
                    //    itemId: 'BaseInfo_EduTask_AdvanceQuery',
                    //    text: '高级查询'
                    //},
                    ]
                }]
            }]
        });

        me.callParent(arguments);
    }

});