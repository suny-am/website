(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new Date().getFullYear(),t={concept:0,illustration:5},n={template:`
  <div id="footer">
    <p>&copy; ${e} Calle Sandberg. All rights reserved.</p>
  </div>`},r=`transform 0.3s ease-in-out`,i=`none`,a=`translateX(0)`,o=`.png`,s=`grabbing`,c=`grab`,l=e=>`translateX(${e}px)`,u=e=>`translateX(${e*100}%)`,d=e=>`illustrations/${e}${o}`,f=class{element;isDragging;isAnimating=!1;imageSequence=[];startX;currentX;constructor({target:e,imageCount:t}){this.element=e,this.imageSequence=Array.from({length:t},(e,t)=>t),this.isDragging=!1,this.startX=0,this.currentX=0,this.element.addEventListener(`pointerdown`,e=>this.start(e)),this.element.addEventListener(`pointermove`,e=>this.move(e)),this.element.addEventListener(`pointerup`,e=>this.end(e))}start(e){this.isAnimating||(e.preventDefault(),this.isDragging=!0,this.startX=e.clientX,this.element.setPointerCapture(e.pointerId),this.element.style.cursor=s)}move(e){if(!this.isDragging)return;e.preventDefault();let t=e.clientX-this.startX;this.currentX=t,this.element.style.transform=l(this.currentX)}end(e){if(this.isDragging){if(e.preventDefault(),this.isDragging=!1,this.currentX=e.clientX-this.startX,this.element.style.cursor=c,this.element.releasePointerCapture(e.pointerId),this.currentX>50)this.handleNavigation(e,`prev`);else if(this.currentX<-50)this.handleNavigation(e,`next`);else if(this.currentX!==0){this.isAnimating=!0;let e=t=>{t.target===this.element&&t.propertyName===`transform`&&(this.element.removeEventListener(`transitionend`,e),this.element.removeEventListener(`transitioncancel`,e),this.element.style.transition=i,this.currentX=0,this.isAnimating=!1)};this.element.addEventListener(`transitionend`,e),this.element.addEventListener(`transitioncancel`,e),this.element.style.transition=r,this.element.style.transform=a}else this.element.style.transition=i,this.element.style.transform=a}}render(e){let t=e===`next`?-1:1;this.element.style.transition=r,this.element.style.transform=u(t);let n=async t=>{if(t.target!==this.element||t.propertyName!==`transform`)return;this.element.removeEventListener(`transitionend`,n);let r=this.element.querySelectorAll(`img`),o=e===`next`?this.imageSequence[2]:this.imageSequence[0];o===0&&(o=this.imageSequence.length);let s=r[e===`next`?0:r.length];if(s){s.src=d(o),e===`next`?this.element.appendChild(s):this.element.insertBefore(s,this.element.firstChild);try{this.element.style.transition=i,this.element.style.transform=a,await s.decode()}catch{}finally{this.isAnimating=!1}}else this.element.style.transition=i,this.element.style.transform=a,this.isAnimating=!1};this.element.addEventListener(`transitionend`,n),this.element.addEventListener(`transitioncancel`,n)}handleNavigation(e,t){e.preventDefault(),!this.isAnimating&&(this.isAnimating=!0,t===`prev`?this.imageSequence.unshift(this.imageSequence.pop()):this.imageSequence.push(this.imageSequence.shift()),this.render(t))}},p=(e,t,n)=>{let r=`<img class="gallery-image" src="${e}/${t}.${n}" alt="${e}">`;for(let t=0;t<2;t++){let i=`${e}/${t+1}.${n}`;r+=`<img class="gallery-image" src="${i}" alt="${e}">`}return r},m={illustration:p(`illustrations`,t.illustration,`png`),concept:p(`illustrations`,t.illustration,`png`),about:`
    <div id="about">
      <h2>A short intro</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`},h=e=>m[e]?`
    <div id="gallery-box">
      <div id="gallery-image-slider">
        ${m[e]??m.about}
      </div>
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`:m.about,g={template:`
  <div id="content">
    ${h(`illustration`)}
  </div>`,init:()=>{_=document.querySelector(`#content`),S()}},_,v,y,b,x=()=>{let e=new f({target:b,imageCount:t.illustration});[v,y].forEach(t=>{t?.removeEventListener(`click`,n=>e.handleNavigation(n,t.id===`gallery-next-button`?`next`:`prev`)),t?.addEventListener(`click`,n=>e.handleNavigation(n,t.id===`gallery-next-button`?`next`:`prev`))})},S=()=>{let e=document.location.href.split(`#`).pop();if(_)switch(e){case`concept`:_.innerHTML=h(`concept`);break;case`illustration`:_.innerHTML=h(`illustration`);break;case`about`:_.innerHTML=h(`about`),document.querySelector(`#gallery-nav`).classList.add(`hidden`);break;default:_.innerHTML=h(`illustration`)}b=document.querySelector(`#gallery-image-slider`),y=document.querySelector(`#gallery-next-button`),v=document.querySelector(`#gallery-prev-button`),x()},C={template:`
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
`,init:()=>{let e=document.querySelector(`.material-symbols-outlined`),t=document.querySelector(`#mobile-nav-links`);e?.addEventListener(`click`,()=>{t?.classList.toggle(`hidden`)}),t?.childNodes.forEach(e=>{if(e instanceof HTMLLIElement){let n=e.querySelector(`a`);n&&n.addEventListener(`click`,()=>{t?.classList.add(`hidden`)})}}),window.removeEventListener(`hashchange`,S),window.addEventListener(`hashchange`,S)}};document.querySelector(`#app`).innerHTML=`
  ${C.template}
  ${g.template}
  ${n.template}
`,C.init(),g.init();
//# sourceMappingURL=index-DH0zUnAl.js.map