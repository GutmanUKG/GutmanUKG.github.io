"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var body = document.body; //Основной слайдер

  var bannerSlider = document.querySelector('.banner_slider'),
      bannerItem = bannerSlider.querySelectorAll('.item');
  var bannerOwl = $('.banner_slider');
  $('.banner_slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    dots: true
  }); // Go to the next item

  $('.btn_next_banner').click(function () {
    bannerOwl.trigger('next.owl.carousel');
  }); // Go to the previous item

  $('.btn_prev_banner').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    bannerOwl.trigger('prev.owl.carousel', [300]);
  });
  bannerItem.forEach(function (item) {
    if (item.classList.contains('white')) {
      item.parentNode.classList.add('white_slide');
    }
  }); //Функционал смены темы при переключении слайдера

  var owlItem = bannerSlider.querySelectorAll('.owl-item');
  bannerOwl.on('changed.owl.carousel', function (event) {
    if (owlItem[event.item.index].classList.contains('white_slide')) {
      body.classList.add('white_theme');
    } else {
      body.classList.remove('white_theme');
    }
  }); //Основной слайдер
  //Инициализация и настройка слайдеров для всех товаров

  var OwlSlider = /*#__PURE__*/function () {
    function OwlSlider(_ref) {
      var _ref$item = _ref.item,
          item = _ref$item === void 0 ? null : _ref$item,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          _ref$customBtn = _ref.customBtn,
          customBtn = _ref$customBtn === void 0 ? false : _ref$customBtn,
          _ref$btnNext = _ref.btnNext,
          btnNext = _ref$btnNext === void 0 ? null : _ref$btnNext,
          _ref$btnPrev = _ref.btnPrev,
          btnPrev = _ref$btnPrev === void 0 ? null : _ref$btnPrev,
          _ref$bannerOwl = _ref.bannerOwl,
          bannerOwl = _ref$bannerOwl === void 0 ? null : _ref$bannerOwl;

      _classCallCheck(this, OwlSlider);

      this.item = item;
      this.options = options;
      this.customBtn = customBtn;
      this.btnNext = document.querySelector(btnNext);
      this.btnPrev = document.querySelector(btnPrev);
      this.bannerOwl = bannerOwl;
    }

    _createClass(OwlSlider, [{
      key: "init",
      value: function init() {
        this.item.classList.add('owl-carousel', 'owl-theme');
        $(this.item).owlCarousel(_objectSpread({}, this.options));

        if (this.customBtn === true) {
          var _bannerOwl = $(this.item),
              nextPrev = ['prev', 'next'];

          this.item.parentNode.querySelectorAll('.btn').forEach(function (item, id) {
            item.addEventListener('click', function () {
              _bannerOwl.trigger(nextPrev[id] + '.owl.carousel');
            });
          });
        }
      }
    }]);

    return OwlSlider;
  }(); //Слайдер списка товаров


  var productItemsList = document.querySelectorAll('.product_item_slider');
  productItemsList.forEach(function (item) {
    item = new OwlSlider({
      item: item,
      customBtn: true,
      btnNext: '.product_items_list_btn_next',
      btnPrev: '.product_items_list_btn_prev',
      options: {
        loop: false,
        margin: 30,
        nav: false,
        items: 4,
        dots: false,
        mouseDrag: false
      }
    });
    item.init();
  }); //Слайдер картинок в товаре

  var prodItemImgs = document.querySelectorAll('.product_item_imgs');
  prodItemImgs.forEach(function (item) {
    item = new OwlSlider({
      item: item,
      options: {
        loop: true,
        margin: 30,
        nav: false,
        items: 1,
        dots: true,
        autoplay: false,
        // center:true,
        customBtn: false // autoWidth: true

      }
    });
    item.init();
  }); //Cлайдер капсул и новостей

  var sliderList = document.querySelectorAll('.slider_list');
  sliderList.forEach(function (item) {
    item = new OwlSlider({
      item: item,
      customBtn: true,
      btnNext: '.btn_next_slider',
      btnPrev: '.btn_prev_slider',
      options: {
        loop: false,
        margin: 30,
        nav: false,
        items: 3,
        dots: false
      }
    });
    item.init();
  });
});
//# sourceMappingURL=script.js.map
