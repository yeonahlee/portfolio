
function onClickButton(){

  document.querySelector('.home__to__about').addEventListener('click',(e)=>{
    const link = e.target.dataset.link;
    const about = document.querySelector(link);
    let type = '';

    if(document.body.getBoundingClientRect().width<768){
      type = 'start';
    }else{
      type = 'center';
    }

    about.scrollIntoView({block:type});

  });
}

function about(){
  onClickButton();
}

about();