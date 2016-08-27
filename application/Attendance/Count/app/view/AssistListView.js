//辅导员考勤统计
Ext.define('Attendance_Count.view.AssistListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.AssistList',
        requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.Label'
        ],
        id: 'Attendance_Assist_List',
        width: '100%',

        initComponent: function () {
            var me = this;
            Ext.applyIf(me, {
                items: [

                    {
                        xtype: 'panel',
                        columnWidth: 1,
                        layout: 'column',
                        items: [
                             {
                                 xtype: 'combobox',
                                 fieldLabel: '缺勤统计方式',
                                 columnWidth: 0.25,
                                 padding: 5,
                                 store: Assist_way,
                                 id: 'TJ_main_Assist_way',
                                 emptyText: '---请选择查询条件---',
                                 value: '学生旷课',
                                 queryMode: 'local',
                                 displayField: 'name',
                                 valueField: 'abbr',
                             }
                        ]
                    }, {
                        xtype: 'gridpanel',
                        id: 'TJ_Main_Assist_Stu',
                        height: 500,
                        width: '100%',
                        scroll: 'vertical',
                        store: 'CountStore',
                        columns: [
                             {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcStuNo',
                                 text: '学号',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcStuName',
                                 text: '姓名',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcCollege',
                                 text: '学院',
                                 flex: 1.25
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcMajor',
                                 text: '专业',
                                 flex: 1.25
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcGrade',
                                 text: '所在年级',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcClass',
                                 text: '行政班级',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'IntCount',
                                 text: '缺勤次数',
                                 flex: 0.75
                             }
                        ],

                        dockedItems: [
                            //{
                            //xtype: 'pagingtoolbar',
                            //dock: 'bottom',
                            //width: '100%',
                            //displayInfo: true,
                            //store: 'CountStore'

                            //},
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'Attendance_Count_Display',
                                    text: '全显'
                                }, {
                                    xtype: 'combobox',
                                    columnWidth: 0.3,
                                    padding: 5,
                                    store: condition,
                                    emptyText: '---请选择查询条件---',
                                    itemId: 'TJ_Main_Condition',
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'abbr',
                                }, {
                                    xtype: 'textfield',
                                    columnWidth: 0.2,
                                    padding: 5,
                                    itemId: 'Attendance_Count_SearchText',
                                    emptyText: '--请输入查询内容--',
                                    width: 130
                                }, {
                                    xtype: 'button',
                                    itemId: 'Attendance_Count_Search',
                                    text: '查询'
                                }
                            ]
                        }
                        ]
                    }, {
                        xtype: 'gridpanel',
                        id: 'TJ_Main_Assist_Class',
                        height: 500,
                        width: '100%',
                        scroll: 'vertical',
                        store: 'CountClassStore',
                        columns: [
                             {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcCollege',
                                 text: '学院',
                                 flex: 1.25
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcMajor',
                                 text: '专业',
                                 flex: 1.25
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcGrade',
                                 text: '所在年级',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'nvcClass',
                                 text: '行政班级',
                                 flex: 0.75
                             }, {
                                 xtype: 'gridcolumn',
                                 align: 'center',
                                 dataIndex: 'IntCount',
                                 text: '缺勤次数',
                                 flex: 0.75
                             }
                        ],

                        dockedItems: [
                            //{
                            //xtype: 'pagingtoolbar',
                            //dock: 'bottom',
                            //width: '100%',
                            //displayInfo: true,
                            //store: 'CountClassStore'

                            //},
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                itemId: 'Attendance_Count_Display',
                                text: '全显'
                            }, {
                                xtype: 'combobox',
                                columnWidth: 0.5,
                                padding: 5,
                                store: condition_Class,
                                emptyText: '---请选择查询条件---',
                                itemId: 'TJ_Main_Condition',
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'abbr',
                            }, {
                                xtype: 'textfield',
                                itemId: 'Attendance_Count_SearchText',
                                emptyText: '--请输入查询内容--',
                                width: 130
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_Count_Search',
                                text: '查询'
                            }, {
                                xtype: 'tbfill'
                            }
                            ]
                        }]
                    }
                ]
            });
            me.callParent(arguments);
        }

    });

var condition = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
           { "abbr": "月", "name": "月份" },
                  { "abbr": "周", "name": "周" },
           { "abbr": "学号", "name": "学号" },
          { "abbr": "专业", "name": "专业" },
         { "abbr": "年级", "name": "年级" },
         { "abbr": "班级", "name": "班级" }

    ]
});
var condition_Class = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
       { "abbr": "月", "name": "月份" },
                   { "abbr": "周", "name": "周" },
        { "abbr": "专业", "name": "专业" },
        { "abbr": "年级", "name": "年级" },
         { "abbr": "班级", "name": "班级" }
    ]
});
var condition_Major = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
      { "abbr": "月", "name": "月份" },
      { "abbr": "周", "name": "周" },
        { "abbr": "专业", "name": "专业" },
        { "abbr": "年级", "name": "年级" }
    ]
});


var Assist_way = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        { "abbr": "学生旷课", "name": "学生旷课" },
        { "abbr": "班级倒叙", "name": "班级倒叙" }
    ]
});