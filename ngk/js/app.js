"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body,
    burgerBtn = document.querySelector(".btn-burger"),
    burgerMenu = document.querySelector(".header-info"),
    closeBurgerMenuBtn = burgerMenu.querySelector(".header-btn--close");
  var scrollVertical = true;

  // Получаем нужный элемент
  var element = document.querySelector(".services-wrapper");
  var Visible = function Visible(target) {
    // Все позиции элемента
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };
    if (targetPosition.bottom > windowPosition.top &&
    // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom &&
    // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left &&
    // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) {
      // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
      // Если элемент полностью видно, то запускаем следующий код
      // console.clear();
      // console.log("Вы видите элемент :)");
      // scrollVertical = true;
      // if (scrollVertical) {
      //   body.style.cssText += "overflow: hidden";
      // }
    } else {
      // Если элемент не видно, то запускаем этот код
      // scrollVertical = false;
      // body.style.cssText += "overflow: ";
    }
  };

  // Запускаем функцию при прокрутке страницы
  window.addEventListener("scroll", function () {
    Visible(element);
  });

  // А также запустим функцию сразу. А то вдруг, элемент изначально видно
  Visible(element);
  burgerBtn.addEventListener("click", function () {
    burgerMenu.classList.add("active");
  });
  closeBurgerMenuBtn.addEventListener("click", function () {
    burgerMenu.classList.remove("active");
  });
  var owlMain = $(".services-list");
  owlMain.owlCarousel({
    loop: document.body.clientWidth > 768 ? false : false,
    nav: false,
    dots: false,
    margin: 10,
    onTranslated: function onTranslated(e) {
      var items = e.item.count;
      var current = e.item.index + 1;
      if (current === items) {
        // scrollVertical = false;
        console.log("Последний слайд!");
        // body.style.cssText = "overflow: none";
        // console.log(scrollVertical);
      }
    },

    responsive: {
      0: {
        items: 1
      }
    }
  });
  if (document.body.clientWidth > 768) {
    owlMain.on("mousewheel", ".owl-stage", function (e) {
      if (e.originalEvent.deltaY > 0) {
        owlMain.trigger("next.owl");
      } else {
        owlMain.trigger("prev.owl");
      }
      e.preventDefault();
    });
  }
  var sectionServices = document.querySelector(".section-services");
  sectionServices.addEventListener("scroll", function (e) {
    console.log("scroll");
  });
});
//# sourceMappingURL=app.js.map
