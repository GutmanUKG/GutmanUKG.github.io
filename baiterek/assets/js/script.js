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
    }else {
        //Если анимация уже была просмотренна пользователем то делаем стандартный функционал

    }

});
