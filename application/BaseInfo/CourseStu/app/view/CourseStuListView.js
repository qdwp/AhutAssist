Ext.define('BaseInfo_CourseStu.view.CourseStuListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.CourseStuList',

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
    id: 'BaseInfo_CourseStu_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                id: 'BaseInfo_CourseStu_ListViewGrid',
                height: 650,
                width: '100%',
                scroll: 'vertical',
                store: 'CourseStuStore',
                columns: [
                       {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'nvcElectiveNum',
                           text: '选课课号',
                           flex: 2
                       }, {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'nvcCourseName',
                           text: '课程名称',
                           flex: 2
                       }, {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'nvcName',
                           text: '任课教师',
                           flex: 1.5

                       }, {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'nvcEvaGrade',
                           text: '评教等级',
                           flex: 1
                       }, {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'intScore',
                           text: '评教得分',
                           flex: 1
                       },
                       {
                           xtype: 'gridcolumn',
                           align: 'center',
                           dataIndex: 'intIsEvaluate',
                           text: '是否评教',
                           flex: 1,
                           hidden: true
                       }
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {

                }),
              
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'CourseStuStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                       {
                            xtype: 'tbfill'
                        }, {
                            xtype: 'button',
                            itemId: 'BaseInfo_CourseStu_Edit',
                            text: '评教'
                        }
                    ]
                }
                ]
            }]
        });
        me.callParent(arguments);
    }

});