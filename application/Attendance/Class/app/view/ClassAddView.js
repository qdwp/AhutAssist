
Ext.define('Attendance_Class.view.ClassAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.ClassAdd',
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
                     xtype: 'textfield',
                     columnWidth: 0.5,
                     padding: 5,
                     fieldLabel: '行政班级<span style="color:red;">*</span>',
                     name: 'nvcClass',
                     labelWidth: 75,
                     allowBlank: false,
                     allowOnlyWhitespace: false,

                 }, {
                     xtype: 'textfield',
                     columnWidth: 0.5,
                     padding: 5,
                     fieldLabel: '登陆工号<span  style="color:red;">*</span>',
                     name: 'nvcLoginCode',
                     labelWidth: 75,
                     allowBlank: false,
                     allowOnlyWhitespace: false,

                 }, {
                     xtype: 'textfield',
                     columnWidth: 0.5,
                     padding: 5,
                     fieldLabel: '学院<span style="color:red;">*</span>',
                     name: 'nvcCollege',
                     labelWidth: 75,
                     allowBlank: false,
                     allowOnlyWhitespace: false,

                 }, {
                     xtype: 'textfield',
                     columnWidth: 0.5,
                     padding: 5,
                     fieldLabel: '系<span  style="color:red;">*</span>',
                     name: 'nvcFaculty',
                     labelWidth: 75,
                     allowBlank: false,
                     allowOnlyWhitespace: false,

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
                            itemId: 'Attendance_ClassAdd_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Attendance_ClassAdd_Cancel',
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