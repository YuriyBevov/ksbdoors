import ymaps from 'ymaps';
const map = document.querySelector('#yMaps');

ymaps
  .load('https://api-maps.yandex.ru/2.1/?apikey=4aa8fccd-d097-4486-835a-704db2b05b2e&lang=ru_RU')
  .then((maps) => {
    console.log(maps)
    const map = new maps.Map('map', {
      center: [-8.369326, 115.166023],
      zoom: 14,
      controls: [],
      behaviors: ['drag'],
    });
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));
