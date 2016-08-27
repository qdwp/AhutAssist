Ext.define('Attendance_Setting.view.SettingListView', {
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
    ],
    id: 'Attendance_Setting_List',
    width: '100%',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                id: 'Attendance_Setting',
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
                          dataIndex: 'dtmStartTime',
                          text: '开始日期',
                          flex: 1.5
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'dtmEndTime',
                          text: '结束日期',
                          flex: 1.5
                      }
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
                    items: [
                        {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        itemId: 'Attendance_Setting_Add',
                        text: '增加'
                    }, {
                        xtype: 'button',
                        itemId: 'Attendance_Setting_Edit',
                        text: '修改'
                    }, {
                        xtype: 'button',
                        itemId: 'Attendance_Setting_Delete',
                        text: '删除'
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