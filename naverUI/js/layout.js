/*
@Filename    : layout.js
@author      : 이태준(yeonah@kakao.com)
@description : input or select 태그의 focusin, focusout 이벤트 처리 부 [ 해당 입력 칸을 가지는 부모 input-box 의 테두리를 초록색으로 설정하거나 해제하는 처리 ]
*/

function layoutInit() {
    const inputs = document.querySelectorAll('.form-item .input-box-container  .input-box input');
    const selects = document.querySelectorAll('.form-item .input-box-container  .input-box select');
    for ( i of inputs ) {
        i.addEventListener('focusin', function(e) {
            this.parentNode.classList.add('input-box-focus');
        });
        i.addEventListener('focusout', function(e) {
            this.parentNode.classList.remove('input-box-focus');
        });
    }

    for ( i of selects ) {
        i.addEventListener('focusin', function(e) {
            this.parentNode.classList.add('input-box-focus');
        });
        i.addEventListener('focusout', function(e) {
            this.parentNode.classList.remove('input-box-focus');
        });
    }
}

layoutInit();