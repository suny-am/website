(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
    <ul id="mobile-nav-links" class="hidden">
      <li><a href="#about">About</a></li>
      <li><a href="#concept">Concept</a></li>
      <li><a href="#illustration">Illustration</a></li>
    </ul>
`,t=e+`
    <div id="about">
      <h2>About</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`,n=e+`
    <div id="gallery">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`,r=new Date().getFullYear(),i={concept:0,illustration:2},a=e+`
    <div id="gallery">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`;document.querySelector(`#app`).innerHTML=`
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
  <div id="content">
    ${a}
  </div>
  <div id="footer">
    <p>&copy; ${r} Calle Sandberg. All rights reserved.</p>
  </div>
`;var o=document.querySelector(`.material-symbols-outlined`),s=document.querySelector(`#mobile-nav-links`),c=document.querySelector(`#content`),l=document.querySelector(`#gallery-image`),u=document.querySelector(`#gallery-next-button`),d=document.querySelector(`#gallery-prev-button`);document.querySelector(`#mobile-nav-links li:nth-child(1) a`)?.addEventListener(`click`,()=>{c&&(c.innerHTML=t)}),document.querySelector(`#mobile-nav-links li:nth-child(2) a`)?.addEventListener(`click`,()=>{c&&(c.innerHTML=n)}),document.querySelector(`#mobile-nav-links li:nth-child(3) a`)?.addEventListener(`click`,()=>{c&&(c.innerHTML=a)}),window.addEventListener(`hashchange`,()=>{let e=document.location.href.split(`#`).pop();if(c)switch(e){case`concept`:c.innerHTML=n;break;case`illustration`:c.innerHTML=a;break;case`about`:c.innerHTML=t;break;default:c.innerHTML=a}l=document.querySelector(`#gallery-image`),u=document.querySelector(`#gallery-next-button`),d=document.querySelector(`#gallery-prev-button`),d?.addEventListener(`click`,()=>{f()}),u?.addEventListener(`click`,()=>{f()})});var f=()=>{let e=document.location.href.split(`#`).pop();if(i[e]||(e=`illustration`),!e||!i[e])return;let t=l?.src.split(`/`).pop()?.split(`.`)[0];if(t){let n=parseInt(t),r=n+1,a=n<i[e]?r:1;l.src=`illustrations/${a}.png`}};d?.addEventListener(`click`,()=>{f()}),u?.addEventListener(`click`,()=>{f()}),o?.addEventListener(`click`,()=>{s?.classList.toggle(`hidden`)});
//# sourceMappingURL=index-T-91TWEu.js.map