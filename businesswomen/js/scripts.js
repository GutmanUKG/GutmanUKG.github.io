"use strict";

document.addEventListener('DOMContentLoaded', function () {
  try {
    var clearClass = function clearClass(elements, activeClass) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(activeClass);
      }
    };

    var tabsContentListItem = document.querySelectorAll('.tabs_content_list-item'),
        tabsBtnListItem = document.querySelectorAll('.tabs_btn_list-item');
    tabsBtnListItem[0].classList.add('tabs_btn_list-item--active');
    tabsContentListItem[0].classList.add('tabs_content_list-item--active');
    tabsBtnListItem.forEach(function (item, id) {
      item.addEventListener('click', function () {
        clearClass(tabsBtnListItem, 'tabs_btn_list-item--active');
        item.classList.add('tabs_btn_list-item--active');
        clearClass(tabsContentListItem, 'tabs_content_list-item--active');
        tabsContentListItem[id].classList.add('tabs_content_list-item--active');
      });
    });
  } catch (e) {}
});
//# sourceMappingURL=scripts.js.map
