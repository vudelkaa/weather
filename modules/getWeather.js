import { API_KEY } from '../config.js';

import {hidePreloader} from './preloader.js';

import {setWeather} from './setWeather.js';
import {setDailyInfo} from './infoBlock/dailyInfo.js';
import {setHourlyInfo} from './infoBlock/hourlyInfo.js';
import {setGeneralInfo} from './infoBlock/generalInfo.js';

let urlDaily = ``;

export const getWeather = async (url, kind = '') => {
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
  
    setWeather(result.main.temp, 
        result.main.temp_max,
        result.main.temp_min,
        result.name,
        result.weather[0].main,
        result.id);
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