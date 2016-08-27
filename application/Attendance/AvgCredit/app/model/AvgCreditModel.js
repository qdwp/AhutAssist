Ext.define('Attendance_AvgCredit.model.AvgCreditModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        { name: 'ID' },
        { name: 'nvcYear' },
        { name: 'nvcTerm' },
          { name: 'nvcStuNo' },
        { name: 'nvcCredit' },
          { name: 'nvcFlag' }
    ]

});