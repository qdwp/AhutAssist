Ext.define('Attendance_PriorityWatch.view.PriorityWatchListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.PriorityWatchList',
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
        id: 'Attendance_PriorityWatch_List',
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
                        store: 'PriorityWatchStore',
                        columns: [
                             {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcName',
                                 text: '姓名',
                                 hidden:true,
                                 flex: 1
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcLoginCode',
                                 text: '登陆工号',
                                 hidden: true,
                                 flex: 1
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcStuNo',
                                 text: '学号',
                                 flex: 1
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcStuName',
                                 text: '姓名',
                                 flex: 1
                             }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                        }),

                        dockedItems: [
                            //{
                            //xtype: 'pagingtoolbar',
                            //dock: 'bottom',
                            //width: '100%',
                            //displayInfo: true,
                            //store: 'PriorityWatchStore'

                            //},
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatch_Display',
                                text: '全显'
                            }, {
                                xtype: 'textfield',
                                itemId: 'Attendance_PriorityWatch_SearchText',
                                emptyText: '学号',
                                width: 240
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatch_Search',
                                text: '查询'
                            }, {
                                xtype: 'tbfill'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatch_Add',
                                text: '增加重点监控学生'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatch_Delete',
                                text: '删除'
                            }
                            ]
                        }]
                    }]
            });
            me.callParent(arguments);
        }

    });