import {addCity} from './modules/addCity.js';
import {getWeatherByLocationElement} from './modules/getWeatherByElement.js';


import {checkedTimingInfo} from './modules/infoBlock/checkedTiming.js';
import {openInfo} from './modules/infoBlock/openInfo.js';

import {openMenu} from './modules/menu/openMenu.js';
import {createMenuLocations} from './modules/menu/createMenu.js';

// import {deleteMenuLocationsElement} from './modules/menu/deleteMenuElement.js';

let cityList = [];
let  menuLocations = [];

const cityUL = document.querySelector('.city-block ul');

localStorage.getItem('menuLocations') ? menuLocations = JSON.parse(localStorage.getItem('menuLocations')) : localStorage.setItem('menuLocations', []);

(async function () {
  const response = await fetch('/city_list.json');
  const result = await response.json();
  cityList = result;
})();

const deleteMenuLocationsElement = () => {
  cityUL.addEventListener('click', (event) => {
    let target = event.target;

    if(target.tagName !== 'IMG') return;

    const city = target.closest('li');
    menuLocations = menuLocations.filter(location => location.id != city.dataset.id);
    localStorage.setItem('menuLocations', JSON.stringify(menuLocations));

    city.remove();
  })
};

window.addEventListener('DOMContentLoaded', () => {
  createMenuLocations();

  openMenu();
  openInfo();

  addCity();

  deleteMenuLocationsElement();
  getWeatherByLocationElement(cityUL);
  checkedTimingInfo();
});

export {cityList, menuLocations};
