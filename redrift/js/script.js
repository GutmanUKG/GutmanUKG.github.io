window.addEventListener('DOMContentLoaded' , function () {

    let logoWhite = document.querySelector('.logo_white'),
        logoBlack = document.querySelector('.logo_black'),
        wraperTabs = document.querySelector('.tabs');
        tabContent = document.querySelectorAll('.info-tabcontent');
        tab = document.querySelectorAll('.info-header-tab');



// servise Tabs
let serviseItems = document.querySelector('.service_items');
let descrItem = document.querySelectorAll('.service_item');
let listItem = document.querySelectorAll('.list_item');

function hideItem(a) {// Функция для скрытия табов
    if(descrItem[a].classList.contains('item_active')){
        descrItem[a].classList.remove('item_active')
        listItem[a].classList.remove('active')
    }else{
        descrItem[a].classList.add('item_active')
        listItem[a].classList.add('active')
    }
}




serviseItems.addEventListener('click' , function (event) { // на обертку повешан слушатель события на все пункты меню и передан event
        let target = event.target; // засунул в переменную event.target
        if(target && target.classList.contains('list_item') || target.classList.contains('plus')){// проверяет есть ли на элементе класс
            for(let i = 0; i < descrItem.length; i++){// Перебираем все элементы  меню
                if(target == listItem[i]){ // проверяем что наведение соответсвует элементу массива пунктов меню
                    hideItem(i)
                    break;// Прекращаем цикл что бы не работал в холостую
    
                }
            }
        }
    });




// 






// Скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}











const menuWraper = document.querySelector('.menu_wrap');
const inner = document.querySelector('#info');
const innerJobs = document.querySelector('.jobs');
let isFixed = false;

const dummyEqualHeigh = () => {
  menuWraper.style.height = inner.getBoundingClientRect().height + 'px';
};

const makeFixed = () => {
  if (menuWraper.getBoundingClientRect().top <= 0 && !isFixed) {
    menuWraper.classList.add('shapka--fixed');
    isFixed = true;
  } else if (menuWraper.getBoundingClientRect().top > 0 && isFixed) {
    menuWraper.classList.remove('shapka--fixed');
    isFixed = false;
  }
};
function addmenuBlack(){
  console.log('test')
  wraperTabs.classList.add('black')
}
function removeMenuBlack(){
  wraperTabs.classList.remove('black')
}
const makeVxodit = () => {
  const top = innerJobs.getBoundingClientRect().top - menuWraper.getBoundingClientRect().height <= 0;
  const bottom = innerJobs.getBoundingClientRect().bottom - menuWraper.getBoundingClientRect().height > 0;
  if (top && bottom) {
    logoWhite.style.display = "block";
    logoBlack.style.display = "none";
    addmenuBlack();
    

  } else {
    logoWhite.style.display = "none"
    logoBlack.style.display = "block"
    removeMenuBlack();
  }
}

makeVxodit();
dummyEqualHeigh();
makeFixed();
window.addEventListener('resize', () => dummyEqualHeigh());
window.addEventListener('scroll', () => {
  makeFixed();
  makeVxodit();
});


//    Переключение меню


function toggleClass (b){
  if(!tab[b].classList.contains('active')){
    tab[b].classList.add('active');
  }
}

function removeClass(a){
  for(let i = a; i < tab.length; i++){
    tab[i].classList.remove('active');
  }
}


wraperTabs.addEventListener('click', function(event){
  let target = event.target;
  if(target && target.classList.contains('info-header-tab')){

    for(i = 0; i < tab.length; i++){
      if(target == tab[i]){
        removeClass(0);
        toggleClass(i); 
        break
      }
    }
  }
})

// burger_menu

const btnBurger = document.querySelector('.burger_menu');
const menuBurger = document.querySelector('.burger_menu_wraper');
const closeBtn = document.querySelector('.close');
const burgerLink = document.querySelectorAll('.burger_link');
const link_top = document.querySelector('.link_top');
function showBurger(){
  menuBurger.classList.add('burger_menu_wraper_active');
}
function closeBurger(){
  menuBurger.classList.remove('burger_menu_wraper_active');
  document.body.style.overflow = "auto"
}
btnBurger.addEventListener('click', function(){
  menuBurger.classList.add('burger_menu_wraper_active');
  document.body.style.overflow = "hidden"
})
closeBtn.addEventListener('click', function(){
  closeBurger()
 
})
burgerLink.forEach(function(i){
  i.addEventListener('click', function(){
    closeBurger();
  })
link_top.addEventListener('click', function(){
  closeBurger();
})
})

let currentSlideTeam = $('.wraper_item_slide_team').slick('slickCurrentSlide') + 1;
let slideCountsTeam = $(".wraper_item_slide_team").slick("getSlick").slideCount;
let currentSlideItemTeam = document.querySelector('.current_slide');
let slideCountsItemTeam = document.querySelector('.slide_counts');

currentSlideItemTeam.innerHTML = currentSlideTeam;
slideCountsItemTeam.innerHTML = '/' +slideCountsTeam;



$(".wraper_item_slide_team").on("afterChange", function(event, slick, currentSlideTeam, nextSlide){
  $(".current_slide").text(currentSlideTeam + 1);
});

let currentSlideMobile = $('.wraper_mobile_slid').slick('slickCurrentSlide') + 1;
let slideCountsMobile = $(".wraper_mobile_slid").slick("getSlick").slideCount;
let currentSlideItemMobile = document.querySelector('.current_slide_mobile');
let slideCountsItemMobile = document.querySelector('.slide_counts_mobile');

currentSlideItemMobile.innerHTML = currentSlideMobile;
slideCountsItemMobile.innerHTML ='/' + slideCountsMobile;
$(".mobile_slider").on("afterChange", function(event, slick, currentSlideMobile, nextSlide){
  $(".current_slide_mobile").text(currentSlideMobile + 1);
});

let image = document.querySelectorAll('.img_mini');
let closeBlock = document.querySelector('.close_block')


});
