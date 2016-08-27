Ext.define('Attendance_Setting.store.Year', {
    extend: 'Ext.data.Store',

    requires: [
         'Attendance_Setting.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        var myDate = new Date();
        var year = parseInt(myDate.getFullYear());
        var yearahead_4 = year - 4;
        var yearahead_3 = year - 3;
        var yearahead_2 = year - 2;
        var yearahead_1 = year - 1;
        var yearhehind = year + 1;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Attendance_Setting.model.CommonModel',
            storeId: 'Year',
            data: [
                  {
                      text: yearahead_4 + '-' + yearahead_3,
                      value: yearahead_4 + '-' + yearahead_3
                  }, {
                      text: yearahead_3 + '-' + yearahead_2,
                      value: yearahead_3 + '-' + yearahead_2
                  }, {
                      text: yearahead_2 + '-' + yearahead_1,
                      value: yearahead_2 + '-' + yearahead_1
                  }, {
                      text: yearahead_1 + '-' + year,
                      value: yearahead_1 + '-' + year,
                  }, {
                      text: year + '-' + yearhehind,
                      value: year + '-' + yearhehind,
                  }
            ]
        }, cfg)]);
    }

});
