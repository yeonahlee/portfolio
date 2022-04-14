/*
@Filename    : form.js
@author      : 이태준(yeonah@kakao.com)
@description : form 내부 이벤트를 처리하는 파일
*/

function formInit() {

    // https://plitche.github.io/language/javascript/2021-05-30-regularEx/ 휴대폰 번호 정규식 참조
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const accountRegex = /[a-z\d_-]{5,20}/;
    const passwordRegex = /[a-zA-Z\d@$!%*?&_-]{8,16}/;
    const emailRegex = /([\w])*@[a-zA-Z\d]*.[a-zA-Z]{2,3}/;

    const roles = {
        userid: [
            {type: 'length', value: '1', text: '필수 정보입니다.'},
            {type: 'regex', value: accountRegex, text: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'},
        ],
        userpw: [
            {type: 'length', value: '1', text: '필수 정보입니다.'},
            {type: 'regex', value: passwordRegex, text: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'},
        ],
        userpw_re: [
            {type: 'length', value: '1', text: '필수 정보입니다.'},
            {type: 'regex', value: passwordRegex, text: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'},
            {type: 'match', value: 'userpw', text: '비밀번호가 일치하지 않습니다.'}
        ],
        name: [
            {type: 'length', value: '1', text: '필수 정보입니다.'},
        ],
        birth_year: [
            {type: 'length', value: '4', text: '태어난 년도 4자리를 정확하게 입력하세요.'},
        ],
        birth_month: [
            {type: 'range', value: {start: 1, end: 12}, text: '태어난 월을 선택하세요.'},
        ],
        birth_day: [
            {type: 'length', value: '1', text: '태어난 일(날짜) 2자리를 정확하게 입력하세요.'},
            {type: 'custom', value: 'date_validation', text: '생년월일을 다시 확인해주세요.'},
            {type: 'custom', value: 'really_year', text: '정말이세요?'},
        ],
        gender: [
            {type: 'equal', value: 'n', text: '필수 정보입니다.'}
        ],
        email: [
            {type: 'regex', value: emailRegex, text: '이메일 주소를 다시 확인해주세요.', minlen: 1}
        ],
        phone_num: [
            {type: 'regex', value: phoneRegex, text: '형식에 맞지 않는 번호입니다.', target: 'phone_error_msg'}
        ],
        phone_auth: [
            {type: 'length', value: '4', text: '인증번호를 다시 확인해주세요.', target: 'phone_error_msg'}
        ]
    }

    const inputs = document.querySelectorAll('.form-item .input-box-container  .input-box input');
    const selects = document.querySelectorAll('.form-item .input-box-container  .input-box select');

    for ( i of inputs ) {
        // focusout 시 유효성 검사
        i.addEventListener('focusout', function(e) {
            proc(e, roles);
        });
    }

    for ( i of selects ) {
        // focusout 시 유효성 검사
        i.addEventListener('focusout', function(e) {
            proc(e, roles);
        });
    }

    document.getElementById('phone_num_btn').addEventListener('click', function (e) {
        e.preventDefault();

        const phoneNum = document.getElementById('phone_num');
        const errorBlock = document.getElementById('phone_error_msg');

        let res = phoneNum.value.match(phoneRegex);

        if (!(res && res[0] && res[0].length == phoneNum.value.length)) {
            show_error(errorBlock, '형식에 맞지 않는 번호입니다.');
            return;
        } else {
            const phoneAuth = document.getElementById('phone_auth');
            const phoneAuthInputBox = phoneAuth.closest('.input-box');

            phoneAuthInputBox.classList.remove('disabled');
            phoneAuth.removeAttribute('disabled');
            phoneAuth.value = 1234;
        }
    });
}

function proc(e, roles) {
    const targetID = e.target.id;

    if (targetID in roles) {
        let errorBlock;

        if ('target' in roles[targetID][0]) {
            errorBlock = document.getElementById(roles[targetID][0].target);
        } else {
            errorBlock = e.target.closest('.form-item').querySelector('.error-msg');
        }

        errorBlock.style.display = 'none';

        for (let role of roles[targetID]) {
            const { type, value, text } = role;
            let res;

            switch(type) {
                case 'length':
                    if (e.target.value.length < value) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
                case 'regex':
                    res = e.target.value.match(value);
                    
                    if ('minlen' in role) {
                        const { minlen } = role;
                        if (e.target.value.length < minlen) {
                            return;
                        }
                    }
                    if (!(res && res[0] && res[0].length == e.target.value.length)) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
                case 'match':
                    if (e.target.value != document.getElementById(value).value) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
                case 'range':
                    if (e.target.value < value.start || e.target.value > value.end) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
                case 'equal':
                    if (e.target.value == value) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
                case 'custom':
                    res = custom_proc[value](e, roles);
                    if (!res) {
                        show_error(errorBlock, text);
                        return;
                    }
                    break;
            }
        }
    }
}

function show_error(errorBlock, text) {
    errorBlock.style.display = 'block';
    errorBlock.innerText = text;
    return;
}

const custom_proc = {
    'date_validation': function (e, roles) {
        const year = document.getElementById('birth_year').value;
        const month = document.getElementById('birth_month').value;
        const day = document.getElementById('birth_day').value;

        const res = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');

        return res.isValid()
    },
    'really_year': function(e, roles) {
        const year = document.getElementById('birth_year').value;
        const currentYear = moment().format('YYYY');

        if (year <= (currentYear - 100)) return false;

        return true;
    }
}

formInit();