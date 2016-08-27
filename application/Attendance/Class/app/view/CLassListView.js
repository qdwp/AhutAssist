Ext.define('Attendance_Class.view.ClassListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.ClassList',
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
        id: 'Attendance_Class_List',
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
                        store: 'ClassStore',
                        columns: [
                             {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcLoginCode',
                                 text: '登陆工号',
                                 hidden:true,
                                 flex: 0.5
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcName',
                                 text: '姓名',
                                 flex: 0.5
                             }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcClass',
                                  text: '行政班级',
                                  flex: 0.5

                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcCollege',
                                  text: '学院',
                                  flex: 1.5
                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcFaculty',
                                  text: '系',
                                  flex: 1.5

                              }
                ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                        }),
                   
                        dockedItems: [{
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: '100%',
                            displayInfo: true,
                            store: 'ClassStore'

                        }, {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                itemId: 'Attendance_Class_Display',
                                text: '全显'
                            }, {
                                xtype: 'textfield',
                                itemId: 'Attendance_Class_SearchText',
                                emptyText: '行政班级',
                                width: 240
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Class_Search',
                                text: '查询'
                            }, {
                                xtype: 'tbfill'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Class_Add',
                                text: '增加'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Class_Edit',
                                text: '修改'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Class_Delete',
                                text: '删除'
                            }
                            ]
                        }]
                    }]
            });
            me.callParent(arguments);
        }

    });