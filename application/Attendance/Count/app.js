Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
   'CountModel',
   'CountClassModel',
   'CountMajorModel',
    ],
    stores: [
   'CountStore',
   'CountClassStore',
   'CountMajorStore',
    ],
    views: [
  'CountListView',
  'AssistListView',
  'SchoolListView'
    ],
    controllers: [
   'CountListCtrl',
    ],
    name: 'Attendance_Count',
    launch: function () {
        if (gbl_rolename == "校领导") {
            Ext.create('Attendance_Count.view.SchoolListView', { renderTo: Ext.getBody() });
            Ext.getCmp('TJ_Main_School_Stu').setTitle('全校学生旷课统计' + '');
            Ext.getCmp('TJ_Main_School_Stu').show();
            Ext.getCmp('TJ_Main_School_Class').hide();
            Ext.getCmp('TJ_Main_School_Major').hide();
        }
        if (gbl_rolename == "院领导") {
            Ext.create('Attendance_Count.view.CountListView', { renderTo: Ext.getBody() });
            Ext.getCmp('TJ_Main_Stu').setTitle('全院学生旷课统计' + '');
            Ext.getCmp('TJ_Main_Stu').show();
            Ext.getCmp('TJ_Main_Class').hide();
            Ext.getCmp('TJ_Main_Major').hide();
        }
        if (gbl_rolename == "辅导员") {
            Ext.create('Attendance_Count.view.AssistListView', { renderTo: Ext.getBody() });
            Ext.getCmp('TJ_Main_Assist_Stu').setTitle('学生旷课统计' + '');
            Ext.getCmp('TJ_Main_Assist_Stu').show();
            Ext.getCmp('TJ_Main_Assist_Class').hide();
        }
    }
  
});