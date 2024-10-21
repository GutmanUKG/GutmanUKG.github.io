'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
document.addEventListener('DOMContentLoaded', function () {
  var bannerWrapper = document.querySelector('.banner_wrapper');
  var videoBG = document.querySelector('.banner_video');
  videoBG.src = '/assets/video/bg.mov';
  videoBG.addEventListener('loadeddata', function () {
    console.log('Видео загружено и готово к воспроизведению');
    createVideoFrame();
  });
  function createVideoFrame() {
    var overlayVideo = document.createElement('div');
    overlayVideo.classList.add('overlay_video');
    videoBG.classList.add('active');
    videoBG.removeAttribute('controls'); // Убираем элементы управления, если не нужны
    videoBG.play().catch(function (error) {
      console.log('Ошибка автозапуска видео:', error);
    });
    bannerWrapper.appendChild(videoBG);
    bannerWrapper.appendChild(overlayVideo);
  }
  var firstSession = true;
  var tabsItems = document.querySelectorAll('.tabs_list .tabs_item');
  if (getCookie('firstSession')) {
    console.log('firstSession');
    firstSession = getCookie('firstSession');
    console.log(firstSession);
  }
  //Если анимация еще не работала то запускаем все анимашки
  if (firstSession == true) {
    gsap.registerPlugin(ScrollTrigger);
    // Анимация параллакса для фоновой картинки
    gsap.fromTo('.tabs_block', {
      opacity: 0
    },
    // Начальное состояние: невидимо
    {
      opacity: 1,
      // Конечное состояние: видно
      backgroundPosition: 'left 50%',
      // Двигаем фон для параллакса
      ease: 'none',
      scrollTrigger: {
        trigger: '.tabs_block',
        // Секция, где начинается анимация
        start: 'top bottom',
        // Начало анимации
        end: 'bottom top',
        // Конец анимации
        scrub: true // Плавная синхронизация со скроллом
      }
    });

    // Анимация появления элементов .tabs_item
    var items = document.querySelectorAll('.tabs_item');
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.tabs_block',
        pin: true,
        // фиксируем секцию на месте
        start: 'top top',
        // когда верхняя часть секции касается верхней части окна
        end: "+=".concat(items.length * 500),
        // длительность скролла зависит от количества элементов
        scrub: 1 // плавное скольжение
      }
    });
    items.forEach(function (item, index) {
      tl.fromTo(item, {
        y: 1000,
        autoAlpha: 0
      },
      // изначальное положение
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.5
      },
      // анимация перемещения вверх и появления
      index * 0.5 // задержка между элементами
      );
    });

    // Горизонтальная прокрутка элементов в slider_list
    var sliderList = document.querySelector('.slider_list');
    var itemsSlider = document.querySelectorAll('.slider_list .item');
    var totalItemsWidth = Array.from(itemsSlider).reduce(function (total, item) {
      return total + item.offsetWidth;
    }, 0) + (items.length - 1) * 40;
    gsap.to(sliderList, {
      x: function x() {
        return "-".concat(totalItemsWidth - sliderList.offsetWidth, "px");
      },
      // Прокручиваем до конца списка
      // ease: 'none',
      scrollTrigger: {
        trigger: '.slider_block',
        pin: true,
        // фиксируем блок
        start: 'top top',
        // начало скроллинга
        end: function end() {
          return "+=".concat(totalItemsWidth);
        },
        // конец анимации после прокрутки всех элементов
        scrub: 0.1
      }
    });

    // Анимация появления элементов с классом .animate
    var animateItems = document.querySelectorAll('.animate');
    animateItems.forEach(function (animateItem) {
      gsap.fromTo(animateItem, {
        y: 100,
        autoAlpha: 0
      },
      // Начальное состояние: внизу и невидимо
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        // Конечное состояние: видимо и на месте
        scrollTrigger: {
          trigger: animateItem,
          start: 'top 80%',
          // Запуск анимации, когда элемент почти виден
          end: 'bottom 20%',
          // Когда элемент почти выйдет из экрана
          scrub: 1 // Плавная синхронизация с прокруткой
        }
      });
    });
    var footerTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer',
        start: 'top center',
        // when the top of the trigger hits the top of the viewport
        end: '+=500',
        onEnter: function onEnter() {
          //Тут отлючаеться вся анимация привязанная с scroll
          ScrollTrigger.getAll().forEach(function (st) {
            return st.kill(true);
          });
          firstSession = false;
          tabsItems.forEach(function (i, idx) {
            i.style.cssText = 'translate: none; rotate: none; scale: initial; opacity: 1; visibility: inherit; transform: unset;';
          });
          disableScrollTriggerView();
          setCookie('firstSession', 'false', {
            secure: true,
            'max-age': 3600
          });
        }
      }
    });
  } else {
    //Если анимация уже была просмотренна пользователем то делаем стандартный функционал
    disableScrollTriggerView();
  }
  function disableScrollTriggerView() {
    tabsItems.forEach(function (i, idx) {
      var title = i.querySelector('.tabs_title');
      title.style.cssText = "position: relative; z-index: 700";
      i.addEventListener('click', function (e) {
        clearClass(tabsItems, 'active');
        var target = e.target;
        if (target.classList.contains('tabs_title')) {
          i.classList.add('active');
        }
      });
    });
    $('.slider_list').addClass('owl-carousel owl-theme');
    var slider_list = $('.slider_list').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 2.6
        }
      }
    });
  }
  function clearClass(items, classActive) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove(classActive);
    }
  }
  var people_slider = $('.people_slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
  $('.arrow_slider--people .btn-slider--next').click(function () {
    people_slider.trigger('next.owl.carousel');
    $('.arrow_slider--people .btn-slider--prev').removeClass('disable');
  });
  // Go to the previous item
  $('.arrow_slider--people .btn-slider--prev').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    people_slider.trigger('prev.owl.carousel', [300]);
  });
  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function setCookie(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = _objectSpread({
      path: '/'
    }, options);
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (var optionKey in options) {
      updatedCookie += "; " + optionKey;
      var optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
});
//# sourceMappingURL=script.js.map
