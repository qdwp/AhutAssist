Ext.define('BaseInfo_Teacher.controller.TeacherAddCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_TeacherAdd_OKClick: function (button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }
        var values = form.getValues();
        var data = {
            nvcName: values.nvcName,
            nvcSex: values.nvcSex,
            nvcTeacherCode: values.nvcTeacherCode,
            nvcDiscipline: values.nvcDiscipline,
            nvcCollege: values.nvcCollege,
            nvcDepartment: values.nvcDepartment,
            nvcRoleType: values.nvcRoleType,
            intAuditorType: values.intAuditorType,
            nvcLoginCode: values.nvcLoginCode,
            nvcIsTeaching: values.nvcIsTeaching,
            nvcTeachingType: values.nvcTeachingType,
            nvcTeaPhoto: values.nvcTeaPhoto,
            nvcTeacher: values.nvcTeacher,
            nvcPwd: values.nvcPwd,
            nvcNationality: values.nvcNationality,
            dtmBirth: values.dtmBirth,
            nvcPolitics: values.nvcPolitics,
            nvcPhone: values.nvcPhone,
            nvcMail: values.nvcMail,
            nvcGraduate: values.nvcGraduate,
            nvcMajor: values.nvcMajor,
            nvcEducation: values.nvcEducation,
            nvcDegree: values.nvcDegree,
            nvcJobTitle: values.nvcJobTitle,
            nvcJob: values.nvcJob,
            nvcQualifyCode: values.nvcQualifyCode,
            nvcMQualifyCode: values.nvcMQualifyCode,
            nvcPerStaffCode: values.nvcPerStaffCode,
            nvcLabMan: values.nvcLabMan,
            nvcEvaluation: values.nvcEvaluation
        };
        BaseInfo.Teacher.Add(data, function (e, result) {
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
                var grid = Ext.getCmp('BaseInfo_Teacher_List').down('gridpanel');
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
    onBaseInfo_TeacherAdd_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    onBaseInfo_TeacherAdd_PhotoFilesUPClick: function (button, e, eOpts) {
        var form = button.up('form');
        if (form.form.isValid()) {
            form.submit({
                url: '/ajax/UploadHandler.ashx?guid=' + gbl_guid + '&dir=image',
                method: 'post',
                waitMsg: '正在上传...',
                success: function (fp, o) {
                    form.up('window').down('#BaseInfo_TeacherAdd_PhotoFiles').setValue(o.result.file);
                    form.up('window').down('#BaseInfo_TeacherAdd_PhotoImage').setSrc(o.result.file);
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

            "#BaseInfo_TeacherAdd_OK": {
                click: this.onBaseInfo_TeacherAdd_OKClick
            },
            "#BaseInfo_TeacherAdd_Cancel": {
                click: this.onBaseInfo_TeacherAdd_CancelClick
            },
            '#BaseInfo_TeacherAdd_PhotoFilesUP': {
                click: this.onBaseInfo_TeacherAdd_PhotoFilesUPClick
            }
        });
    }
});