const x=`
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
</div>`,E=`
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
</div>`,T=`
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
</div>`,L={voice:[{who:"b",t:"Здравствуйте! Назовите машину или продиктуйте VIN — подберу деталь и проверю совместимость.",d:400},{who:"v",t:"Тормозные диски на Камри 70, передние",d:1500},{who:"b",t:"Camry XV70. Уточню: у 2.5 и 3.5 разные диски. Подскажете VIN или объём двигателя?",d:1600},{who:"u",t:"2.5, 2019 год",d:1400},{who:"b",t:'Понял: передние вентилируемые Ø328×28, суппорт 17". Три варианта под вас:',d:1700},{who:"c",t:x,d:700},{who:"u",t:"А чем Sport лучше?",d:1600},{who:"b",t:"Перфорация сбрасывает газ из-под колодки — на горячих торможениях педаль стабильнее, путь 100–0 короче примерно на 18%. Ресурс чуть ниже. Для города берите Original.",d:2200}],doc:[{who:"b",t:"Сфотографируйте техпаспорт — я сам считаю марку, модель, год и VIN. Так точнее всего.",d:500},{who:"c",t:E,d:1900},{who:"u",t:"📄 tehpasport.jpg",d:900},{who:"b",t:"Читаю документ…",d:1200},{who:"c",t:T,d:1900},{who:"b",t:"Toyota Camry XV70, 2.5, 2019. Что подбираем — диски, колодки или всё вместе?",d:1600},{who:"u",t:"Передние диски",d:1400},{who:"c",t:x,d:800},{who:"b",t:'Совместимость подтверждена по VIN — суппорт 17", Ø328×28. Ошибиться уже негде.',d:2200}]};function C(){const f=document.getElementById("chat"),i=document.getElementById("cbody"),t=document.getElementById("wave"),n=document.getElementById("cfaketext"),o=document.getElementById("mic2"),c=document.getElementById("cam2");if(!f||!i||!o)return;let h=!1,r=0,m="voice";const v=()=>{i.scrollTop=i.scrollHeight};new IntersectionObserver((d,l)=>{d.forEach(p=>{p.isIntersecting&&!h&&(h=!0,l.disconnect(),w(m))})},{threshold:.3}).observe(f);function y(d){m!==d&&(m=d,h=!0,o.classList.toggle("on",d==="voice"),c==null||c.classList.toggle("on",d==="doc"),w(d))}c==null||c.addEventListener("click",()=>y("doc"));function w(d){const l=++r,p=L[d];i.innerHTML="",o.classList.remove("rec"),t==null||t.classList.remove("on"),n&&(n.style.display="");let u=0;function a(){if(l!==r)return;if(u>=p.length){setTimeout(()=>{l===r&&(i.innerHTML="",u=0,setTimeout(a,700))},7e3);return}const e=p[u++];if(e.who==="b"){const s=document.createElement("div");s.className="typing",s.innerHTML="<i></i><i></i><i></i>",i.appendChild(s),v(),setTimeout(()=>{if(l!==r)return;s.remove();const g=document.createElement("div");g.className="msg b",g.textContent=e.t,i.appendChild(g),v(),setTimeout(a,e.d)},900);return}if(e.who==="c"){const s=document.createElement("div");s.innerHTML=e.t,i.appendChild(s.firstElementChild),v(),setTimeout(a,e.d);return}if(e.who==="v"){o.classList.add("rec"),t==null||t.classList.add("on"),n&&(n.style.display="none"),t==null||t.querySelectorAll("b").forEach(s=>s.style.animationDelay=(Math.random()*.7).toFixed(2)+"s"),setTimeout(()=>{if(l!==r)return;o.classList.remove("rec"),t==null||t.classList.remove("on"),n&&(n.style.display="");const s=document.createElement("div");s.className="msg u",s.innerHTML='<span class="vlab"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>ГОЛОСОМ · 0:03</span>'+e.t,i.appendChild(s),v(),setTimeout(a,e.d)},2100);return}const b=document.createElement("div");b.className="msg u",b.textContent=e.t,i.appendChild(b),v(),setTimeout(a,e.d)}a()}o.addEventListener("click",function(){if(m!=="voice"){y("voice");return}this.classList.toggle("rec"),t==null||t.classList.toggle("on"),n&&(n.style.display=this.classList.contains("rec")?"none":"")})}export{C as i};
