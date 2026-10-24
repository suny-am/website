(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new Date().getFullYear(),t={concept:0,illustration:2},n=`
  <div id="footer">
    <p>&copy; ${e} Calle Sandberg. All rights reserved.</p>
  </div>`,r=`
    <div id="gallery-box">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`,i=`
  <div id="content">
    ${r}
  </div>`,a=`
    <div id="about">
      <h2>A short intro</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`,o=`
    <div id="gallery-box">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`,s={content:`
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
`,init:()=>{let e=document.querySelector(`#content`),n=document.querySelector(`.material-symbols-outlined`),i=document.querySelector(`#mobile-nav-links`),s=document.querySelector(`#gallery-image`),c=document.querySelector(`#gallery-next-button`),l=document.querySelector(`#gallery-prev-button`),u=()=>{let e=document.location.href.split(`#`).pop();if(t[e]||(e=`illustration`),!e||!t[e])return;let n=s?.src.split(`/`).pop()?.split(`.`)[0];if(n){let r=parseInt(n),i=r+1,a=r<t[e]?i:1;s.src=`illustrations/${a}.png`}},d=()=>{l?.removeEventListener(`click`,()=>{u()}),c?.removeEventListener(`click`,()=>{u()}),l?.addEventListener(`click`,()=>{u()}),c?.addEventListener(`click`,()=>{u()})};d(),n?.addEventListener(`click`,()=>{i?.classList.toggle(`hidden`)}),i?.childNodes.forEach(e=>{if(e instanceof HTMLLIElement){let t=e.querySelector(`a`);t&&t.addEventListener(`click`,()=>{i?.classList.add(`hidden`)})}}),window.addEventListener(`hashchange`,()=>{let t=document.location.href.split(`#`).pop();if(e)switch(t){case`concept`:e.innerHTML=o;break;case`illustration`:e.innerHTML=r;break;case`about`:e.innerHTML=a;break;default:e.innerHTML=r}n=document.querySelector(`.material-symbols-outlined`),i=document.querySelector(`#mobile-nav-links`),s=document.querySelector(`#gallery-image`),c=document.querySelector(`#gallery-next-button`),l=document.querySelector(`#gallery-prev-button`),d()})}};document.querySelector(`#app`).innerHTML=`
  ${s.content}
  ${i}
  ${n}
`,s.init();
//# sourceMappingURL=index-Cgo7F-Je.js.map