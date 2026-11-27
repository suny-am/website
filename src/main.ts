import { footer } from "@/components/footer";
import { gallery } from "@/components/gallery";
import { nav } from "@/components/nav";
import "@/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${nav.template}
  ${gallery.template}
  ${footer.template}
`;

nav.init();
gallery.init();
