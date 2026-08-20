import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                       */import"./disc3d-Dd9EPsLx.js";import{D as H}from"./catalog-data-C7nhRy30.js";import{i as q,a as X,g as D,b as _}from"./smart-search-oJ0TgDCD.js";import"./RoomEnvironment-CfYJcB9I.js";const v=(p,t=document)=>t.querySelector(p),R=(p,t=document)=>[...t.querySelectorAll(p)],o=p=>String(p).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),N={Performance:"Перформанс",Platinum:"Платинум",Composite:"Композит",Racing:"Рейсинг",Normal:"Нормал"},j=p=>N[p]||p,P=p=>p.map(t=>[Math.random(),t]).sort((t,r)=>t[0]-r[0]).map(t=>t[1]);q();X();(function(){const t=v("#nav");t&&addEventListener("scroll",()=>t.classList.toggle("solid",scrollY>30),{passive:!0});const r=new IntersectionObserver(u=>{u.forEach(d=>{d.isIntersecting&&(d.target.classList.add("in"),r.unobserve(d.target))})},{threshold:.14});R(".head, .spot-copy, .stage, .num, .ocard, .band, .tiles, .tiles-more").forEach(u=>{u.classList.add("reveal"),r.observe(u)})})();(function(){const t=v("#tiles");if(!t)return;const r='<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',u=[{cls:"t-disks",tone:"light",img:"tile/disks",shot:"bleed",t:"Тормозные<br>диски",href:"/catalog-c-disks.html",s:"Перформанс · Платинум · Композит · Рейсинг"},{cls:"t-pads",tone:"dark",img:"tile/pads",shot:"full",t:"Тормозные<br>колодки",href:"https://gerat.kz/catalog/tormoznye-kolodki/",s:"Перформанс · Платинум · Рейсинг"},{cls:"t-shocks",tone:"light",img:"tile/shocks",shot:"full",t:"Амортизаторы",href:"https://gerat.kz/catalog/shockabsorber/",s:"Перформанс · Платинум · Рейсинг"},{cls:"t-rad",tone:"dark",img:"tile/radiators",shot:"bleed",t:"Радиаторы<br>охлаждения",href:"https://gerat.kz/catalog/radiatory/",s:"Стандартные, цельноалюминиевые, экстра"},{cls:"t-filters",tone:"light",img:"tile/filters",shot:"full",t:"Фильтры",href:"https://gerat.kz/catalog/filtry/",s:"Масляные, воздушные"},{cls:"t-hoses",tone:"dark",img:"tile/hoses",shot:"full",t:"Тормозные<br>шланги",href:"https://gerat.kz/catalog/tormoznye-shlangy/",s:"True Bolt-On армированные тормозные шланги"},{cls:"t-fluids",tone:"light",img:"tile/fluids",shot:"bleed",t:"Технические<br>жидкости",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/",s:"Тормозная жидкость DOT 5.1"}],d=(e,a)=>`
    <a class="tile ${e.cls}" data-tone="${e.tone}"${e.shot?` data-shot="${e.shot}"`:""} href="${o(e.href)}">
      <h3>${e.t}</h3>
      <span class="tile-sub">${o(e.s)}</span>
      <span class="tile-go">Смотреть каталог ${r}</span>
      <span class="tile-shot">
        <img src="/img/${e.img}.webp" alt=""
             ${a===0?'fetchpriority="high"':'loading="lazy"'} decoding="async">
      </span>
      <i class="tile-glow" aria-hidden="true"></i>
    </a>`,m={Platinum:{iron:"Чугун GG20HC · DIN 1691",coat:"Цинк-алюминиевое покрытие",say:"Прочность выше оригинала на 20%. Качество по ECE R90."},Performance:{iron:"Серый чугун G3000 · SAE J431",coat:"Эпоксидное покрытие",say:"100% совместимость с заводскими параметрами. Качество по ECE R90."}},h=P(H)[0],b=m[h.line]||m.Performance,x=[{kind:"card",img:"slide-bg",part:"cut/disks",t:`Gerät ${j(h.line)}`,art:h.art,sub:`Тормозной диск · ${h.pos}`,s:b.say,specs:[`Ø${h.d} × ${h.t} мм`,b.coat,b.iron],brands:h.brands.join(" · "),href:"/catalog-c-disks.html"},{kind:"cover",img:"banner-racing",t:"Тормозные диски<br>серии Рейсинг",s:"Плавающие боббинсы · хонингование «рыбья чешуя»",href:"/catalog-c-disks.html"},...P(H).slice(0,4).map(e=>({kind:"shot",img:"cut/disks",t:`Тормозные диски<br>серии ${j(e.line)}`,s:`${e.art} · Ø${e.d} × ${e.t} мм · ${e.pos} · ${e.fits} модификаций`,href:"/catalog-c-disks.html"})),{kind:"shot",img:"cut/pads",t:"Тормозные колодки<br>серии Платинум",s:"Керамический компаунд · μ 0,42 (FF) · без скрипа",href:"https://gerat.kz/catalog/tormoznye-kolodki/"},{kind:"shot",img:"cut/filters",t:"Фильтры<br>серии Перформанс",s:"Свыше 99% очистки на 30 мк по ISO 4548-12",href:"https://gerat.kz/catalog/filtry/"},{kind:"shot",img:"cut/radiators",t:"Радиаторы<br>охлаждения",s:"Цельные бачки, паяное полотно, механический шов",href:"https://gerat.kz/catalog/radiatory/"}],M=[x[0],...P(x.slice(1)).slice(0,4)];function L(e,a){const k=a===0?"":'tabindex="-1" aria-hidden="true"',w=a===0?"":'loading="lazy"',g=`<span class="bslide-shot"><img src="/img/${e.img}.webp" alt="" ${w} decoding="async"></span>`;return e.kind!=="card"?`
      <a class="bslide b-${e.kind} ${a===0?"on":""}" href="${o(e.href)}" ${k}>
        ${g}
        <span class="bslide-copy">
          <b>${e.t}</b>
          <em>${o(e.s)}</em>
          <span class="tile-go">Смотреть каталог ${r}</span>
        </span>
      </a>`:`
      <a class="bslide b-card ${a===0?"on":""}" href="${o(e.href)}" ${k}>
        ${g}
        <span class="bc-part"><img src="/img/${e.part}.webp" alt="" ${w} decoding="async"></span>
        <span class="bslide-copy bc-copy">
          <!-- слайд всегда на тёмном фоне, поэтому знак реверсный: у
               основного сегмент буквы G графитовый и здесь пропадает -->
          <img class="bc-logo" src="/img/logo-gerat-rev.png" alt="Gerät" width="480" height="135">
          <b class="bc-title">${o(e.t)}<i>${o(e.art)}</i></b>
          <span class="bc-sub">${o(e.sub)}</span>
          <em>${o(e.s)}</em>
          <span class="bc-specs">${e.specs.map($=>`<i>${o($)}</i>`).join("")}</span>
          <span class="bc-brands">${o(e.brands)}</span>
          <span class="tile-go">Смотреть карточку ${r}</span>
        </span>
      </a>`}const O=`
      <div class="bslides" id="bslides">
        ${M.map((e,a)=>L(e,a)).join("")}
      </div>
      <div class="bdots" id="bdots" role="tablist" aria-label="Слайды">
        ${M.map((e,a)=>`<button class="bdot ${a===0?"on":""}" aria-label="Слайд ${a+1}"></button>`).join("")}
      </div>`;t.innerHTML=u.map(d).join("");const T=v("#promo");T&&(T.innerHTML=O);function B(e){if(e<2)return;const a=v("#bslides"),k=R(".bdot"),w=R(".bslide");let g=0,$=null;const z=i=>{g=(i+e)%e,w.forEach((f,y)=>{const A=y===g;f.classList.toggle("on",A),f.tabIndex=A?0:-1,f.setAttribute("aria-hidden",String(!A))}),k.forEach((f,y)=>f.classList.toggle("on",y===g))};k.forEach((i,f)=>i.addEventListener("click",y=>{y.preventDefault(),z(f),c()}));const I=matchMedia("(prefers-reduced-motion: reduce)").matches||D().autoplay==="off"||D().motion==="off";function s(){I||$||($=setInterval(()=>{document.hidden||z(g+1)},5e3))}function n(){clearInterval($),$=null}function c(){n(),s()}a.addEventListener("pointerenter",n),a.addEventListener("pointerleave",s),a.addEventListener("focusin",n),a.addEventListener("focusout",s);const l=a.closest(".promo")||a;let W=0,G=0,S=!1,C=0;l.addEventListener("dragstart",i=>i.preventDefault()),l.addEventListener("pointerdown",i=>{S=!0,C=0,W=i.clientX,G=i.clientY;try{l.setPointerCapture(i.pointerId)}catch{}}),l.addEventListener("pointermove",i=>{S&&(C=Math.max(C,Math.abs(i.clientX-W)))}),l.addEventListener("pointerup",i=>{if(!S)return;S=!1;try{l.releasePointerCapture(i.pointerId)}catch{}const f=i.clientX-W,y=i.clientY-G;Math.abs(f)>45&&Math.abs(f)>Math.abs(y)&&(z(g+(f<0?1:-1)),c())}),l.addEventListener("pointercancel",()=>{S=!1}),l.addEventListener("click",i=>{C>10&&(i.preventDefault(),i.stopPropagation(),C=0)},!0),new IntersectionObserver((i,f)=>{i.forEach(y=>{y.isIntersecting&&(s(),f.disconnect())})},{threshold:.3}).observe(a)}function E(e){t.dataset.layout=e,t.parentElement&&(t.parentElement.dataset.layout=e);const a=document.querySelector(".promo-wrap");a&&(a.dataset.layout=e)}addEventListener("gerat:config",e=>E(e.detail.hero)),E(D().hero),B(M.length)})();_();(function(){const t=v("#pop-rail"),r=v("#pop-track");if(!t||!r)return;const u=[{t:"Тормозные колодки",img:"cut/pads",s:"Перформанс · Платинум · Рейсинг",href:"https://gerat.kz/catalog/tormoznye-kolodki/"},{t:"Радиаторы охлаждения",img:"cut/radiators",s:"Стандартные, цельноалюминиевые, экстра",href:"https://gerat.kz/catalog/radiatory/"},{t:"Амортизаторы",img:"cut/shocks-render",s:"Перформанс · Платинум · Рейсинг",href:"https://gerat.kz/catalog/shockabsorber/"},{t:"Фильтры",img:"cut/filters",s:"Масляные, воздушные",href:"https://gerat.kz/catalog/filtry/"},{t:"Тормозные шланги",img:"cut/hoses",s:"True Bolt-On армированные тормозные шланги",href:"https://gerat.kz/catalog/tormoznye-shlangy/"},{t:"Технические жидкости",img:"fluids",s:"Тормозная жидкость DOT 5.1",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/"}],d=P(H).slice(0,6).map(s=>({kind:"disc",d:s})),m=P(u).map(s=>({kind:"dir",x:s})),h=[];for(let s=0;s<Math.max(d.length,m.length);s++)d[s]&&h.push(d[s]),m[s]&&h.push(m[s]);r.innerHTML=h.map(s=>{if(s.kind==="disc"){const c=s.d,l=c.stock.ast+c.stock.alm;return`
      <a class="popcard" href="/catalog-c-disks.html">
        <span class="pc-shot"><img src="/img/cut/disks.webp" alt="" loading="lazy"></span>
        <span class="pc-tag">Серия ${o(j(c.line))}</span>
        <span class="pc-name">${o(c.art)}</span>
        <span class="pc-meta">Ø${c.d} × ${c.t} мм · ${o(c.pos)} · ${c.fits} модификаций</span>
        <span class="pc-bottom">
          <span class="pc-stock ${l?"ok":""}">${l?`${l} шт. на складе`:"под заказ"}</span>
          <span class="pc-go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </span>
      </a>`}const n=s.x;return`
      <a class="popcard pc-dir" href="${o(n.href)}">
        <span class="pc-shot"><img src="/img/${n.img}.webp" alt="" loading="lazy"></span>
        <span class="pc-tag">Направление</span>
        <span class="pc-name">${o(n.t)}</span>
        <span class="pc-meta">${o(n.s)}</span>
        <span class="pc-bottom">
          <span class="pc-stock">Смотреть каталог</span>
          <span class="pc-go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </span>
      </a>`}).join("");let b=!1,x=0,M=0,L=0;t.addEventListener("dragstart",s=>s.preventDefault()),t.addEventListener("pointerdown",s=>{s.pointerType!=="touch"&&(b=!0,L=0,x=s.clientX,M=t.scrollLeft,t.classList.add("dragging"),t.setPointerCapture(s.pointerId))}),t.addEventListener("pointermove",s=>{if(!b)return;const n=s.clientX-x;L=Math.max(L,Math.abs(n)),t.scrollLeft=M-n}),["pointerup","pointercancel","pointerleave"].forEach(s=>t.addEventListener(s,n=>{if(b){b=!1,t.classList.remove("dragging");try{t.releasePointerCapture(n.pointerId)}catch{}I()}})),t.addEventListener("click",s=>{L>6&&(s.preventDefault(),s.stopPropagation(),L=0)},!0);const O=()=>{const s=r.firstElementChild;if(!s)return t.clientWidth;const n=parseFloat(getComputedStyle(r).columnGap)||0;return s.getBoundingClientRect().width+n},T=()=>t.scrollWidth-t.clientWidth;let B=null;function E(s){const n=t.scrollLeft;t.classList.add("nosnap"),t.scrollTo({left:s,behavior:"smooth"}),setTimeout(()=>{t.scrollLeft===n&&(t.scrollLeft=s)},320),clearTimeout(B),B=setTimeout(()=>t.classList.remove("nosnap"),700)}function e(s){const n=t.scrollLeft+s*O();s>0&&t.scrollLeft>=T()-4?E(0):s<0&&t.scrollLeft<=4?E(T()):E(n)}v("#pnext").addEventListener("click",()=>{e(1),I()}),v("#pprev").addEventListener("click",()=>{e(-1),I()});const a=v("#pop-dots");function k(){const s=Math.max(1,Math.ceil(t.scrollWidth/t.clientWidth));a.childElementCount!==s&&(a.innerHTML=Array.from({length:s},(c,l)=>`<button class="pdot" aria-label="Страница ${l+1}"></button>`).join(""),R(".pdot",a).forEach((c,l)=>c.addEventListener("click",()=>{E(l*t.clientWidth),I()})));const n=Math.round(t.scrollLeft/t.clientWidth);R(".pdot",a).forEach((c,l)=>c.classList.toggle("on",l===n))}t.addEventListener("scroll",k,{passive:!0}),addEventListener("resize",k),k();const w=matchMedia("(prefers-reduced-motion: reduce)").matches||D().autoplay==="off"||D().motion==="off";let g=null,$=!1;function z(){w||g||(g=setInterval(()=>{!$&&!document.hidden&&e(1)},3800))}function I(){clearInterval(g),g=null,setTimeout(z,6e3)}["pointerenter","focusin","pointerdown"].forEach(s=>t.addEventListener(s,()=>$=!0)),["pointerleave","focusout","pointerup"].forEach(s=>t.addEventListener(s,()=>$=!1)),new IntersectionObserver((s,n)=>{s.forEach(c=>{c.isIntersecting&&(z(),n.disconnect())})},{threshold:.2}).observe(t)})();(function(){const t=v("#vids");if(!t)return;const r=[{id:"-bBwFeehgnE",t:"Производство тормозных дисков и колодок Gerat"},{id:"Ai_Du-8rPPM",t:"Радиаторы Gerat"}],u='<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>';t.innerHTML=r.map(d=>`
    <button class="vid" type="button" data-id="${o(d.id)}" aria-label="Смотреть: ${o(d.t)}">
      <span class="vid-shot">
        <img src="/img/video/${o(d.id)}.webp" alt="" loading="lazy" decoding="async">
        <span class="vid-play" aria-hidden="true">${u}</span>
      </span>
      <span class="vid-t">${o(d.t)}</span>
    </button>`).join(""),t.addEventListener("click",d=>{const m=d.target.closest(".vid");if(!m)return;const h=m.dataset.id,b=document.createElement("div");b.className="vid vid-on",b.innerHTML=`
      <span class="vid-shot">
        <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(h)}?autoplay=1&rel=0"
                title="${m.getAttribute("aria-label")}" allow="autoplay; encrypted-media; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
      </span>
      <span class="vid-t">${m.querySelector(".vid-t").textContent}</span>`,m.replaceWith(b)})})();(function(){const t=v("#mq");if(!t)return;const r=["Toyota","Mercedes-Benz","Volkswagen","Audi","Nissan","Mitsubishi","BMW","Hyundai","KIA","Bosch","Mann","Mahle","TRW","Textar","Denso","Delphi"];t.innerHTML=r.concat(r).map(u=>`<span>${u}</span>`).join("")})();
