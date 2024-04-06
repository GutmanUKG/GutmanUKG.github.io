"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _vue = require("vue");
var _default = {
  setup: function setup() {
    var count = (0, _vue.ref)(0);
    return {
      count: count
    };
  },
  template: "\n      <button @click=\"count++\">\n        You clicked me {{ count }} times.\n      </button>"
  // Can also target an in-DOM template:
  // template: '#my-template-element'
};
exports["default"] = _default;
//# sourceMappingURL=slider_component.js.map
