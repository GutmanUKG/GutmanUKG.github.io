"use strict";

var burgerMenu = document.querySelector(".burger_menu"),
  burgerMenuOpen = document.querySelector(".burger_menu--open"),
  burgerMenuClose = burgerMenu.querySelector(".close"),
  overlay = document.querySelector(".overlay"),
  body = document.body;
burgerMenuOpen.addEventListener("click", function () {
  burgerMenu.classList.add("active");
  overlay.classList.add("active");
  body.style.overflow = "hidden";
});
burgerMenuClose.addEventListener("click", function () {
  burgerMenu.classList.remove("active");
  overlay.classList.remove("active");
  body.style.overflow = "";
});
//# sourceMappingURL=burger_menu.js.map
