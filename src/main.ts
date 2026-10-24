import { about } from "./components/about";
import { concepts } from "./components/concept-content";
import { illustrations } from "./components/illust-content";
import { GALLERY_CATEGORIES, YEAR } from "./constants";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
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
    ${illustrations}
  </div>
  <div id="footer">
    <p>&copy; ${YEAR} Calle Sandberg. All rights reserved.</p>
  </div>
`;

const content = document.querySelector("#content");

let mobileNavButton = document.querySelector(".material-symbols-outlined");
let mobileNavLinks = document.querySelector("#mobile-nav-links");
let galleryImage = document.querySelector<HTMLImageElement>("#gallery-image");
let nextButton = document.querySelector("#gallery-next-button");
let prevButton = document.querySelector("#gallery-prev-button");

const updateContent = () => {
  const category = document.location.href.split("#").pop();

  if (content) {
    switch (category) {
      case "concept":
        content.innerHTML = concepts;
        break;
      case "illustration":
        content.innerHTML = illustrations;
        break;
      case "about":
        content.innerHTML = about;
        break;
      default:
        content.innerHTML = illustrations; // Default to illustration if no category is specified
    }
  }

  mobileNavButton = document.querySelector(".material-symbols-outlined");
  mobileNavLinks = document.querySelector("#mobile-nav-links");
  galleryImage = document.querySelector<HTMLImageElement>("#gallery-image");
  nextButton = document.querySelector("#gallery-next-button");
  prevButton = document.querySelector("#gallery-prev-button");

  prevButton?.addEventListener("click", () => {
    changeImage();
  });

  nextButton?.addEventListener("click", () => {
    changeImage();
  });
};

window.addEventListener("hashchange", updateContent);

const changeImage = () => {
  let category = document.location.href.split("#").pop();

  if (!GALLERY_CATEGORIES[category!]) {
    category = "illustration";
  }

  if (!category || !GALLERY_CATEGORIES[category]) {
    return;
  }
  const currentGalleryImage = galleryImage?.src.split("/").pop()?.split(".")[0];
  if (currentGalleryImage) {
    const currentIndex = parseInt(currentGalleryImage);

    const increment = currentIndex + 1;

    const nextIndex =
      currentIndex < GALLERY_CATEGORIES[category] ? increment : 1; // Loop back to the first image
    galleryImage!.src = `illustrations/${nextIndex}.png`;
  }
};

prevButton?.addEventListener("click", () => {
  changeImage();
});

nextButton?.addEventListener("click", () => {
  changeImage();
});

mobileNavButton?.addEventListener("click", () => {
  console.debug("Mobile nav button clicked");
  mobileNavLinks?.classList.toggle("hidden");
});
