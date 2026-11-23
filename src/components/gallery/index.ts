import { GALLERY_CATEGORIES } from "@/constants";

const illustrations = `
    <div id="gallery-box">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`;

const concepts = `
    <div id="gallery-box">
      <img id="gallery-image" src="illustrations/1.png" alt="Gallery Image">
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`;

export const about = `
    <div id="about">
      <h2>A short intro</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`;

export const gallery = {
  template: `
  <div id="content">
    ${illustrations}
  </div>`,
  init: () => {
    content = document.querySelector("#content");
  },
};

let content: HTMLElement | null;
let prevButton: HTMLButtonElement | null;
let nextButton: HTMLButtonElement | null;
let mobileNavButton: HTMLElement | null;
let mobileNavLinks: HTMLElement | null;
let galleryImage: HTMLImageElement | null;

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

const registerEventListeners = () => {
  [prevButton, nextButton].forEach((button) => {
    button?.removeEventListener("click", changeImage);
    button?.addEventListener("click", changeImage);
  });
};

export const updateContent = () => {
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

  registerEventListeners();
};
