/* ============================================================
   AIKOS — скрипты главной. Чистый JS, без зависимостей.
   В Битриксе подключать через Asset::addJs().
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Табы подбора ---------- */
  var finder = document.getElementById('finder');
  if (finder) {
    var tabs = [].slice.call(finder.querySelectorAll('[role="tab"]'));
    var panes = [].slice.call(finder.querySelectorAll('.fpane'));
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x, j) { x.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
        panes.forEach(function (p, j) {
          p.classList.toggle('on', j === i);
          if (j === i) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
        });
      });
    });
  }

  /* ---------- Чипы сезона и флагов + живой ЧПУ ---------- */
  var chips = [].slice.call(document.querySelectorAll('#pane-p .chip'));
  var selW = document.getElementById('w');
  var selH = document.getElementById('h');
  var selD = document.getElementById('d');
  var goTyres = document.getElementById('goTyres');

  function buildUrl() {
    if (!goTyres) return;
    var parts = ['/catalog/tyres/search'];
    if (selW && selW.value !== 'Все') parts.push('shirina-profilya-is-' + selW.value);
    if (selH && selH.value !== 'Все') parts.push('vysota-profilya-is-' + selH.value);
    if (selD && selD.value !== 'Все') parts.push('posadochnyy-diametr-is-' + selD.value);
    var season = document.querySelector('#pane-p .chip.on[data-season]');
    if (season && season.getAttribute('data-season')) parts.push('sezonnost-is-' + season.getAttribute('data-season'));
    goTyres.setAttribute('href', parts.join('/') + '/');
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      if (c.hasAttribute('data-season')) {
        chips.forEach(function (x) { if (x.hasAttribute('data-season')) x.classList.remove('on'); });
        c.classList.add('on');
      } else {
        c.classList.toggle('on');
      }
      buildUrl();
    });
  });
  [selW, selH, selD].forEach(function (s) { if (s) s.addEventListener('change', buildUrl); });
  buildUrl();

  /* ---------- Спотлайт: карусель популярных товаров ----------
     Всё движение описано в CSS. JS только переставляет классы,
     подкладывает следующий градиент и держит в курсе точки и превью.

     Шаг автопрокрутки снимается с события animationend заливки
     активной точки. Благодаря этому пауза при наведении, пауза при
     фокусе внутри блока и остановка за пределами экрана решаются
     одним CSS (animation-play-state), а не вторым таймером в JS —
     рассинхрону взяться неоткуда. При prefers-reduced-motion
     анимации нет вовсе, значит нет и автопрокрутки: листаем руками. */
  var spot = document.getElementById('spotlight');
  if (spot) {
    var stage   = spot.querySelector('.spot-stage');
    var slides  = [].slice.call(stage.querySelectorAll('.spot'));
    var bgLay   = [].slice.call(document.getElementById('spBg').children);
    var dotsBox = document.getElementById('spDots');
    var peek    = document.getElementById('spPeek');
    var cur = 0, pendingGrad = null, gradTimer = null, outTimer = null;

    function gradOf(i) {
      return getComputedStyle(slides[i]).getPropertyValue('--grad').trim();
    }

    /* --- фон: нижний слой держит текущий цвет, верхний наплывает поверх.
           Так между слайдами нет провала в прозрачность, как было бы
           при встречном затухании двух равноправных слоёв. --- */
    /* Состояния переключаем через принудительный reflow, а не requestAnimationFrame:
       в фоновой вкладке rAF не вызывается, и переход бы «залипал». */
    function commitGrad() {
      if (pendingGrad === null) return;
      bgLay[0].style.backgroundImage = pendingGrad;
      bgLay[1].style.transition = 'none';
      bgLay[1].classList.remove('on');
      void bgLay[1].offsetWidth;          /* opacity:0 фиксируем без перехода */
      bgLay[1].style.transition = '';
      pendingGrad = null;
    }
    function setGrad(g) {
      commitGrad();                       /* добиваем незаконченный переход */
      pendingGrad = g;
      bgLay[1].style.backgroundImage = g;
      void bgLay[1].offsetWidth;
      bgLay[1].classList.add('on');
      clearTimeout(gradTimer);
      gradTimer = setTimeout(commitGrad, 900);
    }

    /* --- точки --- */
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Товар ' + (i + 1) + ' из ' + slides.length);
      b.appendChild(document.createElement('i'));
      b.addEventListener('click', function () { show(i, i > cur ? 1 : -1); });
      dotsBox.appendChild(b);
    });
    var dots = [].slice.call(dotsBox.children);

    function paintPeek() {
      var nx    = slides[(cur + 1) % slides.length];
      var title = nx.querySelector('.spot-txt h3').textContent;
      var img   = nx.querySelector('.spot-pic img');
      peek.querySelector('b').textContent = title;
      peek.querySelector('img').src = img.getAttribute('src');
      peek.querySelector('img').alt = '';
    }

    function show(i, dir) {
      var n = (i + slides.length) % slides.length;
      if (n === cur) return;

      /* Направление входа: вперёд — справа, назад — слева.
         Ставим --dir и тут же прогоняем reflow: скрытые слайды должны
         успеть встать на нужную сторону ДО того, как появится .on.
         Иначе точкой отсчёта для перехода останется прошлое направление
         и слайд въедет не с той стороны. */
      spot.style.setProperty('--dir', dir < 0 ? '-1' : '1');
      void spot.offsetWidth;

      clearTimeout(outTimer);
      slides.forEach(function (s) { s.classList.remove('out'); });

      var leaving = slides[cur];
      leaving.classList.remove('on');
      leaving.classList.add('out');
      outTimer = setTimeout(function () { leaving.classList.remove('out'); }, 400);

      cur = n;
      slides[cur].classList.add('on');
      setGrad(gradOf(cur));

      dots.forEach(function (d, j) {
        d.classList.toggle('on', j === cur);
        if (j === cur) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
      paintPeek();
    }

    /* стартовое состояние */
    bgLay[0].style.backgroundImage = gradOf(0);
    dots[0].classList.add('on');
    dots[0].setAttribute('aria-current', 'true');
    paintPeek();

    document.getElementById('spNext').addEventListener('click', function () { show(cur + 1, 1); });
    document.getElementById('spPrev').addEventListener('click', function () { show(cur - 1, -1); });
    peek.addEventListener('click', function () { show(cur + 1, 1); });

    spot.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, -1); }
    });

    /* шаг автопрокрутки = конец заливки активной точки */
    dotsBox.addEventListener('animationend', function (e) {
      if (e.animationName === 'spotFill') show(cur + 1, 1);
    });

    /* За экраном и в скрытой вкладке карусель стоит. Начальное значение
       берём у документа, а не с false: страницу могли открыть в фоновой
       вкладке — тогда события visibilitychange уже не будет, а отсчёт
       автопрокрутки успеет уйти вперёд и при возврате слайд прыгнет. */
    var offScreen = false, tabHidden = document.hidden;
    function syncPause() { spot.classList.toggle('paused', offScreen || tabHidden); }
    syncPause();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        offScreen = !en[0].isIntersecting;
        syncPause();
      }, { threshold: 0.25 }).observe(spot);
    }
    document.addEventListener('visibilitychange', function () {
      tabHidden = document.hidden;
      syncPause();
    });

    /* выбор размера внутри слайда */
    [].slice.call(spot.querySelectorAll('.spot-sizes .row')).forEach(function (row) {
      var btns = [].slice.call(row.children);
      btns.forEach(function (b) {
        b.setAttribute('aria-pressed', b.classList.contains('on') ? 'true' : 'false');
        b.addEventListener('click', function () {
          btns.forEach(function (x) {
            x.classList.remove('on');
            x.setAttribute('aria-pressed', 'false');
          });
          b.classList.add('on');
          b.setAttribute('aria-pressed', 'true');
        });
      });
    });
  }

  /* ---------- Табы сетки товаров ---------- */
  var ptabs = [].slice.call(document.querySelectorAll('.ptabs button'));
  var cards = [].slice.call(document.querySelectorAll('#goods .card'));
  ptabs.forEach(function (t) {
    t.addEventListener('click', function () {
      ptabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
      var f = t.getAttribute('data-f');
      cards.forEach(function (c) {
        c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });

  /* ---------- Таймер акции ---------- */
  var timer = document.getElementById('timer');
  if (timer) {
    /* в Битриксе сюда придёт дата окончания акции из инфоблока */
    var end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(23, 59, 59, 0);
    var f = {
      d: timer.querySelector('[data-t="d"]'), h: timer.querySelector('[data-t="h"]'),
      m: timer.querySelector('[data-t="m"]'), s: timer.querySelector('[data-t="s"]')
    };
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var left = Math.max(0, end - new Date());
      var sec = Math.floor(left / 1000);
      f.d.textContent = pad(Math.floor(sec / 86400));
      f.h.textContent = pad(Math.floor(sec % 86400 / 3600));
      f.m.textContent = pad(Math.floor(sec % 3600 / 60));
      f.s.textContent = pad(sec % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Параллакс первого экрана ----------
     Слои сдвигаются от положения курсора и от прокрутки. Чем ближе слой
     к зрителю (data-depth больше), тем сильнее сдвиг — так и читается
     глубина. Значения догоняются линейной интерполяцией, поэтому за
     резким рывком мыши картинка идёт с инерцией, а не прыгает.

     Трогаем только transform и пишем его один раз за кадр из rAF:
     обработчики событий ничего не считают и не читают лейаут, поэтому
     нет ни layout thrashing, ни просадок на прокрутке. */
  var px = document.getElementById('heroPx');
  if (px && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var layers = [].slice.call(px.querySelectorAll('.px')).map(function (el) {
      return { el: el, d: +el.getAttribute('data-depth') || 1 };
    });
    var hero = px.parentNode;
    /* цель и текущее положение: mx, my — курсор в диапазоне -1..1, sp — прокрутка */
    var tx = 0, ty = 0, cx = 0, cy = 0, sp = 0, csp = 0;
    var visible = true, raf = 0;

    window.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (tx < -1) tx = -1; else if (tx > 1) tx = 1;
      if (ty < -1) ty = -1; else if (ty > 1) ty = 1;
    }, { passive: true });

    /* курсор ушёл со страницы — плавно возвращаем слои в исходное */
    document.addEventListener('mouseleave', function () { tx = 0; ty = 0; });

    window.addEventListener('scroll', function () {
      sp = window.pageYOffset;
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      }, { rootMargin: '100px' }).observe(hero);
    }

    function tick() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      csp += (sp - csp) * 0.12;

      for (var i = 0; i < layers.length; i++) {
        var L = layers[i], d = L.d;
        var mx = cx * d * 11;              /* горизонталь от курсора */
        var my = cy * d * 6 - csp * d * 0.045;  /* вертикаль: курсор + прокрутка */
        L.el.style.transform = 'translate3d(calc(-50% + ' + mx.toFixed(2) + 'px),' + my.toFixed(2) + 'px,0)';
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    }
    sp = window.pageYOffset; csp = sp;
    raf = requestAnimationFrame(tick);
  }

  /* ---------- Заглушки под Битрикс ---------- */
  [].slice.call(document.querySelectorAll('.buy, .spot-add')).forEach(function (b) {
    var txt = b.textContent;
    b.addEventListener('click', function () {
      b.textContent = b.classList.contains('spot-add') ? 'Добавлено' : '✓';
      setTimeout(function () { b.textContent = txt; }, 1400);
    });
  });

  /* Точка подключения выбора города: в Битриксе сюда вешается
     sale.location.selector. В прототипе обработчика намеренно нет —
     вывод в консоль в рабочий код не тащим. */
})();
