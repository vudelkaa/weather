import { API_KEY } from './config.js';

import {setWeather} from './modules/setWeather.js';
import {addCity} from './modules/addCity.js';
import {hidePreloader} from './modules/preloader.js';
import {getWeatherByLocationElement} from './modules/getWeatherByElement.js';

import {setDailyInfo} from './modules/infoBlock/dailyInfo.js';
import {setHourlyInfo} from './modules/infoBlock/hourlyInfo.js';
import {setGeneralInfo} from './modules/infoBlock/generalInfo.js';
import {checkedTimingInfo} from './modules/infoBlock/checkedTiming.js';
import {openInfo} from './modules/infoBlock/openInfo.js';

import {openMenu} from './modules/menu/openMenu.js';
import {createMenuLocations} from './modules/menu/createMenu.js';
// import {deleteMenuLocationsElement} from './modules/menu/deleteMenuElement.js';

let urlDaily = ``;

let cityList = [];
let  menuLocations = [];

const cityUL = document.querySelector('.city-block ul');

localStorage.getItem('menuLocations') ? menuLocations = JSON.parse(localStorage.getItem('menuLocations')) : localStorage.setItem('menuLocations', []);

(async function () {
  const response = await fetch('/city_list.json');
  const result = await response.json();
  cityList = result;
})();

const getWeather = async (url, kind = '') => {
  const response = await fetch(url);
  const result = await response.json();

  if(kind === 'daily') {
    setDailyInfo(result);
    return;
  }

  if(kind === 'hourly') {
    setHourlyInfo(result);
    return;
  }

  setWeather(result);
  setGeneralInfo(result);
  createCoordUrl(result.coord.lat, result.coord.lon);

  hidePreloader();
};

const createCoordUrl = (lat, lon) => {
  urlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&appid=${API_KEY}`;
  getWeather(urlDaily, 'daily');

  let urlHourly = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&units=metric&appid=${API_KEY}`;
  getWeather(urlHourly, 'hourly');
}

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

export {getWeather, cityList, menuLocations};
