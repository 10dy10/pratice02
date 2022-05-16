const router = require('express').Router()
const model = require('../models/board');
const multer = require('multer');
const { upload } = require('../../secret/config');


// 제휴 문의하기
router.route('/qsend').post(
  function (req, res) {
    model.qsend(
    req.body.name, 
    req.body.phone_mail, 
    req.body.title,
    req.body.conts

    ).then(() => {
      res.status(200).json({ result: 'ok' })
    }).catch((err) => {
      console.log("err : " + err);
      res.status(400).json({ result: 'bad request', ret: err })
    });
  });


module.exports = router