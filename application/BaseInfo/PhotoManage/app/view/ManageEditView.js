Ext.define('BaseInfo_Manage.view.ManageEditView', {
    extend: 'Ext.window.Window',
    alias: 'widget.ManageEdit',
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
    title: '审核',
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
                            columnWidth: 0.3,
                            padding: 5,
                            fieldLabel: '学号',
                            name: 'nvcStuNo',
                            readOnly: true,
                            labelWidth: 75
                        }, {
                            xtype: 'textfield',
                            columnWidth: 0.3,
                            padding: 5,
                            fieldLabel: '姓名',
                            name: 'nvcStuName',
                            readOnly: true,
                            labelWidth: 75
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '审核结果<span style="color:red;">*</span>',
                            id: 'Photo_SH_result',
                            columnWidth: 0.4,
                            padding: 5,
                            store: result,
                            forceSelection: true,
                            editable: false,
                            emptyText: '---请选择---',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                        }, {
                            xtype: 'textfield',
                            columnWidth: 0.3,
                            padding: 5,
                            name: 'nvcStuPhoto',
                            hidden: true,
                            labelWidth: 75
                        }, {
                            xtype: 'textfield',
                            columnWidth: 0.3,
                            padding: 5,
                            name: 'nvcNewPhoto',
                            hidden: true,
                            labelWidth: 75
                        }, {
                            xtype: 'image',
                            name: 'PhotoImage',
                            id: 'BaseInfo_Photo_EditPhotoImage',
                            columnWidth: 0.5,
                            margin: '10 50 5 50',
                            height: 200,
                            src: '/resource/images/photo.png'
                        }, {
                            xtype: 'image',
                            name: 'NewImage',
                            id: 'BaseInfo_Photo_EditNewImage',
                            columnWidth: 0.5,
                            margin: '10 50 5 50',
                            height: 200,
                            src: '/resource/images/photo.png'
                        }, {
                            xtype: 'label',
                            columnWidth: 0.5,
                            text: '原图片'
                        }, {
                            xtype: 'label',
                            columnWidth: 0.5,
                            text: '新图片'
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
                            itemId: 'BaseInfo_ManageEdit_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'BaseInfo_ManageEdit_Cancel',
                            text: '取 消'
                        }, '->'
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});

var result = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        { "abbr": "通过", "name": "通过" },
        { "abbr": "未通过", "name": "未通过" },
         { "abbr": "待议", "name": "待议" }
    ]
});