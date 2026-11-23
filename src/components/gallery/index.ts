import { GALLERY_CATEGORIES } from "@/constants";

const createGalleryImages = (category: string, count: number, file: string) => {
  // NOTE: set last image in the set as the first image to create a seamless loop effect
  let images = `<img class="gallery-image" src="${category}/${count}.${file}" alt="${category}">`;
  for (let i = 0; i < count; i++) {
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
    initSlider();
    updateContent();
  },
};

let content: HTMLElement | null;
let prevButton: HTMLButtonElement | null;
let nextButton: HTMLButtonElement | null;
let mobileNavButton: HTMLElement | null;
let mobileNavLinks: HTMLElement | null;
let gallerySlider: HTMLImageElement | null;
let slider: {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  deltaX: number;
  galleryWidth: number;
  start: (e: PointerEvent) => void;
  move: (e: PointerEvent) => void;
  end: (e: PointerEvent) => void;
};

const initSlider = () => {
  slider = {
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    deltaX: 0,
    galleryWidth: gallerySlider?.offsetWidth || 0,
    start: (e: PointerEvent) => {
      e.preventDefault();
      slider.isDragging = true;
      slider.startX = e.pageX;
      slider.scrollLeft = gallerySlider?.scrollLeft || 0;
    },
    move: (e: PointerEvent) => {
      if (!slider.isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      slider.deltaX = (x - slider.startX) * 1; // Adjust the multiplier for sensitivity

      if (gallerySlider) {
        gallerySlider.scrollLeft = slider.scrollLeft - slider.deltaX;
        gallerySlider.style.transform = `translateX(${slider.deltaX}px)`; // Move the image
        // if  has slid far enough, force end the drag action slide in the next image in the set
        // depending on the direction of the drag

        if (Math.abs(slider.deltaX) > gallerySlider.offsetWidth / 40) {
          slider.end(e);
        }
      }
    },
    end: (e: PointerEvent) => {
      e.preventDefault();
      slider.isDragging = false;

      if (gallerySlider) {
        gallerySlider.scrollLeft = slider.scrollLeft; // Reset the scroll position
        gallerySlider.style.transition = "transform 0.3s ease"; // Smooth transition back to original position
        gallerySlider.style.transform = `translateX(0)`; // Reset the image position

        setTimeout(() => {
          gallerySlider!.style.transition = ""; // Remove the transition after it's done
        }, 300);

        // if the drag was far enough, slide to the next or previous image
        if (Math.abs(slider.deltaX) > 50) {
          console.debug(
            `Dragged ${slider.deltaX > 0 ? "right" : "left"} far enough to change image.`,
          );
          if (slider.deltaX > 0) {
            // Dragged to the right, go to previous image
            prevButton?.click();
          } else {
            // Dragged to the left, go to next image
            nextButton?.click();
          }
        }
      }
    },
  };

  slider.start = slider.start.bind(slider);
  slider.move = slider.move.bind(slider);
  slider.end = slider.end.bind(slider);
};

const moveImage = (direction: "next" | "prev") => {
  if (!gallerySlider) return;

  const images =
    gallerySlider.querySelectorAll<HTMLImageElement>(".gallery-image");
  const firstImage = images[0];
  const lastImage = images[images.length - 1];

  if (direction === "next") {
    // first translate the wrapper so that the first image is out of view, then move the first image to the end of the list and reset the translation
    gallerySlider.style.transition = "transform 0.3s ease"; // Smooth transition
    gallerySlider.style.transform = `translateX(-${firstImage.offsetWidth}px)`; // Move the first image out of view

    setTimeout(() => {
      gallerySlider!.style.transition = ""; // Remove the transition
      gallerySlider!.style.transform = `translateX(0)`; // Reset the translation
      gallerySlider!.appendChild(firstImage); // Move the first image to the end
    }, 300); // Wait for the transition to finish
  } else if (direction === "prev") {
    // first translate the wrapper so that the last image is in view, then move the last image to the start of the list and reset the translation
    gallerySlider.style.transition = "none"; // No transition for immediate effect
    gallerySlider.style.transform = `translateX(-${lastImage.offsetWidth}px)`; // Move the last image into view

    setTimeout(() => {
      gallerySlider!.style.transition = "transform 0.3s ease"; // Smooth transition back to original position
      gallerySlider!.style.transform = `translateX(0)`; // Reset the translation
      gallerySlider!.insertBefore(lastImage, firstImage); // Move the last image to the start
    }, 0); // Immediate effect
  }

  console.debug(`Moved image ${direction}. New first image: ${images[0].src}`);
};

const registerEventListeners = () => {
  [prevButton, nextButton].forEach((button) => {
    button?.removeEventListener("click", () =>
      moveImage(button?.id === "gallery-next-button" ? "next" : "prev"),
    );
    button?.addEventListener("click", () =>
      moveImage(button?.id === "gallery-next-button" ? "next" : "prev"),
    );
  });

  if (gallerySlider) {
    gallerySlider.removeEventListener("pointerdown", slider.start);
    gallerySlider.removeEventListener("pointermove", slider.move);
    gallerySlider.removeEventListener("pointerup", slider.end);
    gallerySlider.removeEventListener("pointerleave", slider.end);

    gallerySlider.addEventListener("pointerdown", slider.start);
    gallerySlider.addEventListener("pointermove", slider.move);
    gallerySlider.addEventListener("pointerup", slider.end);
    gallerySlider.addEventListener("pointerleave", slider.end);
  }
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
        break;
      default:
        content.innerHTML = galleryContent("illustration"); // Default to illustration if no category is specified
    }
  }

  mobileNavButton = document.querySelector(".material-symbols-outlined");
  mobileNavLinks = document.querySelector("#mobile-nav-links");
  gallerySlider = document.querySelector<HTMLImageElement>(
    "#gallery-image-slider",
  );
  nextButton = document.querySelector("#gallery-next-button");
  prevButton = document.querySelector("#gallery-prev-button");

  registerEventListeners();
};
