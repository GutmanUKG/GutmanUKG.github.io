"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
document.addEventListener("DOMContentLoaded", function () {
  var BannerSlider = /*#__PURE__*/function () {
    function BannerSlider(_ref) {
      var _ref$mainSlider = _ref.mainSlider,
        mainSlider = _ref$mainSlider === void 0 ? undefined : _ref$mainSlider,
        _ref$secondSlider = _ref.secondSlider,
        secondSlider = _ref$secondSlider === void 0 ? undefined : _ref$secondSlider,
        _ref$btnNext = _ref.btnNext,
        btnNext = _ref$btnNext === void 0 ? undefined : _ref$btnNext,
        _ref$btnPrev = _ref.btnPrev,
        btnPrev = _ref$btnPrev === void 0 ? undefined : _ref$btnPrev;
      _classCallCheck(this, BannerSlider);
      this.mainSlider = mainSlider, this.secondSlider = secondSlider, this.btnNext = btnNext, this.btnPrev = btnPrev;
    }
    _createClass(BannerSlider, [{
      key: "init",
      value: function init() {
        //Проверки на торопыгу
        this.mainSlider == undefined || this.mainSlider == "" ? console.error(new Error("Не передан основной слайдер")) : true;
        this.secondSlider == undefined || this.secondSlider == "" ? console.error(new Error("Не передан второй слайдер")) : true;
        this.btnNext == undefined || this.btnNext == "" || this.btnPrev == undefined || this.btnPrev == "" ? console.error("Не переданный кнопки управления слайдером") : true;
        //Заводим первый слайдер
        $(this.mainSlider).owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          dots: false,
          mouseDrag: false,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        });
        //Заводим второй слайдер
        $("".concat(this.secondSlider)).owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          dots: false,
          vertical: true,
          mouseDrag: false,
          animateIn: "bounceInUp",
          animateOut: "fadeOut",
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        });
        //Закидываем слайдеры в переменные и привязываемся к событиям переключения
        //Завязываем переключение на кастомные кнопки
        var mainSliderListener = $(this.mainSlider),
          secondSliderListener = $(this.secondSlider);
        mainSliderListener.on("next.owl.carousel", function () {
          secondSliderListener.trigger("next.owl.carousel");
        });
        mainSliderListener.on("prev.owl.carousel", function () {
          secondSliderListener.trigger("prev.owl.carousel", [300]);
        });
        //Завязываем переключение на кастомные кнопки
        $(this.btnNext).click(function () {
          secondSliderListener.trigger("next.owl.carousel");
          mainSliderListener.trigger("next.owl.carousel");
          $(this.btnPrev).addClass("active");
        });
        $(this.btnPrev).click(function () {
          secondSliderListener.trigger("prev.owl.carousel", [300]);
          mainSliderListener.trigger("prev.owl.carousel", [300]);
        });
      }
    }]);
    return BannerSlider;
  }();
  var aboutBanner = new BannerSlider({
    mainSlider: ".top_inner_slider_image",
    secondSlider: ".top_inner_slider-text",
    btnNext: ".btn-arr--next",
    btnPrev: ".btn-arr--prev"
  });
  try {
    aboutBanner.init();
  } catch (e) {}
  var sliderByMainPage = new BannerSlider({
    mainSlider: ".slider-image",
    secondSlider: ".slider-text",
    btnNext: ".btn-next-multy",
    btnPrev: ".btn-prev-multy"
  });
  try {
    sliderByMainPage.init();
  } catch (e) {}
  try {
    var footerInnerSlider = document.querySelector(".footer_inner_slider");
  } catch (e) {}
});
//# sourceMappingURL=sliderBanner.js.map
