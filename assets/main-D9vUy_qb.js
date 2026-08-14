import"./disc3d-DAHpv2j_.js";(function(){const N=document.getElementById("nav");addEventListener("scroll",()=>N.classList.toggle("solid",scrollY>40),{passive:!0});const y=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),y.unobserve(e.target))})},{threshold:.16});document.querySelectorAll(".reveal").forEach(t=>y.observe(t));const E=["Введите VIN, например JTMBFREV20D012345","Артикул или OEM-номер, например 43512-33130","Марка, модель, год — Toyota Camry 2019","Нажмите микрофон и назовите деталь"],n=document.getElementById("finput");document.querySelectorAll(".tab").forEach((t,e)=>{t.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(c=>c.classList.remove("on")),t.classList.add("on"),n.placeholder=E[e],e===3&&w(document.getElementById("mic1"))})});let m=null;function w(t){if(!t)return;if(t.classList.contains("rec")){L(t);return}t.classList.add("rec"),n.value="",n.placeholder="Слушаю…";const e="тормозные диски на камри 70 передние";let c=0;clearInterval(m),m=setInterval(()=>{n.value=e.slice(0,++c),c>=e.length&&(clearInterval(m),setTimeout(()=>L(t),500))},55)}function L(t){clearInterval(m),t.classList.remove("rec"),n.value||(n.placeholder=E[0])}document.getElementById("mic1").addEventListener("click",function(){w(this)});const R=[{t:"Тормозные диски",img:"disks",href:"/catalog.html",s:"PERFORMANCE · PLATINUM · COMPOSITE · RACING"},{t:"Тормозные колодки",img:"pads",href:"https://gerat.kz/catalog/tormoznye-kolodki/",s:"NORMAL · PERFORMANCE · ECE R90"},{t:"Тормозные шланги",img:"hoses",href:"https://gerat.kz/catalog/tormoznye-shlangy/",s:"Армированные тормозные линии"},{t:"Радиаторы",img:"radiators",href:"https://gerat.kz/catalog/radiatory/",s:"Ленточные, цельноалюминиевые, трубчатые"},{t:"Амортизаторы",img:"shocks",href:"https://gerat.kz/catalog/shockabsorber/",s:"Platinum · Performance"},{t:"Фильтры",img:"filters",href:"https://gerat.kz/catalog/filtry/",s:"Масляные, воздушные, салонные, топливные"},{t:"Технические жидкости",img:"fluids",href:"https://gerat.kz/catalog/tekhnicheskie_zhidkosti/",s:"Тормозная жидкость DOT 5.1"}],I=document.getElementById("cats-grid");I&&(I.innerHTML=R.map(t=>`
    <a class="cat" href="${t.href}">
      <div class="cat-img"><img src="/img/${t.img}.webp" alt="${t.t}" loading="lazy" width="900" height="700"></div>
      <div class="cat-body">
        <h3>${t.t}</h3>
        <span>${t.s}</span>
        <em>Смотреть каталог
          <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </em>
      </div>
    </a>`).join(""));const M=["Toyota","Mercedes-Benz","Volkswagen","Audi","Nissan","Mitsubishi","BMW","Hyundai","KIA","Bosch","Mann","Mahle","TRW","Textar","Denso","Delphi"],T=document.getElementById("mq");T&&(T.innerHTML=M.concat(M).map(t=>`<span>${t}</span>`).join(""));const a=document.getElementById("cbody"),l=document.getElementById("wave"),h=document.getElementById("cfaketext"),d=document.getElementById("mic2"),C=`
<div class="pcards">
  <div class="pcard sel"><div class="th"></div>
    <div class="pinfo"><b>Gerät Original GD-1245 <span class="ptag best">точно ваш</span></b>
      <small>Ø328×28 · вентилируемый · пара</small></div>
    <div class="pr"><b>68 400 ₸</b><small>на складе</small></div></div>
  <div class="pcard"><div class="th"></div>
    <div class="pinfo"><b>Gerät Sport GDS-1245P <span class="ptag pro">спорт</span></b>
      <small>Перфорация + насечка · Geomet</small></div>
    <div class="pr"><b>94 900 ₸</b><small>на складе</small></div></div>
  <div class="pcard"><div class="th pad"></div>
    <div class="pinfo"><b>Комплект: диски + колодки <span class="ptag oem">−9%</span></b>
      <small>GD-1245 + GP-880 · выгода 9%</small></div>
    <div class="pr"><b>112 300 ₸</b><small class="slow">2–3 дня</small></div></div>
</div>`,O={voice:[{who:"b",t:"Здравствуйте! Назовите машину или продиктуйте VIN — подберу деталь и проверю совместимость.",d:400},{who:"v",t:"Тормозные диски на Камри 70, передние",d:1500},{who:"b",t:"Camry XV70. Уточню: у 2.5 и 3.5 разные диски. Подскажете VIN или объём двигателя?",d:1600},{who:"u",t:"2.5, 2019 год",d:1400},{who:"b",t:'Понял: передние вентилируемые Ø328×28, суппорт 17". Три варианта под вас:',d:1700},{who:"c",t:C,d:700},{who:"u",t:"А чем Sport лучше?",d:1600},{who:"b",t:"Перфорация сбрасывает газ из-под колодки — на горячих торможениях педаль стабильнее, путь 100–0 короче примерно на 18%. Ресурс чуть ниже. Для города берите Original.",d:2200}],doc:[{who:"b",t:"Сфотографируйте техпаспорт — я сам считаю марку, модель, год и VIN. Так точнее всего.",d:500},{who:"c",t:`
<div class="upl">
  <div class="dropzone">
    <div class="di"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/></svg></div>
    <b>Снимите техпаспорт</b>
    <p>Разворот с маркой, моделью и VIN. Данные считаются автоматически — вводить ничего не нужно.</p>
    <div class="dz-acts">
      <button class="p"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/></svg>Сделать фото</button>
      <button><svg viewBox="0 0 24 24"><path d="M12 16V4M8 8l4-4 4 4M4 18v2h16v-2"/></svg>Загрузить файл</button>
    </div>
  </div>
</div>`,d:1900},{who:"u",t:"📄 tehpasport.jpg",d:900},{who:"b",t:"Читаю документ…",d:1200},{who:"c",t:`
<div class="docres">
  <div class="dh">
    <div class="thumb"></div>
    <div><b>Техпаспорт распознан</b>
      <small><svg viewBox="0 0 24 24"><path d="M5 13l4 4 10-11"/></svg>уверенность 98%</small></div>
  </div>
  <div class="docfields">
    <div><span>Марка</span><b>Toyota</b></div>
    <div><span>Модель</span><b>Camry XV70</b></div>
    <div><span>Год</span><b>2019</b></div>
    <div><span>Двигатель</span><b>2.5 (2AR-FE)</b></div>
    <div class="full"><span>VIN</span><b>JTMBFREV20D012345</b></div>
  </div>
</div>`,d:1900},{who:"b",t:"Toyota Camry XV70, 2.5, 2019. Что подбираем — диски, колодки или всё вместе?",d:1600},{who:"u",t:"Передние диски",d:1400},{who:"c",t:C,d:800},{who:"b",t:'Совместимость подтверждена по VIN — суппорт 17", Ø328×28. Ошибиться уже негде.',d:2200}]};let u=!1,r=0,p="voice";const S=document.getElementById("chat");new IntersectionObserver((t,e)=>{t.forEach(c=>{c.isIntersecting&&!u&&(u=!0,e.disconnect(),x(p))})},{threshold:.3}).observe(S);function v(){a.scrollTop=a.scrollHeight}const B=document.getElementById("cam2");function k(t){p!==t&&(p=t,u=!0,d.classList.toggle("on",t==="voice"),B.classList.toggle("on",t==="doc"),x(t))}B.addEventListener("click",()=>k("doc"));function x(t){const e=++r,c=O[t];a.innerHTML="",d.classList.remove("rec"),l.classList.remove("on"),h.style.display="";let g=0;function o(){if(e!==r)return;if(g>=c.length){setTimeout(()=>{e===r&&(a.innerHTML="",g=0,setTimeout(o,700))},7e3);return}const i=c[g++];if(i.who==="b"){const s=document.createElement("div");s.className="typing",s.innerHTML="<i></i><i></i><i></i>",a.appendChild(s),v(),setTimeout(()=>{if(e!==r)return;s.remove();const b=document.createElement("div");b.className="msg b",b.textContent=i.t,a.appendChild(b),v(),setTimeout(o,i.d)},900);return}if(i.who==="c"){const s=document.createElement("div");s.innerHTML=i.t,a.appendChild(s.firstElementChild),v(),setTimeout(o,i.d);return}if(i.who==="v"){d.classList.add("rec"),l.classList.add("on"),h.style.display="none",l.querySelectorAll("b").forEach(s=>s.style.animationDelay=(Math.random()*.7).toFixed(2)+"s"),setTimeout(()=>{if(e!==r)return;d.classList.remove("rec"),l.classList.remove("on"),h.style.display="";const s=document.createElement("div");s.className="msg u",s.innerHTML='<span class="vlab"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>ГОЛОСОМ · 0:03</span>'+i.t,a.appendChild(s),v(),setTimeout(o,i.d)},2100);return}const f=document.createElement("div");f.className="msg u",f.textContent=i.t,a.appendChild(f),v(),setTimeout(o,i.d)}o()}d.addEventListener("click",function(){if(p!=="voice"){k("voice");return}this.classList.toggle("rec"),l.classList.toggle("on"),h.style.display=this.classList.contains("rec")?"none":""}),document.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{n.value=t.textContent,n.focus()})})})();
