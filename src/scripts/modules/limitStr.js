function limitStr( str, n ) {
  if ( str.length > n ) {
      return str.slice(0, n) + '...';
  } else {
      return str
  }
}

const strs = document.querySelectorAll('.js-limited-str');

if(strs) {
  strs.forEach(str => {
    const limit = str.dataset.limit;
    str.innerHTML = limitStr(str.innerHTML, limit);
  })
}
