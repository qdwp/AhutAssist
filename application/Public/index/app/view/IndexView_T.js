Ext.define('Index.view.IndexView_T', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.toolbar.Toolbar',
        'Ext.resizer.Splitter',
        'Ext.form.Label',
        'Ext.toolbar.Separator',
        'Ext.ux.TabCloseMenu'
    ],
    itemId: 'indexview_T',
    layout: 'border',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
              {
                  xtype: 'tabpanel',
                  region: 'center',
                  itemId: 'centerpanel',
                  title: '',
                  region: 'center',
                  activeTab: 0,
                  items: [
                        Ext.create('Ext.ux.IFrame', {
                            title: "课堂考勤",
                            autoShow: false,
                            id: "T_KQ",
                            closable: true,
                            autoWidth: true,
                            loadMask: '正在加载页面，请稍后...',
                            tabConfig: {
                                xtype: 'tab',
                                closable: false
                            },
                            src: "/application/Attendance/Major/index.html"
                        }),
                            Ext.create('Ext.ux.IFrame', {
                                title: "投票结果",
                                autoShow: false,
                                id: "T_TP",
                                closable: true,
                                autoWidth: true,
                                loadMask: '正在加载页面，请稍后...',
                                tabConfig: {
                                    xtype: 'tab',
                                    closable: false
                                },
                                src: "/application/Evaluate/Vote/indexT.html"
                            }),
                             Ext.create('Ext.ux.IFrame', {
                                 title: "评教结果",
                                 autoShow: false,
                                 id: "T_PJ",
                                 closable: true,
                                 autoWidth: true,
                                 loadMask: '正在加载页面，请稍后...',
                                 tabConfig: {
                                     xtype: 'tab',
                                     closable: false
                                 },
                                 src: "/application/BaseInfo/CourseStu/indexT.html"
                             })
                  ]
              }, {
                  xtype: 'toolbar',
                  region: 'north',
                  height: 40,
                  itemId: 'toptoolbar',
                  layout: {
                      type: 'hbox',
                      align: 'stretch'
                  },
                  items: [
                      '->',
                      {
                          xtype: 'label',
                          itemId: 'welcomelabel',
                          padding: 8,
                          text: '姓名：***，角色：***'
                      },
                      {
                          xtype: 'tbseparator'
                      },
                      //{
                      //    xtype: 'button',
                      //    itemId: 'changepswbutton',
                      //    width: 80,
                      //    text: '修改密码'
                      //},
                      {
                          xtype: 'tbseparator'
                      },
                      {
                          xtype: 'button',
                          itemId: 'exitsysbutton',
                          width: 80,
                          text: '退出系统'
                      }
                  ]
              }, {
                  xtype: 'panel',
                  region: 'south',
                  height: 25,
                  html: '<div align="center" style="font-size:12px;align:center;width:100%;height:100%;border-top:1px solid #99ccff;"><span>安徽工业大学计算机应用研究所版权所有 Copyright 2015</span></div>'
              }
            ]
        });
        me.callParent(arguments);
    }

});