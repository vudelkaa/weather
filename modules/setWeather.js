import {isGeoError} from './geolocation.js';
import {setBackgroungImg} from './setBackgroudImage.js';

export const setWeather = (weather) => {
    const temperature = document.querySelector(
        '.weather-features--inner .temperature'
      ),
      locationCity = document.querySelector(
        '.weather-features--inner .location-city'
      ),
      locationDate = document.querySelector(
        '.weather-features--inner .location-date'
      ),
      conditionIcon = document.querySelector(
        '.weather-features--inner .condition-icon'
      ),
      conditionType = document.querySelector(
        '.weather-features--inner .condition-type'
      ),
      temperatureRange = document.querySelector('.temperature--range');
  
    temperature.textContent = Math.round(weather.main.temp) + '°';
    temperatureRange.textContent = `H: ${Math.round(weather.main.temp_max)}  
                                    L: ${Math.round(weather.main.temp_min)}`;
    locationCity.textContent = weather.name;
    conditionType.textContent = weather.weather[0].main;
  
    const dateObject = getDate();
    locationDate.textContent = dateObject.stringDate;
  
    let conditionTypeTransform = weather.weather[0].main.toLowerCase();
  
    conditionIcon.setAttribute(
      'src',
      `./images/${conditionTypeTransform}-${dateObject.dataPeriod}.png`
    );
  
    setBackgroungImg(weather.weather[0].main, dateObject.dataPeriod);
  
    const currentLocationItem = document.querySelector('.city-block .list-item');
  
    if (isGeoError) {
      currentLocationItem.hidden = true;
    }
  
    if (!currentLocationItem.dataset.id) {
      currentLocationItem.dataset.id = weather.id;
      currentLocationItem.innerHTML = `<span>Current location - ${weather.name}</span>`
    }
  };

  const getDate = () => {
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
  
    const date = new Date();
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekDay = weekDays[date.getDay()];
    const hours = date.getHours() + 1;
    let dataPeriod = '';
  
    if (hours > 16 && hours < 6) {
      dataPeriod = 'night';
    } else {
      dataPeriod = 'day';
    }
  
    return {
      stringDate: `${weekDay}, ${day}.${month >= 10 ? month : '0' + month}`,
      dataPeriod,
    };
  };