Ext.define('Attendance_Manage.view.ManageEditView', {
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
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '学年',
                          name: 'nvcYear',
                          readOnly: true,
                          labelWidth: 75
                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '学期',
                          name: 'nvcTerm',
                          readOnly: true,
                          labelWidth: 75
                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '选课课号',
                          name: 'nvcElectiveNum',
                          readOnly: true,
                          labelWidth: 75
                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '课程名称',
                          name: 'nvcCourseName',
                          readOnly: true,
                          labelWidth: 75
                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '学号',
                          name: 'nvcStuNo',
                          readOnly: true,
                          labelWidth: 75
                      }, {
                          xtype: 'textfield',
                          columnWidth: 0.5,
                          padding: 5,
                          fieldLabel: '姓名',
                          name: 'nvcStuName',
                          readOnly: true,
                          labelWidth: 75
                      }, , {
                          xtype: 'combobox',
                          fieldLabel: '审核结果<span style="color:red;">*</span>',
                          id: 'SH_result',
                          columnWidth: 0.5,
                          padding: 5,
                          store: result,
                          forceSelection: true,
                          editable: false,
                          emptyText: '---请选择---',
                          value:'待议',
                          queryMode: 'local',
                          displayField: 'name',
                          valueField: 'abbr',
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
                            itemId: 'Attendance_ManageEdit_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Attendance_ManageEdit_Cancel',
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