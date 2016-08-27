Ext.define('Evaluate_Vote.view.VoteListView_T', {
    extend: 'Ext.container.Container',
    alias: 'widget.VoteList_T',

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
            items: [
                {
                    xtype: 'gridpanel',
                    height: 550,
                    width: '100%',
                    scroll: 'vertical',
                    store: 'VoteStore',
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
                         }, {
                             xtype: 'gridcolumn',
                             align: 'center',
                             dataIndex: 'nvcCourseNature',
                             text: '课程性质',
                             flex: 0.5
                         }, {
                             xtype: 'gridcolumn',
                             align: 'center',
                             dataIndex: 'nvcCount',
                             text: '所得票数',
                             flex: 0.5,
                         }],
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: '100%',
                        displayInfo: true,
                        store: 'VoteStore'
                    }
                    ]
                }

            ]
        });

        me.callParent(arguments);
    }

});