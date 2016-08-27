Ext.define('Evaluate_Setting.view.SettingEditView', {
    extend: 'Ext.window.Window',
    alias: 'widget.SettingEdit',
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
    title: '修改',
    maximizable: true,
    closeAction: 'hide',
    modal: true,


    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                layout: 'column',
                bodyPadding: 10,
                items: [
           {
               xtype: 'combobox',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '学年<span style="color:red;">*</span>',
               name: 'nvcYear',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'YearStore',
               displayField: 'text',
               valueField: 'value'
           }, {
               xtype: 'combobox',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '学期<span style="color:red;">*</span>',
               name: 'nvcTerm',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'TermStore',
               displayField: 'text',
               valueField: 'value'
           }, {
               xtype: 'datefield',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '开始日期<span  style="color:red;">*</span>',
               name: 'dtmBeginTime',
               labelWidth: 75,
               format: "Y-m-d  H:i:s",
               emptyText: "--请选择--"
           }, {
               xtype: 'datefield',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '结束日期<span  style="color:red;">*</span>',
               name: 'dtmEndTime',
               id: 'PJ_Edit_endTime',
               labelWidth: 75,
               format: "Y-m-d H:i:s",
               emptyText: "--请选择--",
               value: new Date(),
               listeners: {
                   select: function (field, value, eOpts) {
                       var t = Ext.getCmp('PJ_Edit_endTime');
                       var temp = Ext.Date.add(new Date(value), Ext.Date.HOUR, 23);
                       temp = Ext.Date.add(new Date(temp), Ext.Date.MINUTE, 59);
                       temp = Ext.Date.add(new Date(temp), Ext.Date.SECOND, 59);
                       t.setValue(temp);
                   }
               }
           }, {
               xtype: 'combobox',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '留言是否开放<span style="color:red;">*</span>',
               name: 'nvcNoteOpen',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'ConflictStore',
               displayField: 'text',
               valueField: 'value'
           }, {
               xtype: 'combobox',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '评教结果是否开放<span style="color:red;">*</span>',
               name: 'nvcResultOpen',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'ConflictStore',
               displayField: 'text',
               valueField: 'value'
           }, {
               xtype: 'combobox',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '是否有效<span style="color:red;">*</span>',
               name: 'nvcValid',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'ConflictStore',
               displayField: 'text',
               valueField: 'value'

           }
                ],
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        '->', {
                            xtype: 'button',
                            itemId: 'Evaluate_SettingEdit_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Evaluate_SettingEdit_Cancel',
                            text: '取 消'
                        }, '->'
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});