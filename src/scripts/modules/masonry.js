import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const layout = document.querySelector('.masonry');

if(layout) {
  let itemsToShow = 12;
  const trigger = document.querySelector('.portfolio__btn');

  const items = layout.querySelectorAll('.masonry-item');
  let msnry = null;

  const setHiddenClass = (item) => {
    item.classList.add('hidden');
  }

  const removeHiddenClass = (item) => {
    item.classList.remove('hidden');
  }

  items.forEach((item,index) => {
    if(index > itemsToShow) {
      setHiddenClass(item);
    }
  });

  const msnryReload = () => {
    msnry.reloadItems();
    msnry.layout();
  }

  const setActiveItems = () => {
    items.forEach((item,index) => {
      if(index < itemsToShow) {
        removeHiddenClass(item);
      }
    });

    if(itemsToShow >= items.length ) {
      setHiddenClass(trigger);
    }
    msnryReload();
  }

  const imgs = layout.querySelectorAll('.masonry-item img');

  imagesLoaded( imgs, () => {
    msnry = new Masonry( layout, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
    });
  });

  trigger.addEventListener('click', () => {
    itemsToShow += itemsToShow;
    setActiveItems();
  });
}



