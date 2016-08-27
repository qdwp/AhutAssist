Ext.define('Attendance_Major.view.MajorDetailView', {
    extend: 'Ext.window.Window',
    alias: 'widget.MajorDetail',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 525,
    width: 900,
    minHeight: 525,
    minWidth: 900,
    maximizable: false,
    closable: false,
    modal: true,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype: 'panel',
                            columnWidth: 1,
                            layout: 'column',
                            items: [
                                 {
                                     xtype: 'label',
                                     columnWidth: 0.5,
                                     itemId: 'Detail_ElectiveNum',
                                     id: 'Detail_ElectiveNum',
                                     padding: 8,
                                     text: '课程号： ***',
                                 }, {
                                     xtype: 'label',
                                     columnWidth: 0.3,
                                     itemId: 'Detail_CourseName',
                                     padding: 8,
                                     text: '课程名称：***'
                                 }, {
                                     xtype: 'combobox',
                                     fieldLabel: '点名次数',
                                     name: 'intRollCount',
                                     emptyText: '---请选择---',
                                     id: 'DM_combo',
                                     itemId: 'DM_combo',
                                     margin: 5,
                                     forceSelection: true,
                                     store: 'states',
                                     displayField: 'intRollCount',
                                     valueField: 'intRollCount'
                                 }
                            ]
                        },  {
                            xtype: 'panel',
                            columnWidth: 1,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'textfield',
                                    columnWidth: 0.3,
                                    padding: 5,
                                    fieldLabel: '点名时间',
                                    name: 'dtmRollTime',
                                    id: 'XQ_Time',
                                    labelWidth: 75,
                                    readOnly: true
                                }, {
                                    xtype: 'textfield',
                                    columnWidth: 0.20,
                                    padding: 5,
                                    fieldLabel: '点名方式',
                                    name: 'nvcRollWay',
                                    id: 'XQ_Way',
                                    labelWidth: 75,
                                    readOnly: true
                                }, {
                                    xtype: 'textfield',
                                    columnWidth: 0.15,
                                    padding: 5,
                                    fieldLabel: '缺勤人数',
                                    name: 'nvcCoutPeo',
                                    id: 'XQ_Peo',
                                    labelWidth: 75,
                                    readOnly: true
                                }, {
                                    xtype: 'textfield',
                                    columnWidth: 0.25,
                                    padding: 5,
                                    fieldLabel: '缺勤率',
                                    name: 'Percentage',
                                    id: 'XQ_Per',
                                    labelWidth: 75,
                                    readOnly: true
                                }, {
                                    xtype: 'button',
                                    padding: 5,
                                    itemId: 'XQ_SAVE',
                                    text: '保存'
                                }
                            ]
                        }, {
                            xtype: 'gridpanel',
                            store: 'DetailStore',
                            height: 360,
                            columnWidth: 1,
                            id: 'Attendance_Major_DE',
                            scroll: 'vertical',
                            columns: [
                                 {
                                     xtype: 'gridcolumn',
                                     align: 'center',
                                     dataIndex: 'ID',
                                     align: 'center',
                                     hidden: true,
                                     flex: 1
                                 }, {
                                     xtype: 'gridcolumn',
                                     align: 'center',
                                     dataIndex: 'nvcStuNo',
                                     align: 'center',
                                     text: '学号',
                                     flex: 1
                                 }, {
                                     xtype: 'gridcolumn',
                                     align: 'center',
                                     dataIndex: 'nvcStuName',
                                     align: 'center',
                                     text: '姓名',
                                     flex: 1
                                 }, {
                                     xtype: 'gridcolumn',
                                     align: 'center',
                                     dataIndex: 'nvcReason',
                                     text: '缺勤原因（点击修改）',
                                     flex: 1,
                                     editor: {
                                         xtype: "combobox",
                                         id: 'Attendance_Detail_Reson',
                                         selectOnFocus: true,
                                         queryMode: 'local',
                                         store: 'ReasonStore',
                                         displayField: 'text',
                                         valueField: 'value',
                                         listeners: {
                                             change: function (combo, e, eOpts) {
                                                 var grid = combo.up('gridpanel');
                                                 grid.on('edit', function (editor, e) {
                                                     var msgbox = Ext.MessageBox.show({
                                                         title: '提示',
                                                         msg: "请点击上方按钮保存当前界面！",
                                                         icon: Ext.Msg.INFO,
                                                         buttons: Ext.Msg.OK
                                                     });
                                                     e.record.commit();    
                                                 });
                                             }
                                         }
                                     }
                                 }
                            ],
                            plugins: [
                           Ext.create('Ext.grid.plugin.CellEditing', {
                               clicksToEdit: 1
                           })
                            ],
                            dockedItems: [
                                 {
                                     xtype: 'pagingtoolbar',
                                     dock: 'bottom',
                                     width: '100%',
                                     displayInfo: true,
                                     store: 'DetailStore'
                                 }
                            ]
                        }, {
                            xtype: 'gridpanel',
                            store: 'DetailStore',
                            height: 360,
                            columnWidth: 1,
                            id: 'Attendance_Major_All',
                            scroll: 'vertical',
                            columns: [
                               {
                                   xtype: 'gridcolumn',
                                   align: 'center',
                                   dataIndex: 'nvcStuNo',
                                   align: 'center',
                                   text: '学号',
                                   flex: 1
                               }, {
                                   xtype: 'gridcolumn',
                                   align: 'center',
                                   dataIndex: 'nvcStuName',
                                   align: 'center',
                                   text: '姓名',
                                   flex: 1
                               }, {
                                   xtype: 'gridcolumn',
                                   align: 'center',
                                   dataIndex: 'IntCount',
                                   align: 'center',
                                   text: '缺勤次数',
                                   flex: 1
                               }
                            ],
                            dockedItems: [
                                 {
                                     xtype: 'pagingtoolbar',
                                     dock: 'bottom',
                                     width: '100%',
                                     displayInfo: true,
                                     store: 'DetailStore'
                                 }
                            ]
                        }, {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            items: [
                                '->', {
                                    xtype: 'button',
                                    itemId: 'Attendance_Detail_Cancel',
                                    text: '关闭'
                                }, '->']
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});



