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
});
//# sourceMappingURL=app.js.map
