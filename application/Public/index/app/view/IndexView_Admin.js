Ext.define('Index.view.IndexView_Admin', {
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

    itemId: 'indexview_A',
    layout: 'border',

    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.TreeStore', {
            fields: ['text', 'leaf', 'linkurl', 'newwindows', 'id'],
            root: {
                expanded: true,
                children: [
                    {
                        text: "基础界面", leaf: false, linkurl: '', newwindow: "0", expanded: true,
                        children: [
                           { text: '学生基本信息', leaf: true, linkurl: '/application/BaseInfo/Student/index.html', newwindows: '0', id: '0' },
                           { text: '老师基本信息', leaf: true, linkurl: '/application/BaseInfo/Teacher/index.html', newwindows: '0', id: '1' },
                           { text: '教学任务', leaf: true, linkurl: '/application/BaseInfo/EduTask/index.html', newwindows: '0', id: '2' }
                        ]
                    }, {
                        text: "评教界面", leaf: false, linkurl: '', newwindow: "0", expanded: true,
                        children: [
                           { text: '评教设置', leaf: true, linkurl: '/application/Evaluate/Setting/index.html', newwindows: '0', id: '4' },
                           { text: '评教等级', leaf: true, linkurl: '/application/Evaluate/Level/index.html', newwindows: '0', id: '5' },
                        ]
                    }, {
                        text: "考勤界面", leaf: false, linkurl: '', newwindow: "0", expanded: true,
                        children: [
                           { text: '平均学分绩点', leaf: true, linkurl: '/application/Attendance/AvgCredit/index.html', newwindows: '0', id: '7' },
                           { text: '辅导员负责班级', leaf: true, linkurl: '/application/Attendance/Class/index.html', newwindows: '0', id: '8' },
                            { text: '免听设置', leaf: true, linkurl: '/application/Attendance/ApplySetting/index.html', newwindows: '0', id: '9' }
                        ]
                    }
                ]

            }

        });
        Ext.applyIf(me, {
            items: [
                  {
                      xtype: 'tabpanel',
                      region: 'center',
                      itemId: 'centerpanel',
                      title: '',
                      activeTab: 0,
                      plugins: Ext.create('Ext.ux.TabCloseMenu', {
                          closeAllTabsText: "关闭所有页",
                          closeOthersTabsText: "关闭其他页",
                          closeTabText: "关闭当前页"
                      })
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
                  },
                {
                    xtype: 'panel',
                    region: 'west',
                    split: true,
                    itemId: 'menupanel',
                    width: 150,
                    collapsible: true,
                    title: '导&nbsp;&nbsp;&nbsp;航&nbsp;&nbsp;&nbsp;栏',
                    ayout: 'fit',
                    items: [{
                        itemId: 'menuTree',
                        xtype: 'treepanel',
                        store: store,
                        rootVisible: false,
                        listeners: {
                            itemclick: function (view, record, item, index, e, eOpts) {
                                LoadPage(record);//调用外部函数加载页面
                            }
                        }
                    }]
                }, {
                    xtype: 'panel',
                    region: 'south',
                    height: 25,
                    html: '<div align="center" style="font-size:12px;align:center;width:100%;height:100%;border-top:1px solid #99ccff;"><span>安徽工业大学计算机应用研究所版权所有 Copyright 2015</span></div>'
                }
            ]
        });
        //加载页面
        function LoadPage(record) {
            var mainview = Ext.getCmp('Index_IndexView_Admin');//主视图
            var centerpanel = mainview.down('#centerpanel');//中间主视图
            var id = record.data.id;
            var text = record.data.text;
            var linkurl = record.data.linkurl;
            var icon = record.data.icon;
            if (linkurl.trim() === "") {
                return;
            }
            var tabID = "tab_" + id;
            var tab = Ext.getCmp(tabID);
            if (null === tab || undefined === tab) {
                var tab = Ext.create('Ext.ux.IFrame', {
                    title: text,
                    autoShow: false,
                    icon: icon,
                    id: tabID,
                    closable: true,
                    autoWidth: true,
                    loadMask: '正在加载页面，请稍后...',
                    src: linkurl
                });
                tab.show();
                centerpanel.add(tab);
                centerpanel.setActiveTab(tab);

            }
            else {
                centerpanel.unmask();
                centerpanel.setActiveTab(tab);
            }
        }
        me.callParent(arguments);
    }

});