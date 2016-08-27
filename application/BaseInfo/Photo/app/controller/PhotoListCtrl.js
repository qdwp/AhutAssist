Ext.define('BaseInfo_Photo.controller.PhotoListCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_PhotoEdit_OKClick: function (button, e, eOpts) {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        EditTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        var grid = Ext.getCmp('BaseInfo_Photo_List').down('gridpanel');
        var store = grid.getStore();
        var record = store.getAt(0);

        var data = {
            nvcStuNo: gbl_logincode,
            nvcNewPhoto: record.get('nvcNewPhoto'),
            dtmEditTime: EditTime,
            nvcCheckResult:'待议'
        };
        BaseInfo.Photo.Add(data, function (e, result) {
            var res = result.result;
            if (res.success) {
                var msgbox = Ext.MessageBox.show({
                    title: '提示',
                    msg: res.message,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                var tag = setTimeout(function () {
                    msgbox.hide();
                    clearTimeout(tag);
                }, 5000);
                var grid = Ext.getCmp('BaseInfo_Photo_List').down('gridpanel');
                var store = grid.getStore();
                store.reload();

            }
            else {
                Ext.Msg.show({
                    title: '错误',
                    msg: res.message,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },


    onBaseInfo_PhotoEdit_PhotoFilesUPClick: function (button, e, eOpts) {
        var form = button.up('form');
        var grid = Ext.getCmp('BaseInfo_Photo_List').down('gridpanel');
        var store = grid.getStore();
        var record = store.getAt(0);
        if (form.form.isValid()) {
            form.submit({
                url: '/ajax/UploadHandler.ashx?guid=' + gbl_guid + '&dir=image',
                method: 'post',
                waitMsg: '正在上传...',
                success: function (fp, o) {
                    Ext.getCmp('BaseInfo_Photo_NewImage').setSrc(o.result.file);
                    record.set('nvcNewPhoto', o.result.file)
                },
                failure: function (fp, o) {
                    Ext.Msg.show({
                        title: '错误',
                        msg: '上传失败，错误详情：' + o.result.error,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },

  init: function (application) {
        this.control({
            "#BaseInfo_PhotoEdit_OK": {
                click: this.onBaseInfo_PhotoEdit_OKClick
            },
            '#BaseInfo_PhotoEdit_PhotoFilesUP': {
                click: this.onBaseInfo_PhotoEdit_PhotoFilesUPClick
            }
        });
    }

});