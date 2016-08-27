Ext.define('BaseInfo_Teacher.controller.TeacherEditCtrl', {
    extend: 'Ext.app.Controller',

    onBaseInfo_TeacherEdit_OKClick: function (button, e, eOpts) {

        var win = button.up('window');
        var form = win.down('form');
        if (!form.form.isValid()) {
            return;
        }

        var values = form.getValues();
        var record = form.getRecord();
        var data = {
            ID: record.get('ID'),

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
            nvcTeachingType:values.nvcTeachingType,
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

        BaseInfo.Teacher.Edit(data, function (e, result) {
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
                win.down('#BaseInfo_TeacherEdit_PhotoImage').setSrc("/resource/images/photo.png");
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

    onBaseInfo_TeacherEdit_CancelClick: function (button, e, eOpts) {
        button.up("window").hide();
    },

    onBaseInfo_TeacherEdit_PhotoFilesUPClick: function (button, e, eOpts) {
        var form = button.up('form');
        if (form.form.isValid()) {
            form.submit({
                url: '/ajax/UploadHandler.ashx?guid=' + gbl_guid + '&dir=image',
                method: 'post',
                waitMsg: '正在上传...',
                success: function (fp, o) {
                    form.up('window').down('#BaseInfo_TeacherEdit_PhotoFiles').setValue(o.result.file);
                    form.up('window').down('#BaseInfo_TeacherEdit_PhotoImage').setSrc(o.result.file);
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

    onBaseInfo_TeacherEdit_PhotoFilesChange: function (textfield, e, eOpts) {
        var win = textfield.up('window');
        var src = textfield.getValue();
        if (src.trim() == "") {
            src = "/resource/images/photo.png";
        }
        win.down('#BaseInfo_TeacherEdit_PhotoImage').setSrc(src);
    },

    init: function (application) {
        this.control({

            "#BaseInfo_TeacherEdit_OK": {
                click: this.onBaseInfo_TeacherEdit_OKClick
            },
            "#BaseInfo_TeacherEdit_Cancel": {
                click: this.onBaseInfo_TeacherEdit_CancelClick
            },
            '#BaseInfo_TeacherEdit_PhotoFilesUP': {
                click: this.onBaseInfo_TeacherEdit_PhotoFilesUPClick
            },
            '#BaseInfo_TeacherEdit_PhotoFiles': {
                change: this.onBaseInfo_TeacherEdit_PhotoFilesChange
            }
        });
    }

});
