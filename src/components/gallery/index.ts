import { GALLERY_CATEGORIES } from "@/constants";
import Slider from "./slider";

const createGalleryImages = (category: string, count: number, file: string) => {
  // NOTE: set last image in the set as the first image to create a seamless loop effect
  let images = `<img class="gallery-image" src="${category}/${count}.${file}" alt="${category}">`;
  for (let i = 0; i < 2; i++) {
    const image = `${category}/${i + 1}.${file}`;
    images += `<img class="gallery-image" src="${image}" alt="${category}">`;
  }
  return images;
};

const contentTypes: Record<string, string> = {
  illustration: createGalleryImages(
    "illustrations",
    GALLERY_CATEGORIES.illustration,
    "png",
  ),
  concept: createGalleryImages(
    "illustrations",
    GALLERY_CATEGORIES.illustration,
    "png",
  ),

  about: `
    <div id="about">
      <h2>A short intro</h2>
      <p>Welcome. Many things are happening behind the scenes... <br>I'm slowly making my way to you all. I hope it will be worth the wait.</p>
      <p> Thank you </p>
      <p> - Calle Sandberg</p>
    </div>
`,
};

const galleryContent = (content: string) =>
  contentTypes[content]
    ? `
    <div id="gallery-box">
      <div id="gallery-image-slider">
        ${contentTypes[content] ?? contentTypes.about}
      </div>
    </div>
    <div id="gallery-nav">
      <button id="gallery-prev-button"><</button>
      <button id="gallery-next-button">></button>
    </div>
`
    : contentTypes.about;

export const gallery = {
  template: `
  <div id="content">
    ${galleryContent("illustration")}
  </div>`,
  init: () => {
    content = document.querySelector("#content");
    updateContent();
  },
};

let content: HTMLElement | null;
let prevButton: HTMLButtonElement | null;
let nextButton: HTMLButtonElement | null;
let gallerySliderElem: HTMLDivElement | null;

const registerEventListeners = () => {
  const slider = new Slider({
    target: gallerySliderElem!,
    imageCount: GALLERY_CATEGORIES.illustration,
  });

  [prevButton, nextButton].forEach((button) => {
    button?.removeEventListener("click", (e) =>
      slider.handleNavigation(
        e,
        button.id === "gallery-next-button" ? "next" : "prev",
      ),
    );
    button?.addEventListener("click", (e) =>
      slider.handleNavigation(
        e,
        button.id === "gallery-next-button" ? "next" : "prev",
      ),
    );
  });
};

export const updateContent = () => {
  const category = document.location.href.split("#").pop();

  if (content) {
    switch (category) {
      case "concept":
        content.innerHTML = galleryContent("concept");
        break;
      case "illustration":
        content.innerHTML = galleryContent("illustration");
        break;
      case "about":
        content.innerHTML = galleryContent("about");
        document.querySelector("#gallery-nav")!.classList.add("hidden");
        break;
      default:
        content.innerHTML = galleryContent("illustration"); // Default to illustration if no category is specified
    }
  }

  gallerySliderElem = document.querySelector<HTMLDivElement>(
    "#gallery-image-slider",
  );
  nextButton = document.querySelector("#gallery-next-button");
  prevButton = document.querySelector("#gallery-prev-button");

  registerEventListeners();
};
