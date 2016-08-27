var i = 0;
Ext.define('BaseInfo_CourseStu.controller.CourseStuListCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_CourseStu_EditClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '提示',
                msg: '有且仅有一行被选中才能编辑',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        if (row.get('intIsEvaluate') === "1") {
            Ext.Msg.show({
                title: '警告',
                msg: '你已经完成对该老师的评教！',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var win = Ext.getCmp('BaseInfo_CourseStu_Edit');
        if (!win) {
            win = Ext.create('BaseInfo_CourseStu.view.CourseStuEditView', {
                id: 'BaseInfo_CourseStu_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },
    //根据学年学期变动内容
    onCourseStuListView_T_ComboSelect: function (combo, records, eOpts) {
        var grid = Ext.getCmp('BaseInfo_Course_gridpanel_PJ');
        var store = grid.getStore();
        Ext.getCmp('PJ_textarea_LY').update(null);
        Ext.getCmp('CourseStu_SJ').update(null);
        var searchText_Year = Ext.getCmp('BaseInfo_CourseStu_nvcYear').getValue();
        var searchText_Term = Ext.getCmp('BaseInfo_CourseStu_nvcTerm').getValue();
        var array = new Array();
        var i = 0;
        if (searchText_Year !== null && searchText_Year.toString().trim() !== "" && searchText_Term !== null && searchText_Term.toString().trim() !== "") {
            var data = searchText_Year + ";" + searchText_Term;
            store.getProxy().setExtraParam('SearchInfo', data);
            store.load();
        }
    },
    //双击出发事件（学生评价界面）
    onBaseInfo_CourseStu_ListViewGrid_dbClick:function(grid, record, item, index, e, eOpts)
    {
        var rows = grid.getSelectionModel().getSelection();
        var row = rows[0];
        if (row.get('intIsEvaluate') === "1") {
            Ext.Msg.show({
                title: '提示',
                msg: '你已经完成对该老师的评教！',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var win = Ext.getCmp("BaseInfo_CourseStu_Edit");
        if (!win) {
            win = Ext.create('BaseInfo_CourseStu.view.CourseStuEditView', {
                id: 'BaseInfo_CourseStu_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        win.show();
    },
   //单击触发事件（老师评价界面）
    onBaseInfo_Course_gridpanel_PJ_Click: function (grid , record, item, index, e, eOpts)
    {
        var grid_LY = Ext.getCmp('BaseInfo_Course_gridpanel_LY');
        var store_LY = grid_LY.getStore();
        var ElectiveNum = record.get("nvcElectiveNum");
        store_LY.getProxy().setExtraParam('SearchInfo',ElectiveNum );
        loaddata(0);
        },

    //下一页
    oncardNextClick: function (button, e, eOpts) {
        var grid = Ext.getCmp('BaseInfo_Course_gridpanel_LY');
        var store = grid.getStore();
        var num = store.getCount();
        if (i == num - 1) {
            Ext.Msg.show({
                title: '提示',
                msg: '这是最后一条评论了！',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        else
            loaddata(++i);
    },
    //上一页
    oncardPrevClick: function (button, e, eOpts) {
        if (i == 0) {
            Ext.Msg.show({
                title: '提示',
                msg: '这已经是第一条评论！',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        else
            loaddata(--i);
    },
    init: function (application) {
        this.control({
            "#BaseInfo_CourseStu_Edit": {
                click: this.onBaseInfo_CourseStu_EditClick
            },
             '#BaseInfo_CourseStu_nvcYear': {
            select: this.onCourseStuListView_T_ComboSelect
             },
             '#BaseInfo_CourseStu_nvcTerm': {
                 select: this.onCourseStuListView_T_ComboSelect
             },
             '#BaseInfo_Course_gridpanel_PJ': {
                 itemclick: this.onBaseInfo_Course_gridpanel_PJ_Click
             },
             '#BaseInfo_CourseStu_ListViewGrid': {
                 itemdblclick: this.onBaseInfo_CourseStu_ListViewGrid_dbClick
             },
             "#cardNext": {
                 click: this.oncardNextClick
             },
             "#cardPrev": {
                 click: this.oncardPrevClick
             }
        });
    }

});

function loaddata(i) {
    var grid = Ext.getCmp('BaseInfo_Course_gridpanel_LY');
    var store = grid.getStore();
    store.on('load', function () {
        var record = store.getAt(i);
        if (record) {
            Ext.getCmp('PJ_textarea_LY').update(record.get('nvcContents'));
            Ext.getCmp('CourseStu_SJ').update(record.get('dtmLeaveTime'));
        }
        else {
            Ext.getCmp('PJ_textarea_LY').update(null);
            Ext.getCmp('CourseStu_SJ').update(null);
        }
    }, this);
    store.load();

};