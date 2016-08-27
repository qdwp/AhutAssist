Ext.define('Attendance_Apply.view.ApplyListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.ApplyList',

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
    id: 'Attendance_Apply_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 550,
                width: '100%',
                scroll: 'vertical',
                store: 'ApplyStore',
                columns: [
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseName',
                         text: '课程名称',
                         flex: 0.75
                     }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'nvcCollege',
                        text: '开课学院',
                        flex: 0.5
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'nvcWeekHours',
                        text: '周学时',
                        flex: 0.3
                    }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseTime',
                         text: '上课时间',
                         flex: 0.5
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'nvcCoursePlace',
                        text: '上课地点',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'nvcCampus',
                        text: '校区',
                        flex: 0.25
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'IsApply',
                        text: '预约情况',
                        flex: 0.25,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value.toString().trim() === "1") {
                                return '已约';
                            }
                            else if (value.toString().trim() === '0') {
                                return "未约";
                            }
                        }
                    },
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                }),
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'ApplyStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                          {
                              xtype: 'tbfill'
                          }, {
                              xtype: 'button',
                              itemId: 'Attendance_Apply_Add',
                              text: '免听预约'
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