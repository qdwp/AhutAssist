Ext.define('Attendance_Major.view.MajorListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.MajorList',
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
        id: 'Attendance_Major_List',
        width: '100%',

        initComponent: function () {
            var me = this;
            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'gridpanel',
                        height: 570,
                        width: '100%',
                        scroll: 'vertical',
                        store: 'MajorStore',
                        id: 'Attendance_Major_main',
                        columns: [
                              {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcElectiveNum',
                                  text: '选课课号',
                                  flex: 1
                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcCourseName',
                                  text: '课程名称',
                                  flex: 1
                              },  {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'timeAndPlace',
                                  text: '课程信息',
                                  flex: 2
                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'attendanceCount',
                                  id:'Attendance_Major_count',
                                  text: '点名次数',
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
                            store: 'MajorStore'
                        }, {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                            {
                                xtype: 'tbfill'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Major_Add',
                                text: '点名'
                            }, '-',{
                                xtype: 'button',
                                itemId: 'Attendance_Major_callrollout',
                                text: '导出Excel'
                            }, '-' ,  {
                                 xtype: 'button',
                                 itemId: 'Attendance_Major_Detail',
                                 text: '详情'
                             }        
                            ]
                        }]
                    }]
            });
            me.callParent(arguments);
        }

    });