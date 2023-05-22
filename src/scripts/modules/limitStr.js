import { limitStr } from "../utils/limitStr";

const strs = document.querySelectorAll('.js-limited-str');

if(strs) {
  strs.forEach(str => {
    const limit = str.dataset.limit;
    str.innerHTML = limitStr(str.innerHTML, limit);
  })
}
