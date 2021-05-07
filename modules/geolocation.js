import { API_KEY } from '../config.js';
import {getWeather} from '../main.js';
import {showPreloader, hidePreloader} from './preloader.js';

export let isGeoError = false;

let currentGeoURL = ``;

let geoOptions = {
    enableHighAccuracy: false,
    timeout: 10 * 1000,
    maximumAge: 5 * 60 * 1000
}

function getCurrentLocation (options = {}) {
    return new Promise ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
};

const fetchCoordinates = async () => {
    try {
        showPreloader();
        const {coords} = await getCurrentLocation(geoOptions);
        const {latitude, longitude} = coords;

        currentGeoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        getWeather(currentGeoURL);
   
    } catch (error) {
        isGeoError = true;

        const message = document.querySelector('.geolocation-message');
        message.hidden = false;

        console.log(error);
        currentGeoURL = `http://api.openweathermap.org/data/2.5/weather?id=5128581&units=metric&appid=${API_KEY}`;
        getWeather(currentGeoURL);
    }
}

fetchCoordinates();
