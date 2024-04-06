"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Получение выделенного текста с помощью анонимной самовызывающейся функции.
  function get_text() {
    var text;
    if (window.getSelection) {
      // Современный способ.
      text = window.getSelection().toString();
    } else if (document.getSelection) {
      // Старый способ.
      text = document.getSelection();
    } else if (document.selection) {
      // IE.
      text = document.selection.createRange().text;
    }

    // Вывод результата, если получен выделенный текст.
    if (text) {
      var utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.lang = "ru";
      speechSynthesis.speak(utterance);
      console.log(utterance);
    }
  }

  // Применять эту функцию к тегам, содержащим текстовую информацию.
  var p_arr = document.getElementsByTagName("p");
  var h2_arr = document.getElementsByTagName("h2");
  var span_arr = document.getElementsByTagName("span");
  var a_arr = document.getElementsByTagName("a");
  for (var i = 0; i < p_arr.length; i++) {
    p_arr[i].onmouseup = get_text;
    h2_arr[i].onmouseup = get_text;
    span_arr[i].onmouseup = get_text;
    a_arr[i].onmouseup = get_text;
  }
});
//# sourceMappingURL=speach.js.map
