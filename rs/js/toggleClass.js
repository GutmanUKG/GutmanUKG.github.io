"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
document.addEventListener("DOMContentLoaded", function () {
  var ToggleClass = /*#__PURE__*/function () {
    function ToggleClass(_ref) {
      var btn = _ref.btn,
        _ref$listener = _ref.listener,
        listener = _ref$listener === void 0 ? "click" : _ref$listener,
        element = _ref.element,
        btnClose = _ref.btnClose,
        classActive = _ref.classActive,
        _ref$isOveraly = _ref.isOveraly,
        isOveraly = _ref$isOveraly === void 0 ? true : _ref$isOveraly;
      _classCallCheck(this, ToggleClass);
      this.btn = document.querySelector(btn);
      this.listener = listener;
      this.element = document.querySelector(element);
      this.btnClose = btnClose;
      this.classActive = classActive;
      this.isOveraly = isOveraly;
    }
    _createClass(ToggleClass, [{
      key: "init",
      value: function init() {
        var _this = this;
        var btnCloseElement = this.element.querySelector(this.btnClose);
        var overlay = document.querySelector(".overlay");
        this.btn.addEventListener(this.listener, function (e) {
          e.preventDefault();
          _this.element.classList.add(_this.classActive);
          _this.isOveraly ? overlay.classList.add("active") : false;
          document.body.style.overflow = "hidden";
        });
        btnCloseElement.addEventListener(this.listener, function (e) {
          e.preventDefault();
          _this.element.classList.remove(_this.classActive);
          _this.isOveraly ? overlay.classList.remove("active") : false;
          document.body.style.overflow = "";
        });
      }
    }]);
    return ToggleClass;
  }();
  try {
    var mainForm = new ToggleClass({
      btn: "#btn-trigger_main_form",
      element: "#main_form",
      btnClose: ".close",
      classActive: "active"
    });
    mainForm.init();
  } catch (e) {}
});
//# sourceMappingURL=toggleClass.js.map
