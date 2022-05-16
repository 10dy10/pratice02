/**
 * express application
 */
let express = require('express')
let app = express()

/**
 * import modules
 */
let path = require('path')                    //경로담당 모듈
let bodyParser = require('body-parser')       //파라메터 처리를 위한 bodyParser
let cors = require('cors')                    //크로스 도메인 처리
//let hash = require('password-hash')

/**
 * 크로스 도메인 처리
 */
app.use(cors())

/**
 * express application settings
 */
app.set('port', process.env.PORT || 8003)
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

// public 폴더를 static으로 함으로써 외부에서 접근 가능
app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'resources')))

//API와 홈페이지 라우팅 구분
app.use('/*', function (req, res, next) {
    let regex = /(\/api\/)/g // pattern which checks for `/api/` in the URL
    if (regex.test(req.originalUrl)) { // if the URL contains the pattern, then `next()`
        next()
    } else { // if the URL does not contain `/api`:
        res.sendFile(path.join(__dirname, 'client/index.html'))     // delivers index.html which angular-route will then load appropriate partial
    }
})

//API V1 호출
let routes = require('./routes/index')
app.use('/api', routes)

/**
* Llistening prot and Sequelize sync object
*/
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
})
//console.log(hash.generate('1111'));
