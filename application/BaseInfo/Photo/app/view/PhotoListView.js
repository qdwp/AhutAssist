Ext.define('BaseInfo_Photo.view.PhotoListView', {
    extend: 'Ext.container.Container',
    alias: 'widget.PhotoList',

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
    id: 'BaseInfo_Photo_List',
    width: '100%',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                width: '100%',
                scroll: 'vertical',
                store: 'PhotoStore',
                columns: [
                      {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcStuNo',
                          text: '学号',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcStuName',
                          text: '姓名',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcSex',
                          text: '性别',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcClass',
                          text: '班级',
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcCheckResult',
                          text: '审核结果',
                          flex: 1
                      },  {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcStuPhoto',
                          hidden: true,
                          flex: 1
                      }, {
                          xtype: 'gridcolumn',
                          align: 'center',
                          dataIndex: 'nvcNewPhoto',
                          hidden: true,
                          flex: 1
                      }
                ]
            }, {
                xtype: 'form',
                layout: 'column',
                height: 500,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'panel',
                        columnWidth: 0.5,
                        items: [
                             {
                                 xtype: 'image',
                                 name: 'PhotoImage',
                                 id: 'BaseInfo_Photo_PhotoImage',
                                 margin: '15 110 5 110',
                                 height: 290,
                                 src: '/resource/images/photo.png'
                             }
                        ]
                    }, {
                        xtype: 'panel',
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'image',
                                name: 'NewImage',
                                id: 'BaseInfo_Photo_NewImage',
                                margin: '15 110 5 110',
                                height: 290,
                                src: '/resource/images/photo.png',
                            }
                        ]
                    }, {
                      xtype: 'filefield',
                      columnWidth: 0.4,
                      padding: '5 5 5 0',
                      name: 'nvcStuPhotoChoseFiles',
                      labelWidth: 65,
                      buttonText: '选择...',
                      emptyText: '--请选择头像--',
                      anchor: '100%'
                  }, {
                      xtype: 'button',
                      margin: 5,
                      text: '上传',
                      itemId: 'BaseInfo_PhotoEdit_PhotoFilesUP'
                  }, {
                      xtype: 'tbfill'
                  }, {
                      xtype: 'button',
                      margin: 5,
                      itemId: 'BaseInfo_PhotoEdit_OK',
                      text: '保存'
                  }
                ]
            }
            ]
        });

        me.callParent(arguments);
    }

});