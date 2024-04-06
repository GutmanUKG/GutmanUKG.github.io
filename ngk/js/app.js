"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body,
    burgerBtn = document.querySelector(".btn-burger"),
    burgerMenu = document.querySelector(".header-info"),
    closeBurgerMenuBtn = burgerMenu.querySelector(".header-btn--close");
  var overlay = document.querySelector(".overlay_body");
  burgerBtn.addEventListener("click", function () {
    burgerMenu.classList.add("active");
  });
  closeBurgerMenuBtn.addEventListener("click", function () {
    burgerMenu.classList.remove("active");
  });
  //Все для автоскролла в секции услуги
  var servicesList = document.querySelector(".services-list");
  var items = servicesList.querySelectorAll(".item");
  if (document.body.clientWidth > 1023) {
    var itemsWidth = 0;
    for (var i = 0; i < items.length; i++) {
      itemsWidth += parseInt(items[i].clientWidth);
    }
    var servicesWrapper = document.querySelector(".services-list--overflow");
    servicesWrapper.style.cssText = "width:".concat(document.body.clientWidth, "px; \n    min-width: ").concat(document.body.clientWidth, "px; overflow-x: hidden");
    new Vue({
      el: "#app_vue",
      data: function data() {
        return {
          sectionInViewport: false,
          element: document.querySelector(".services-list"),
          cnt: 0,
          styleObject: "",
          isScroll: false,
          singleItemWidth: itemsWidth / items.length,
          fullItemsWidth: itemsWidth - items[0].clientWidth,
          persentItemWidth: Math.floor((items[0].clientWidth + 16) / (itemsWidth + 16 * items.length) * 100 - 3),
          maxPersentTransparent: 100
        };
      },
      mounted: function mounted() {
        var options = {
          root: null,
          // Используем viewport как корневой элемент
          rootMargin: "0px",
          // Может быть настроено для марджинов
          threshold: 0.7 // Порог видимости (от 0 до 1)
        };

        var observer = new IntersectionObserver(this.handleIntersection, options);
        observer.observe(this.$refs.sectionToTrack);
        document.body.clientWidth > 767 ? document.addEventListener("wheel", this.onScroll) : "";
      },
      methods: {
        handleIntersection: function handleIntersection(entries) {
          // Вызывается при изменении видимости
          if (entries[0].isIntersecting) {
            this.sectionInViewport = true;
            // Секция находится в зоне видимости
          } else {
            this.sectionInViewport = false;
            // Секция не находится в зоне видимости
          }
        },
        onScroll: function onScroll(event) {
          event = event || window.event;
          var y = event.deltaY || event.detail || event.wheelDelta,
            val = 0.1,
            min = 0,
            max = 100;
          if (y > 0 && this.sectionInViewport && -this.cnt < this.fullItemsWidth) {
            this.cnt = this.cnt - this.singleItemWidth;
            body.classList.add("horizontal");
            this.styleObject = "transform: translate(" + this.cnt + "px)";
          }
          if (y < 0 && this.sectionInViewport && (this.ctn >= 0 || this.cnt != 0)) {
            this.cnt = this.cnt + this.singleItemWidth;
            console.log("up");
            this.styleObject = "transform: translate(" + this.cnt + "px)";
          } else {
            setTimeout(function () {
              body.classList.remove("horizontal");
            }, 100);
          }
        }
      },
      watch: {
        cnt: function cnt(newVal, oldVal) {
          newVal == 0 ? body.classList.remove("horizontal") : "";
          newVal == -190 ? body.classList.remove("horizontal") : body.classList.add("horizontal");
        }
      }
    });
  } else {
    servicesList.classList.add("owl-carousel", "owl-theme");
    var servicePopup = document.querySelector(".service_popup"),
      servicePopupClose = servicePopup.querySelector(".close_btn");
    $(".services-list").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      drag: true,
      autoplay: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1.2
        },
        600: {
          items: 2.2
        }
      }
    });
    $(".owl-stage").on("click", ".owl-item>div", function (e) {
      var target = e.target;
      var item = $(this).closest(".item");
      var title = item.find("h2").text();
      var descr = item.find(".item-descr").html();
      var imgSrc = item.find(".img img").attr("src");

      // Обновляем содержимое servicePopup
      $(".service_popup-title").text(title);
      $(".service_popup-top").css("background", "url(".concat(imgSrc, ") center/cover no-repeat"));
      $(".service_popup-body").html(descr);

      // Показываем servicePopup и overlay
      $(".service_popup").addClass("active");
      $(".overlay_body").addClass("active");
      $("body").css("overflow", "hidden");
    });
    servicePopupClose.addEventListener("click", function () {
      servicePopup.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  }
});
//# sourceMappingURL=app.js.map
