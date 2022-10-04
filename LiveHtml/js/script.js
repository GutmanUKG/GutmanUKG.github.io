"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;

  var RelocateNodeElement = /*#__PURE__*/function () {
    function RelocateNodeElement(_ref) {
      var _ref$selectElement = _ref.selectElement,
          selectElement = _ref$selectElement === void 0 ? null : _ref$selectElement,
          _ref$finalElement = _ref.finalElement,
          finalElement = _ref$finalElement === void 0 ? null : _ref$finalElement,
          _ref$clone = _ref.clone,
          clone = _ref$clone === void 0 ? false : _ref$clone;

      _classCallCheck(this, RelocateNodeElement);

      this.selectElement = document.querySelector(selectElement);
      this.finalElement = document.querySelector(finalElement);
      this.clone = clone;
    }

    _createClass(RelocateNodeElement, [{
      key: "relocate",
      value: function relocate() {
        this.finalElement.appendChild(this.selectElement);
      }
    }]);

    return RelocateNodeElement;
  }();

  function clearClass(nodeList, activeClass) {
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove(activeClass);
    }
  }

  var relocateUserTop = new RelocateNodeElement({
    selectElement: '.header_top_info_user',
    finalElement: '.modal-content'
  });
  var relocateUserBasket = new RelocateNodeElement({
    selectElement: '.user_basket_info_list',
    finalElement: '.scroll_bar'
  });
  var relocateCatalogMenu = new RelocateNodeElement({
    selectElement: '.header_top_info_menu',
    finalElement: '.burger_menu_content'
  });
  var relocateTopMenu = new RelocateNodeElement({
    selectElement: '.main_menu',
    finalElement: '.burger_menu_content'
  });
  var relocateSearchBtn = new RelocateNodeElement({
    selectElement: '.show_serach',
    finalElement: '.header_top_info'
  });
  var relocateActionLink = new RelocateNodeElement({
    selectElement: '.action_link',
    finalElement: '.main_menu'
  });
  var relocateFeedback = new RelocateNodeElement({
    selectElement: '.header_top_info_feedback',
    finalElement: '.burger_menu_footer'
  });
  var relocateUserBtn = new RelocateNodeElement({
    selectElement: '.header_top_popup_user_btn',
    finalElement: '.header_top_info'
  });
  window.addEventListener('resize', function (e) {
    if (body.clientWidth < 1200) {
      relocateUserTop.relocate();
    }

    if (body.clientWidth < 992) {
      relocateUserBasket.relocate();
      relocateTopMenu.relocate();
      relocateCatalogMenu.relocate();
      relocateSearchBtn.relocate();
      relocateActionLink.relocate();
      relocateFeedback.relocate();
      relocateUserBtn.relocate();
      addTabsToBurgerMenu();
    }
  });

  if (body.clientWidth < 1200) {
    relocateUserTop.relocate();
  }

  if (body.clientWidth < 992) {
    relocateUserBasket.relocate();
    relocateTopMenu.relocate();
    relocateCatalogMenu.relocate();
    relocateSearchBtn.relocate();
    relocateActionLink.relocate();
    relocateFeedback.relocate();
    relocateUserBtn.relocate();
    addTabsToBurgerMenu();
  }

  var headerTopPopupUserBtn = document.querySelector('.header_top_popup_user_btn'),
      modalUser = document.querySelector('.modal_user'),
      overflow = document.querySelector('.overflow');
  headerTopPopupUserBtn.addEventListener('click', function () {
    modalUser.classList.add('show');
    modalUser.style.zIndex = '52';
    modalUser.style.display = 'block';
    overflow.style.display = 'block';
  });
  overflow.addEventListener('click', function () {
    modalUser.classList.remove('show');
    modalUser.style.display = '';
    overflow.style.display = '';
  });

  function addTabsToBurgerMenu() {
    var burgerMenuTop = document.querySelector('.burger_menu_top'),
        headerTopBurgerMenuBtn = document.querySelector('.header_top_burger_menu_btn'),
        burgerMenu = document.querySelector('.burger_menu'),
        burgerMenuTopItems = burgerMenuTop.querySelectorAll('.item'),
        burgerMenuContent = document.querySelector('.burger_menu_content'),
        closeBtn = document.querySelector('.close_btn');

    function disableAllMenu() {
      for (var i = 0; i < burgerMenuContent.children.length; i++) {
        burgerMenuContent.children[i].style.display = 'none';
      }
    }

    disableAllMenu();
    burgerMenuContent.children[0].style.display = 'flex';
    burgerMenuTopItems[0].classList.add('active');
    burgerMenuTopItems[0].classList.add('active');
    burgerMenuTopItems.forEach(function (item, id) {
      // item.classList.remove('active')
      item.addEventListener('click', function () {
        clearClass(burgerMenuTopItems, 'active');
        item.classList.add('active');
        disableAllMenu();
        burgerMenuContent.children[id].style.display = 'flex';
      });
    });
    closeBtn.addEventListener('click', function () {
      burgerMenu.classList.remove('active');
    });
    headerTopBurgerMenuBtn.addEventListener('click', function () {
      burgerMenu.classList.add('active');
    });
  }
});
//# sourceMappingURL=script.js.map
