"use strict"
document.addEventListener('DOMContentLoaded',()=>{
    let body = document.querySelector('body');


    //настройка слайдеров
    $('.banner').owlCarousel({
        loop:true,
        nav:true,
        items:1

    })

    $('.hit-slider').owlCarousel({
        loop:true,
        items: 3,
        margin:30,

    })
    let owl = $('.hit-slider')
    $(".btns_owl_hit_prev").click(function(){
        owl.trigger('prev.owl.carousel', [300]);
    })
    $(".btns_owl_hit_next").click(function(){
        owl.trigger('next.owl.carousel');
        $('.prev_arrow_owl').addClass('btns_owl_active')
    })


    //
    $('.news_list').owlCarousel({
        loop:true,
        items: 3,
        margin:30,
        dots: false,
        // autoWidth:true,

    })
    let owl_news = $('.news_list')
    $(".btns_owl_news_next").click(function(){
        owl_news.trigger('next.owl.carousel');
        $('.btns_owl_news_prev').addClass('btns_owl_active')
    })
    $(".btns_owl_news_prev").click(function(){
        owl_news.trigger('prev.owl.carousel');
        $('.about_owl_next').addClass('btns_owl_active')
    })

    //
    $('.about_slider').owlCarousel({
        loop:true,
        items: 1,
        margin:0,

        dots: false

    })
    let owl_about = $('.about_slider')
    $(".about_owl_next").click(function(){
        owl_about.trigger('next.owl.carousel');
        // $('.about_owl_next').addClass('btns_owl_active')
    })
    //Конец настройки слайдеров




    //Функционла каталог меню
    const catalogBtn = document.querySelector('.catalog_btn'),
        catalogMenu = document.querySelector('.catalog_menu');
    catalogBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        if(!body.classList.contains('active_catalog_menu')){
            body.classList.add('active_catalog_menu');
            catalogMenu.classList.add('catalog_menu_active');
        }else{
            body.classList.remove('active_catalog_menu');
            catalogMenu.classList.remove('catalog_menu_active');
        }
    })
    //конец функционала каталог меню

    //Функционал смены картинки в секции Хит продаж
    const hitSliderItem = document.querySelectorAll('.hit-slider-item');



    hitSliderItem.forEach((item,id)=>{
        item.addEventListener('mouseenter',()=>{
            let imgBox = item.querySelector('.imgs');
            let hoverImg = item.querySelector('.hover_img')
            item.classList.add('hit-slider-item-active')
            imgBox.style.background = imgBox.dataset.img
            hoverImg.src = imgBox.dataset.img;
            hoverImg.style.opacity = '1'
        })
        item.addEventListener('mouseleave', ()=>{
            let imgBox = item.querySelector('.imgs');
            let hoverImg = item.querySelector('.hover_img')
            imgBox.style.background = imgBox.dataset.img
            hoverImg.src = imgBox.dataset.img;
            hoverImg.style.opacity = '0'
            item.classList.remove('hit-slider-item-active')
        })
    })
    //Конец функционала смены картинки



    //Функционал смены картинок в разделе коллекции

    const selectorItems = document.querySelector('.selector_items');
    const selectorItemsList = selectorItems.querySelectorAll('.selector_item');

    selectorItemsList.forEach(item=>{
        item.addEventListener('mouseenter',(e)=>{
            ShowImgs(item)
        })
    })

    function ShowImgs(element){
        let leftItem = document.querySelector('.left_item');
        let imgLeft = leftItem.querySelector('img');
        let RightItem = document.querySelector('.right_item');
        let imgRight = RightItem.querySelector('img');
     if(element.dataset.img_left != ''){
         imgLeft.src = element.dataset.img_left;
         animateElement(imgLeft)
     }else{
         imgLeft.src = './img/default_selector_img.png';
         animateElement(imgLeft)
     }

     if(element.dataset.img_right != ''){

         imgRight.src = element.dataset.img_right;
         animateElement(imgRight)
     }else{
         imgRight.src = './img/default_selector_img.png';
         animateElement(imgRight)
     }


    }

    ShowImgs(selectorItemsList[0])
    function animateElement(el){
        el.animate([
            {opacity: 0},
            {opacity: 1},
        ],{
            duration: 1000,
            easing: 'linear'
        })
    }

    //конец функционла смены картинок в разделе коллеции

})
