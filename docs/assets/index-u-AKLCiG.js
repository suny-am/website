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
  </div>`,init:()=>{s=document.querySelector(`#content`),m(),b()}},s,c,l,u,d=[],f=0,p,m=()=>{p={isAnimating:!1,isDragging:!1,startX:0,deltaX:0,start:e=>{!u||d.length<2||p.isAnimating||(e.preventDefault(),p.isDragging=!0,p.startX=e.pageX,p.deltaX=0,u.setPointerCapture(e.pointerId))},move:e=>{if(!p.isDragging)return;e.preventDefault();let t=e.pageX;p.deltaX=t-p.startX,u&&(u.style.transform=`translateX(${p.deltaX}px)`)},end:e=>{if(p.isDragging){if(e.preventDefault(),p.isDragging=!1,u){let t=u;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId);let n=Math.min(50,t.offsetWidth/8);e.type!==`pointercancel`&&Math.abs(p.deltaX)>=n?p.deltaX>0?_(`prev`):_(`next`):(t.style.transition=`transform 0.3s ease`,t.style.transform=`translateX(0)`,setTimeout(()=>{u===t&&(t.style.transition=``)},300))}p.deltaX=0}}},p.start=p.start.bind(p),p.move=p.move.bind(p),p.end=p.end.bind(p)},h=()=>{if(!u||d.length===0)return;let e=u.querySelectorAll(`.gallery-image`);[-1,0,1].forEach((t,n)=>{let r=(f+t+d.length)%d.length,i=d[r],a=e[n];a.src=i.src,a.alt=i.alt})},g=()=>{if(!u){d=[];return}if(d=Array.from(u.querySelectorAll(`.gallery-image`)).slice(1).map(e=>({src:e.getAttribute(`src`)??``,alt:e.alt})),f=0,p.isAnimating=!1,d.length===0)return;let e=Array.from({length:3},()=>{let e=document.createElement(`img`);return e.className=`gallery-image`,e.draggable=!1,e});u.replaceChildren(...e),h()},_=e=>{if(!u||d.length<2||p.isAnimating)return;let t=u,n=t.offsetWidth;p.isAnimating=!0,t.style.transition=`transform 0.3s ease`,t.style.transform=e===`next`?`translateX(-${n}px)`:`translateX(${n}px)`;let r=0,i=()=>{if(window.clearTimeout(r),t.removeEventListener(`transitionend`,a),u!==t)return;f=(f+(e===`next`?1:-1)+d.length)%d.length;let n=t.querySelectorAll(`.gallery-image`),i=e===`next`?n[0]:n[2];t.style.transition=`none`,e===`next`?t.appendChild(i):t.insertBefore(i,n[0]),t.style.transform=`translateX(0)`;let o=(f+(e===`next`?1:-1)+d.length)%d.length,s=d[o];i.src=s.src,i.alt=s.alt,p.isAnimating=!1,requestAnimationFrame(()=>{u===t&&(t.style.transition=``)})},a=e=>{e.propertyName===`transform`&&i()};t.addEventListener(`transitionend`,a),r=window.setTimeout(i,400)},v=e=>{e.currentTarget instanceof HTMLButtonElement&&_(e.currentTarget.id===`gallery-next-button`?`next`:`prev`)},y=()=>{[c,l].forEach(e=>{e?.removeEventListener(`click`,v),e?.addEventListener(`click`,v)}),u&&(u.removeEventListener(`pointerdown`,p.start),u.removeEventListener(`pointermove`,p.move),u.removeEventListener(`pointerup`,p.end),u.removeEventListener(`pointercancel`,p.end),u.addEventListener(`pointerdown`,p.start),u.addEventListener(`pointermove`,p.move),u.addEventListener(`pointerup`,p.end),u.addEventListener(`pointercancel`,p.end))},b=()=>{let e=document.location.href.split(`#`).pop();if(s)switch(e){case`concept`:s.innerHTML=a(`concept`);break;case`illustration`:s.innerHTML=a(`illustration`);break;case`about`:s.innerHTML=a(`about`),document.querySelector(`#gallery-nav`).classList.add(`hidden`);break;default:s.innerHTML=a(`illustration`)}u=document.querySelector(`#gallery-image-slider`),l=document.querySelector(`#gallery-next-button`),c=document.querySelector(`#gallery-prev-button`),g(),y()},x={template:`
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
`,init:()=>{let e=document.querySelector(`.material-symbols-outlined`),t=document.querySelector(`#mobile-nav-links`);e?.addEventListener(`click`,()=>{t?.classList.toggle(`hidden`)}),t?.childNodes.forEach(e=>{if(e instanceof HTMLLIElement){let n=e.querySelector(`a`);n&&n.addEventListener(`click`,()=>{t?.classList.add(`hidden`)})}}),window.removeEventListener(`hashchange`,b),window.addEventListener(`hashchange`,b)}};document.querySelector(`#app`).innerHTML=`
  ${x.template}
  ${o.template}
  ${n.template}
`,x.init(),o.init();
//# sourceMappingURL=index-u-AKLCiG.js.map