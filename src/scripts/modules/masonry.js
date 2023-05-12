import Masonry from "masonry-layout";

console.log(Masonry);
document.addEventListener("DOMContentLoaded", () => {
  if(Masonry) {
    var elem = document.querySelector('.masonry');

    setTimeout(() => {
      var msnry = new Masonry( elem, {
        // options
        itemSelector: '.masonry-item',
        gutter: 10,
      });
    }, 200);

  }
});

