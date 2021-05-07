export const setGeneralInfo = (weather) => {
    const weatherInfoToday = document.querySelector('.weather-info--today');
    weatherInfoToday.innerHTML = `<span class="weather-info--temperature">Temperature: &nbsp;${Math.round(weather.main.temp)}° </span>
                                  <div class="weather-info--today-inner">
                                    <div>
                                      <span>Feels like: &nbsp;${Math.round(weather.main.feels_like)}°</span>
                                      <span>Min: &nbsp;${Math.round(weather.main.temp_min)}°</span>
                                      <span>Max: &nbsp;${Math.round(weather.main.temp_max)}°</span>
                                    </div>
                                    <div>
                                      <span>Humidity: &nbsp;${weather.main.humidity}</span>
                                      <span>Pressure: &nbsp;${weather.main.pressure}</span>
                                      <span>Wind speed: &nbsp;${weather.wind.speed} m/s</span>
                                    </div>
                                  </div>`
};