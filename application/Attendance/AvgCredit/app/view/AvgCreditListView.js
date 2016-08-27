Ext.define('Attendance_AvgCredit.view.AvgCreditListView',
    {
        extend: 'Ext.container.Container',
        alies: 'widget.AvgCreditList',
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
        id: 'Attendance_AvgCredit_List',
        width: '100%',

        initComponent: function () {
            var me = this;
            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'gridpanel',
                        height: 500,
                        width: '100%',
                        scroll: 'vertical',
                        store: 'AvgCreditStore',
                        columns: [
                              {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcYear',
                                  text: '学年',
                                  flex: 1

                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcTerm',
                                  text: '学期',
                                  flex: 1,
                                  renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                      if (value.toString().trim() === "1") {
                                          return '第一学期';
                                      }
                                      else if (value.toString().trim() === '2') {
                                          return "第二学期";
                                      }
                                  }

                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcStuNo',
                                  text: '学号',
                                  flex: 1

                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcCredit',
                                  text: '平均学分绩点',
                                  flex: 1

                              }, {
                                  xtype: 'gridcolumn',
                                  align: 'center',
                                  dataIndex: 'nvcFlag',
                                  text: '标记',
                                  //hidden:true,
                                  flex: 1,
                                  renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                      if (value.toString().trim() === "0") {
                                          return '<sapn style="color:red;">无效</span>';
                                      }
                                      else if (value.toString().trim() === '1') {
                                          return "有效";
                                      }
                                  }

                              }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                        }),

                        dockedItems: [{
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: '100%',
                            displayInfo: true,
                            store: 'AvgCreditStore'

                        }, {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                itemId: 'Attendance_AvgCredit_Display',
                                text: '全显'
                            }, {
                                xtype: 'textfield',
                                itemId: 'Attendance_AvgCredit_SearchText',
                                emptyText: '学号',
                                width: 240
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_AvgCredit_Search',
                                text: '查询'
                            }, {
                                xtype: 'tbfill'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_AvgCredit_Add',
                                text: '增加'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_AvgCredit_Edit',
                                text: '修改'
                            }, {
                                xtype: 'button',
                                itemId: 'Attendance_AvgCredit_Delete',
                                text: '删除'
                            }
                            ]
                        }]
                    }]
            });
            me.callParent(arguments);
        }

    });