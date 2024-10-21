'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const bannerWrapper = document.querySelector('.banner_wrapper');

    let videoBG = document.querySelector('.banner_video')
    videoBG.src = '/assets/video/bg.mov'
    videoBG.addEventListener('loadeddata', ()=>{
        console.log('Видео загружено и готово к воспроизведению');
        createVideoFrame()
    })

    function createVideoFrame (){

        let overlayVideo = document.createElement('div')
        overlayVideo.classList.add('overlay_video')
        videoBG.classList.add('active')
        videoBG.removeAttribute('controls'); // Убираем элементы управления, если не нужны
        videoBG.play().catch(function(error) {
            console.log('Ошибка автозапуска видео:', error);
        });
        bannerWrapper.appendChild(videoBG)
        bannerWrapper.appendChild(overlayVideo)
    }
    let firstSession = true;
    let tabsItems = document.querySelectorAll('.tabs_list .tabs_item');
    if(getCookie('firstSession')){
        console.log('firstSession')
        firstSession = getCookie('firstSession')
        console.log(firstSession)
    }
    //Если анимация еще не работала то запускаем все анимашки
    if(firstSession == true){
        gsap.registerPlugin(ScrollTrigger);
        // Анимация параллакса для фоновой картинки
        gsap.fromTo('.tabs_block',
            { opacity: 0 },  // Начальное состояние: невидимо
            {
                opacity: 1,  // Конечное состояние: видно
                backgroundPosition: 'left 50%', // Двигаем фон для параллакса
                ease: 'none',
                scrollTrigger: {
                    trigger: '.tabs_block', // Секция, где начинается анимация
                    start: 'top bottom', // Начало анимации
                    end: 'bottom top', // Конец анимации
                    scrub: true, // Плавная синхронизация со скроллом
                }
            }
        );

        // Анимация появления элементов .tabs_item
        let items = document.querySelectorAll('.tabs_item');
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.tabs_block',
                pin: true, // фиксируем секцию на месте
                start: 'top top', // когда верхняя часть секции касается верхней части окна
                end: `+=${items.length * 500}`, // длительность скролла зависит от количества элементов
                scrub: 1, // плавное скольжение
            }
        });

        items.forEach((item, index) => {
            tl.fromTo(item,
                { y: 1000, autoAlpha: 0 }, // изначальное положение
                { y: 0, autoAlpha: 1, duration: 0.5 }, // анимация перемещения вверх и появления
                index * 0.5 // задержка между элементами
            );
        });

        // Горизонтальная прокрутка элементов в slider_list
        let sliderList = document.querySelector('.slider_list');
        let itemsSlider = document.querySelectorAll('.slider_list .item');
        let totalItemsWidth = Array.from(itemsSlider).reduce((total, item) => {
            return total + item.offsetWidth;
        }, 0) + (items.length - 1) * 20;

        gsap.to(sliderList, {
            x: () => `-${totalItemsWidth - sliderList.offsetWidth}px`, // Прокручиваем до конца списка
            ease: 'none',
            scrollTrigger: {
                trigger: '.slider_block',
                pin: true, // фиксируем блок
                start: 'top top', // начало скроллинга
                end: () => `+=${totalItemsWidth}`, // конец анимации после прокрутки всех элементов
                scrub: 0.1,

            }
        });

        // Анимация появления элементов с классом .animate
        let animateItems = document.querySelectorAll('.animate');
        animateItems.forEach((animateItem) => {
            gsap.fromTo(animateItem,
                { y: 100, autoAlpha: 0 },  // Начальное состояние: внизу и невидимо
                {
                    y: 0, autoAlpha: 1, duration: 1,  // Конечное состояние: видимо и на месте
                    scrollTrigger: {
                        trigger: animateItem,
                        start: 'top 80%', // Запуск анимации, когда элемент почти виден
                        end: 'bottom 20%', // Когда элемент почти выйдет из экрана
                        scrub: 1, // Плавная синхронизация с прокруткой
                    }
                }
            );
        });

        let footerTrigger = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top center', // when the top of the trigger hits the top of the viewport
                end: '+=500',
                onEnter: ()=>{
                    //Тут отлючаеться вся анимация привязанная с scroll
                    ScrollTrigger.getAll().forEach(st => st.kill(true));
                    firstSession = false;
                    tabsItems.forEach((i, idx)=>{
                        i.style.cssText = 'translate: none; rotate: none; scale: initial; opacity: 1; visibility: inherit; transform: unset;';
                    })
                    disableScrollTriggerView()
                    setCookie('firstSession', 'false', {secure: true, 'max-age': 3600});
                }
            }
        })


    }else {
        //Если анимация уже была просмотренна пользователем то делаем стандартный функционал
        disableScrollTriggerView()

    }


    function disableScrollTriggerView(){
        tabsItems.forEach((i, idx)=>{
            let title = i.querySelector('.tabs_title')
            title.style.cssText = "position: relative; z-index: 700";
            i.addEventListener('click', (e)=>{
                clearClass(tabsItems, 'active')
                let target = e.target;
                if(target.classList.contains('tabs_title')){
                    i.classList.add('active')
                }
            })
        })


        $('.slider_list').addClass('owl-carousel owl-theme')
        let slider_list = $('.slider_list').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            dots:false,
            autoplay: true,

            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:2.6
                }
            }
        })
    }
    function clearClass(items, classActive){
        for(let i = 0; i < items.length; i++){
            items[i].classList.remove(classActive)
        }
    }


   let people_slider = $('.people_slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })
    $('.arrow_slider--people .btn-slider--next').click(function() {
        people_slider.trigger('next.owl.carousel');
        $('.arrow_slider--people .btn-slider--prev').removeClass('disable')
    })
    // Go to the previous item
    $('.arrow_slider--people .btn-slider--prev').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        people_slider.trigger('prev.owl.carousel', [300]);
    })



    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }





});
