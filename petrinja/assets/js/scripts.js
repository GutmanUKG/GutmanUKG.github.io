document.addEventListener('DOMContentLoaded', ()=>{
    const MainSlider = tns({
        container: '.cards-list',
        items: 3,
        controls:false,
        nav:false,
        responsive: {
            1001: {
                items: 3
            },
            768:{
                items: 2.2,
                loop: false
            },
            0: {
                items: 1.2,
                loop: false
            }

        }
    });
    const NewsSlider = tns({
        container: '.news-list',
        items: 3,
        controls:false,
        nav:false,
        mouseDrag: true,
        responsive: {
            1001: {
                items: 3
            },
            768:{
                items: 2.2,
                loop: false
            },
            0: {
                items: 1.2,
                loop: false
            }

        }
    });

    const overlay = document.querySelector('.overlay');
    const burgerBtn = document.querySelector('.header-burger'),
        burgerMenu = document.querySelector('.burger-menu'),
        burgerClose = burgerMenu.querySelector('.burger-close');

    burgerBtn.addEventListener('click', ()=>{
        burgerMenu.classList.add('active')
        overlay.classList.add('active')
    })
    burgerClose.addEventListener('click', ()=>{
        burgerMenu.classList.remove('active')
    })
    overlay.addEventListener('click', ()=>{
        burgerMenu.classList.remove('active')
        overlay.classList.remove('active')
    })
});
