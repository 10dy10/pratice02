const router = require('express').Router()

const boardCtrl = require('./controllers/board.controller')
router.use('/board', boardCtrl)

module.exports = router