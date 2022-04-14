'use strict'

//scroll eventListener 함수 등록
function changeScrollY(){
  document.addEventListener('scroll',()=>{
    changeNavbarColor(window.scrollY);
  });
}

// scrollY가 navbar의 높이보다 커지는 경우 navbar 색 변화시켜주는 함수
function changeNavbarColor(scrollY){  
  const navbar = document.querySelector('#navbar');
  const navbarItems = document.querySelector('.navbar__menu');
  const navbarheight = navbar.getBoundingClientRect().height;

  if(scrollY>navbarheight){
    navbar.style.backgroundColor = '#000000';
    navbarItems.style.backgroundColor = '#000000';
  }else {
    navbar.style.backgroundColor = '#24292E';
    navbarItems.style.backgroundColor = '#24292E';
  }
}

//Navbar의 nav목록이 클릭되었을때 구현되는 콜백함수
function onClickNavbarItems(){
  const navbarMenus = document.querySelector('.navbar__menu');
  navbarMenus.addEventListener('click',(e)=>{
    goCorrectPage(e);
  });
}

//원하는 페이지로 scroll을 이동해주는 함수
function goCorrectPage(e){
  const target = e.target;
  const link = target.dataset.link;

  if(link == null){
    return;
  }
  
  let type = 'start';
  const width = document.body.getBoundingClientRect().width;

//화면 너비에 따라 다른 scrollintoView 조건 부여
    if(link == '#about'){
      if(width>768){
        type = 'center'
      }else{
        type = 'start';
      }
    }else if(link == '#skills'){
      type = 'start';
    }else if(link == '#home'){
      document.querySelector(link).scrollIntoView(false);
      return;
    }else{
      type = 'start';
    }
      document.querySelector(link).scrollIntoView({block:type});
}

// 화면 너비 768px 이하인 경우 navbar toggle 버튼 사용
let navbarToggle = false;

function onClickToggleMenu(){

  const toggleMenu = document.querySelector('.navbar__toggle-btn');
  const navbarMenu = document.querySelector('.navbar__menu');

  toggleMenu.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
  }); 
}

function navbar(){
  changeScrollY(); // 스크롤 이벤트 등록
  onClickNavbarItems(); // nav 아이템 클릭 등록
  onClickToggleMenu(); // toggle 메뉴 기능 구현(반응형)
}


navbar();