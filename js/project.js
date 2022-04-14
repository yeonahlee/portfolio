function onClickButton(){
  const buttons = document.querySelectorAll('.project__buttons');
  buttons.forEach((button)=>{
    button.addEventListener('click',(e)=>{

      if(e.target.classList[0]!=='project__buttons'){
        findTypeButton(e);
      }
    });
  })
}


function findTypeButton(e){
  const type = e.target.dataset.type;
  filterProject(type);
}

function filterProject(type){
  const projects = document.querySelectorAll('.project__container');
    
  if(type==='all'){
    projects.forEach((project)=>{
      project.classList.add('anim-out');
      setTimeout(()=>{
        project.classList.remove('display');
      },400);
      setTimeout(()=>{
        project.classList.remove('anim-out');
      },700);
    });
  }else{
    projects.forEach((project,index)=>{
      project.classList.add('anim-out');
      setTimeout(()=>{
        if(type===project.dataset.type){
          project.classList.remove('display');
        }else{
          project.classList.add('display');
        }
      },500);
      setTimeout(()=>{
        project.classList.remove('anim-out');
      },700);
    });
  }
}

function onClickIcon(){
  const goUpIcon = document.querySelector('.goback__first');
  goUpIcon.addEventListener('click',()=>{
    document.querySelector('#home').scrollIntoView(false);
  });
}

function project(){
  onClickButton();
  onClickIcon();
}

project();