"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var formFooter = document.querySelector(".form-footer"),
    inputs = formFooter.querySelectorAll('input[type="text"]');
  inputs.forEach(function (item) {
    item.addEventListener("focus", function () {
      clearClass(inputs, "focused");
      item.parentNode.classList.add("focused");
    });
  });
  function clearClass(items, classActive) {
    for (var i = 0; i < items.length; i++) {
      items[i].value.length <= 0 ? items[i].parentNode.classList.remove(classActive) : true;
    }
  }
});
//# sourceMappingURL=form-footer.js.map
