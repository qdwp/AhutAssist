Ext.define('Attendance_Manage.view.ManageListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.ManageList',
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
    id: 'Attendance_Manage_List',
    width: '100%',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                id:'Manage_Check',
                height: 400,
                width: '100%',
                scroll: 'vertical',
                store: 'ManageStore',
                columns: [
                      {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcStuNo',
                          text: '学号',
                          flex: 0.75
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcStuName',
                          text: '姓名',
                          flex: 0.75
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCourseName',
                          text: '课程名称',
                          flex: 1.5
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcName',
                          text: '任课教师',
                          flex: 0.75
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'dtmApplyTime',
                          text: '申请时间',
                          flex: 1.25
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcFreeListenType',
                          text: '申请免听类型',
                          flex: 1,
                          renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                              if (value.toString().trim() === "1") {
                                  return '重修';
                              }
                              else if (value.toString().trim() === '2') {
                                  return "双学位";
                              }
                              else  {
                                  return "先修";
                              }
                          }
                      },  {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'dtmCheckTime',
                          text: '审核时间',
                          flex: 1.25
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCheckResult',
                          text: '审核结果',
                          flex: 0.5
                      }
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                }),
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'ManageStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbfill'
                        }, {
                            xtype: 'button',
                            itemId: 'Attendance_Manage_Edit',
                            text: '审核'
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