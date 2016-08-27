
Ext.define('Attendance_AvgCredit.view.AvgCreditAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.AvgCreditAdd',
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
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '学号<span style="color:red;">*</span>',
                          name: 'nvcStuNo',
                          labelWidth: 75,
                          allowBlank: false,
                          allowOnlyWhitespace: false,

                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '平均学分绩点<span  style="color:red;">*</span>',
                          name: 'nvcCredit',
                          labelWidth: 75,
                          regex: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,99}$/,
                          regexText: '只能输入数字和字母和汉字,且最多99'

                      }, {
                          xtype: 'combobox',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '标记<span  style="color:red;">*</span>',
                          name: 'nvcFlag',
                          labelWidth: 75,
                          aeditable: false,
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
                            itemId: 'Attendance_AvgCreditAdd_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Attendance_AvgCreditAdd_Cancel',
                            text: '取 消'
                        }, '->'
                    ]
                }
            ]
        })
        ;
        me.callParent(arguments);
    }
});