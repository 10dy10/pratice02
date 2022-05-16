
module.exports = {
    database: {
        host: 'db.ablesystem.kr',
        port: '3306',
        user: 'pluspay_home',
        password: 'pluspay_home',
        name: 'pluspay_home',
    },
    jwt: {
        key: 'ablesystem'
    },
    mail : {
        service: 'daum',
        host: 'smtp.daum.net',
        port: 465,
        secure: true,
        auth: {
            user: 'ablesytem_20',
            pass: 'dpdlqmftltmxpa!',
            from: 'ablesytem_20@daum.net',
            sender: '에이블시스템'
        }
    }
}
