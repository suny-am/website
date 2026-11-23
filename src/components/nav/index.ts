import { mobileNavContent } from "@/components/nav/mobile-nav-content";
import { updateContent } from "../gallery";

export const nav = {
  template:
    `
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
  ` + mobileNavContent,
  init: () => {
    let mobileNavButton = document.querySelector(".material-symbols-outlined");
    let mobileNavLinks = document.querySelector("#mobile-nav-links");

    mobileNavButton?.addEventListener("click", () => {
      mobileNavLinks?.classList.toggle("hidden");
    });

    mobileNavLinks?.childNodes.forEach((link) => {
      if (link instanceof HTMLLIElement) {
        const anchor = link.querySelector("a");
        if (anchor) {
          anchor.addEventListener("click", () => {
            mobileNavLinks?.classList.add("hidden");
          });
        }
      }
    });

    window.removeEventListener("hashchange", updateContent);
    window.addEventListener("hashchange", updateContent);
  },
};
