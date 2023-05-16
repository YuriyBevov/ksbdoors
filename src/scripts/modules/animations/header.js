import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('.header');

if(header) {
  const trigger = document.querySelectorAll('section')[1];

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top center",
      end: "+=500",
      toggleActions: 'play none none reverse',
    }
  });

  tl
    .to('.header', {
      paddingTop: 10,
      paddingBottom: 10,
      margin: 0,
      ease: 'ease-in'
    })
    .to('.nav__line', {
      marginBottom: 10
    }, "-=.4")
}
