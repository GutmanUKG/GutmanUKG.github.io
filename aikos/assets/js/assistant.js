/* ============================================================
   AIKOS — ИИ-подбор. Демо-логика на фронте.

   Единственная точка входа — AikosAssistant.ask(request).
   Функция асинхронная и возвращает ответ в фиксированном контракте.
   Когда появится бэкенд, тело ask() заменяется одним fetch()
   к вебхуку — разметку и main.js трогать не придётся.

   Запрос:
     { message, session_id, context: { page, section, filter }, photo }
     photo — необязательный dataURI.

   Ответ:
     { ok, type: 'clarify'|'filter'|'answer', message, filter, products, session_id }
     Любое поле filter может отсутствовать.

   В Битриксе подключать через Asset::addJs().
   ============================================================ */
(function (global) {
  'use strict';

  /* ---------- Каталог для демонстрации ----------
     Первые пять позиций — реальные товары со страницы: названия,
     цены, артикулы и ссылки взяты из блока «Популярные товары».
     Остальные записи помечены demo:true — это временные данные,
     чтобы показать сезонные и ценовые сценарии подбора до того,
     как ответ начнёт приходить с бэкенда. У них нет фотографии:
     карточка рисует подложку с типоразмером. */
  var CATALOG = [
    {
      article: '00-00002311', brand: 'Michelin', name: 'Pilot Sport 4 SUV',
      section: 'tyres', size: '275/40 R22 108Y', width: '275', height: '40', diameter: '22',
      season: 'summer', spikes: false, suv: true, price: 189000, availability: 'менее 8 шт',
      url: '/catalog/tyres/275-40r22-pilot-sport-4-suv-108y-michelin-b-k-dr.html',
      image: 'assets/img/michelin-pilot-sport-4-suv.webp'
    },
    {
      article: '0005650480', brand: 'MAK', name: 'Panorama, black mirror',
      section: 'disks', size: '7.5J18 5×114.3 ET45', width: '', height: '', diameter: '18',
      season: '', spikes: null, suv: true, price: 73100, availability: 'более 8 шт',
      url: '/catalog/disks/disk-p-18-panorama-mak-7-5j18-5bmw114-3-et45-dia60-1-black-mirror.html',
      image: 'assets/img/disk-mak-panorama.webp'
    },
    {
      article: '00-00054041', brand: 'Ikon', name: 'Autograph Eco 3',
      section: 'tyres', size: '205/55 R16 94H', width: '205', height: '55', diameter: '16',
      season: 'summer', spikes: false, suv: false, price: 36900, availability: 'более 8 шт',
      url: '/catalog/tyres/205-55r16-autograph-eco-3-94h-ikon-b-k-dr.html',
      image: 'assets/img/ikon-autograph-eco-3.png'
    },
    {
      article: '0005660461', brand: 'Sailun', name: 'Atrezzo Elite',
      section: 'tyres', size: '215/55 R17 94V', width: '215', height: '55', diameter: '17',
      season: 'summer', spikes: false, suv: false, price: 33950, availability: 'более 8 шт',
      url: '/catalog/tyres/215-55r17-atrezzo-elite-94v-sailun-b-k-dr.html',
      image: 'assets/img/sailun-atrezzo-elite.webp'
    },
    {
      article: '00-00044636', brand: 'TOMOIL', name: 'Engine Oil 5W-40 C3, 1 л',
      section: 'oils', size: '5W-40 C3 · 1 л', width: '', height: '', diameter: '',
      season: '', spikes: null, suv: false, price: 2580, availability: 'более 8 шт',
      url: '/catalog/oils/maslo-motornoe-tomoil-engine-oil-5w-40-c3-1l.html',
      image: 'assets/img/tomoil-5w40.webp'
    },

    /* --- демо-позиции: бренды из каталога сети, цены условные --- */
    { demo: true, article: 'DEMO-1001', brand: 'Cordiant', name: 'Snow Cross 2', section: 'tyres', size: '205/55 R16 94T', width: '205', height: '55', diameter: '16', season: 'winter', spikes: true, suv: false, price: 39900, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1002', brand: 'Ikon', name: 'Nordman 8', section: 'tyres', size: '205/55 R16 94T', width: '205', height: '55', diameter: '16', season: 'winter', spikes: true, suv: false, price: 52400, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1003', brand: 'Hankook', name: 'Winter i*cept RS3', section: 'tyres', size: '205/55 R16 94H', width: '205', height: '55', diameter: '16', season: 'winter', spikes: false, suv: false, price: 46700, availability: 'менее 8 шт' },
    { demo: true, article: 'DEMO-1004', brand: 'Nokian', name: 'Hakkapeliitta R5', section: 'tyres', size: '205/55 R16 94R', width: '205', height: '55', diameter: '16', season: 'winter', spikes: false, suv: false, price: 78500, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1005', brand: 'Torero', name: 'MP-20', section: 'tyres', size: '205/55 R16 91H', width: '205', height: '55', diameter: '16', season: 'summer', spikes: false, suv: false, price: 27900, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1006', brand: 'Torero', name: 'MP-30', section: 'tyres', size: '195/65 R15 91T', width: '195', height: '65', diameter: '15', season: 'winter', spikes: true, suv: false, price: 31200, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1007', brand: 'Gislaved', name: 'Nord Frost 200', section: 'tyres', size: '215/55 R17 98T', width: '215', height: '55', diameter: '17', season: 'winter', spikes: true, suv: false, price: 61800, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1008', brand: 'Cordiant', name: 'Snow Cross 2 SUV', section: 'tyres', size: '215/65 R16 102T', width: '215', height: '65', diameter: '16', season: 'winter', spikes: true, suv: true, price: 45900, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1009', brand: 'Ikon', name: 'Autograph Ice 9 SUV', section: 'tyres', size: '225/60 R17 103T', width: '225', height: '60', diameter: '17', season: 'winter', spikes: true, suv: true, price: 84600, availability: 'менее 8 шт' },
    { demo: true, article: 'DEMO-1010', brand: 'Yokohama', name: 'Ice Guard G075', section: 'tyres', size: '225/60 R17 99Q', width: '225', height: '60', diameter: '17', season: 'winter', spikes: false, suv: true, price: 74300, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1011', brand: 'Bridgestone', name: 'Blizzak DM-V3', section: 'tyres', size: '225/65 R17 102S', width: '225', height: '65', diameter: '17', season: 'winter', spikes: false, suv: true, price: 89000, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1012', brand: 'Nokian', name: 'Hakkapeliitta 10 SUV', section: 'tyres', size: '235/60 R18 107T', width: '235', height: '60', diameter: '18', season: 'winter', spikes: true, suv: true, price: 112000, availability: 'менее 8 шт' },
    { demo: true, article: 'DEMO-1016', brand: 'Nokian', name: 'Hakkapeliitta R5', section: 'tyres', size: '215/55 R17 99R', width: '215', height: '55', diameter: '17', season: 'winter', spikes: false, suv: false, price: 86900, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1017', brand: 'Cordiant', name: 'Snow Cross 2', section: 'tyres', size: '215/55 R17 98T', width: '215', height: '55', diameter: '17', season: 'winter', spikes: true, suv: false, price: 48700, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1013', brand: 'Landsail', name: 'LS588 UHP', section: 'tyres', size: '215/55 R17 98W', width: '215', height: '55', diameter: '17', season: 'summer', spikes: false, suv: false, price: 29800, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1014', brand: 'Cordiant', name: 'All Terrain 2', section: 'tyres', size: '215/65 R16 102H', width: '215', height: '65', diameter: '16', season: 'all-season', spikes: false, suv: true, price: 42500, availability: 'более 8 шт' },
    { demo: true, article: 'DEMO-1015', brand: 'Attar', name: 'Winter Grip', section: 'tyres', size: '195/65 R15 91T', width: '195', height: '65', diameter: '15', season: 'winter', spikes: false, suv: false, price: 27400, availability: 'более 8 шт' }
  ];

  /* ---------- Города: код в ЧПУ ← варианты написания ---------- */
  var CITIES = [
    { code: 'almaty', name: 'Алматы', stems: ['алмат'] },
    { code: 'astana', name: 'Астана', stems: ['астан', 'нур-султан', 'нурсултан', 'целиноград'] },
    { code: 'aktobe', name: 'Актобе', stems: ['актоб', 'актюбинск'] },
    { code: 'atyrau', name: 'Атырау', stems: ['атырау', 'гурьев'] },
    { code: 'karaganda', name: 'Караганда', stems: ['караганд'] },
    { code: 'kokshetau', name: 'Кокшетау', stems: ['кокшетау'] },
    { code: 'kyzylorda', name: 'Кызылорда', stems: ['кызылорд', 'кзылорд'] },
    { code: 'pavlodar', name: 'Павлодар', stems: ['павлодар'] },
    { code: 'petropavlovsk', name: 'Петропавловск', stems: ['петропавл'] },
    { code: 'semey', name: 'Семей', stems: ['семей', 'семипалатинск'] },
    { code: 'stepnogorsk', name: 'Степногорск', stems: ['степногорск'] },
    { code: 'taraz', name: 'Тараз', stems: ['тараз', 'джамбул', 'жамбыл'] },
    { code: 'temirtau', name: 'Темиртау', stems: ['темиртау'] },
    { code: 'turkestan', name: 'Туркестан', stems: ['туркестан', 'туркистан'] },
    { code: 'uralsk', name: 'Уральск', stems: ['уральск', 'орал'] },
    { code: 'ust-kamenogorsk', name: 'Усть-Каменогорск', stems: ['усть-каменогорск', 'усть каменогорск', 'устькаменогорск', 'оскемен', 'ускамен'] },
    { code: 'shymkent', name: 'Шымкент', stems: ['шымкент', 'чимкент'] },
    { code: 'ekibastuz', name: 'Экибастуз', stems: ['экибастуз'] }
  ];

  /* ---------- Марки: код бренда в ЧПУ ← написание ---------- */
  var BRANDS = [
    { code: 'michelin', name: 'Michelin', stems: ['michelin', 'мишлен'] },
    { code: 'goodyear', name: 'Goodyear', stems: ['goodyear', 'гудиер', 'гудьир'] },
    { code: 'continental', name: 'Continental', stems: ['continental', 'континент'] },
    { code: 'bridgestone', name: 'Bridgestone', stems: ['bridgestone', 'бриджстоун', 'бриджстон'] },
    { code: 'pirelli', name: 'Pirelli', stems: ['pirelli', 'пирелли'] },
    { code: 'nokian', name: 'Nokian', stems: ['nokian', 'нокиан', 'хакка'] },
    { code: 'ikon', name: 'Ikon', stems: ['ikon', 'икон', 'нордман', 'nordman'] },
    { code: 'hankook', name: 'Hankook', stems: ['hankook', 'ханкук'] },
    { code: 'yokohama', name: 'Yokohama', stems: ['yokohama', 'йокогама', 'йокохама'] },
    { code: 'dunlop', name: 'Dunlop', stems: ['dunlop', 'данлоп'] },
    { code: 'kumho', name: 'Kumho', stems: ['kumho', 'кумхо'] },
    { code: 'maxxis', name: 'Maxxis', stems: ['maxxis', 'максис'] },
    { code: 'gislaved', name: 'Gislaved', stems: ['gislaved', 'гиславед'] },
    { code: 'cordiant', name: 'Cordiant', stems: ['cordiant', 'кордиант'] },
    { code: 'torero', name: 'Torero', stems: ['torero', 'тореро'] },
    { code: 'sailun', name: 'Sailun', stems: ['sailun', 'сайлун'] },
    { code: 'landsail', name: 'Landsail', stems: ['landsail', 'ландсаил'] },
    { code: 'attar', name: 'Attar', stems: ['attar', 'аттар'] }
  ];

  /* ---------- Автомобили: заводской размер для демонстрации ----------
     Настоящая таблица применимости живёт в каталоге Битрикса;
     здесь ровно столько строк, сколько нужно для показа сценария. */
  var CARS = [
    { stems: ['камри', 'camry'], name: 'Toyota Camry', width: '215', height: '55', diameter: '17', suv: false },
    { stems: ['королла', 'corolla'], name: 'Toyota Corolla', width: '205', height: '55', diameter: '16', suv: false },
    { stems: ['рав4', 'rav4', 'рав 4'], name: 'Toyota RAV4', width: '225', height: '65', diameter: '17', suv: true },
    { stems: ['ленд крузер', 'land cruiser', 'ландкрузер', 'крузак'], name: 'Toyota Land Cruiser', width: '265', height: '65', diameter: '17', suv: true },
    { stems: ['креста', 'крета', 'creta'], name: 'Hyundai Creta', width: '205', height: '60', diameter: '16', suv: true },
    { stems: ['солярис', 'solaris', 'акцент', 'accent'], name: 'Hyundai Solaris / Accent', width: '195', height: '65', diameter: '15', suv: false },
    { stems: ['туксон', 'тусан', 'tucson'], name: 'Hyundai Tucson', width: '225', height: '60', diameter: '17', suv: true },
    { stems: ['спортейдж', 'sportage'], name: 'Kia Sportage', width: '225', height: '60', diameter: '17', suv: true },
    { stems: ['рио', ' rio'], name: 'Kia Rio', width: '195', height: '65', diameter: '15', suv: false },
    { stems: ['кашкай', 'qashqai'], name: 'Nissan Qashqai', width: '215', height: '60', diameter: '17', suv: true },
    { stems: ['х-трейл', 'x-trail', 'икстрейл'], name: 'Nissan X-Trail', width: '225', height: '60', diameter: '18', suv: true },
    { stems: ['октавия', 'octavia'], name: 'Skoda Octavia', width: '205', height: '55', diameter: '16', suv: false },
    { stems: ['поло', 'polo'], name: 'Volkswagen Polo', width: '185', height: '65', diameter: '15', suv: false },
    { stems: ['нива', 'niva'], name: 'Lada Niva', width: '205', height: '70', diameter: '15', suv: true },
    { stems: ['гранта', 'granta', 'веста', 'vesta'], name: 'Lada Granta / Vesta', width: '185', height: '65', diameter: '15', suv: false },
    { stems: ['кобальт', 'cobalt', 'нексия', 'nexia'], name: 'Chevrolet Cobalt / Nexia', width: '185', height: '65', diameter: '15', suv: false },
    { stems: ['тигго', 'tiggo'], name: 'Chery Tiggo', width: '215', height: '60', diameter: '17', suv: true },
    { stems: ['кулрей', 'coolray'], name: 'Geely Coolray', width: '215', height: '55', diameter: '18', suv: true }
  ];

  var SEASON_RU = { winter: 'зимние', summer: 'летние', 'all-season': 'всесезонные' };
  var SECTION_RU = { tyres: 'Шины', disks: 'Диски', lgruz: 'Легкогрузовые', gruz: 'Грузовые', oils: 'Масла', other: 'Другое' };

  /* ============================================================
     Разбор запроса
     ============================================================ */

  function norm(s) {
    return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  }

  function has(text, list) {
    for (var i = 0; i < list.length; i++) { if (text.indexOf(list[i]) !== -1) return true; }
    return false;
  }

  /* Типоразмер: «205/55 R16», «205/55R16», «205 55 16», «205-55-16» */
  function parseSize(text) {
    var sep = '[\\/\\-x×х\\s]';
    var m = text.match(new RegExp('(\\d{3})\\s*' + sep + '\\s*(\\d{2})\\s*(?:[rр]\\s*)(\\d{2})'))
         || text.match(new RegExp('(\\d{3})\\s*' + sep + '\\s*(\\d{2})\\s*' + sep + '\\s*(\\d{2})'));
    if (m) {
      var w = +m[1], h = +m[2], d = +m[3];
      if (w >= 125 && w <= 385 && h >= 25 && h <= 90 && d >= 12 && d <= 24) {
        return { width: m[1], height: m[2], diameter: m[3] };
      }
    }
    /* только посадочный диаметр: «r17», «17 радиус», «диски на 18».
       Четырёхзначный год не подпадает: «камри 2018» сюда не попадёт.
       Границу слова  перед кириллицей не ставим: для JS кириллица —
       не \w, и «р17» или «на 18» через  никогда не совпали бы. */
    var only = text.match(/(?:^|[\s(])[rр]\s?(1[2-9]|2[0-4])\b/)
            || text.match(/\b(1[2-9]|2[0-4])\s?(?:радиус|дюйм)/)
            || text.match(/(?:^|\s)на\s(1[2-9]|2[0-4])\b/);
    if (only) return { diameter: only[1] };
    return null;
  }

  function parseSeason(text) {
    if (has(text, ['всесезон', 'all season', 'all-season', 'всепогод'])) return 'all-season';
    if (has(text, ['зим', 'шип', 'липучк', 'снег', 'гололед', 'winter', 'холод'])) return 'winter';
    if (has(text, ['лет', 'жар', 'summer'])) return 'summer';
    return null;
  }

  function parseSpikes(text) {
    if (has(text, ['без шип', 'не шип', 'нешип', 'липучк', 'фрикцион'])) return false;
    if (has(text, ['шип'])) return true;
    return null;
  }

  function findByStems(text, list) {
    for (var i = 0; i < list.length; i++) {
      if (has(text, list[i].stems)) return list[i];
    }
    return null;
  }

  /* «до 60 000», «до 60 тыс», «дешевле 50000» */
  function parsePriceMax(text) {
    var m = text.match(/(?:до|дешевле|не дороже|бюджет)\D{0,12}(\d[\d\s]{2,8})\s*(тыс|т\.р|k)?/);
    if (!m) return null;
    var value = parseInt(m[1].replace(/\s/g, ''), 10);
    if (m[2]) value *= 1000;
    if (value < 1000 || value > 3000000) return null;
    return value;
  }

  function parseSection(text) {
    if (has(text, ['диск', 'литые', 'штампов', 'колесн'])) return 'disks';
    if (has(text, ['масл', 'антифриз', '5w', '10w'])) return 'oils';
    if (has(text, ['фур', 'магистральн', 'прицеп', 'камаз', 'грузов'])) return 'gruz';
    if (has(text, ['газель', 'легкогруз', 'коммерч', 'бус'])) return 'lgruz';
    if (has(text, ['коврик'])) return 'other';
    return 'tyres';
  }

  /* ============================================================
     Подбор товаров под фильтр
     ============================================================ */

  function pickProducts(filter, opts) {
    var list = CATALOG.filter(function (p) {
      if (filter.section && p.section !== filter.section) return false;
      if (filter.width && p.width !== filter.width) return false;
      if (filter.height && p.height !== filter.height) return false;
      if (filter.diameter && p.diameter !== filter.diameter) return false;
      if (filter.season && p.season !== filter.season) return false;
      if (filter.spikes === true && p.spikes !== true) return false;
      if (filter.spikes === false && p.spikes === true) return false;
      if (filter.brand) {
        var b = null;
        for (var i = 0; i < BRANDS.length; i++) { if (BRANDS[i].code === filter.brand) b = BRANDS[i]; }
        if (b && p.brand.toLowerCase() !== b.name.toLowerCase()) return false;
      }
      if (filter.price_max && p.price > filter.price_max) return false;
      if (opts && opts.suv && !p.suv) return false;
      return true;
    });

    list.sort(function (a, b) {
      if (opts && opts.premium) return b.price - a.price;
      return a.price - b.price;
    });

    return list.slice(0, 5).map(function (p) {
      return {
        article: p.article,
        name: p.brand + ' ' + p.name,
        brand: p.brand,
        size: p.size,
        price: p.price,
        availability: p.availability,
        url: p.url || catalogUrl({
          section: p.section, width: p.width, height: p.height,
          diameter: p.diameter, season: p.season
        }),
        image: p.image || null
      };
    });
  }

  /* ============================================================
     Ссылка в каталог по боевым ЧПУ aikos.kz
     Чистая функция: используется и в ответе, и в вёрстке.

     В ссылку идут только проверенные на живом сайте сегменты:
       shirina-profilya-is-<ширина>
       vysota-profilya-is-<высота>
       posadochnyy-diametr-is-<диаметр>
       sezonnost-is-{winter|summer|all-season}
       availability-in-regions-is-<код города>

     Шипы и бренд в ссылку НЕ подставляем. У свойства «шипы» (id 163)
     ЧПУ-сегмента нет: варианты shipy-is-da / -net / -yes / -1 / -0 и
     прочие отдают 404. Значение шипов остаётся в объекте filter и
     показывается человеку в строке фильтра, но кнопка «Показать
     в каталоге» ведёт на существующий URL без него.
     ============================================================ */
  function catalogUrl(filter) {
    var f = filter || {};
    var section = f.section || 'tyres';
    var base = 'https://aikos.kz/catalog/' + section + '/';
    var seg = [];
    var tyreLike = (section === 'tyres' || section === 'lgruz' || section === 'gruz');

    if (tyreLike) {
      if (f.width) seg.push('shirina-profilya-is-' + f.width);
      if (f.height) seg.push('vysota-profilya-is-' + f.height);
    }
    if (f.diameter) seg.push('posadochnyy-diametr-is-' + f.diameter);
    if (tyreLike && f.season) seg.push('sezonnost-is-' + f.season);
    if (f.city) seg.push('availability-in-regions-is-' + f.city);

    return seg.length ? base + 'search/' + seg.join('/') + '/' : base;
  }

  /* Читаемая строка фильтра: «Шины · 205/55 R16 · зимние · Караганда» */
  function filterLabel(filter) {
    var f = filter || {};
    var parts = [];
    if (f.section) parts.push(SECTION_RU[f.section] || f.section);
    if (f.width && f.height && f.diameter) parts.push(f.width + '/' + f.height + ' R' + f.diameter);
    else if (f.diameter) parts.push('R' + f.diameter);
    if (f.season) parts.push(SEASON_RU[f.season] || f.season);
    if (f.spikes === true) parts.push('шипованные');
    if (f.spikes === false && f.season === 'winter') parts.push('без шипов');
    if (f.brand) {
      for (var i = 0; i < BRANDS.length; i++) { if (BRANDS[i].code === f.brand) parts.push(BRANDS[i].name); }
    }
    if (f.price_max) parts.push('до ' + f.price_max.toLocaleString('ru-RU') + ' тг');
    if (f.city) {
      for (var j = 0; j < CITIES.length; j++) { if (CITIES[j].code === f.city) parts.push(CITIES[j].name); }
    }
    return parts.join(' · ');
  }

  /* ============================================================
     Точка входа
     ============================================================ */

  function sid(existing) {
    return existing || ('demo-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8));
  }

  function reply(req, type, message, filter, products) {
    return {
      ok: true,
      type: type,
      message: message,
      filter: filter || {},
      products: products || [],
      session_id: sid(req && req.session_id)
    };
  }

  function think(res) {
    /* задержка вместо сетевой: показываем состояние «подбираю» */
    return new Promise(function (resolve) {
      setTimeout(function () { resolve(res); }, 420 + Math.round(Math.random() * 320));
    });
  }

  function ask(request) {
    var req = request || {};
    var raw = String(req.message == null ? '' : req.message).trim();
    var text = norm(raw);
    var ctx = req.context || {};
    var carry = ctx.filter || {};   /* фильтр предыдущего шага диалога */

    /* пустой запрос */
    if (!text && !req.photo) {
      return think(reply(req, 'clarify',
        'Напишите, что нужно: размер, сезон и город. Например: «205/55 R16 зимние в Караганде». Если размер неизвестен — назовите марку, модель и год выпуска.'));
    }

    var size = parseSize(text);
    var season = parseSeason(text);
    var spikes = parseSpikes(text);
    var city = findByStems(text, CITIES);
    var brand = findByStems(text, BRANDS);
    var car = findByStems(text, CARS);
    var priceMax = parsePriceMax(text);
    var section = parseSection(text);
    var cheap = has(text, ['подешевл', 'дешев', 'бюджет', 'недорог', 'эконом', 'поменьше денег']);
    var premium = has(text, ['подорож', 'премиум', 'получше', 'топов', 'самые лучш']);
    var suvWord = has(text, ['кроссовер', 'внедорожник', 'джип', 'паркетник', 'suv']);
    var unknownSize = has(text, ['не знаю размер', 'не знаю размера', 'не знаю какой размер', 'размер не знаю',
      'размера не знаю', 'не помню размер', 'какой размер', 'моя машина', 'мою машину', 'на машину', 'на авто']);

    /* фото боковины: до подключения распознавания отдаём фиксированный размер */
    if (req.photo && !size && !car) {
      size = { width: '205', height: '55', diameter: '16' };
      var fromPhoto = { section: 'tyres', width: '205', height: '55', diameter: '16' };
      if (season) fromPhoto.season = season;
      if (city) fromPhoto.city = city.code;
      return think(reply(req, 'filter',
        'На боковине с фотографии читается 205/55 R16. Подобрал шины этого размера — проверьте, что он совпадает с тем, что стоит на автомобиле.',
        fromPhoto, pickProducts(fromPhoto, { premium: premium })));
    }

    /* размер из марки автомобиля */
    var carNote = '';
    if (!size && car) {
      size = { width: car.width, height: car.height, diameter: car.diameter };
      carNote = 'Для ' + car.name + ' заводской размер — ' + car.width + '/' + car.height + ' R' + car.diameter + '. ';
      if (car.suv) suvWord = true;
    }

    /* Уточнения отвечают раньше, чем подхватывается контекст прошлого шага:
       иначе «не знаю размер» и набор случайных букв молча повторяли бы
       предыдущую выдачу вместо ответа на то, что человек написал. */
    if (!size && unknownSize) {
      return think(reply(req, 'clarify',
        'Размер посмотрим по автомобилю. Напишите марку, модель и год выпуска — например «Toyota Camry 2018». Или сфотографируйте боковину шины: там написано «205/55 R16».'));
    }
    if (!size && !season && spikes === null && !brand && !city && !suvWord && !priceMax && !cheap && !premium && section === 'tyres') {
      return think(reply(req, 'clarify',
        'Не понял запрос. Напишите размер — например «205/55 R16», или марку и модель автомобиля. Можно добавить сезон и город: «зимние шипованные в Караганде». Если проще голосом — единый номер 2710.'));
    }

    /* диски и масла разбираем отдельно: типоразмер шины к ним не применяем */
    if (section === 'disks' || section === 'oils' || section === 'other') {
      var other = { section: section };
      if (size && size.diameter) other.diameter = size.diameter;
      if (city) other.city = city.code;
      if (brand) other.brand = brand.code;
      if (priceMax) other.price_max = priceMax;
      var otherProducts = pickProducts(other, { premium: premium });
      return think(reply(req, 'filter',
        otherProducts.length
          ? 'Показываю ' + (SECTION_RU[section] || 'товары').toLowerCase() + ' по вашему запросу. Наличие и цена — на карточке товара.'
          : 'В этом разделе по заданным параметрам сейчас ничего не нашлось. Посмотрите весь раздел или уточните запрос.',
        other, otherProducts));
    }

    /* собираем фильтр, подхватывая параметры предыдущего шага диалога */
    var filter = { section: 'tyres' };
    if (carry.width) filter.width = carry.width;
    if (carry.height) filter.height = carry.height;
    if (carry.diameter) filter.diameter = carry.diameter;
    if (carry.season) filter.season = carry.season;
    if (carry.spikes === true || carry.spikes === false) filter.spikes = carry.spikes;
    if (carry.city) filter.city = carry.city;

    if (size) {
      if (size.width) { filter.width = size.width; filter.height = size.height; }
      else { delete filter.width; delete filter.height; }
      filter.diameter = size.diameter;
    }
    if (season) filter.season = season;
    if (spikes !== null) {
      filter.spikes = spikes;
      if (!filter.season) filter.season = 'winter';   /* шипы бывают только зимой */
    }
    if (city) filter.city = city.code;
    if (brand) filter.brand = brand.code;
    if (priceMax) filter.price_max = priceMax;

    /* Разговор про кроссовер отменяет размер, унаследованный от прошлого шага:
       человек спрашивает про другую машину, и старый типоразмер только мешает. */
    var opts = { premium: premium };
    if (suvWord) {
      opts.suv = true;
      if (!size) { delete filter.width; delete filter.height; delete filter.diameter; }
    }

    /* сезон не назван — спрашиваем, но выдачу уже показываем */
    var products = pickProducts(filter, opts);

    if (!products.length) {
      return think(reply(req, 'filter',
        'По этим параметрам в наличии сейчас ничего нет. Уберите часть условий или позвоните на 2710 — подскажем ближайшую замену и привезём из другого центра.',
        filter, []));
    }

    var msg = carNote;
    if (suvWord && !size) msg += 'Отобрал размеры для кроссоверов. Точный размер написан на боковине — с ним подберу быстрее. ';
    msg += 'Нашёл ' + products.length + ' ' + plural(products.length, ['вариант', 'варианта', 'вариантов']) + ' по запросу';
    msg += city ? ' с наличием в городе ' + city.name + '. ' : '. ';
    if (cheap) msg += 'Отсортировал от самой доступной цены. ';
    else if (premium) msg += 'Показал сначала более дорогие модели. ';
    if (!filter.season) msg += 'Скажите сезон — зимние, летние или всесезонные, — и оставлю только подходящие.';
    else if (filter.season === 'winter' && filter.spikes !== true && filter.spikes !== false) msg += 'Если нужны именно шипы — напишите, отфильтрую.';

    return think(reply(req, 'filter', msg.trim(), filter, products));
  }

  function plural(n, forms) {
    var n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return forms[0];
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
    return forms[2];
  }

  /* Признак выдуманной позиции. Живёт здесь, а не в вёрстке, чтобы
     «что считать демо-данными» было описано в одном месте.
     Артикул с префиксом DEMO- есть только у временных записей каталога:
     когда ответ начнёт приходить с бэкенда, функция вернёт false для
     всего, пометки с карточек исчезнут сами, и её можно будет удалить. */
  function isDemo(product) {
    return !!product && typeof product.article === 'string'
      && product.article.indexOf('DEMO-') === 0;
  }

  global.AikosAssistant = {
    ask: ask,                 /* единственная точка входа за данными */
    catalogUrl: catalogUrl,   /* сборка боевого ЧПУ по фильтру */
    filterLabel: filterLabel, /* человекочитаемая строка фильтра */
    isDemo: isDemo            /* позиция придумана для демонстрации */
  };
})(window);
