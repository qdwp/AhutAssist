//全局配置文件
Ext.define('app.config', {
    alternateClassName: 'config',
    //设置别名是为了方便调用，这样直接config.name就能获取到变量。
    statics: {
        attendance: {
            year: '/ajax/wap/student/AttendanceTime.ashx?act=year',
            term: '/ajax/wap/student/AttendanceTime.ashx?act=term',
            list: '/ajax/wap/student/AttendanceInfo.ashx?act=info'
        },
        evaluate: {
            init: '/ajax/wap/student/EvaluateInfo.ashx?act=init',
            valid: '/ajax/wap/student/EvaluateInfo.ashx?act=valid',
            info: '/ajax/wap/student/EvaluateInfo.ashx?act=info',
            list: '/ajax/wap/student/EvaluateInfo.ashx?act=list',
            submit: '/ajax/wap/student/EvaluateInfo.ashx?act=submit',
            level: '/ajax/wap/student/EvaluateInfo.ashx?act=level',
        },
        vote: {
            init: '/ajax/wap/student/VoteInfo.ashx?act=init',
            list: '/ajax/wap/student/VoteInfo.ashx?act=list',
            valid: '/ajax/wap/student/VoteInfo.ashx?act=valid',
            vote: '/ajax/wap/student/VoteInfo.ashx?act=vote',
        },
        login: '/ajax/wap/student/UserInfo.ashx?act=login',

        teaevaluate: {
            info: '/ajax/wap/teacher/TeaEvaluateList.ashx?act=info',
            list: '/ajax/wap/teacher/TeaEvaluateList.ashx?act=list',
        },
        teaattendance: {
            list: '/ajax/wap/teacher/TeaAttendanceInfo.ashx?act=list',
            info: '/ajax/wap/teacher/TeaAttendanceInfo.ashx?act=info',
            att: '/ajax/wap/teacher/TeaAttendanceInfo.ashx?act=att',
            detail: '/ajax/wap/teacher/TeaAttendanceInfo.ashx?act=detail',
        },
        attendways: {
            first: '/ajax/wap/teacher/TeaAttendanceWays.ashx?act=first',
            cecond: '/ajax/wap/teacher/TeaAttendanceWays.ashx?act=cecond',
            third: '/ajax/wap/teacher/TeaAttendanceWays.ashx?act=third',
            fourth: '/ajax/wap/teacher/TeaAttendanceWays.ashx?act=fourth',
        },
        //保存用户信息
        user: false,
        //保存当前学年学期
        time: false,
        //需要登录检测的页面
        ckLogin: {
            homeView: true,
            home:true
        }
    }
});