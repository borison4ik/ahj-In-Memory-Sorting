import data from './data.json';

import 'materialize-css/dist/css/materialize.min.css';
import '../css/style.scss';

let DATA = [...data];
const TABLE = document.querySelector('.table');
const DIRECTION = ['ASC', 'DESC'];
const FIELDS = Object.keys(DATA[0]);

window.onload = () => {
  timer();

  function sortBy(field, direction) {
    switch (field + direction) {
      case 'idASC':
        DATA.sort((a, b) => +a.id - +b.id);
        break;
      case 'idDESC':
        DATA.sort((a, b) => +b.id - +a.id);
        break;
      case 'imdbASC':
        DATA.sort((a, b) => +a.imdb - +b.imdb);
        break;
      case 'imdbDESC':
        DATA.sort((a, b) => +b.imdb - +a.imdb);
        break;
      case 'yearASC':
        DATA.sort((a, b) => +a.year - +b.year);
        break;
      case 'yearDESC':
        DATA.sort((a, b) => +b.year - +a.year);
        break;
      case 'titleASC':
        DATA.sort((a, b) => {
          if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          return 0;
        });
        break;
      case 'titleDESC':
        DATA.sort((a, b) => {
          if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          return 0;
        });
        break;
      default:
        console.log('miss');
        break;
    }
    generateTable(field, direction);
  }

  function generateTable(markField, direction) {
    TABLE.innerHTML = '';
    const THEAD = document.createElement('thead');
    const TBODY = document.createElement('tbody');
    const th = document.createElement('tr');

    FIELDS.forEach((item) => {
      const td = document.createElement('td');
      if(markField === item) {
        td.classList.add(direction.toLowerCase());
      }
      td.textContent = item;
      th.appendChild(td);
    });

    THEAD.appendChild(th);

    DATA.forEach((item) => {
      const tr = document.createElement('tr');
      for (let [key, value] of Object.entries(item)) {
        if(key === 'imdb') value = value.toFixed(2);
        tr.dataset[key] = value;
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      }
      TBODY.appendChild(tr);
    });

    TABLE.appendChild(THEAD);
    TABLE.appendChild(TBODY);
  }

  function randomFromArray(arr) {
    const rnd = Math.floor(Math.random() * arr.length);
    return arr[rnd];
  }

  function timer() {
    sortBy(randomFromArray(FIELDS), randomFromArray(DIRECTION));

    setTimeout(() => {
      timer();
    }, 2000);
  }
};
