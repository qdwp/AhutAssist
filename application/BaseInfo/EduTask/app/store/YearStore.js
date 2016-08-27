Ext.define('BaseInfo_EduTask.store.YearStore', {
    extend: 'Ext.data.Store',

    requires: [
         'BaseInfo_EduTask.model.CommonModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'BaseInfo_EduTask.model.CommonModel',
            storeId: 'YearStore',
            data: [
                {
                    text: '2010-2011',
                    value: '2010-2011'
                }, {
                    text: '2011-2012',
                    value: '2011-2012'
                }, {
                    text: '2012-2013',
                    value: '2012-2013'
                }, {
                    text: '2013-2014',
                    value: '2013-2014'
                }, {
                    text: '2014-2015',
                    value: '2014-2015'
                }, {
                    text: '2015-2016',
                    value: '2015-2016'
                }, {
                    text: '2016-2017',
                    value: '2016-2017'
                }, {
                    text: '2017-2018',
                    value: '2017-2018'
                }, {
                    text: '2018-2019',
                    value: '2018-2019'
                }, {
                    text: '2019-2020',
                    value: '2019-2020'
                }, {
                    text: '2020-2021',
                    value: '2020-2021'
                },
            ]
        }, cfg)]);
    }

});