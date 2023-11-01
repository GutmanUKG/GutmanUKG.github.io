"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body,
    burgerBtn = document.querySelector(".btn-burger"),
    burgerMenu = document.querySelector(".header-info"),
    closeBurgerMenuBtn = burgerMenu.querySelector(".header-btn--close");
  burgerBtn.addEventListener("click", function () {
    burgerMenu.classList.add("active");
  });
  closeBurgerMenuBtn.addEventListener("click", function () {
    burgerMenu.classList.remove("active");
  });
  var servicesWrapper = document.querySelector(".services-list--overflow");
  servicesWrapper.style.cssText = "width:".concat(document.body.clientWidth, "px; \n  min-width: ").concat(document.body.clientWidth, "px; overflow-x: hidden");
  new Vue({
    el: "#app_vue",
    data: function data() {
      return {
        sectionInViewport: false,
        element: document.querySelector(".services-list"),
        cnt: 0,
        styleObject: "",
        isScroll: false
      };
    },
    mounted: function mounted() {
      var options = {
        root: null,
        // Используем viewport как корневой элемент
        rootMargin: "0px",
        // Может быть настроено для марджинов
        threshold: 0.59 // Порог видимости (от 0 до 1)
      };

      var observer = new IntersectionObserver(this.handleIntersection, options);
      observer.observe(this.$refs.sectionToTrack);
      document.addEventListener("wheel", this.onScroll);
    },
    methods: {
      handleIntersection: function handleIntersection(entries) {
        // Вызывается при изменении видимости
        if (entries[0].isIntersecting) {
          this.sectionInViewport = true;
          // Секция находится в зоне видимости
          console.log(this.sectionInViewport);
          // this.isScroll ? body.classList.add("horizontal") : "";
        } else {
          this.sectionInViewport = false;
          // Секция не находится в зоне видимости
          console.log(this.sectionInViewport);
          // body.classList.remove("horizontal");
          // this.styleObject = "transform: translate(" + 0 + "%)";
        }
      },
      calcMaxDown: function calcMaxDown() {},
      onScroll: function onScroll(event) {
        event = event || window.event;
        var y = event.deltaY || event.detail || event.wheelDelta,
          val = 0.1,
          min = 0,
          max = 100;
        console.log(this.sectionInViewport ? "видно" : "Не видно");
        if (y > 0 && this.sectionInViewport && this.cnt >= -55) {
          this.cnt = this.cnt - 5;
          console.log("down");
          body.classList.add("horizontal");
          this.styleObject = "transform: translate(" + this.cnt + "%)";
        }
        if (y < 0 && this.sectionInViewport && (this.ctn >= 0 || this.cnt != 0)) {
          this.cnt = this.cnt + 5;
          console.log("up");
          this.styleObject = "transform: translate(" + this.cnt + "%)";
        } else {
          body.classList.remove("horizontal");
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
});
//# sourceMappingURL=app.js.map
