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

interface ISlider {
  isDragging: boolean;
  isAnimating: boolean;
  startX: number;
  deltaX: number;
  start: (e: PointerEvent) => void;
  move: (e: PointerEvent) => void;
  end: (e: PointerEvent) => void;
}

let content: HTMLElement | null;
let prevButton: HTMLButtonElement | null;
let nextButton: HTMLButtonElement | null;
let gallerySliderElem: HTMLDivElement | null;
let galleryImages: { src: string; alt: string }[] = [];
let activeImageIndex = 0;
let slider: ISlider;

const initSlider = () => {
  slider = {
    isAnimating: false,
    isDragging: false,
    startX: 0,
    deltaX: 0,
    start: (e: PointerEvent) => {
      if (!gallerySliderElem || galleryImages.length < 2 || slider.isAnimating)
        return;
      e.preventDefault();
      slider.isDragging = true;
      slider.startX = e.pageX;
      slider.deltaX = 0;
      gallerySliderElem.setPointerCapture(e.pointerId);
    },
    move: (e: PointerEvent) => {
      if (!slider.isDragging) return;
      e.preventDefault();
      const currentX = e.pageX;
      slider.deltaX = currentX - slider.startX;

      if (gallerySliderElem) {
        gallerySliderElem.style.transform = `translateX(${slider.deltaX}px)`;
      }
    },
    end: (e: PointerEvent) => {
      if (!slider.isDragging) return;
      e.preventDefault();
      slider.isDragging = false;

      if (gallerySliderElem) {
        const currentGallerySliderElem = gallerySliderElem;

        if (currentGallerySliderElem.hasPointerCapture(e.pointerId)) {
          currentGallerySliderElem.releasePointerCapture(e.pointerId);
        }

        const swipeThreshold = Math.min(
          50,
          currentGallerySliderElem.offsetWidth / 8,
        );
        if (
          e.type !== "pointercancel" &&
          Math.abs(slider.deltaX) >= swipeThreshold
        ) {
          if (slider.deltaX > 0) {
            moveImage("prev");
          } else {
            moveImage("next");
          }
        } else {
          currentGallerySliderElem.style.transition = "transform 0.3s ease";
          currentGallerySliderElem.style.transform = "translateX(0)";

          setTimeout(() => {
            if (gallerySliderElem === currentGallerySliderElem) {
              currentGallerySliderElem.style.transition = "";
            }
          }, 300);
        }
      }

      slider.deltaX = 0;
    },
  };

  slider.start = slider.start.bind(slider);
  slider.move = slider.move.bind(slider);
  slider.end = slider.end.bind(slider);
};

const renderVisibleImages = () => {
  if (!gallerySliderElem || galleryImages.length === 0) return;

  const slides =
    gallerySliderElem.querySelectorAll<HTMLImageElement>(".gallery-image");

  [-1, 0, 1].forEach((offset, index) => {
    const imageIndex =
      (activeImageIndex + offset + galleryImages.length) % galleryImages.length;
    const image = galleryImages[imageIndex];
    const slide = slides[index];

    slide.src = image.src;
    slide.alt = image.alt;
  });
};

const initializeGalleryImages = () => {
  if (!gallerySliderElem) {
    galleryImages = [];
    return;
  }

  const initialImages = Array.from(
    gallerySliderElem.querySelectorAll<HTMLImageElement>(".gallery-image"),
  );

  galleryImages = initialImages.slice(1).map((image) => ({
    src: image.getAttribute("src") ?? "",
    alt: image.alt,
  }));
  activeImageIndex = 0;
  slider.isAnimating = false;

  if (galleryImages.length === 0) return;

  const slides = Array.from({ length: 3 }, () => {
    const image = document.createElement("img");
    image.className = "gallery-image";
    image.draggable = false;
    return image;
  });

  gallerySliderElem.replaceChildren(...slides);
  renderVisibleImages();
};

const moveImage = (direction: "next" | "prev") => {
  if (!gallerySliderElem || galleryImages.length < 2 || slider.isAnimating)
    return;

  const currentGallerySliderElem = gallerySliderElem;
  const distance = currentGallerySliderElem.offsetWidth;
  slider.isAnimating = true;
  currentGallerySliderElem.style.transition = "transform 0.3s ease";
  currentGallerySliderElem.style.transform =
    direction === "next"
      ? `translateX(-${distance}px)`
      : `translateX(${distance}px)`;

  let fallbackTimer = 0;
  const finishMove = () => {
    window.clearTimeout(fallbackTimer);
    currentGallerySliderElem.removeEventListener(
      "transitionend",
      handleTransitionEnd,
    );

    if (gallerySliderElem !== currentGallerySliderElem) return;

    const offset = direction === "next" ? 1 : -1;
    activeImageIndex =
      (activeImageIndex + offset + galleryImages.length) % galleryImages.length;

    const slides =
      currentGallerySliderElem.querySelectorAll<HTMLImageElement>(
        ".gallery-image",
      );
    const recycledSlide = direction === "next" ? slides[0] : slides[2];

    currentGallerySliderElem.style.transition = "none";
    if (direction === "next") {
      currentGallerySliderElem.appendChild(recycledSlide);
    } else {
      currentGallerySliderElem.insertBefore(recycledSlide, slides[0]);
    }
    currentGallerySliderElem.style.transform = "translateX(0)";

    const recycledImageIndex =
      (activeImageIndex +
        (direction === "next" ? 1 : -1) +
        galleryImages.length) %
      galleryImages.length;
    const recycledImage = galleryImages[recycledImageIndex];
    recycledSlide.src = recycledImage.src;
    recycledSlide.alt = recycledImage.alt;
    slider.isAnimating = false;

    requestAnimationFrame(() => {
      if (gallerySliderElem === currentGallerySliderElem) {
        currentGallerySliderElem.style.transition = "";
      }
    });
  };

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === "transform") {
      finishMove();
    }
  };

  currentGallerySliderElem.addEventListener(
    "transitionend",
    handleTransitionEnd,
  );
  fallbackTimer = window.setTimeout(finishMove, 400);
};

const handleNavigationClick = (e: MouseEvent) => {
  if (!(e.currentTarget instanceof HTMLButtonElement)) return;

  moveImage(e.currentTarget.id === "gallery-next-button" ? "next" : "prev");
};

const registerEventListeners = () => {
  [prevButton, nextButton].forEach((button) => {
    button?.removeEventListener("click", handleNavigationClick);
    button?.addEventListener("click", handleNavigationClick);
  });

  if (gallerySliderElem) {
    gallerySliderElem.removeEventListener("pointerdown", slider.start);
    gallerySliderElem.removeEventListener("pointermove", slider.move);
    gallerySliderElem.removeEventListener("pointerup", slider.end);
    gallerySliderElem.removeEventListener("pointercancel", slider.end);

    gallerySliderElem.addEventListener("pointerdown", slider.start);
    gallerySliderElem.addEventListener("pointermove", slider.move);
    gallerySliderElem.addEventListener("pointerup", slider.end);
    gallerySliderElem.addEventListener("pointercancel", slider.end);
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

  initializeGalleryImages();
  registerEventListeners();
};
