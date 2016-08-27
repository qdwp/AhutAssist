Ext.define('BaseInfo_Student.controller.StudentAddCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_StudentAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcStuNo: values.nvcStuNo,
            nvcStuName: values.nvcStuName,
            nvcSex: values.nvcSex,
            nvcPwd: values.nvcPwd,
            dtmBirth: values.dtmBirth,
            nvcPolity: values.nvcPolity,
            nvcNationality: values.nvcNationality,
            nvcSource: values.nvcSource,
            nvcCollege: values.nvcCollege,
            nvcFaculty: values.nvcFaculty,
            nvcMajor: values.nvcMajor,
            nvcClass: values.nvcClass,
            intEducationAge: values.intEducationAge,
            nvcEngGrade: values.nvcEngGrade,
            nvcStuAge: values.nvcStuAge,
            nvcGradeStatus: values.nvcGradeStatus,
            nvcGrade: values.nvcGrade,
            nvcDevelop: values.nvcDevelop,
            nvcMajorDir: values.nvcMajorDir,
            dtmEntranceTime: values.dtmEntranceTime,
            nvcGraduateSch: values.nvcGraduateSch,
            nvcDormNo: values.nvcDormNo,
            nvcMail: values.nvcMail,
            nvcPhone: values.nvcPhone,
            nvcHMT: values.nvcHMT,
            nvcHealth: values.nvcHealth,
            nvcRegister: values.nvcRegister,
            nvcFamilyAdd: values.nvcFamilyAdd,
            nvcFamilyCode: values.nvcFamilyCode,
            nvcFamilyTel: values.nvcFamilyTel,
            nvcFather: values.nvcFather,
            nvcFaFirm: values.nvcFaFirm,
            nvcFaFirmTel: values.nvcFaFirmTel,
            nvcFaFirmCode: values.nvcFaFirmCode,
            nvcMother: values.nvcMother,
            nvcMoFirm: values.nvcMoFirm,
            nvcMoFirmTel: values.nvcMoFirmTel,
            nvcMoFirmCode: values.nvcMoFirmCode,
            nvcStuPhoto: values.nvcStuPhoto
        };
        BaseInfo.Student.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('BaseInfo_Student_List').down('gridpanel');
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
    onBaseInfo_StudentAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    onBaseInfo_StudentAdd_PhotoFilesUPClick: function (button, e, eOpts) {
        var form = button.up('form');
        if (form.form.isValid()) {
            form.submit({
                url: '/ajax/UploadHandler.ashx?guid=' + gbl_guid + '&dir=image',
                method: 'post',
                waitMsg: '正在上传...',
                success: function (fp, o) {
                    form.up('window').down('#BaseInfo_StudentAdd_PhotoFiles').setValue(o.result.file);
                    form.up('window').down('#BaseInfo_StudentAdd_PhotoImage').setSrc(o.result.file);
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
           
            "#BaseInfo_StudentAdd_OK": {
                click: this.onBaseInfo_StudentAdd_OKClick
            },
            "#BaseInfo_StudentAdd_Cancel": {
                click: this.onBaseInfo_StudentAdd_CancelClick
            },
            '#BaseInfo_StudentAdd_PhotoFilesUP': {
                click: this.onBaseInfo_StudentAdd_PhotoFilesUPClick
            }
        });
    }
});