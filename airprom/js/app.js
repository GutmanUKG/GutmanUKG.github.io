"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.querySelector('.overlay'),
    sideBar = document.querySelector('.sidebar'),
    body = document.querySelector('body'),
    headerMenuBtn = document.querySelector('.header-menu--btn'),
    btnCloseSideBar = sideBar.querySelector('.btn-close');
  //Баннер на главной
  $('.banner-list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });
  function clearClass(elements, activeClass) {
    console.log(elements);
    var i = elements.length;
    while (i--) {
      elements[i].classList.remove(activeClass);
    }
  }
  headerMenuBtn.addEventListener('mouseenter', function () {
    sideBar.classList.add('active');
    overlay.classList.add('active');
  });
  btnCloseSideBar.addEventListener('click', function (e) {
    e.preventDefault();
    sideBar.classList.remove('active');
    overlay.classList.remove('active');
  });
  (function () {
    var btns = sideBar.querySelectorAll('.sidebar-top-btn'),
      sidebarCategory = sideBar.querySelector('.sidebar-category'),
      sidebarBrands = sideBar.querySelector('.sidebar-brands');
    btns.forEach(function (item, id) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        clearClass(btns, 'active');
        item.classList.add('active');
        if (id == 0) {
          sidebarCategory.classList.add('sidebar-list--active');
          sidebarBrands.classList.remove('sidebar-list--active');
        } else {
          sidebarCategory.classList.remove('sidebar-list--active');
          sidebarBrands.classList.add('sidebar-list--active');
        }
      });
    });
  })();
  overlay.addEventListener('click', function () {
    sideBar.classList.remove('active');
    overlay.classList.remove('active');
  });
  function ShowMore(parentNodes, listElement, triggerBtn, activeClass) {
    var countElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
    var parentList = document.querySelectorAll(parentNodes);
    parentList.forEach(function (item) {
      var elements = item.querySelectorAll(listElement);
      var btn = item.querySelector(triggerBtn);
      var i = elements.length;
      if (i > countElement) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          item.classList.toggle(activeClass);
          if (item.classList.contains(activeClass)) {
            btn.textContent = 'Скрыть';
            btn.classList.add('active');
          } else {
            btn.textContent = 'Показать все';
            btn.classList.remove('active');
          }
        });
      } else {
        btn.style.display = 'none';
      }
    });
  }
  //Показать еще в меню
  ShowMore('.sidebar-menu', 'li', '.show-more', 'sidebar-menu--active', 4);
});
//# sourceMappingURL=app.js.map
