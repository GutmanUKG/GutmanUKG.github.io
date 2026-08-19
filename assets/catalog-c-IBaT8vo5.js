import{i as s,a as i,b as e}from"./smart-search-oJ0TgDCD.js";s();i();e();const r=[{t:"Тормозные диски",img:"cut/disks",href:"/catalog-c-disks.html",s:"Перформанс · Платинум · Композит · Рейсинг"},{t:"Тормозные колодки",img:"cut/pads",href:"https://gerat.kz/catalog/tormoznye-kolodki/",s:"Перформанс · Платинум · Рейсинг"},{t:"Тормозные шланги",img:"cut/hoses",href:"https://gerat.kz/catalog/tormoznye-shlangy/",s:"True Bolt-On армированные тормозные шланги"},{t:"Радиаторы",img:"cut/radiators",href:"https://gerat.kz/catalog/radiatory/",s:"Стандартные, цельноалюминиевые, экстра"},{t:"Амортизаторы",img:"cut/shocks-render",href:"https://gerat.kz/catalog/shockabsorber/",s:"Перформанс · Платинум · Рейсинг"},{t:"Фильтры",img:"cut/filters",href:"https://gerat.kz/catalog/filtry/",s:"Масляные, воздушные"},{t:"Технические жидкости",img:"fluids",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/",s:"Тормозная жидкость DOT 5.1"}],a=document.getElementById("cats-grid");a&&(a.innerHTML=r.map(t=>`
    <a class="cat" href="${t.href}">
      <div class="cat-img"><img src="/img/${t.img}.webp" alt="${t.t}" loading="lazy"></div>
      <div class="cat-body">
        <h3>${t.t}</h3>
        <span>${t.s}</span>
        <em>Смотреть каталог
          <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </em>
      </div>
    </a>`).join(""));
