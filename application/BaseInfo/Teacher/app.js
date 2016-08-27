Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    models: [
   'TeacherModel',
   'CommonModel'
    ],
    stores: [
    'TeacherStore',
    'TeachingTypeStore',
    'RoleTypeStore',
    'SexStore',
    'ConflictStore',
    'AuditorTypeStore'
    ],
    views: [
     'TeacherEditView',
     'TeacherListView',
     'TeacherAddView'
    ],
    controllers: [
    'TeacherEditCtrl',
    'TeacherAddCtrl',
    'TeacherListCtrl'
    ],
    name: 'BaseInfo_Teacher',

    launch: function () {
        Ext.create('BaseInfo_Teacher.view.TeacherListView', { renderTo: Ext.getBody() });
    }

});
