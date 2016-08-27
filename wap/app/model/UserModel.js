//用户
Ext.define('app.model.UserModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        }],
        validations: [{
            field: 'username',
            type: 'presence',
            message: '请输入用户名!'
        },
        {
            field: 'password',
            type: 'presence',
            message: '请输入密码!'
        }],
        proxy: {
            type: 'localstorage',
            id: 'login-data'
        }
    }
});