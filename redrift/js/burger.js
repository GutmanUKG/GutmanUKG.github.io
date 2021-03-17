window.addEventListener('DOMContentLoaded', function () {
    const btnBurger = document.querySelector('.burger_menu');
    const menuBurger = document.querySelector('.burger_menu_wraper');
    const closeBtn = document.querySelector('.close');
    const burgerLink = document.querySelectorAll('.burger_link');
    const link_top = document.querySelector('.link_top');

    function showBurger() {
        menuBurger.classList.add('burger_menu_wraper_active');
    }

    function closeBurger() {
        menuBurger.classList.remove('burger_menu_wraper_active');
        document.body.style.overflow = "auto"
    }
    btnBurger.addEventListener('click', function () {
        menuBurger.classList.add('burger_menu_wraper_active');
        document.body.style.overflow = "hidden"
    })
    closeBtn.addEventListener('click', function () {
        closeBurger()

    })
    burgerLink.forEach(function (i) {
        i.addEventListener('click', function () {
            closeBurger();
        })
        link_top.addEventListener('click', function () {
            closeBurger();
        })
    })
});