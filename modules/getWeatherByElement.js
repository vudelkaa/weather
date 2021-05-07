import {getWeather} from '../main.js';
import { API_KEY } from '../config.js';


export const getWeatherByLocationElement = (list) => {
    const setWeatherByLocation = (event) => {
      let target = event.target;
  
      if(target.tagName !== 'SPAN') return;
  
      let location = target.closest('li');
  
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${location.dataset.id}&units=metric&appid=${API_KEY}`;
      getWeather(url);
  
      changeActiveClass(location);
    }
  
    const changeActiveClass = (location) => {
      const locations = document.querySelectorAll('.city-block li');
  
      locations.forEach(item => {
        item.classList.remove('active-location-item');
      });
  
      location.classList.add('active-location-item');
    }
  
    list.addEventListener('click', setWeatherByLocation);
};