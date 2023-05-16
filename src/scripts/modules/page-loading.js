import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
import { bodyLocker } from "../utils/bodyLocker.js";
const loader = document.querySelector('.loader');

if(loader) {
  bodyLocker(true);

  imagesLoaded( 'body', { background: true }, () => {
    gsap.fromTo('.loader', {opacity: 1}, {
      opacity: 0,
      display: 'none',
      duration: 1,
      delay: .5,
      ease: 'ease-in',
      onComplete: () => {
        bodyLocker(false);
      }
    });
  });
}
