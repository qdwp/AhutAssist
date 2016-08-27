
Ext.define('Attendance_PriorityWatch.view.PriorityWatchAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.PriorityWatchAdd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 370,
    width: 600,
    minHeight: 370,
    minWidth: 600,
    layout: 'fit',
    title: '增加',
    maximizable: true,
    closeAction: 'hide',
    modal: true,

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'column',
                    items: [
                          {
                              xtype: 'gridpanel',
                              id: 'PriorityWatchAdd_Stu',
                              height: 500,
                              columnWidth: 1,
                              scroll: 'vertical',
                              store: 'AddWatchStore',
                              columns: [
                                   {
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
                          }],
                }
                ],

                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        items: [
                            '->', {
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatchAdd_OK',
                                text: '保存'
                            },
                            {
                                xtype: 'button',
                                itemId: 'Attendance_PriorityWatchAdd_Cancel',
                                text: '取 消'
                            }, '->'
                        ]
                    }
                ]
            }) ;
        me.callParent(arguments);
    }
});