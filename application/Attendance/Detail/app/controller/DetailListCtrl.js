Ext.define('Attendance_Detail.controller.DetailListCtrl', {
    extend: 'Ext.app.Controller',

    onAttendance_Detail_Display: function (button, e, eOpts) {
        var grid = button.up('gridpanel');
        grid.down('#Attendance_Detail_SearchText').setValue("");
        var store = grid.getStore();
        store.getProxy().setExtraParam('SearchInfo', null);
        store.load();
    },

    onAttendance_Detail_Search_Click: function (button, e, eOpts) {

        var grid = button.up('grid');
        var store = grid.getStore();
        var searchText = grid.down('#Attendance_Detail_SearchText').getValue();

        var array = new Array();
        var i = 0;
        if (searchText !== null && searchText.toString().trim() !== "") {
            array[i++] = {
                field: 'nvcCourseName',
                value: searchText.toString().trim(),
                opt: 9,
                link: false,
                group: 1
            };
            store.getProxy().setExtraParam('SearchInfo', Ext.JSON.encode(array));
            store.load();

        }

    },

    onAttendance_DetailSearch_ClickSpecialkey: function (button, e, eOpts) {

        if (e.keyCode == 13) {
            var grid = field.up('gridpanel');
            var button = grid.down('#Attendance_Detail_Search');
            button.fireEvent("click", button);
        }
    },




    init: function (application) {
        this.control({
            "#Attendance_Detail_Display": {
                click: this.onAttendance_Detail_Display
            },
            "#Attendance_Detail_SearchText": {
                specialkey: this.onAttendance_Detail_ClickSpecialkey
            },
            "#Attendance_Detail_Search": {
                click: this.onAttendance_Detail_Search_Click
            }
        });
    }

});