import {isGeoError} from './geolocation.js';
import {setBackgroungImg} from './setBackgroudImage.js';
import {isCurrentLocation, falseCurrentLocation} from './geolocation.js'

export const setWeather = (temp, tempMax, tempMin, cityName, condition, id) => {
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
  
    temperature.textContent = Math.round(temp) + '°';
    temperatureRange.textContent = `H: ${Math.round(tempMax)}  
                                    L: ${Math.round(tempMin)}`;
    locationCity.textContent = cityName;
    conditionType.textContent = condition;
  
    const dateObject = getDate();
    locationDate.textContent = dateObject.stringDate;
  
    let conditionTypeTransform = condition.toLowerCase();
  
    conditionIcon.setAttribute(
      'src',
      `./images/${conditionTypeTransform}-${dateObject.dataPeriod}.png`
    );
  
    setBackgroungImg(condition, dateObject.dataPeriod);
  
    const currentLocationItem = document.querySelector('.city-block .list-item');
  
    if (isGeoError) {
      currentLocationItem.hidden = true;
    }

    if (isCurrentLocation) {
      let cachedGeo = JSON.parse(localStorage.getItem('cachedGeo'));
      
      cachedGeo.temp = temp;
      cachedGeo.tempMax = tempMax;
      cachedGeo.tempMin = tempMin; 
      cachedGeo.cityName = cityName;
      cachedGeo.condition = condition;
      cachedGeo.id = id;
      localStorage.setItem('cachedGeo', JSON.stringify(cachedGeo));
      
      falseCurrentLocation();
    }
  
    if (!currentLocationItem.dataset.id) {
      currentLocationItem.dataset.id = id;
      currentLocationItem.innerHTML = `<span>Current location - ${cityName}</span>`
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