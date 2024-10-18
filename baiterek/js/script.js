'use strict';

document.addEventListener('DOMContentLoaded', function () {
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
      end: "+=".concat(items.length * 200),
      // длительность скролла зависит от количества элементов
      scrub: 1 // плавное скольжение
    }
  });
  items.forEach(function (item, index) {
    tl.fromTo(item, {
      y: 100,
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
});
//# sourceMappingURL=script.js.map
