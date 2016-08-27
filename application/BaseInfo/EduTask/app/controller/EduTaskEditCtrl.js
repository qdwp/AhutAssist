Ext.define('BaseInfo_EduTask.controller.EduTaskEditCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_EduTaskEdit_OKClick: function (button, e, eOpts) {

        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }

        var values = form.getValues();
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),
            nvcYear: values.nvcYear,
            nvcTerm	  : values.nvcTerm	  ,
            nvcElectiveNum: values.nvcElectiveNum,
            nvcCourseCode: values.nvcCourseCode,
            nvcCourseName: values.nvcCourseName,
            nvcCourseNature	: values.nvcCourseNature	,
            intStuNumber: values.intStuNumber,
            nvcCollege	: values.nvcCollege	,
            nvcFaculty	: values.nvcFaculty	,
            nvcTeacherCode	: values.nvcTeacherCode	,
            nvcCoursePlace	: values.nvcCoursePlace	,
            nvcCourseTime	: values.nvcCourseTime	,
           

        };

        BaseInfo.EduTask.Edit(data, function (e, result) {
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
                win.hide();
                var grid = Ext.getCmp('BaseInfo_EduTask_List').down('gridpanel');
                var store = grid.getStore();
                store.getProxy().setExtraParam('SearchInfo', null);
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

    onBaseInfo_EduTaskEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    init: function (application) {
        this.control({

            "#BaseInfo_EduTaskEdit_OK": {
                click: this.onBaseInfo_EduTaskEdit_OKClick
            },
            "#BaseInfo_EduTaskEdit_Cancel": {
                click: this.onBaseInfo_EduTaskEdit_CancelClick
            }
        });
    }

});
