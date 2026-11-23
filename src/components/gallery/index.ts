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
    updateContent();
  },
};

let content: HTMLElement | null;
let prevButton: HTMLButtonElement | null;
let nextButton: HTMLButtonElement | null;
let mobileNavButton: HTMLElement | null;
let mobileNavLinks: HTMLElement | null;
let galleryImage: HTMLImageElement | null;

const slider = {
  isDragging: false,
  startX: 0,
  scrollLeft: 0,
  start: (e: PointerEvent) => {
    e.preventDefault();
    console.debug("start", e);
    slider.isDragging = true;
    slider.startX = e.pageX;
    slider.scrollLeft = galleryImage?.scrollLeft || 0;
  },
  move: (e: PointerEvent) => {
    e.preventDefault();
    if (!slider.isDragging) return;
    console.debug("move", e);
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - slider.startX) * 3; // Adjust the multiplier for sensitivity
    if (galleryImage) {
      galleryImage.scrollLeft = slider.scrollLeft - walk;
    }
  },
  end: (e: PointerEvent) => {
    e.preventDefault();
    console.debug("end");
    slider.isDragging = false;
  },
};

slider.start = slider.start.bind(slider);
slider.move = slider.move.bind(slider);
slider.end = slider.end.bind(slider);

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

  console.debug("registerEventListeners", galleryImage);

  if (galleryImage) {
    galleryImage.removeEventListener("mousedown", slider.start);
    galleryImage.removeEventListener("mousemove", slider.move);
    galleryImage.removeEventListener("mouseup", slider.end);
    galleryImage.removeEventListener("mouseleave", slider.end);

    galleryImage.addEventListener("mousedown", slider.start);
    galleryImage.addEventListener("mousemove", slider.move);
    galleryImage.addEventListener("mouseup", slider.end);
    galleryImage.addEventListener("mouseleave", slider.end);

    // For touch devices
    galleryImage.removeEventListener("touchstart", slider.start);
    galleryImage.removeEventListener("touchmove", slider.move);
    galleryImage.removeEventListener("touchend", slider.end);

    galleryImage.addEventListener("touchstart", slider.start);
    galleryImage.addEventListener("touchmove", slider.move);
    galleryImage.addEventListener("touchend", slider.end);
  }
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
