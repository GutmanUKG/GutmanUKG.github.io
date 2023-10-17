"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
document.addEventListener("DOMContentLoaded", function () {
  var Accardeon = /*#__PURE__*/function () {
    function Accardeon(_ref) {
      var _ref$items = _ref.items,
        items = _ref$items === void 0 ? undefined : _ref$items,
        _ref$toggleBtn = _ref.toggleBtn,
        toggleBtn = _ref$toggleBtn === void 0 ? undefined : _ref$toggleBtn,
        _ref$activeClass = _ref.activeClass,
        activeClass = _ref$activeClass === void 0 ? "active" : _ref$activeClass,
        _ref$triggerAction = _ref.triggerAction,
        triggerAction = _ref$triggerAction === void 0 ? "click" : _ref$triggerAction;
      _classCallCheck(this, Accardeon);
      this.items = items, this.toggleBtn = toggleBtn, this.activeClass = activeClass, this.triggerAction = triggerAction;
    }
    _createClass(Accardeon, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.items != "" && this.items != undefined ? true : console.error(new Error("Не передан список элементов"));
        this.toggleBtn != "" && this.toggleBtn != undefined ? true : console.error(new Error("Не передан класс триггер кнопки"));
        this.items.forEach(function (element) {
          var btn = element.querySelector(_this.toggleBtn);
          btn.addEventListener(_this.triggerAction, function (e) {
            e.preventDefault();
            element.classList.toggle(_this.activeClass);
          });
        });
      }
    }]);
    return Accardeon;
  }();
  try {
    var prodAccardeon = new Accardeon({
      items: document.querySelectorAll(".item--accardeon"),
      toggleBtn: ".link",
      activeClass: "item--accardeon--active"
    });
    prodAccardeon.init();
  } catch (e) {}
});
//# sourceMappingURL=accardeon.js.map
