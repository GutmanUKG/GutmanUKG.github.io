import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                       */import"./disc3d-Dd9EPsLx.js";import{D as C}from"./catalog-data-C7nhRy30.js";import{i as B,a as H,g as M,b as q}from"./smart-search-CoS21Tyt.js";import"./RoomEnvironment-CfYJcB9I.js";const h=(l,t=document)=>t.querySelector(l),I=(l,t=document)=>[...t.querySelectorAll(l)],i=l=>String(l).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),A={Performance:"Перформанс",Platinum:"Платинум",Composite:"Композит",Racing:"Рейсинг",Normal:"Нормал"},D=l=>A[l]||l,w=l=>l.map(t=>[Math.random(),t]).sort((t,r)=>t[0]-r[0]).map(t=>t[1]);B();H();(function(){const t=h("#nav");t&&addEventListener("scroll",()=>t.classList.toggle("solid",scrollY>30),{passive:!0});const r=new IntersectionObserver(p=>{p.forEach(g=>{g.isIntersecting&&(g.target.classList.add("in"),r.unobserve(g.target))})},{threshold:.14});I(".head, .spot-copy, .stage, .num, .ocard, .band, .tiles, .tiles-more").forEach(p=>{p.classList.add("reveal"),r.observe(p)})})();(function(){const t=h("#tiles");if(!t)return;const r='<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',p=[{cls:"t-disks",tone:"light",img:"cut/disks",t:"Тормозные<br>диски",href:"/catalog-c-disks.html",s:"Перформанс · Платинум · Композит · Рейсинг"},{cls:"t-pads",tone:"dark",img:"cut/pads",t:"Тормозные<br>колодки",href:"https://gerat.kz/catalog/tormoznye-kolodki/",s:"Нормал · Перформанс · Платинум"},{cls:"t-shocks",tone:"light",img:"cut/shocks-render",t:"Амортизаторы",href:"https://gerat.kz/catalog/shockabsorber/",s:"Платинум · Перформанс"},{cls:"t-rad",tone:"dark",img:"cut/radiators",t:"Радиаторы<br>охлаждения",href:"https://gerat.kz/catalog/radiatory/",s:"Ленточные, цельноалюминиевые, трубчатые"},{cls:"t-filters",tone:"light",img:"cut/filters",t:"Фильтры",href:"https://gerat.kz/catalog/filtry/",s:"Масляные, воздушные, салонные, топливные"},{cls:"t-hoses",tone:"dark",img:"cut/hoses",t:"Тормозные<br>шланги",href:"https://gerat.kz/catalog/tormoznye-shlangy/",s:"Армированные тормозные линии"},{cls:"t-fluids",tone:"light",img:"fluids",t:"Технические<br>жидкости",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/",s:"Тормозная жидкость DOT 5.1"}],g=(s,a)=>`
    <a class="tile ${s.cls}" data-tone="${s.tone}" href="${i(s.href)}">
      <h3>${s.t}</h3>
      <span class="tile-sub">${i(s.s)}</span>
      <span class="tile-go">Смотреть каталог ${r}</span>
      <span class="tile-shot">
        <img src="/img/${s.img}.webp" alt=""
             ${a===0?'fetchpriority="high"':'loading="lazy"'} decoding="async">
      </span>
      <i class="tile-glow" aria-hidden="true"></i>
    </a>`,b={Platinum:{iron:"Чугун GG20HC · DIN 1691",coat:"Цинк-алюминиевое покрытие",say:"Прочность выше оригинала на 20%. Качество по ECE R90."},Performance:{iron:"Серый чугун G3000 · SAE J431",coat:"Эпоксидное покрытие",say:"100% совместимость с заводскими параметрами. Качество по ECE R90."}},d=w(C)[0],y=b[d.line]||b.Performance,E=[{kind:"card",img:"slide-bg",part:"cut/disks",t:`Gerät ${D(d.line)}`,art:d.art,sub:`Тормозной диск · ${d.pos}`,s:y.say,specs:[`Ø${d.d} × ${d.t} мм`,y.coat,y.iron],brands:d.brands.join(" · "),href:"/catalog-c-disks.html"},{kind:"cover",img:"banner-racing",t:"Тормозные диски<br>серии Рейсинг",s:"Плавающие боббинсы · хонингование «рыбья чешуя»",href:"/catalog-c-disks.html"},...w(C).slice(0,4).map(s=>({kind:"shot",img:"cut/disks",t:`Тормозные диски<br>серии ${D(s.line)}`,s:`${s.art} · Ø${s.d} × ${s.t} мм · ${s.pos} · ${s.fits} модификаций`,href:"/catalog-c-disks.html"})),{kind:"shot",img:"cut/pads",t:"Тормозные колодки<br>серии Платинум",s:"Керамический компаунд · μ 0,42 (FF) · без скрипа",href:"https://gerat.kz/catalog/tormoznye-kolodki/"},{kind:"shot",img:"cut/filters",t:"Фильтры<br>серии Перформанс",s:"Свыше 99% очистки на 30 мк по ISO 4548-12",href:"https://gerat.kz/catalog/filtry/"},{kind:"shot",img:"cut/radiators",t:"Радиаторы<br>охлаждения",s:"Цельные бачки, паяное полотно, механический шов",href:"https://gerat.kz/catalog/radiatory/"}],m=[E[0],...w(E.slice(1)).slice(0,4)];function k(s,a){const e=a===0?"":'tabindex="-1" aria-hidden="true"',n=a===0?"":'loading="lazy"',o=`<span class="bslide-shot"><img src="/img/${s.img}.webp" alt="" ${n} decoding="async"></span>`;return s.kind!=="card"?`
      <a class="bslide b-${s.kind} ${a===0?"on":""}" href="${i(s.href)}" ${e}>
        ${o}
        <span class="bslide-copy">
          <b>${s.t}</b>
          <em>${i(s.s)}</em>
          <span class="tile-go">Смотреть каталог ${r}</span>
        </span>
      </a>`:`
      <a class="bslide b-card ${a===0?"on":""}" href="${i(s.href)}" ${e}>
        ${o}
        <span class="bc-part"><img src="/img/${s.part}.webp" alt="" ${n} decoding="async"></span>
        <span class="bslide-copy bc-copy">
          <img class="bc-logo" src="/img/logo-gerat.png" alt="Gerät" width="480" height="135">
          <b class="bc-title">${i(s.t)}<i>${i(s.art)}</i></b>
          <span class="bc-sub">${i(s.sub)}</span>
          <em>${i(s.s)}</em>
          <span class="bc-specs">${s.specs.map(c=>`<i>${i(c)}</i>`).join("")}</span>
          <span class="bc-brands">${i(s.brands)}</span>
          <span class="tile-go">Смотреть карточку ${r}</span>
        </span>
      </a>`}const L=`
      <div class="bslides" id="bslides">
        ${m.map((s,a)=>k(s,a)).join("")}
      </div>
      <div class="bdots" id="bdots" role="tablist" aria-label="Слайды">
        ${m.map((s,a)=>`<button class="bdot ${a===0?"on":""}" aria-label="Слайд ${a+1}"></button>`).join("")}
      </div>`;t.innerHTML=p.map(g).join("");const S=h("#promo");S&&(S.innerHTML=L);function $(s){if(s<2)return;const a=h("#bslides"),e=I(".bdot"),n=I(".bslide");let o=0,c=null;const W=z=>{o=(z+s)%s,n.forEach((f,u)=>{const R=u===o;f.classList.toggle("on",R),f.tabIndex=R?0:-1,f.setAttribute("aria-hidden",String(!R))}),e.forEach((f,u)=>f.classList.toggle("on",u===o))};e.forEach((z,f)=>z.addEventListener("click",u=>{u.preventDefault(),W(f),j()}));const O=matchMedia("(prefers-reduced-motion: reduce)").matches||M().autoplay==="off"||M().motion==="off";function T(){O||c||(c=setInterval(()=>{document.hidden||W(o+1)},5e3))}function x(){clearInterval(c),c=null}function j(){x(),T()}a.addEventListener("pointerenter",x),a.addEventListener("pointerleave",T),a.addEventListener("focusin",x),a.addEventListener("focusout",T),new IntersectionObserver((z,f)=>{z.forEach(u=>{u.isIntersecting&&(T(),f.disconnect())})},{threshold:.3}).observe(a)}function v(s){t.dataset.layout=s,t.parentElement&&(t.parentElement.dataset.layout=s);const a=document.querySelector(".promo-wrap");a&&(a.dataset.layout=s)}addEventListener("gerat:config",s=>v(s.detail.hero)),v(M().hero),$(m.length)})();q();(function(){const t=h("#pop-rail"),r=h("#pop-track");if(!t||!r)return;const p=[{t:"Тормозные колодки",img:"cut/pads",s:"Нормал · Перформанс · Платинум",href:"https://gerat.kz/catalog/tormoznye-kolodki/"},{t:"Радиаторы охлаждения",img:"cut/radiators",s:"Ленточные, цельноалюминиевые, трубчатые",href:"https://gerat.kz/catalog/radiatory/"},{t:"Амортизаторы",img:"cut/shocks-render",s:"Платинум · Перформанс",href:"https://gerat.kz/catalog/shockabsorber/"},{t:"Фильтры",img:"cut/filters",s:"Масляные, воздушные, салонные, топливные",href:"https://gerat.kz/catalog/filtry/"},{t:"Тормозные шланги",img:"cut/hoses",s:"Армированные тормозные линии",href:"https://gerat.kz/catalog/tormoznye-shlangy/"},{t:"Технические жидкости",img:"fluids",s:"Тормозная жидкость DOT 5.1",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/"}],g=w(C).slice(0,6).map(e=>({kind:"disc",d:e})),b=w(p).map(e=>({kind:"dir",x:e})),d=[];for(let e=0;e<Math.max(g.length,b.length);e++)g[e]&&d.push(g[e]),b[e]&&d.push(b[e]);r.innerHTML=d.map(e=>{if(e.kind==="disc"){const o=e.d,c=o.stock.ast+o.stock.alm;return`
      <a class="popcard" href="/catalog-c-disks.html">
        <span class="pc-shot"><img src="/img/cut/disks.webp" alt="" loading="lazy"></span>
        <span class="pc-tag">Серия ${i(D(o.line))}</span>
        <span class="pc-name">${i(o.art)}</span>
        <span class="pc-meta">Ø${o.d} × ${o.t} мм · ${i(o.pos)} · ${o.fits} модификаций</span>
        <span class="pc-bottom">
          <span class="pc-stock ${c?"ok":""}">${c?`${c} шт. на складе`:"под заказ"}</span>
          <span class="pc-go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </span>
      </a>`}const n=e.x;return`
      <a class="popcard pc-dir" href="${i(n.href)}">
        <span class="pc-shot"><img src="/img/${n.img}.webp" alt="" loading="lazy"></span>
        <span class="pc-tag">Направление</span>
        <span class="pc-name">${i(n.t)}</span>
        <span class="pc-meta">${i(n.s)}</span>
        <span class="pc-bottom">
          <span class="pc-stock">Смотреть каталог</span>
          <span class="pc-go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </span>
      </a>`}).join("");const y=()=>{const e=r.firstElementChild;if(!e)return t.clientWidth;const n=parseFloat(getComputedStyle(r).columnGap)||0;return e.getBoundingClientRect().width+n},E=()=>t.scrollWidth-t.clientWidth;function m(e){const n=t.scrollLeft+e*y();e>0&&t.scrollLeft>=E()-4?t.scrollTo({left:0,behavior:"smooth"}):e<0&&t.scrollLeft<=4?t.scrollTo({left:E(),behavior:"smooth"}):t.scrollTo({left:n,behavior:"smooth"})}h("#pnext").addEventListener("click",()=>{m(1),a()}),h("#pprev").addEventListener("click",()=>{m(-1),a()});const k=h("#pop-dots");function L(){const e=Math.max(1,Math.ceil(t.scrollWidth/t.clientWidth));k.childElementCount!==e&&(k.innerHTML=Array.from({length:e},(o,c)=>`<button class="pdot" aria-label="Страница ${c+1}"></button>`).join(""),I(".pdot",k).forEach((o,c)=>o.addEventListener("click",()=>{t.scrollTo({left:c*t.clientWidth,behavior:"smooth"}),a()})));const n=Math.round(t.scrollLeft/t.clientWidth);I(".pdot",k).forEach((o,c)=>o.classList.toggle("on",c===n))}t.addEventListener("scroll",L,{passive:!0}),addEventListener("resize",L),L();const S=matchMedia("(prefers-reduced-motion: reduce)").matches||M().autoplay==="off"||M().motion==="off";let $=null,v=!1;function s(){S||$||($=setInterval(()=>{!v&&!document.hidden&&m(1)},3800))}function a(){clearInterval($),$=null,setTimeout(s,6e3)}["pointerenter","focusin","pointerdown"].forEach(e=>t.addEventListener(e,()=>v=!0)),["pointerleave","focusout","pointerup"].forEach(e=>t.addEventListener(e,()=>v=!1)),new IntersectionObserver((e,n)=>{e.forEach(o=>{o.isIntersecting&&(s(),n.disconnect())})},{threshold:.2}).observe(t)})();(function(){const t=h("#mq");if(!t)return;const r=["Toyota","Mercedes-Benz","Volkswagen","Audi","Nissan","Mitsubishi","BMW","Hyundai","KIA","Bosch","Mann","Mahle","TRW","Textar","Denso","Delphi"];t.innerHTML=r.concat(r).map(p=>`<span>${p}</span>`).join("")})();
