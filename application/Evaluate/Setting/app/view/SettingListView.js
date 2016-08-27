Ext.define('Evaluate_Setting.view.SettingListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.SettingList',
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
        'Ext.form.HtmlEditor'
    ],
    id: 'Evaluate_Setting_List',
    width: '100%',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                id:'Evaluate_Setting',
                height: 400,
                width: '100%',
                scroll: 'vertical',
                store: 'SettingStore',
                columns: [
                      {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcYear',
                          text: '学年',
                          flex: 1
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
                          dataIndex: 'dtmBeginTime',
                          text: '开始日期',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'dtmEndTime',
                          text: '结束日期',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcValid',
                          text: '是否有效',
                          flex: 1,
                          renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                              if (value.toString().trim() === "0") {
                                  return '<sapn style="color:red;">无效</span>';
                              }
                              else if (value.toString().trim() === '1') {
                                  return "有效";
                              }
                          }
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'txtMatter',
                          hidden:true,
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
                              '                留言是否开放:',
                              '            </div>{nvcNoteOpen:this.FormatOpen}',
                              '        </td>',
                              '        <td style="width: 20%;vertical-align: top;border-right: 1px solid #99ccff;padding: 5px;border-top: 1px solid #99ccff;" >',
                              '            <div style="font-weight: 600;padding-bottom: 5px;padding-top: 0px;">',
                              '               评教结果是否开放:',
                              '            </div>{nvcResultOpen:this.FormatOpen}',
                              '        </td>',
                              '    </tr>',
                              '</table>',
                               {
                                   FormatOpen: function (value) {
                                       if (value.toString().trim() === "0") {
                                           return "开放";
                                       }
                                       else {
                                           return "不开放";
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
                    store: 'SettingStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        itemId: 'Evaluate_Setting_Display',
                        text: '全显'
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        itemId: 'Evaluate_Setting_Add',
                        text: '增加'
                    }, {
                        xtype: 'button',
                        itemId: 'Evaluate_Setting_Edit',
                        text: '修改'
                    }, {
                        xtype: 'button',
                        itemId: 'Evaluate_Setting_Delete',
                        text: '删除'
                    }
                    ]
                }
                ]
            }, {
                xtype: 'panel',
                layout: 'column',
                items:
                    [
                        {
                            xtype: 'htmleditor',
                            dock: 'bottom',
                            name: 'editor',
                            id: 'bio',
                            columnWidth: 1,
                            enableAlignments: true,//左，中，右对齐
                            enableColors: true,
                            enableFont: true,//字体
                            enableFontSize: true,
                            enableFormat: true,
                            enableLinks: true,
                            enableLists: true,
                            enableSourceEdit: true,
                            fontFamilies: ["宋体", "隶书", "黑体"]
                        }
                    ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                             '->', {
                                 xtype: 'button',
                                 columnWidth: 0.1,
                                 menuAlign: 'center',
                                 itemId: 'Evaluate_Setting_Save',
                                 text: '保存'
                             }, '->'
                    ]
                }]
            }
            ]
        });
        me.callParent(arguments);
    }
});