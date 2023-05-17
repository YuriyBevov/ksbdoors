import { Fancybox } from "@fancyapps/ui";

Fancybox.defaults.l10n = {
  AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
  AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
  CLOSE: "Закрыть",
  DOWNLOAD: "Скачать",
  ELEMENT_NOT_FOUND: "HTML-элемент не найден",
  ERROR: "Что то пошло не так, попробуйте снова",
  FITX: "Fit horizontally",
  FITY: "Fit vertically",
  FLIPX: "Flip horizontally",
  FLIPY: "Flip vertically",
  IFRAME_ERROR: "Ошибка загрузки страницы",
  IMAGE_ERROR: "Изображение не найдено",
  ITERATEZOOM: "Toggle zoom level",
  MODAL: "Вы можете закрыть это модальное окно нажав на клавишу ESC",
  NEXT: "Вперед",
  PANDOWN: "Move down",
  PANLEFT: "Move left",
  PANRIGHT: "Move right",
  PANUP: "Move up",
  PREV: "Назад",
  RESET: "Обновить",
  ROTATECCW: "Rotate counterclockwise",
  ROTATECW: "Rotate clockwise",
  TOGGLE1TO1: "Toggle zoom level",
  TOGGLEFS: "Toggle fullscreen",
  TOGGLEZOOM: "Toggle zoom level",
  TOGGLE_FULLSCREEN: "Полноэкранный режим",
  TOGGLE_SLIDESHOW: "Слайдшоу",
  TOGGLE_THUMBS: "Toggle thumbnails",
  TOGGLE_ZOOM: "Toggle zoom level",
  ZOOMIN: "Приблизить",
  ZOOMOUT: "Удалить",
};

const galleries = document.querySelectorAll('[data-fancybox-gallery]');

if(galleries) {
  galleries.forEach(gallery => {
    const collection = gallery.dataset.fancyboxGallery;
    const items = gallery.querySelectorAll('[data-fancybox-item]');

    items.forEach(item => {
      item.setAttribute('data-fancybox', collection);
      const caption = item.parentNode.parentNode.querySelector('[data-fancybox-caption]');

      if(caption) {
        item.setAttribute('data-caption', caption.dataset.fancyboxCaption);
      }
    })

    Fancybox.bind(`[data-fancybox="${collection}"]`, {
      hideScrollbar: true,
      Thumbs: false,
    });
  })
}




