type Direction = "prev" | "next";

interface ISlider {
  start(e: PointerEvent): void;
  move(e: PointerEvent): void;
  end(e: PointerEvent): void;
  render(direction: Direction): void;
  handleNavigation(e: MouseEvent, direction: Direction): void;
}

interface ISliderConstructorParams {
  target: HTMLDivElement;
  imageCount: number;
}

/*
 * NOTE: CONSTANTS
 * */
const TRANSITION_STYLE = "transform 0.3s ease-in-out";
const TRANSITION_RESET_STYLE = "none";
const TRANSFORM_RESET = "translateX(0)";
const IMAGE_FILE_EXTENSION = ".png";
const GRABBING_CURSOR_STYLE = "grabbing";
const GRAB_CURSOR_STYLE = "grab";

/*
 * NOTE: UTILITY FUNCTIONS
 * */
const dynamicTranslateX = (offset: number) => `translateX(${offset}px)`;
const dynamicTranslateXPercent = (offset: number) =>
  `translateX(${offset * 100}%)`;
const getImageSource = (name: number) =>
  `illustrations/${name}${IMAGE_FILE_EXTENSION}`;

export default class Slider implements ISlider {
  private element: HTMLDivElement;

  private isDragging: boolean;
  private isAnimating: boolean = false;

  private imageSequence: number[] = [];

  private startX: number;
  private currentX: number;

  constructor({ target, imageCount }: ISliderConstructorParams) {
    this.element = target;
    this.imageSequence = Array.from({ length: imageCount }, (_, i) => i);

    this.isDragging = false;

    this.startX = 0;
    this.currentX = 0;

    this.element.addEventListener("pointerdown", (e) => this.start(e));
    this.element.addEventListener("pointermove", (e) => this.move(e));
    this.element.addEventListener("pointerup", (e) => this.end(e));
  }

  start(e: PointerEvent): void {
    if (this.isAnimating) return;
    e.preventDefault();

    this.isDragging = true;
    this.startX = e.clientX;

    this.element.setPointerCapture(e.pointerId);

    this.element.style.cursor = GRABBING_CURSOR_STYLE;
  }

  move(e: PointerEvent): void {
    if (!this.isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - this.startX;
    this.currentX = deltaX;
    this.element.style.transform = dynamicTranslateX(this.currentX);
  }

  end(e: PointerEvent): void {
    if (!this.isDragging) return;
    e.preventDefault();

    this.isDragging = false;
    this.currentX = e.clientX - this.startX;

    this.element.style.cursor = GRAB_CURSOR_STYLE;
    this.element.releasePointerCapture(e.pointerId);

    if (this.currentX > 50) {
      this.handleNavigation(e, "prev");
    } else if (this.currentX < -50) {
      this.handleNavigation(e, "next");
    } else if (this.currentX !== 0) {
      this.isAnimating = true;
      const finishSnapBack = (e: TransitionEvent) => {
        if (e.target !== this.element || e.propertyName !== "transform") return;

        this.element.removeEventListener("transitionend", finishSnapBack);
        this.element.removeEventListener("transitioncancel", finishSnapBack);

        this.element.style.transition = TRANSITION_RESET_STYLE;
        this.currentX = 0;
        this.isAnimating = false;
      };

      this.element.addEventListener("transitionend", finishSnapBack);
      this.element.addEventListener("transitioncancel", finishSnapBack);

      this.element.style.transition = TRANSITION_STYLE;
      this.element.style.transform = TRANSFORM_RESET;
    } else {
      this.element.style.transition = TRANSITION_RESET_STYLE;
      this.element.style.transform = TRANSFORM_RESET;
    }
  }

  render(direction: Direction): void {
    const offset = direction === "next" ? -1 : 1;

    this.element.style.transition = TRANSITION_STYLE;
    this.element.style.transform = dynamicTranslateXPercent(offset);

    const onTransitionEnd = async (e: TransitionEvent) => {
      if (e.target !== this.element || e.propertyName !== "transform") return;

      this.element.removeEventListener("transitionend", onTransitionEnd);

      const images = this.element.querySelectorAll("img");

      let recycledImageIndex =
        direction === "next" ? this.imageSequence[2] : this.imageSequence[0];

      if (recycledImageIndex === 0) {
        recycledImageIndex = this.imageSequence.length;
      }

      const recycledImage = images[
        direction === "next" ? 0 : images.length - 1
      ] as HTMLImageElement | null;

      if (recycledImage) {
        recycledImage.src = getImageSource(recycledImageIndex);

        if (direction === "next") {
          this.element.appendChild(recycledImage);
        } else {
          this.element.insertBefore(recycledImage, this.element.firstChild);
        }

        try {
          this.element.style.transition = TRANSITION_RESET_STYLE;
          this.element.style.transform = TRANSFORM_RESET;

          await recycledImage.decode();
        } catch (error) {
          console.error("Image decoding failed:", error);
        } finally {
          this.isAnimating = false;
        }
      } else {
        console.error("Recycled image element not found.");
        this.element.style.transition = TRANSITION_RESET_STYLE;
        this.element.style.transform = TRANSFORM_RESET;
        this.isAnimating = false;
      }
    };

    this.element.addEventListener("transitionend", onTransitionEnd);
    this.element.addEventListener("transitioncancel", onTransitionEnd);
  }

  handleNavigation(e: PointerEvent, direction: Direction): void {
    e.preventDefault();
    if (this.isAnimating) return;

    this.isAnimating = true;

    if (direction === "prev") {
      this.imageSequence.unshift(this.imageSequence.pop()!);
    } else {
      this.imageSequence.push(this.imageSequence.shift()!);
    }
    this.render(direction);
  }
}
