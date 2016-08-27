Ext.define('BaseInfo_Manage.view.ManageListView', {
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
    id: 'BaseInfo_Manage_List',
    width: '100%',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                id:'Photo_Manage_Check',
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
                          dataIndex: 'dtmEditTime',
                          text: '申请时间',
                          flex: 1.25
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'dtmCheckTime',
                          text: '审核时间',
                          flex: 1.25
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCheckResult',
                          //hidden:true,
                          text: '审核结果',
                          flex: 0.5
                      }, {
                          xtype: 'gridcolumn',
                          dataIndex: 'nvcStuPhoto',
                          hidden: true
                      }, {
                          xtype: 'gridcolumn',
                          dataIndex: 'nvcNewPhoto',
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
                    store: 'ManageStore'
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbfill'
                        }, {
                            xtype: 'button',
                            itemId: 'BaseInfo_Manage_Edit',
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
