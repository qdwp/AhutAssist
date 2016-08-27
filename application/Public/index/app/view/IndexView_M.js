Ext.define('Index.view.IndexView_M', {
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
        var store = Ext.create('Ext.data.TreeStore', {
            fields: ['text', 'leaf', 'linkurl', 'newwindows', 'id'],
            root: {
                expanded: true,
                children: [
                  { text: '教学评教', leaf: true, linkurl: '/application/BaseInfo/CourseStu/indexT.html', newwindows: '0', id: '0' },
                 { text: '投票结果', leaf: true, linkurl: '/application/Evaluate/Vote/indexT.html', newwindows: '0', id: '1' },
                 { text: '课堂考勤', leaf: true, linkurl: '/application/Attendance/Major/index.html', newwindows: '0', id: '2' },
                    { text: '重点监控学生', leaf: true, linkurl: '/application/Attendance/PriorityWatch/index.html', newwindows: '0', id: '3' },
                   { text: '评教统计', leaf: true, linkurl: '/application/Attendance/Count/index.html', newwindows: '0', id: '4' },
                     { text: '免听审核', leaf: true, linkurl: '/application/Attendance/ApplyManage/index.html', newwindows: '0', id: '5' },
                      { text: '照片审核', leaf: true, linkurl: '/application/BaseInfo/PhotoManage/index.html', newwindows: '0', id: '6' }
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
            var mainview = Ext.getCmp('Index_IndexView_M');//主视图
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
