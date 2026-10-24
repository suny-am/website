import { footer } from "@/components/footer";
import { content } from "@/components/content";
import { nav } from "@/components/nav";
import "@/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${nav.content}
  ${content}
  ${footer}
`;

nav.init();
