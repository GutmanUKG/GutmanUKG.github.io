"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.querySelector('.overlay');
  var sideBar = document.querySelector('.sidebar');
  var body = document.querySelector('body');
  var headerMenuBtn = document.querySelector('.header-menu--btn');
  var btnCloseSideBar = sideBar.querySelector('.btn-close');
  //Баннер на главной
  $('.banner-list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });
  headerMenuBtn.addEventListener('mouseenter', function () {
    sideBar.classList.add('active');
    overlay.classList.add('active');
  });
  btnCloseSideBar.addEventListener('click', function (e) {
    e.preventDefault();
    sideBar.classList.remove('active');
    overlay.classList.remove('active');
  });
  overlay.addEventListener('click', function () {
    sideBar.classList.remove('active');
    overlay.classList.remove('active');
  });
});
//# sourceMappingURL=app.js.map
