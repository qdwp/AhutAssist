Ext.define('Evaluate_Level.view.LevelEditView', {
    extend: 'Ext.window.Window',
    alias: 'widget.LevelEdit',
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
               fieldLabel: '评教等级<span style="color:red;">*</span>',
               name: 'nvcEvaGrade',
               labelWidth: 75,
               editable: false,
               forceSelection: true,
               queryMode: 'local',
               store: 'EvaStore',
               displayField: 'text',
               valueField: 'value'
           },
              {
                  xtype: 'numberfield',
                  columnWidth: 0.5,
                  padding: 5,
                  fieldLabel: '最低分',
                  name: 'intLowMark',
                  value: 50,
                  labelWidth: 40
              },
           {
               xtype: 'numberfield',
               columnWidth: 0.5,
               padding: 5,
               fieldLabel: '最高分',
               name: 'intHighMark',
               value: 95,
               labelWidth: 40
           },
              {
                  xtype: 'combobox',
                  columnWidth: 0.5,
                  padding: 5,
                  fieldLabel: '排序<span style="color:red;">*</span>',
                  name: 'intSort',
                  labelWidth: 75,
                  editable: false,
                  forceSelection: true,
                  queryMode: 'local',
                  store: 'SortStore',
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
                            itemId: 'Evaluate_LevelEdit_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Evaluate_LevelEdit_Cancel',
                            text: '取 消'
                        }, '->'
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});