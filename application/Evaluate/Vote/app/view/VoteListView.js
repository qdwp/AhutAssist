Ext.define('Evaluate_Vote.view.VoteListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.VoteList',

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
    id: 'Evaluate_Vote_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 550,
                width: '100%',
                scroll: 'vertical',
                store: 'VoteStore',
                id:'Evaluate_VoteStore_Vote',
                columns: [
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcElectiveNum',
                         text: '选课课号',
                         flex: 1.5
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseName',
                         text: '课程名称',
                         flex: 1.5
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseNature',
                         text: '课程性质',
                         flex: 0.5
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcName',
                         text: '任课教师',
                         flex: 0.5
                     },  {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcIsvote',
                         text: '投票结果',
                         flex: 0.5,
                         renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                             if (value.toString().trim() === "1") {
                                 return '已投';
                             }
                             else if (value.toString().trim() === '0') {
                                 return "未投";
                             }
                         }

                     }
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                }),
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'VoteStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                          {
                               xtype: 'tbfill'
                           }, {
                               xtype: 'button',
                                itemId: 'Evaluate_Vote_Add',
                               text: '投票'
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