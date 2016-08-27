Ext.define('Attendance_Detail.view.DetailListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.DetailList',
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
        'Ext.form.Label'

        ],
        id: 'Attendance_Detail_List',
        width: '100%',

        initComponent: function () {
            var me = this;
            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'gridpanel',
                        height: 500,
                        width: '100%',
                        scroll: 'vertical',
                        store: 'DetailStore',
                        columns: [
                             {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcCourseName',
                                 text: '课程名称',
                                 flex: 1
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcName',
                                 text: '老师姓名',
                                 flex: 0.5
                             },  {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcReason',
                                  text: '缺勤原因',
                                  flex: 0.5
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'timePlace',
                                 text: '详情',
                                 flex: 2
                             } ,{
                                   xtype: 'gridcolumn',
                                   align: 'center',
                                   dataIndex: 'dtmRollTime',
                                   text: '点名时间',
                                   flex: 1

                               }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                        }),

                        dockedItems: [{
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: '100%',
                            displayInfo: true,
                            store: 'DetailStore'

                        }, {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                itemId: 'Attendance_Detail_Display',
                                text: '全显'
                            }, {
                                xtype: 'textfield',
                                itemId: 'Attendance_Detail_SearchText',
                                emptyText: '课程名称',
                                width: 240
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Detail_Search',
                                text: '查询'
                            }, {
                                xtype: 'tbfill'
                            }
                            ]
                        }]
                    }]
            });
            me.callParent(arguments);
        }

    });