const db = require('../../tools/database');
const nodemailer = require('nodemailer');
const { mail, upload } = require('../../secret/config');
const rimraf = require('rimraf');

//const nodemailerMock = require('nodemailer-mock');


/**
 * 데이터베이스 접속 및 질의
 * @param query
 * @param params
 * @returns {Promise}
 */
function query(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}


//문의글 등록
exports.qsend = (name, phone_mail, title, conts) => {
 
  const transporter = nodemailer.createTransport(mail);
    // reg_id = reg_id || 'admin';
    // reg_nm = reg_nm || '관리자';
  console.log(name, phone_mail, title);
  
     const mailOptions = {
    from: mail.auth.from,
    sender: mail.auth.sender,
    to: mail.auth.from, 
    subject: " 제휴 문의",
    html: `<ul>
            <li>이름: ${ name }</li>
            <li>연락처 또는 이메일: ${ phone_mail }</li>
            <li>제목: ${ title }</li><br>
            <div style="line-height: 1.3;">
              <h3>문의 내용:</h3>
              <p>${ conts }</p>
            </div>
          </ul>
        `
  };
  
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, test){
      if (error) {
        reject("에러")
        console.log(error);
      } else {
        resolve("성공")
      }
    });
  });
};

