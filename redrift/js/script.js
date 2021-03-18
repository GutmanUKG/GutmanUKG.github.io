window.addEventListener('DOMContentLoaded', function () {

  let logoWhite = document.querySelector('.logo_white'),
    logoBlack = document.querySelector('.logo_black'),
    wraperTabs = document.querySelector('.tabs');
  tabContent = document.querySelectorAll('.info-tabcontent');
  tab = document.querySelectorAll('.info-header-tab');



  // servise Tabs
  let descrItem = document.querySelectorAll('.service_item');
  let listItem = document.querySelectorAll('.list_item');
  let clickBlockItem = document.querySelectorAll('.click_block_item');


  function showDescr(a) {
    if (!descrItem[a].classList.contains('item_active')) {
      descrItem[a].classList.add('item_active');
      listItem[a].classList.add('active')
    } else {
      descrItem[a].classList.remove('item_active')
      listItem[a].classList.remove('active')
    }
  }

  function appendIndex() {
    for (let b = 0; b < clickBlockItem.length; b++) {
      clickBlockItem[b].addEventListener('click', function () {
        showDescr(b)
      })
    }
  }
  appendIndex();





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
  const infoHeader = document.querySelector('.info-header');
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

  function addmenuBlack() {
    wraperTabs.classList.add('black');
    infoHeader.classList.add('black_bg');
  }

  function removeMenuBlack() {
    wraperTabs.classList.remove('black')
    infoHeader.classList.remove('black_bg')
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


  function toggleClass(b) {
    if (!tab[b].classList.contains('active')) {
      tab[b].classList.add('active');
    }
  }

  function removeClass(a) {
    for (let i = a; i < tab.length; i++) {
      tab[i].classList.remove('active');
    }
  }


  wraperTabs.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {

      for (i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          removeClass(0);
          toggleClass(i);
          break
        }
      }
    }
  })

  // burger_menu



  let currentSlideTeam = $('.wraper_item_slide_team').slick('slickCurrentSlide') + 1;
  let slideCountsTeam = $(".wraper_item_slide_team").slick("getSlick").slideCount;
  let currentSlideItemTeam = document.querySelector('.current_slide');
  let slideCountsItemTeam = document.querySelector('.slide_counts');

  currentSlideItemTeam.innerHTML = currentSlideTeam;
  slideCountsItemTeam.innerHTML = '/' + slideCountsTeam;



  $(".wraper_item_slide_team").on("afterChange", function (event, slick, currentSlideTeam, nextSlide) {
    $(".current_slide").text(currentSlideTeam + 1);
  });

  let currentSlideMobile = $('.wraper_mobile_slid').slick('slickCurrentSlide') + 1;
  let slideCountsMobile = $(".wraper_mobile_slid").slick("getSlick").slideCount;
  let currentSlideItemMobile = document.querySelector('.current_slide_mobile');
  let slideCountsItemMobile = document.querySelector('.slide_counts_mobile');

  currentSlideItemMobile.innerHTML = currentSlideMobile;
  slideCountsItemMobile.innerHTML = '/' + slideCountsMobile;
  $(".mobile_slider").on("afterChange", function (event, slick, currentSlideMobile, nextSlide) {
    $(".current_slide_mobile").text(currentSlideMobile + 1);
  });

  let image = document.querySelectorAll('.img_mini');
  let closeBlock = document.querySelector('.close_block');
  let opacityBlock = document.querySelectorAll('.opacity_block');


  image.forEach(function(item){
    item.addEventListener('mousedown', function(){
      for(let i = 0; i < opacityBlock.length; i++){
        opacityBlock[i].style.opacity = 0
      }
      
    });
    item.addEventListener('mouseup', function(){
      for(let i = 0; i < opacityBlock.length; i++){
        opacityBlock[i].style.opacity = 0.5;
      }
    })
    item.addEventListener('touchstart', function(){
      for(let i = 0; i < opacityBlock.length; i++){
        opacityBlock[i].style.opacity = 0
      }
    })
    item.addEventListener('touchend', function(){
      for(let i = 0; i < opacityBlock.length; i++){
        opacityBlock[i].style.opacity = 0.5;
      }
    })
  });
});