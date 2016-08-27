Ext.define('Attendance_Major.view.MajorAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.MajorAdd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 530,
    width: 900,
    minHeight: 530,
    minWidth: 900,
    //title: "学期：" + gbl_term + " &nbsp&nbsp" ,
    maximizable: false,
    closable: false,
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
                            //title: '开始点名',
                            xtype: 'panel',
                            border: 5,
                            height: 454,
                            columnWidth: 0.6,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'textfield',
                                    columnWidth: 0.5,
                                    padding: 5,
                                    fieldLabel: '选课课号<span style="color:red;">*</span>',
                                    name: 'nvcElectiveNum',
                                    id: 'Attendance_Major_nvcElectiveNum',
                                    labelWidth: 75,
                                    hidden: true
                                }, {
                                    xtype: 'combobox',
                                    columnWidth: 0.5,
                                    padding: 5,
                                    fieldLabel: '点名方式<span  style="color:red;">*</span>',
                                    name: 'nvcRollWay',
                                    labelWidth: 75,
                                    emptyText: '---请选择---',
                                    id: 'Attendance_Major_RollWay',
                                    queryMode: 'local',
                                    store: 'MeasureStore',
                                    editable: false,
                                    forceSelection: true,
                                    displayField: 'text',
                                    valueField: 'value'
                                }, {
                                    xtype: 'textfield',
                                    columnWidth: 0.36,
                                    padding: 5,
                                    fieldLabel: '点名人数<span style="color:red;">*</span>',
                                    id: 'Attendance_Major_RollNum',
                                    name: 'nvcRollNum',
                                    labelWidth: 75,
                                }, {
                                    xtype: 'button',
                                    id: 'DM_Btm',
                                    columnWidth: 0.14,
                                    text: '开始点名',
                                    margin: 5
                                }, {
                                    xtype: 'image',
                                    name: 'PhotoImage',
                                    id: 'Attendance_MajorAdd_PhotoImage',
                                    columnWidth: 0.7,
                                    margin: '20 5 5 160',
                                    height: 200,
                                    src: '/resource/images/photo.png'
                                }, {
                                    xtype: 'panel',
                                    columnWidth: 0.7,
                                    layout: 'column',
                                    margin: '5 5 5 160',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            columnWidth: 1,
                                            padding: 5,
                                            fieldLabel: '学号',
                                            name: 'nvcStuNo',
                                            id: 'Attendance_Major_StuNo',
                                            readOnly:true,
                                            labelWidth: 65,
                                            maxLength: 20
                                        }, {
                                            xtype: 'textfield',
                                            columnWidth: 1,
                                            padding: 5,
                                            fieldLabel: '姓名',
                                            name: 'nvcStuName',
                                            id: 'Attendance_Major_nvcStuName',
                                            readOnly: true,
                                            labelWidth: 65,
                                            maxLength: 20
                                        },{
                                             xtype: 'textfield',
                                             columnWidth: 1,
                                             padding: 5,
                                             fieldLabel: '班级',
                                             name: 'nvcClass',
                                             id: 'Attendance_Major_nvcClass',
                                             readOnly: true,
                                             labelWidth: 65,
                                             maxLength: 20
                                         }, {
                                            xtype: 'textfield',
                                            columnWidth: 1,
                                            padding: 5,
                                            fieldLabel: '当前/总数',
                                            name: 'total',
                                            id: 'Attendance_Major_total',
                                            readOnly: true,
                                            labelWidth: 65,
                                            maxLength: 20
                                        }
                                    ]
                                }, {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    columnWidth: 0.7,
                                    margin: '5 5 5 160',
                                    ui: 'footer',
                                    items: [
                                        '->', {
                                            xtype: 'button',
                                            id: 'CX_Btm',
                                            text: '撤销'
                                        }, {
                                            xtype: 'button',
                                            id: 'YD_BTm',
                                            text: '已到'
                                        }, {
                                            xtype: 'button',
                                            id: 'QQ_Btm',
                                            text: '缺勤'
                                        }, '->'
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'gridpanel',
                            hidden: true,
                            store: 'DMStore',
                            id: 'Attendance_Major_DM',
                            itemId: 'Attendance_Major_DM',
                            columns: [
                            ]
                        }, {
                            xtype: 'panel',          
                            columnWidth: 0.4,
                            border: 5,
                            height: 430,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    columnWidth: 0.4,
                                    store: 'XQStore',
                                    itemId: 'Attendance_Major_XQ',
                                    id: 'Attendance_Major_XQ',
                                    scroll: 'vertical',//人数多了的时候自动出现滑动条
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
                                           dataIndex: 'nvcClass',
                                           align: 'center',
                                           text: '班级',
                                           flex: 1
                                       }, {
                                           xtype: 'gridcolumn',
                                           align: 'center',
                                           dataIndex: 'nvcReason',
                                           text: '缺勤原因',
                                           flex: 1,
                                           editor: {
                                               xtype: "combobox",
                                               id: 'Attendance_Major_Reson',
                                               selectOnFocus: true,
                                               queryMode: 'local',
                                               store: 'ReasonStore',
                                               displayField: 'text',
                                               valueField: 'value',
                                               listeners: {
                                                   change: function (combo, e, eOpts) {
                                                       var grid = combo.up('gridpanel');
                                                       grid.on('edit', function (editor, e) {
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
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'panel',
                            columnWidth: 0.4,
                            height: 24,
                            //title: '考勤统计',
                            margin: '0 0 0 0',
                            border: 5,
                            items: [
                                {
                                    xtype: 'label',
                                    id: 'Attendance_Major_TJ',
                                    padding: 8,
                                    text: '本次考勤缺勤人数： 0人',
                                }
                            ]
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
                                    itemId: 'Attendance_MajorAdd_OK',
                                    text: '保存'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'Attendance_MajorAdd_Cancel',
                                    text: '取 消'
                                }, '->'
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});
