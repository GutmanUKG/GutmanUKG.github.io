"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var isToggle = true; // Функция throttle будет принимать 2 аргумента:
  // - callee, функция, которую надо вызывать;
  // - timeout, интервал в мс, с которым следует пропускать вызовы.

  function throttle(callee, timeout) {
    // Таймер будет определять,
    // надо ли нам пропускать текущий вызов.
    var timer = null; // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
    // чуть позже мы увидим, как это помогает.

    return function perform() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Если таймер есть, то функция уже была вызвана,
      // и значит новый вызов следует пропустить.
      if (timer) return; // Если таймера нет, значит мы можем вызвать функцию:

      timer = setTimeout(function () {
        // Аргументы передаём неизменными в функцию-аргумент:
        callee.apply(void 0, args); // По окончании очищаем таймер:

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  } //Саня на jquery не переписывай
  //Аккардион для меню


  var AccardionMenu = /*#__PURE__*/function () {
    function AccardionMenu(_ref) {
      var _ref$container = _ref.container,
          container = _ref$container === void 0 ? null : _ref$container,
          _ref$activeClass = _ref.activeClass,
          activeClass = _ref$activeClass === void 0 ? 'popup_list_show' : _ref$activeClass,
          _ref$classElements = _ref.classElements,
          classElements = _ref$classElements === void 0 ? null : _ref$classElements,
          _ref$btnClass = _ref.btnClass,
          btnClass = _ref$btnClass === void 0 ? null : _ref$btnClass,
          _ref$toggleElClass = _ref.toggleElClass,
          toggleElClass = _ref$toggleElClass === void 0 ? null : _ref$toggleElClass,
          _ref$classActive = _ref.classActive,
          classActive = _ref$classActive === void 0 ? '' : _ref$classActive;

      _classCallCheck(this, AccardionMenu);

      this.container = document.querySelector(container);
      this.classElements = this.container.querySelectorAll(classElements);
      this.btnClass = btnClass;
      this.toggleElClass = toggleElClass;
      this.classActive = classActive;
    }

    _createClass(AccardionMenu, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.classElements.forEach(function (item) {
          var btn = item.querySelector(_this.btnClass),
              popup_list = item.querySelector(_this.toggleElClass);
          btn.addEventListener('click', function (e) {
            popup_list.classList.toggle(_this.classActive);
            btn.classList.toggle('active');
          });
        });
      }
    }]);

    return AccardionMenu;
  }(); //Sliders


  var SliderOwl = /*#__PURE__*/function () {
    function SliderOwl(_ref2) {
      var _ref2$wrapperClass = _ref2.wrapperClass,
          wrapperClass = _ref2$wrapperClass === void 0 ? null : _ref2$wrapperClass,
          _ref2$ShowMedia = _ref2.ShowMedia,
          ShowMedia = _ref2$ShowMedia === void 0 ? false : _ref2$ShowMedia,
          _ref2$MediaSize = _ref2.MediaSize,
          MediaSize = _ref2$MediaSize === void 0 ? 1000 : _ref2$MediaSize,
          _ref2$params = _ref2.params,
          params = _ref2$params === void 0 ? {} : _ref2$params;

      _classCallCheck(this, SliderOwl);

      this.wrapperClass = wrapperClass;
      this.ShowMedia = ShowMedia;
      this.MediaSize = MediaSize;
      this.params = params;
    }

    _createClass(SliderOwl, [{
      key: "init",
      value: function init() {
        var wrapper = document.querySelector(this.wrapperClass);
        wrapper.classList.add('owl-carousel');
        wrapper.classList.add('owl-theme');

        if (this.ShowMedia) {
          if (document.body.clientWidth <= this.MediaSize) {
            $(this.wrapperClass).owlCarousel(_objectSpread({}, this.params));
          }
        } else {
          $(this.wrapperClass).owlCarousel(_objectSpread({}, this.params));
        }
      }
    }]);

    return SliderOwl;
  }(); //Функция считает сколько было проскроленно


  function showScrollMenu() {
    console.log('scroll');
    var scrollDoc = window.scrollY;

    if (isToggle == true) {
      if (scrollDoc > 700) {
        document.body.classList.add('fixed_menu_active');
        document.body.classList.add('is_scroll');
      } else {
        document.body.classList.remove('fixed_menu_active');
        document.body.classList.remove('is_scroll');
      }
    }
  } //Пропускает некоторые вызовы функции что бы не загружать страницу расчетами


  var optimizedHandler = throttle(showScrollMenu, 250);
  window.addEventListener("scroll", optimizedHandler); //Переключатель классов

  var TogglerClases = /*#__PURE__*/function () {
    function TogglerClases(_ref3) {
      var _ref3$triger = _ref3.triger,
          triger = _ref3$triger === void 0 ? null : _ref3$triger,
          _ref3$toggleEl = _ref3.toggleEl,
          toggleEl = _ref3$toggleEl === void 0 ? null : _ref3$toggleEl,
          _ref3$listener = _ref3.listener,
          listener = _ref3$listener === void 0 ? 'click' : _ref3$listener,
          _ref3$classActive = _ref3.classActive,
          classActive = _ref3$classActive === void 0 ? null : _ref3$classActive,
          _ref3$closeBtn = _ref3.closeBtn,
          closeBtn = _ref3$closeBtn === void 0 ? '.close_btn' : _ref3$closeBtn,
          _ref3$overlay = _ref3.overlay,
          overlay = _ref3$overlay === void 0 ? '.overlay' : _ref3$overlay,
          _ref3$showOveraly = _ref3.showOveraly,
          showOveraly = _ref3$showOveraly === void 0 ? true : _ref3$showOveraly,
          _ref3$bodyClass = _ref3.bodyClass,
          bodyClass = _ref3$bodyClass === void 0 ? '' : _ref3$bodyClass,
          _ref3$listenerOut = _ref3.listenerOut,
          listenerOut = _ref3$listenerOut === void 0 ? null : _ref3$listenerOut,
          _ref3$isScrollTop = _ref3.isScrollTop,
          isScrollTop = _ref3$isScrollTop === void 0 ? false : _ref3$isScrollTop;

      _classCallCheck(this, TogglerClases);

      this.triger = document.querySelectorAll(triger);
      this.listener = listener;
      this.classActive = classActive;
      this.toggleEl = document.querySelector(toggleEl);
      this.closeBtn = closeBtn;
      this.overlay = document.querySelector(overlay);
      this.showOveraly = showOveraly;
      this.bodyClass = bodyClass;
      this.listenerOut = listenerOut, this.isScrollTop = isScrollTop;
    }

    _createClass(TogglerClases, [{
      key: "init",
      value: function init() {
        this.open();
        this.close();
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;

        try {
          var closeBtn = this.toggleEl.querySelector(this.closeBtn);
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            isToggle = true;

            _this2.toggleEl.classList.remove(_this2.classActive);

            _this2.overlay.style.display = '';

            if (_this2.bodyClass) {
              document.body.classList.remove(_this2.bodyClass);
            }
          });
        } catch (e) {}

        if (this.listenerOut != null) {
          this.triger.forEach(function (item) {
            item.addEventListener(_this2.listenerOut, function (e) {
              e.preventDefault();
              item.classList.remove('active');
            });
          });
        }

        if (document.body.classList.contains('is_scroll ')) {
          isToggle = true;
          document.body.classList.add('fixed_menu_active');
        }
      }
    }, {
      key: "open",
      value: function open() {
        var _this3 = this;

        this.triger.forEach(function (item) {
          item.addEventListener(_this3.listener, function (e) {
            e.preventDefault();

            if (_this3.isScrollTop) {
              scrollTo(0, 0); // isToggle = false
            } // isToggle = false


            item.classList.add('active');

            try {
              _this3.toggleEl.classList.add(_this3.classActive);
            } catch (e) {}

            if (_this3.showOveraly) {
              _this3.overlay.style.display = 'block';
            }

            if (_this3.bodyClass) {
              document.body.classList.add(_this3.bodyClass);
            }

            if (document.body.classList.contains('is_scroll')) {
              if (document.body.classList.contains('active_left_menu_from_fixed')) {} else {
                document.body.classList.remove('fixed_menu_active');
              }
            }
          });
        });
      }
    }]);

    return TogglerClases;
  }(); //Анимация для кнопок


  var animateTranslate = /*#__PURE__*/function () {
    function animateTranslate(_ref4) {
      var _ref4$elements = _ref4.elements,
          elements = _ref4$elements === void 0 ? null : _ref4$elements,
          _ref4$classActive = _ref4.classActive,
          classActive = _ref4$classActive === void 0 ? '' : _ref4$classActive,
          _ref4$listener = _ref4.listener,
          listener = _ref4$listener === void 0 ? 'mouseover' : _ref4$listener,
          _ref4$listenerOut = _ref4.listenerOut,
          listenerOut = _ref4$listenerOut === void 0 ? null : _ref4$listenerOut;

      _classCallCheck(this, animateTranslate);

      this.elements = document.querySelectorAll(elements);
      this.listener = listener;
      this.listenerOut = listenerOut;
      this.classActive = classActive;
    }

    _createClass(animateTranslate, [{
      key: "animateEl",
      value: function animateEl() {
        var _this4 = this;

        var isOn = false;
        var tl = anime.timeline({
          duration: 400,
          easing: 'spring(1, 80, 10, 0)',
          loop: false
        });
        this.elements.forEach(function (item) {
          item.addEventListener(_this4.listener, function (e) {
            isOn = true;

            if (isOn) {
              item.classList.add(_this4.classActive);
              e.preventDefault();
              tl.add({
                targets: item,
                translateX: -20,
                easing: 'spring'
              });
            }

            if (_this4.listenerOut != null) {// item.addEventListener(this.listenerOut, (e)=>{
              //     isOn = false
              //     item.classList.remove(this.classActive)
              //     tl.add({
              //         targets: item,
              //         translateX: 20,
              //         easing: 'spring',
              //     })
              // })
            }
          });
        });
      }
    }]);

    return animateTranslate;
  }(); //Анимация animate.css


  var animateVariable = /*#__PURE__*/function () {
    function animateVariable(_ref5) {
      var _ref5$elements = _ref5.elements,
          elements = _ref5$elements === void 0 ? null : _ref5$elements,
          _ref5$listener = _ref5.listener,
          listener = _ref5$listener === void 0 ? 'mouseover' : _ref5$listener,
          _ref5$listenerOut = _ref5.listenerOut,
          listenerOut = _ref5$listenerOut === void 0 ? null : _ref5$listenerOut,
          _ref5$animateName = _ref5.animateName,
          animateName = _ref5$animateName === void 0 ? '' : _ref5$animateName;

      _classCallCheck(this, animateVariable);

      this.elements = document.querySelectorAll(elements);
      this.listener = listener;
      this.animateName = animateName;
      this.listenerOut = listenerOut;
    }

    _createClass(animateVariable, [{
      key: "play",
      value: function play() {
        var _this5 = this;

        var animate = false;
        this.elements.forEach(function (item) {
          item.addEventListener(_this5.listener, function (e) {
            e.preventDefault();
            animate = false;
            setTimeout(function () {
              item.classList.add("animate__animated");
              item.classList.add("".concat(_this5.animateName));
            }, 100);
          });
          setTimeout(function () {
            animate = true;

            if (animate) {
              if (_this5.listenerOut != null) {
                item.addEventListener(_this5.listenerOut, function (e) {
                  e.preventDefault();
                  item.classList.remove("animate__animated");
                  item.classList.remove("".concat(_this5.animateName));
                });
              }
            }
          }, 1500);
        });
      }
    }]);

    return animateVariable;
  }(); //Табы


  var ToggleTabs = /*#__PURE__*/function () {
    function ToggleTabs(_ref6) {
      var _ref6$itemsTabs = _ref6.itemsTabs,
          itemsTabs = _ref6$itemsTabs === void 0 ? null : _ref6$itemsTabs,
          _ref6$wrapperItemsCon = _ref6.wrapperItemsContent,
          wrapperItemsContent = _ref6$wrapperItemsCon === void 0 ? null : _ref6$wrapperItemsCon,
          _ref6$itemsContent = _ref6.itemsContent,
          itemsContent = _ref6$itemsContent === void 0 ? null : _ref6$itemsContent,
          _ref6$classActive = _ref6.classActive,
          classActive = _ref6$classActive === void 0 ? 'show' : _ref6$classActive,
          _ref6$animationName = _ref6.animationName,
          animationName = _ref6$animationName === void 0 ? 'animate__fadeInRight' : _ref6$animationName,
          _ref6$topLink = _ref6.topLink,
          topLink = _ref6$topLink === void 0 ? null : _ref6$topLink,
          _ref6$line = _ref6.line,
          line = _ref6$line === void 0 ? false : _ref6$line;

      _classCallCheck(this, ToggleTabs);

      this.itemsTabs = document.querySelectorAll(itemsTabs);
      this.wrapperItemsContent = document.querySelectorAll(wrapperItemsContent);
      this.classActive = classActive;
      this.animationName = animationName;
      this.topLink = topLink;
      this.line = line;
    }

    _createClass(ToggleTabs, [{
      key: "clearClass",
      value: function clearClass(id) {
        for (var i = 0; i < this.itemsTabs.length; i++) {
          this.itemsTabs[i].classList.remove('item_active');
          this.wrapperItemsContent[i].classList.remove(this.classActive);
          this.wrapperItemsContent[i].classList.remove(this.animationName);
        }

        this.wrapperItemsContent[id].classList.add(this.classActive);
        this.wrapperItemsContent[id].classList.add(this.animationName);
      }
    }, {
      key: "init",
      value: function init() {
        var _this6 = this;

        var line = document.querySelector('#line');
        this.itemsTabs[0].classList.add('item_active');
        this.wrapperItemsContent[0].classList.add(this.classActive);

        if (this.topLink != null) {
          var l = document.querySelector(this.topLink);
          l.textContent = this.itemsTabs[0].dataset.text;
          l.href = this.itemsTabs[0].dataset.url;
        }

        if (this.line != false) {
          var left = this.itemsTabs[0].offsetLeft,
              elWidth = this.itemsTabs[0].offsetWidth,
              color = this.itemsTabs[0].dataset.color;
          line.style.cssText = "\n                        transform: translateX(".concat(left + elWidth / 2 - 15, "px);\n                        background: ").concat(color, ";\n            }\n          \n                    ");
        }

        this.itemsTabs.forEach(function (item, id) {
          item.addEventListener('click', function (e) {
            e.preventDefault();

            if (_this6.line) {
              var _left = item.offsetLeft,
                  _elWidth = item.offsetWidth,
                  _color = item.dataset.color;
              line.style.cssText = "\n                        transform: translateX(".concat(_left + _elWidth / 2 - 15, "px);\n                        background: ").concat(_color, ";\n                    ");
            }

            _this6.clearClass(id);

            if (!item.classList.contains('item_active')) {
              item.classList.add('item_active');
            }

            if (_this6.topLink != null) {
              var _l = document.querySelector(_this6.topLink);

              _l.textContent = item.dataset.text;
              _l.href = item.dataset.url;
            }
          });
        });
      }
    }]);

    return ToggleTabs;
  }(); //Выпадашки селектор


  var selectList = /*#__PURE__*/function () {
    function selectList(_ref7) {
      var _ref7$triggerEl = _ref7.triggerEl,
          triggerEl = _ref7$triggerEl === void 0 ? null : _ref7$triggerEl,
          _ref7$popupList = _ref7.popupList,
          popupList = _ref7$popupList === void 0 ? "" : _ref7$popupList,
          _ref7$classActive = _ref7.classActive,
          classActive = _ref7$classActive === void 0 ? '' : _ref7$classActive;

      _classCallCheck(this, selectList);

      this.triggerEl = document.querySelectorAll(triggerEl);
      this.popupList = popupList;
      this.classActive = classActive;
    }

    _createClass(selectList, [{
      key: "init",
      value: function init() {
        var _this7 = this;

        this.triggerEl.forEach(function (item) {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            item.classList.toggle(_this7.classActive);
            var list = item.querySelector(_this7.popupList);
            list.addEventListener('click', function (e) {
              e.preventDefault();
              var target = e.target;
              console.log(target);

              if (target.classList.contains('item')) {
                var text = item.querySelector('span');
                text.textContent = target.textContent.trim();
              }
            });
          });
        });
      }
    }]);

    return selectList;
  }(); //Переключатель картинок


  var toggleImgs = /*#__PURE__*/function () {
    function toggleImgs(_ref8) {
      var _ref8$mainImg = _ref8.mainImg,
          mainImg = _ref8$mainImg === void 0 ? null : _ref8$mainImg,
          _ref8$imgList = _ref8.imgList,
          imgList = _ref8$imgList === void 0 ? null : _ref8$imgList;

      _classCallCheck(this, toggleImgs);

      this.mainImg = document.querySelector(mainImg);
      this.imgList = document.querySelector(imgList);
    }

    _createClass(toggleImgs, [{
      key: "init",
      value: function init() {
        var _this8 = this;

        this.imgList.addEventListener('click', function (e) {
          var target = e.target;

          if (target.src) {
            _this8.clearClass();

            target.parentNode.classList.add('active');
            _this8.mainImg.src = target.src;
          }
        });
      }
    }, {
      key: "clearClass",
      value: function clearClass() {
        var count = this.imgList.querySelectorAll('li');

        for (var i = 0; i < count.length; i++) {
          this.imgList.children[i].classList.remove('active');
        }
      }
    }]);

    return toggleImgs;
  }();

  var catalogSort = /*#__PURE__*/function () {
    function catalogSort(_ref9) {
      var _ref9$elements = _ref9.elements,
          elements = _ref9$elements === void 0 ? null : _ref9$elements,
          _ref9$count = _ref9.count,
          count = _ref9$count === void 0 ? 5 : _ref9$count,
          _ref9$showLenght = _ref9.showLenght,
          showLenght = _ref9$showLenght === void 0 ? false : _ref9$showLenght;

      _classCallCheck(this, catalogSort);

      this.elements = document.querySelectorAll(elements);
      this.count = count;
      this.showLenght = showLenght;
    }

    _createClass(catalogSort, [{
      key: "init",
      value: function init() {
        var _this9 = this;

        this.elements.forEach(function (item) {
          var menuElements = item.querySelector('ul');
          var menulinks = menuElements.querySelectorAll('li');
          var btnShow = menuElements.querySelector('.show_list');

          if (menulinks.length >= _this9.count) {
            item.classList.add('popup_menu_item');
          } else {
            btnShow.remove();
          }

          if (btnShow != undefined) {
            if (_this9.showLenght) {
              var count = menulinks.length;
              btnShow.innerHTML = "<span>+".concat(count - 9, "</span>");
              btnShow.classList.add('count');

              if (count - 9 < 1) {
                btnShow.remove();
              }
            }

            btnShow.addEventListener('click', function (e) {
              e.preventDefault();
              btnShow.classList.toggle('active');
              item.classList.toggle('popup_menu_item_active');

              if (!_this9.showLenght) {
                if (btnShow.textContent.trim() == 'Паказать все') {
                  btnShow.textContent = 'Скрыть';
                } else {
                  btnShow.textContent = 'Паказать все';
                }
              }
            });
          }
        });
      }
    }]);

    return catalogSort;
  }(); //Класс для обрезки текста


  var sliceText = /*#__PURE__*/function () {
    function sliceText(_ref10) {
      var _ref10$elements = _ref10.elements,
          elements = _ref10$elements === void 0 ? null : _ref10$elements,
          _ref10$count = _ref10.count,
          count = _ref10$count === void 0 ? 500 : _ref10$count;

      _classCallCheck(this, sliceText);

      this.elements = document.querySelectorAll(elements);
      this.count = count;
    }

    _createClass(sliceText, [{
      key: "slile",
      value: function slile() {
        var _this10 = this;

        this.elements.forEach(function (item) {
          if (item.textContent.length > _this10.count) {
            var fullText = item.innerHTML.trim();
            var text = item.innerHTML.trim();
            item.innerHTML = "".concat(text.slice(0, _this10.count), " ...");
            var btnShow = document.createElement('div');
            btnShow.classList.add('btn_show_text');
            item.appendChild(btnShow);
            btnShow.textContent = 'Подробнее';
            btnShow.addEventListener('click', function () {
              btnShow.classList.toggle('open');

              if (btnShow.classList.contains('open')) {
                item.innerHTML = fullText;
                item.appendChild(btnShow);
                btnShow.textContent = 'Скрыть';
              } else {
                item.innerHTML = "".concat(text.slice(0, _this10.count), " ...");
                item.appendChild(btnShow);
                btnShow.textContent = 'Подробнее';
              }
            });
          }
        });
      }
    }]);

    return sliceText;
  }(); //Фильтр на странице каталога


  var sortFilterTop = new selectList({
    triggerEl: '.popup_filter',
    popupList: '.select_list',
    classActive: 'popup_active'
  });
  sortFilterTop.init(); //обрезка текста

  try {
    var seoText = new sliceText({
      elements: '.seo_text',
      count: 290
    });
    seoText.slile();
  } catch (e) {} //Переключение табов на главной


  try {
    var tabs = new ToggleTabs({
      itemsTabs: '.item_tab',
      wrapperItemsContent: '.items_wrapper',
      topLink: '#toggle_link',
      line: true
    });
    tabs.init();
  } catch (e) {} //Анимация ссылок


  var sectionLink = new animateVariable({
    elements: '.section_link',
    listener: 'mouseover',
    animateName: 'section_link_animation',
    listenerOut: 'mouseout'
  });
  sectionLink.play(); //Подлючение аккардиона к меню

  var accardionMenu = new AccardionMenu({
    container: '.left_menu_catalog ',
    classElements: '.item_list',
    btnClass: '.accardion_trigger',
    toggleElClass: '.popup_list',
    classActive: 'popup_list_show'
  });
  accardionMenu.init(); //Вызов меню каталога

  try {
    var ShowCatalogLeft = new TogglerClases({
      triger: '#catalog_btn',
      toggleEl: '.left_menu_catalog',
      classActive: 'left_menu_catalog_active'
    });
    ShowCatalogLeft.init();
    var ShowCatalogLeftFixed = new TogglerClases({
      triger: '#catalog_btn_fixed',
      toggleEl: '.left_menu_catalog',
      classActive: 'left_menu_catalog_active',
      bodyClass: 'active_left_menu_from_fixed'
    });
    ShowCatalogLeftFixed.init();
    var ShowCatalogLeftTablet = new TogglerClases({
      triger: '#catalog_btn_tablet',
      toggleEl: '.left_menu_catalog',
      classActive: 'left_menu_catalog_active'
    });
    ShowCatalogLeftTablet.init();
  } catch (e) {} //Вызов поисковика


  try {
    var serachToggle = new TogglerClases({
      triger: '.search_input',
      toggleEl: '.serach_result',
      classActive: 'serach_result_active',
      showOveraly: false,
      bodyClass: 'active_serach',
      isScrollTop: true
    });
    serachToggle.init();
  } catch (e) {} //Анимация елементов под главным слайдером


  try {
    var specialItemAnimate = new TogglerClases({
      triger: '.special_item',
      listener: 'mouseover',
      classActive: 'animate',
      showOveraly: false,
      listenerOut: 'mouseout'
    });
    specialItemAnimate.init();
  } catch (e) {} //Слайдер основной на главной


  try {
    var sliderInfo = new SliderOwl({
      wrapperClass: '.special_item_list',
      showMedia: true,
      MediaSize: 1090,
      params: {
        loop: false,
        nav: false,
        items: 4
      }
    }); // sliderInfo.init()

    $('.banners_slider').owlCarousel({
      loop: true,
      nav: false,
      items: 1
    });
    $('.brands_list').owlCarousel({
      loop: true,
      nav: false,
      items: 6,
      dots: false
    });
    var owl = $('.brands_list');
    owl.owlCarousel(); // Go to the next item

    $('.arrow_btn_next_brands').click(function () {
      owl.trigger('next.owl.carousel');
    }); // Go to the previous item

    $('.arrow_btn_prev_brands').click(function () {
      // With optional speed parameter
      // Parameters has to be in square bracket '[]'
      owl.trigger('prev.owl.carousel', [300]);
    });
  } catch (e) {} //Слайдеры на главной


  try {
    $('.reviews_list').owlCarousel({
      loop: true,
      nav: false,
      items: 3,
      dots: false,
      margin: 16
    });
    var owlReviews = $('.reviews_list');
    owlReviews.owlCarousel(); // Go to the next item

    $('.arrow_btn_next_reviews').click(function () {
      owlReviews.trigger('next.owl.carousel');
    }); // Go to the previous item

    $('.arrow_btn_prev_reviews').click(function () {
      // With optional speed parameter
      // Parameters has to be in square bracket '[]'
      owlReviews.trigger('prev.owl.carousel', [300]);
    });
  } catch (e) {} //Обрезка кол-ва елементов в меню каталога


  var optionalList = new catalogSort({
    elements: '.wrapper_optional_list',
    count: 5
  });
  optionalList.init(); //Обрезка кол-во елементов меню

  try {
    var catalogPageMenu = new catalogSort({
      elements: '.catalog_list_toggler_item',
      count: 6
    });
    catalogPageMenu.init();
  } catch (e) {} //Обрезка кол-во брендов в фильтре


  try {
    var catalogPageMenuBrand = new catalogSort({
      elements: '.select_list',
      count: 6
    });
    catalogPageMenuBrand.init();
  } catch (e) {} //Обрезка кол-ва картинок в переключателе


  try {
    var imgListDetail = new catalogSort({
      elements: '.wrapper_imgs_list',
      count: 8,
      showLenght: true
    });
    imgListDetail.init();
  } catch (e) {} //Переключение картинок на детальной странице


  try {
    var toggleImgsDetailPage = new toggleImgs({
      mainImg: '.full_img',
      imgList: '.imgs_list'
    });
    toggleImgsDetailPage.init();
  } catch (e) {} //Табы на детальной странице товара


  try {
    var tabsDetailPage = new ToggleTabs({
      itemsTabs: '.item_tab',
      wrapperItemsContent: '.item_tab_content',
      line: false,
      classActive: 'show'
    });
    tabsDetailPage.init();
  } catch (e) {} //Обрезка кол-во елементов в фильтре


  try {
    var fillterCategoryList = new catalogSort({
      elements: '.category_list_fillter',
      count: 5
    });
    fillterCategoryList.init();
  } catch (e) {} //Фильтр цены


  try {
    var minToggle = document.querySelector('.min-toggle');
    var maxToggle = document.querySelector('.max-toggle');
    $('#price-range-submit').hide();
    $(".min_price,.max_price").on('change', function () {
      $('#price-range-submit').show();
      var min_price_range = parseInt($(".min_price").val());
      var max_price_range = parseInt($(".max_price").val());

      if (min_price_range > max_price_range) {
        $('.max_price').val(min_price_range);
      }

      $(".slider-range").slider({
        values: [min_price_range, max_price_range]
      });
    });
    $(".min_price,.max_price").on("paste keyup", function () {
      $('#price-range-submit').show();
      var min_price_range = parseInt($(".min_price").val());
      var max_price_range = parseInt($(".max_price").val());

      if (min_price_range == max_price_range) {
        max_price_range = min_price_range + 100;
        $(".min_price").val(min_price_range);
        $(".max_price").val(max_price_range);
      }

      $(".slider-range").slider({
        values: [min_price_range, max_price_range]
      });
    });
    $(function () {
      $(".slider-range").slider({
        range: true,
        orientation: "horizontal",
        min: 0,
        max: 100000,
        values: [0, 100000],
        step: 100,
        slide: function slide(event, ui) {
          if (ui.values[0] == ui.values[1]) {
            return false;
          }

          $(".min_price").val("".concat(ui.values[0]));
          $(".max_price").val("".concat(ui.values[1]));
        }
      });
      $(".min_price").val($(".slider-range").slider("values", 0));
      $(".max_price").val($(".slider-range").slider("values", 1));
    });
  } catch (e) {} //обрезка текста на подробной странице


  try {
    var detailDescrText = new sliceText({
      elements: '.descr_slice',
      count: 490
    });
    detailDescrText.slile();
  } catch (e) {}
});