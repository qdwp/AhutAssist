Ext.define('Index.view.IndexView', {
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

    itemId: 'indexview',
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
                            title: "学生评教",
                            autoShow: false,
                            id: "PJ",
                            closable: true,
                            autoWidth: true,
                            loadMask: '正在加载页面，请稍后...',
                            tabConfig: {
                                xtype: 'tab',
                                closable: false
                            },
                            src: "/application/BaseInfo/CourseStu/translate.aspx"
                        }),
                        Ext.create('Ext.ux.IFrame', {
                            title: "我心目中的好老师",
                            autoShow: false,
                            id: 'TP',
                            closable: true,
                            autoWidth: true,
                            loadMask: '正在加载页面，请稍后...',
                            tabConfig: {
                                xtype: 'tab',
                                closable: false
                            },
                            src: "/application/Evaluate/Vote/translate.aspx"
                        }),
                      Ext.create('Ext.ux.IFrame', {
                          title: "考勤结果查询",
                          autoShow: false,
                          id: 'KQ',
                          closable: true,
                          autoWidth: true,
                          loadMask: '正在加载页面，请稍后...',
                          tabConfig: {
                              xtype: 'tab',
                              closable: false
                          },
                          src: "/application/Attendance/Detail/index.html"
                      }),
                       Ext.create('Ext.ux.IFrame', {
                           title: "免听申请课程",
                           autoShow: false,
                           id: 'MT',
                           closable: true,
                           autoWidth: true,
                           loadMask: '正在加载页面，请稍后...',
                           tabConfig: {
                               xtype: 'tab',
                               closable: false
                           },
                           src: "/application/Attendance/ApplyApproval/translate.aspx"
                       }),
                          Ext.create('Ext.ux.IFrame', {
                              title: "修改个人照片",
                              autoShow: false,
                              id: 'ZP',
                              closable: true,
                              autoWidth: true,
                              loadMask: '正在加载页面，请稍后...',
                              tabConfig: {
                                  xtype: 'tab',
                                  closable: false
                              },
                              src: "/application/BaseInfo/Photo/index.html"
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
                            text: '欢迎：***，姓名：***'
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