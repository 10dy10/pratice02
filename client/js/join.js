
const formInput = document.querySelectorAll('.userinfo')
const formSel = document.querySelector('.usersel')
const sendBtn = document.querySelector('.join')

const ERRER_ALERT = 'none'

// input 태그에서 포커스아웃 시 값 없으면 오류메세지 뜨기
formInput.forEach(function(item){
  item.addEventListener('blur', function(){
    const erreralert = this.nextElementSibling
    
    if(this.value == '') {
      erreralert.classList.add(ERRER_ALERT)
    } else {
      erreralert.classList.remove(ERRER_ALERT)
    }
  })
})

function addClass (none) {
  none.nextElementSibling.classList.add(ERRER_ALERT)
}

// 성별 미선택 시 오류메세지 뜨기
formSel.addEventListener('click', function(){
  if(this.value == '0') {
    addClass(this)
  } else {
    this.nextElementSibling.classList.remove(ERRER_ALERT)
  }
})

// id 포커스아웃 시 값 오류 시 오류메세지 뜨기
const userId = document.querySelector('.userid')
const idErrer = document.querySelector('.errer_id')

userId.addEventListener('blur', chkId)

function chkId(){
  const id = userId.value;
  const eng = id.search(/[a-z]/g)
  const num = id.search(/[0-9]/g)
  const spe = id.search(/[-_]/gi)

  if (id == ''){
    idErrer.classList.add(ERRER_ALERT)
  } else if (id.length < 5 || id.length > 20) {
    idErrer.classList.add(ERRER_ALERT)
    idErrer.innerHTML = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
  } else if (eng < 0 && num < 0 && spe < 0) {
    idErrer.classList.add(ERRER_ALERT)
    idErrer.innerHTML = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
  } else {
    idErrer.classList.remove(ERRER_ALERT)
  }
}

//password 포커스 아웃 시 값 오류 시 오류메세지 뜨기
const userPw = document.querySelector('.userpw')

userPw.addEventListener('blur', chkPW)

function chkPW(){
  const pw = userPw.value;
  const num = pw.search(/[0-9]/g);
  const eng = pw.search(/[a-z]/gi);
  const binEng = pw.search(/[A-Z]/gi);
  const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if(pw == ''){
    addClass(userPw)
  }else if(pw.length < 8 || pw.length > 20){
    addClass(userPw)
    userPw.nextElementSibling.innerHTML = '8~16자를 입력해주세요.'
    return false;
  }else if(num < 0 || eng < 0 || spe < 0 || binEng < 0){
    addClass(userPw)
    userPw.nextElementSibling.innerHTML = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
    return false;
  }else {
    return false;
  }
}

//password 재확인 
const userPwch = document.querySelector('.userpwch')

userPwch.addEventListener('blur', function(){
  if(this.value !== userPw.value) {
    addClass(this)
    this.nextElementSibling.innerHTML = '비밀번호가 일치하지 않습니다.'
  }
})

//생년월일 확인
const birth = document.querySelectorAll('.user_birth')
const birthYear = document.querySelector('.user_birthy')
const birthMon = document.querySelector('.user_birthm')
const birthDay = document.querySelector('.user_birthd')
const birthErrer = document.querySelector('.errer_birth')

birth.forEach(function(item){
  item.addEventListener('blur', function(){
    if ( birthYear.value.length <= 0 ) {
      birthErrer.classList.add(ERRER_ALERT)
      birthErrer.innerHTML = '태어난 년도 4자리를 정확하게 입력하세요.'
    } else if ( birthMon.value == '0') {
      birthErrer.classList.add(ERRER_ALERT)
      birthErrer.innerHTML = '태어난 월을 선택하세요.'
    } else if ( birthDay.value.length <= 0 ) {
      birthErrer.classList.add(ERRER_ALERT)
      birthErrer.innerHTML = '태어난 일(날짜) 2자리를 정확하게 입력하세요.'
    }

    // 값이 모두 입력 되었을 때 오류메세지 지우기
    if( birthYear.value.length > 0 && birthMon.value > 0 && birthDay.value.length > 0) {
      birthErrer.classList.remove(ERRER_ALERT)
      
      // 생년 범위가 아니거나 숫자로만 입력 안될 시 오류 메세지
      let now = new Date()
      let year = now.getFullYear()

      if ( birthYear.value < (year-110) || birthYear.value > 2022 || !((/\d{4}/g).test(birthYear.value))) {
        birthErrer.classList.add(ERRER_ALERT)
        birthErrer.innerHTML = '태어난 년도 4자리를 정확하게 입력하세요.'
      } else {
        birthErrer.classList.remove(ERRER_ALERT)
      }

      // 생일 범위가 아니거나 숫자로만 입력 안될 시 오류 메세지
      if ( birthDay.value < 0 || birthDay.value > 31 || !((/\d{2}/g).test(birthDay.value))) {
        birthErrer.classList.add(ERRER_ALERT)
        birthErrer.innerHTML = '태어난 일(날짜) 2자리를 정확하게 입력하세요.'
      }
    }
    
  })
})

// 이메일을 입력했다면 제대로 입력했는지 확인
const userEmail = document.querySelector('.useremail')
const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

userEmail.addEventListener('blur', function(){
  if (userEmail.value.length > 0){
    if(!regExp.test(userEmail.value)){
      addClass(userEmail)
    } else {
      userEmail.nextElementSibling.classList.remove(ERRER_ALERT)
    }
  }
})

//휴대폰번호 확인
const userTel = document.querySelector('.usertel')

userTel.addEventListener('blur', function(){
  if(userTel.value.length > 0) {
    if(!((/\d{11}/g).test(userTel.value))){
      addClass(userTel)
      userTel.nextElementSibling.innerHTML = '숫자만 입력, 10-11자리를 입력해주세요.'
    }
  }
})


// 가입하기 버튼 클릭시 값 없을 경우 오류 메세지 
const userName = document.querySelector('.username')
const userGender = document.querySelector('.usergender')

sendBtn.addEventListener('click', function(){
  if( userId.value == '') {
    idErrer.classList.add(ERRER_ALERT)
  } 
  if ( userPw.value == '') {
    addClass(userPw)
  } 
  if ( userPwch.value == '') {
    addClass(userPwch)
  }
  if ( userName.value == '') {
    addClass(userName)
  }
  if ( birthYear.value == '' || birthMon.value == '0' || birthDay.value == '') {
    birthErrer.classList.add(ERRER_ALERT)
  }
  if ( userGender.value == '0') {
    addClass(userGender)
  }
  if ( userTel.value == '') {
    addClass(userTel)
  }
})