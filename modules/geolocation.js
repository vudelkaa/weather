import { API_KEY } from '../config.js';
import {getWeather} from './getWeather.js';
import {hidePreloader} from './preloader.js';
import { setWeather } from './setWeather.js';

export let isGeoError = false;
export let isCurrentLocation = false;

let currentGeoURL = ``,
    cachedGeo = {};

localStorage.getItem('cachedGeo') ? 
    cachedGeo = JSON.parse(localStorage.getItem('cachedGeo')) : 
    localStorage.setItem('cachedGeo', JSON.stringify({}));

let geoOptions = {
    enableHighAccuracy: false,
    timeout: 10 * 1000,
    maximumAge: 5 * 60 * 1000
}

export const falseCurrentLocation = () => {
    isCurrentLocation = false;
}

function getCurrentLocation (options = {}) {
    return new Promise ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
};

const fetchCoordinates = async () => {
    if (cachedGeo.isCached){
        // getWeather(cachedGeo.url);
        setWeather(cachedGeo.temp, 
            cachedGeo.tempMax, 
            cachedGeo.tempMin, 
            cachedGeo.cityName, 
            cachedGeo.condition, 
            cachedGeo.id);
            hidePreloader();
    } 

    try {   
        isCurrentLocation = true;

        const {coords} = await getCurrentLocation(geoOptions);
        const {latitude, longitude} = coords;

        currentGeoURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        getWeather(currentGeoURL);

        cachedGeo.isCached = true;
        cachedGeo.url = currentGeoURL;
        localStorage.setItem('cachedGeo', JSON.stringify(cachedGeo));

        // isCurrentLocation = false;
   
    } catch (error) {
        isGeoError = true;

        const message = document.querySelector('.geolocation-message');
        message.hidden = false;

        console.error('Error CODE: '+ error.code + '. MESSAGE: ' + error.message);
        currentGeoURL = `http://api.openweathermap.org/data/2.5/weather?id=5128581&units=metric&appid=${API_KEY}`;
        getWeather(currentGeoURL);
    }
}

fetchCoordinates();
