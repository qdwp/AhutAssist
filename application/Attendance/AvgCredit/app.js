Ext.Loader.setConfig({
    enable: true
});

Ext.application({
    models: [
        'AvgCreditModel',
        'CommonModel'
    ],
    stores: [
        'AvgCreditStore',
        'YearStore',
        'TermStore',
        'ConflictStore'

    ],
    views: [
        'AvgCreditListView',
          'AvgCreditAddView',
     'AvgCreditEditView'


    ],
    controllers: [
        'AvgCreditListCtrl',
   'AvgCreditAddCtrl',
    'AvgCreditEditCtrl'

    ],
    name: 'Attendance_AvgCredit',
    launch: function () {
        Ext.create('Attendance_AvgCredit.view.AvgCreditListView', { renderTo: Ext.getBody() });
    }
});