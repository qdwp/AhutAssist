Ext.define('Evaluate_Level.view.LevelListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.LevelList',

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
    id: 'Evaluate_Level_List',
    width: '100%',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                height: 500,
                width: '100%',
                scroll: 'vertical',
                store: 'LevelStore',
                columns: [
                    {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'nvcEvaGrade',
                        text: '评教等级',
                        flex: 1,
                
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'intLowMark',
                        text: '最低分',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        align: 'center',
                        dataIndex: 'intHighMark',
                        text: '最高分',
                        flex: 1
                    },
                     {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'intSort',
                         text: '排序',
                         flex: 1,
                     }
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                }),
                   
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: '100%',
                    displayInfo: true,
                    store: 'LevelStore'

                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        itemId: 'Evaluate_Level_Display',
                        text: '全显'
                    },
                    {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        itemId: 'Evaluate_Level_Add',
                        text: '增加'
                    },
                    {
                        xtype: 'button',
                        itemId: 'Evaluate_Level_Edit',
                        text: '修改'
                    },
                    {
                        xtype: 'button',
                        itemId: 'Evaluate_Level_Delete',
                        text: '删除'
                    }
                    ]
                }]
            }]
        });

        me.callParent(arguments);
    }

});