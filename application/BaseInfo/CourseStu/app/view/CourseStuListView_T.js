Ext.define('BaseInfo_CourseStu.view.CourseStuListView_T', {
    extend: 'Ext.container.Container',
    alias: 'widget.CourseStuList_T',

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
        'Ext.form.Label',

    ],
    id: 'BaseInfo_CourseStu_List_T',
    width: '100%',


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                 {
                     dockedItems: [{
                         xtype: 'toolbar',
                         dock: 'top',
                         items: [
                             {
                                 xtype: 'combobox',
                                 columnWidth: 0.5,
                                 padding: 5,
                                 fieldLabel: '学年<span style="color:red;">*</span>',
                                 name: 'nvcYear',
                                 itemId: 'BaseInfo_CourseStu_nvcYear',
                                 id: 'BaseInfo_CourseStu_nvcYear',
                                 labelWidth: 75,
                                 queryMode: 'local',
                                 store: 'YearStore',
                                 displayField: 'text',
                                 valueField: 'value',
                                 value: '2015-2016'
                             }, {
                                 xtype: 'combobox',
                                 columnWidth: 0.5,
                                 padding: 5,
                                 fieldLabel: '学期<span style="color:red;">*</span>',
                                 name: 'nvcTerm',
                                 itemId: 'BaseInfo_CourseStu_nvcTerm',
                                 id: 'BaseInfo_CourseStu_nvcTerm',
                                 labelWidth: 75,
                                 queryMode: 'local',
                                 store: 'TermStore',
                                 displayField: 'text',
                                 valueField: 'value',
                                 value: '1'
                             }
                         ]
                     }
                     ]
                 },
                 {
                     xtype: 'gridpanel',
                     width: '100%',
                     scroll: 'vertical',
                     height: 200,
                     store: 'CourseStuStore_T',
                     id: 'BaseInfo_Course_gridpanel_PJ',
                     columns: [{
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcElectiveNum',
                         itemId: 'BaseInfo_Course_ElectiveNum',
                         id: 'BaseInfo_Course_ElectiveNum',
                         text: '选课课号',
                         flex: 2.3
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseName',
                         text: '课程名称',
                         flex: 1.75
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcCourseNature',
                         text: '课程性质',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcEvaGrade',
                         text: '评教等级',
                         flex: 0.75
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'avgScore',
                         text: '评教得分',
                         flex: 0.75
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'intEvaPeo',
                         text: '评价人数',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'intNotEvaPeo',
                         text: '未评人数',
                         flex: 1
                     }, {
                         xtype: 'gridcolumn',
                         align: 'center',
                         dataIndex: 'nvcConPeo',
                         text: '留言',
                         flex: 1
                     }
                     ]
                 }, {
                     dockedItems: [{
                         xtype: 'pagingtoolbar',
                         dock: 'bottom',
                         width: '100%',
                         displayInfo: true,
                         store: 'CourseStuStore_T'
                     }
                     ]
                 }, {
                     xtype: 'gridpanel',
                     height: 250,
                     width: '100%',
                     scroll: 'vertical',
                     hidden: true,
                     store: 'MessageStore',
                     id: 'BaseInfo_Course_gridpanel_LY',
                     columns: [
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: 'dtmLeaveTime',
                            text: '留言时间',
                            flex: 1
                        }, {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: 'nvcContents',
                            text: '留言',
                            flex: 3
                        }
                     ]
                 }, {
                     xtype: 'panel',
                     title: '留言面板',
                     width: '100%',
                     height: 260,
                     layout: 'border',
                     activeItem: 1,                  //默认活动项
                     id: 'MessagePanel',
                     items: [{
                         xtype: "panel",
                         region: 'north',
                         layout: 'column',
                         columnWidth: 1,
                         height: "100%",
                         padding: 0,
                         items: [
                              {
                                  xtype: 'panel',
                                  padding: "5% 10% 5% 15%",
                                  id: 'PJ_textarea_LY',
                                  height: 135,
                                  columnWidth: 1
                              }, {
                                  xtype: 'panel',
                                  padding: "5% 5% 5% 800%",
                                  columnWidth: 1,
                                  id: 'CourseStu_SJ',
                              }
                         ]
                     }],
                     bbar: ['->',
                         {
                         xtype: 'button',
                         itemId: 'cardPrev',
                         text: '« 前一页',
                     }, {
                         xtype: 'button',
                         itemId: 'cardNext',
                         text: '后一页 »',
                     }]
                 }
            ]
        });
        me.callParent(arguments);
    }

});

