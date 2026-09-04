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

  /* ---------- ИИ-подбор: связка вёрстки с ассистентом ----------
     Здесь только работа с DOM. Вся логика ответа — в assistant.js,
     за данными ходим одной функцией AikosAssistant.ask(). Когда
     появится вебхук, меняется только она, этот блок остаётся как есть.

     Текст ассистента ставим строго через textContent: в демо-режиме
     ответ собирается из пользовательского ввода, и подстановка HTML
     была бы дырой для XSS. */
  var aiBlock = document.getElementById('ai');
  if (aiBlock && window.AikosAssistant) {
    var aiForm   = document.getElementById('aiForm');
    var aiInput  = document.getElementById('aiInput');
    var aiSend   = document.getElementById('aiSend');
    var aiClip   = document.getElementById('aiClip');
    var aiPhoto  = document.getElementById('aiPhoto');
    var aiPanel  = document.getElementById('aiPanel');
    var aiLog    = document.getElementById('aiLog');
    var aiClose  = document.getElementById('aiClose');
    var aiOut    = document.getElementById('aiOut');
    var aiGoods  = document.getElementById('aiGoods');
    var aiEmpty  = document.getElementById('aiEmpty');
    var aiFVal   = document.getElementById('aiFilterVal');
    var aiFGo    = document.getElementById('aiFilterGo');

    var aiSession = null;      /* выдаётся ассистентом на первом ответе */
    var aiFilter  = {};        /* фильтр последнего шага — контекст диалога */
    var aiPhotoData = null;    /* dataURI прикреплённого снимка */
    var aiBusy = false;

    function el(tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    }

    function setClipLabel(attached) {
      aiClip.setAttribute('aria-label', attached
        ? 'Фото боковины прикреплено. Выбрать другое'
        : 'Прикрепить фото боковины шины');
    }

    function openPanel() {
      if (!aiPanel.hasAttribute('hidden')) return;
      aiPanel.removeAttribute('hidden');
      /* панель раскрывается в потоке и удлиняет первый экран — подводим её к глазам */
      var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      aiPanel.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
    }

    function closePanel() {
      aiPanel.setAttribute('hidden', '');
      aiInput.focus();
    }

    /* --- сообщение в переписке --- */
    function addMsg(who, text, photo) {
      var row = el('div', 'ai-msg ai-msg--' + (who === 'ai' ? 'ai' : 'me'));
      row.appendChild(el('span', 'ai-who', who === 'ai' ? 'Ассистент AIKOS' : 'Вы'));
      row.appendChild(el('p', 'ai-tx', text));
      if (photo) {
        var img = document.createElement('img');
        img.className = 'ai-photo';
        img.src = photo;
        img.alt = 'Прикреплённое фото боковины';
        img.width = 64; img.height = 64;
        row.appendChild(img);
      }
      aiLog.appendChild(row);
      aiLog.scrollTop = aiLog.scrollHeight;
      return row;
    }

    /* --- состояние «подбираю» --- */
    function addThinking() {
      var row = el('div', 'ai-msg ai-msg--ai');
      row.appendChild(el('span', 'ai-who', 'Ассистент AIKOS'));
      var box = el('div', 'ai-think');
      var mark = el('span', 'ai-mark');
      mark.setAttribute('aria-hidden', 'true');
      mark.appendChild(document.createElement('i'));
      mark.appendChild(document.createElement('i'));
      mark.appendChild(document.createElement('i'));
      box.appendChild(mark);
      box.appendChild(el('span', null, 'Подбираю по складам…'));
      row.appendChild(box);
      aiLog.appendChild(row);
      aiLog.scrollTop = aiLog.scrollHeight;
      return row;
    }

    /* --- карточка товара --- */
    function productCard(p) {
      /* Придуманные позиции помечаем прямо в карточке: цену и остаток
         у них показывать как настоящие нельзя — макет смотрит заказчик. */
      var demo = window.AikosAssistant.isDemo(p);
      var a = el('a', 'ai-card' + (demo ? ' ai-card--demo' : ''));
      a.href = p.url || '/catalog/tyres/';

      if (p.image) {
        var pic = el('span', 'pic');
        var img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name;
        img.loading = 'lazy';
        img.width = 120; img.height = 120;
        pic.appendChild(img);
        if (demo) pic.appendChild(el('span', 'ai-demo', 'пример'));
        a.appendChild(pic);
      } else {
        /* Фотографии нет: подложка с рисунком протектора. На придуманной
           позиции подпись «фото уточняется» не ставим — на плитке в 128px
           две серые пометки спорят друг с другом, а «пример» важнее. */
        var ph = el('span', 'ai-ph');
        if (demo) ph.appendChild(el('span', 'ai-demo', 'пример'));
        else ph.appendChild(el('span', null, 'фото уточняется'));
        a.appendChild(ph);
      }

      var body = el('span', 'body');
      body.appendChild(el('span', 'sz', p.size || ''));

      var nm = el('span', 'nm');
      var bnd = el('b', null, p.brand || '');
      bnd.setAttribute('translate', 'no');
      nm.appendChild(bnd);
      nm.appendChild(document.createTextNode(' ' + String(p.name || '').replace(p.brand + ' ', '')));
      body.appendChild(nm);

      /* остаток у демо-позиции не выдуман, а честно не назван */
      var st;
      if (demo) {
        st = el('span', 'st st--na', 'остаток не указан');
      } else {
        st = el('span', 'st' + (/^менее/.test(p.availability || '') ? ' low' : ''), p.availability || '');
      }
      body.appendChild(st);

      /* цену примера показываем приблизительной и приглушённой, с подписью:
         в ряду с настоящими карточками разница видна сразу */
      var pr = el('span', 'pr' + (demo ? ' pr--demo' : ''),
        (demo ? '≈ ' : '') + Number(p.price || 0).toLocaleString('ru-RU') + ' ');
      pr.appendChild(el('small', null, 'тг'));
      body.appendChild(pr);
      if (demo) body.appendChild(el('span', 'ai-cap-demo', 'цена для примера'));

      a.appendChild(body);
      return a;
    }

    /* --- применённый фильтр и выдача --- */
    function renderResult(res) {
      var f = res.filter || {};
      var hasFilter = false;
      for (var k in f) { if (Object.prototype.hasOwnProperty.call(f, k) && f[k] !== null && f[k] !== '') hasFilter = true; }

      if (!hasFilter && !(res.products && res.products.length)) return;   /* уточнение — прежнюю выдачу не трогаем */

      aiFilter = f;
      aiFVal.textContent = window.AikosAssistant.filterLabel(f) || 'Весь каталог';
      aiFGo.href = window.AikosAssistant.catalogUrl(f);

      aiGoods.textContent = '';
      var list = res.products || [];
      list.forEach(function (p) { aiGoods.appendChild(productCard(p)); });

      if (list.length) { aiGoods.hidden = false; aiEmpty.hidden = true; }
      else { aiGoods.hidden = true; aiEmpty.hidden = false; }

      aiOut.hidden = false;
    }

    /* --- отправка запроса --- */
    function send(text) {
      if (aiBusy) return;
      var msg = String(text == null ? aiInput.value : text).trim();
      var photo = aiPhotoData;

      /* пустой запрос тоже отправляем: подсказку человек должен
         услышать словами ассистента, а не увидеть как ошибку формы */
      var said = msg;
      if (!said) said = photo ? '(фото без описания)' : '(пустой запрос)';

      aiBusy = true;
      aiSend.disabled = true;
      aiPanel.setAttribute('aria-busy', 'true');
      openPanel();
      addMsg('me', said, photo);

      aiInput.value = '';
      aiPhotoData = null;
      aiPhoto.value = '';
      aiClip.classList.remove('on');
      setClipLabel(false);

      var thinking = addThinking();

      window.AikosAssistant.ask({
        message: msg,
        session_id: aiSession,
        context: { page: 'main', section: 'tyres', filter: aiFilter },
        photo: photo
      }).then(function (res) {
        thinking.parentNode && thinking.parentNode.removeChild(thinking);
        if (!res || !res.ok) {
          addMsg('ai', 'Подбор сейчас недоступен. Позвоните на 2710 — подскажем по телефону.');
          return;
        }
        aiSession = res.session_id;
        addMsg('ai', res.message);
        renderResult(res);
      })['catch'](function () {
        thinking.parentNode && thinking.parentNode.removeChild(thinking);
        addMsg('ai', 'Подбор сейчас недоступен. Позвоните на 2710 — подскажем по телефону.');
      }).then(function () {
        aiBusy = false;
        aiSend.disabled = false;
        aiPanel.removeAttribute('aria-busy');
        aiInput.focus();
      });
    }

    aiForm.addEventListener('submit', function (e) { e.preventDefault(); send(); });

    [].slice.call(aiBlock.querySelectorAll('.ai-ex')).forEach(function (b) {
      b.addEventListener('click', function () { send(b.textContent.trim()); });
    });

    aiClip.addEventListener('click', function () { aiPhoto.click(); });
    aiPhoto.addEventListener('change', function () {
      var file = aiPhoto.files && aiPhoto.files[0];
      if (!file) { aiPhotoData = null; aiClip.classList.remove('on'); setClipLabel(false); return; }
      var reader = new FileReader();
      reader.onload = function () {
        aiPhotoData = String(reader.result);
        aiClip.classList.add('on');
        setClipLabel(true);
        aiInput.focus();
      };
      reader.readAsDataURL(file);
    });

    aiClose.addEventListener('click', closePanel);
    aiBlock.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !aiPanel.hasAttribute('hidden')) { e.preventDefault(); closePanel(); }
    });
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
