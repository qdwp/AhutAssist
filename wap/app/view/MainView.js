Ext.define('app.view.MainView', {
    extend: 'ux.NavigationView',
    xtype: 'main',
    alternateClassName: 'main',
    id:'mainview',
    config: {
        navigationBar: {
            backButton: {
                iconCls: 'arrow_left',//arrow_left
                id:'backBtn',
                ui: '',
                cls: 'back'
            }
        },
        cls: 'cardPanel'
    }
});