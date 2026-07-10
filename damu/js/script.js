(function () {
  'use strict';

  // --- Tab bar: switch active panel (single-page demo, no real navigation) ---
  var tabs = document.querySelectorAll('.tabbar__item');
  var panels = document.querySelectorAll('.tabpanel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.dataset.tab;

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        if (isActive) {
          t.setAttribute('aria-current', 'page');
        } else {
          t.removeAttribute('aria-current');
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.tabpanel !== target;
      });
    });
  });

  // --- Activate tab from URL hash on load (e.g. index.html#photo) ---
  if (location.hash) {
    var hashTab = document.querySelector('.tabbar__item[data-tab="' + location.hash.slice(1) + '"]');
    if (hashTab) hashTab.click();
  }

  // --- Reviews slider dots ---
  var dots = document.querySelectorAll('.reviews__dot');
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      dots.forEach(function (d) {
        d.classList.remove('is-active');
        d.removeAttribute('aria-selected');
      });
      dot.classList.add('is-active');
      dot.setAttribute('aria-selected', 'true');
    });
  });

  // --- Schedule table: search filter ---
  var searchInput = document.getElementById('filter-search');
  var tableRows = document.querySelectorAll('#schedule-table tbody tr');
  var countLabel = document.getElementById('filter-count');

  function applyFilter() {
    var query = (searchInput.value || '').trim().toLowerCase();
    var visibleCount = 0;

    tableRows.forEach(function (row) {
      var haystack = row.dataset.search || '';
      var addressText = row.querySelector('.cell-address');
      if (addressText) {
        haystack += ' ' + addressText.textContent.toLowerCase();
      }
      var match = query === '' || haystack.indexOf(query) !== -1;
      row.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (countLabel) {
      countLabel.textContent = visibleCount + declOfExits(visibleCount);
    }
  }

  function declOfExits(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return ' выездов';
    if (mod10 === 1) return ' выезд';
    if (mod10 >= 2 && mod10 <= 4) return ' выезда';
    return ' выездов';
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  // --- Schedule table: sort by date ---
  var sortHeader = document.querySelector('.schedule-table th.is-sortable');
  var tbody = document.querySelector('#schedule-table tbody');
  var sortAsc = true;

  if (sortHeader && tbody) {
    sortHeader.addEventListener('click', function () {
      var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));

      rows.sort(function (a, b) {
        var dateA = a.querySelector('[data-date]').dataset.date;
        var dateB = b.querySelector('[data-date]').dataset.date;
        if (dateA < dateB) return sortAsc ? -1 : 1;
        if (dateA > dateB) return sortAsc ? 1 : -1;
        return 0;
      });

      rows.forEach(function (row) { tbody.appendChild(row); });

      sortAsc = !sortAsc;
      var arrow = sortHeader.querySelector('.sort-arrow');
      if (arrow) arrow.textContent = sortAsc ? '↑' : '↓';
    });
  }

  // --- Review form: star rating ---
  var ratingStars = document.querySelectorAll('.rating__star');
  var ratingValue = document.getElementById('rf-rating-value');

  ratingStars.forEach(function (star) {
    star.addEventListener('click', function () {
      var value = Number(star.dataset.value);
      ratingStars.forEach(function (s) {
        s.classList.toggle('is-active', Number(s.dataset.value) <= value);
      });
      if (ratingValue) ratingValue.value = value;
    });
  });

  // --- Review form: submit ---
  var reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!ratingValue.value) {
        alert('Пожалуйста, поставьте оценку качества обслуживания.');
        return;
      }
      if (!reviewForm.checkValidity()) {
        reviewForm.reportValidity();
        return;
      }

      alert('Спасибо! Ваш отзыв отправлен.');
      reviewForm.reset();
      ratingStars.forEach(function (s) { s.classList.remove('is-active'); });
      ratingValue.value = '';
    });
  }
})();
