Ext.define('Attendance_Apply.view.ApplyAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.ApplyAdd',
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
    title: '免听预约',
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
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcYear',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcTerm',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 0.75,
                       padding: 5,
                       name: 'nvcElectiveNum',
                       fieldLabel: '选课课号',
                       readOnly: true,
                       labelWidth: 75
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcCollege',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcWeekHours',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcToTalHours',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcCourseTime',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcCoursePlace',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 1,
                       padding: 5,
                       name: 'nvcCampus',
                       labelWidth: 75,
                       hidden: true
                   }, {
                       xtype: 'textfield',
                       columnWidth: 0.75,
                       padding: 5,
                       fieldLabel: '课程名称',
                       name: 'nvcCourseName',
                       readOnly:true,
                       labelWidth: 75
                   }, {
                       xtype: 'textfield',
                       columnWidth: 0.75,
                       padding: 5,
                       fieldLabel: '课程性质',
                       readOnly: true,
                       name: 'nvcCourseNature',
                       labelWidth: 75
                   }, {
                       xtype: 'textfield',
                       columnWidth: 0.75,
                       padding: 5,
                       fieldLabel: '任课教师',
                       readOnly: true,
                       name: 'nvcName',
                       labelWidth: 75
                   }, {
                       xtype: 'combobox',
                       fieldLabel: '申请免听类型<span style="color:red;">*</span>',
                       id:'MT_type',
                       columnWidth: 0.5,
                       padding: 5,
                       store: Type,
                       forceSelection: true,
                       editable:false,
                       emptyText: '---请选择类型---',
                       queryMode: 'local',
                       displayField: 'name',
                       valueField: 'abbr',
                   }
                ]
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        '->', {
                            xtype: 'button',
                            itemId: 'Attendance_ApplyAdd_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Attendance_ApplyAdd_Cancel',
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

var Type = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        { "abbr": "1", "name": "重修" },
        { "abbr": "2", "name": "双学位" },
         { "abbr": "3", "name": "先修" }
    ]
});