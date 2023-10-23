"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
document.addEventListener("DOMContentLoaded", function () {
  // const formFooter = document.querySelector(".form-footer"),
  //   inputs = formFooter.querySelectorAll('input[type="text"]');
  // inputs.forEach((item) => {
  //   item.addEventListener("focus", () => {
  //     clearClass(inputs, "focused");
  //     item.parentNode.classList.add("focused");
  //   });
  // });
  // function clearClass(items, classActive) {
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].value.length <= 0
  //       ? items[i].parentNode.classList.remove(classActive)
  //       : true;
  //   }
  // }
  var formAnimation = /*#__PURE__*/function () {
    function formAnimation(_ref) {
      var form = _ref.form;
      _classCallCheck(this, formAnimation);
      this.form = form;
    }
    _createClass(formAnimation, [{
      key: "start",
      value: function start() {
        var _this = this;
        var formWrapper = document.querySelector(this.form);
        var inputs = formWrapper.querySelectorAll('input[type="text"]');
        inputs.forEach(function (item) {
          item.addEventListener("focus", function () {
            _this.clearClass(inputs, "focused");
            item.parentNode.classList.add("focused");
          });
        });
      }
    }, {
      key: "clearClass",
      value: function clearClass(items, classActive) {
        for (var i = 0; i < items.length; i++) {
          items[i].value.length <= 0 ? items[i].parentNode.classList.remove(classActive) : true;
        }
      }
    }]);
    return formAnimation;
  }();
  try {
    var formFooter = new formAnimation({
      form: ".form-footer"
    });
    formFooter.start();
  } catch (e) {}
  try {
    var formMain = new formAnimation({
      form: ".form_main"
    });
    formMain.start();
  } catch (e) {}
});
//# sourceMappingURL=form-footer.js.map
