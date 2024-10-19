'use strict';
document.addEventListener('DOMContentLoaded', () => {

    let firstSession = true;
    //Если анимация еще не работала то запускаем все анимашки
    if(firstSession){
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
                scrub: 1
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
                    firstSession = false;
                }
            }
        })


    }else {
        //Если анимация уже была просмотренна пользователем то делаем стандартный функционал

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
});
