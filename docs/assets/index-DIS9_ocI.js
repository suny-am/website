(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new Date().getFullYear(),t={concept:0,illustration:2},n={template:`
  <div id="footer">
    <p>&copy; ${e} Calle Sandberg. All rights reserved.</p>
  </div>`},r=(e,t,n)=>{let r=`<img class="gallery-image" src="${e}/${t}.${n}" alt="${e}">`;for(let i=0;i<t;i++){let t=`${e}/${i+1}.${n}`;r+=`<img class="gallery-image" src="${t}" alt="${e}">`}return r},i={illustration:r(`illustrations`,t.illustration,`png`),concept:r(`illustrations`,t.illustration,`png`),about:`
    <div id="about">
      <h2>A short intro</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`},a=e=>i[e]?`
    <div id="gallery-box">
      <div id="gallery-image-slider">
        ${i[e]??i.about}
      </div>
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`:i.about,o={template:`
  <div id="content">
    ${a(`illustration`)}
  </div>`,init:()=>{s=document.querySelector(`#content`),f(),h()}},s,c,l,u,d,f=()=>{d={isDragging:!1,startX:0,scrollLeft:0,deltaX:0,galleryWidth:u?.offsetWidth||0,start:e=>{e.preventDefault(),d.isDragging=!0,d.startX=e.pageX,d.scrollLeft=u?.scrollLeft||0},move:e=>{if(!d.isDragging)return;e.preventDefault();let t=e.pageX;d.deltaX=(t-d.startX)*1,u&&(u.scrollLeft=d.scrollLeft-d.deltaX,u.style.transform=`translateX(${d.deltaX}px)`,Math.abs(d.deltaX)>u.offsetWidth/40&&d.end(e))},end:e=>{e.preventDefault(),d.isDragging=!1,u&&(u.scrollLeft=d.scrollLeft,u.style.transition=`transform 0.3s ease`,u.style.transform=`translateX(0)`,setTimeout(()=>{u.style.transition=``},300),Math.abs(d.deltaX)>50&&(d.deltaX>0?c?.click():l?.click()))}},d.start=d.start.bind(d),d.move=d.move.bind(d),d.end=d.end.bind(d)},p=e=>{if(!u)return;let t=u.querySelectorAll(`.gallery-image`),n=t[0],r=t[1],i=t[t.length-1];e===`next`?(u.style.transition=`transform 0.3s ease`,u.style.transform=`translateX(-${n.offsetWidth}px)`,setTimeout(()=>{u.style.transition=``,u.style.transform=`translateX(0)`;let e=n.src===i.src?r:n;u.appendChild(e)},300)):e===`prev`&&(u.style.transition=`transform 0.3s ease`,u.style.transform=`translateX(${i.offsetWidth}px)`,setTimeout(()=>{u.style.transition=``,u.style.transform=`translateX(0)`;let e=i.src===n.src?r:i;u.insertBefore(e,n)},300))},m=()=>{[c,l].forEach(e=>{e?.removeEventListener(`click`,()=>p(e?.id===`gallery-next-button`?`next`:`prev`)),e?.addEventListener(`click`,()=>p(e?.id===`gallery-next-button`?`next`:`prev`))}),u&&(u.removeEventListener(`pointerdown`,d.start),u.removeEventListener(`pointermove`,d.move),u.removeEventListener(`pointerup`,d.end),u.removeEventListener(`pointerleave`,d.end),u.addEventListener(`pointerdown`,d.start),u.addEventListener(`pointermove`,d.move),u.addEventListener(`pointerup`,d.end),u.addEventListener(`pointerleave`,d.end))},h=()=>{let e=document.location.href.split(`#`).pop();if(s)switch(e){case`concept`:s.innerHTML=a(`concept`);break;case`illustration`:s.innerHTML=a(`illustration`);break;case`about`:s.innerHTML=a(`about`);break;default:s.innerHTML=a(`illustration`)}u=document.querySelector(`#gallery-image-slider`),l=document.querySelector(`#gallery-next-button`),c=document.querySelector(`#gallery-prev-button`),m()},g={template:`
  <div id="nav">
    <picture>
      <source srcset="logo_white.png" type="image/png" media="(prefers-color-scheme: dark)">
      <source srcset="logo.png" type="image/png" media="(prefers-color-scheme: light)">
      <img src="logo.png" alt="Logo" id="logo">
    </picture>
    <div id="mobile-nav-button">
      <span class="material-symbols-outlined">menu</span>  
    </div>
    <ul id="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#concept">Concept</a></li>
      <li><a href="#illustration">Illustration</a></li>
    </ul>
  </div>
  
    <ul id="mobile-nav-links" class="hidden">
      <li><a href="#about">About</a></li>
      <li><a href="#concept">Concept</a></li>
      <li><a href="#illustration">Illustration</a></li>
    </ul>
`,init:()=>{let e=document.querySelector(`.material-symbols-outlined`),t=document.querySelector(`#mobile-nav-links`);e?.addEventListener(`click`,()=>{t?.classList.toggle(`hidden`)}),t?.childNodes.forEach(e=>{if(e instanceof HTMLLIElement){let n=e.querySelector(`a`);n&&n.addEventListener(`click`,()=>{t?.classList.add(`hidden`)})}}),window.removeEventListener(`hashchange`,h),window.addEventListener(`hashchange`,h)}};document.querySelector(`#app`).innerHTML=`
  ${g.template}
  ${o.template}
  ${n.template}
`,g.init(),o.init();
//# sourceMappingURL=index-DIS9_ocI.js.map