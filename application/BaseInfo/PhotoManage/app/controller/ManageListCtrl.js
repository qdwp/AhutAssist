Ext.define('BaseInfo_Manage.controller.ManageListCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_Manage_EditClick: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length !== 1) {
            Ext.Msg.show({
                title: '错误',
                msg: '有且仅有一行被选中才能编辑',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return;
        }
        var row = rows[0];
        var win = Ext.getCmp('BaseInfo_Manage_Edit');
        if (!win) {
            win = Ext.create('BaseInfo_Manage.view.ManageEditView', {
                id: 'BaseInfo_Manage_Edit'
            });
        }
        else {
            win.down('form').form.reset();
        }
        win.down('form').loadRecord(row);
        if (row.get('nvcCheckResult') == "通过") {
            win.down('#BaseInfo_Photo_EditPhotoImage').setSrc(row.get('nvcNewPhoto'));
            win.down('#BaseInfo_Photo_EditNewImage').setSrc('/resource/images/photo.png');
        }
        else {
            win.down('#BaseInfo_Photo_EditPhotoImage').setSrc(row.get('nvcStuPhoto'));
            win.down('#BaseInfo_Photo_EditNewImage').setSrc(row.get('nvcNewPhoto'));
        }
        win.show();
    },


    init: function (application) {
        this.control({
            "#BaseInfo_Manage_Edit": {
                click: this.onBaseInfo_Manage_EditClick
            }
        });
    }

});
