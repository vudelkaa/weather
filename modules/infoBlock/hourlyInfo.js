export const setHourlyInfo = (weather) => {
    const weatherInfoHourly = document.querySelectorAll('.weather-info--hourly .hourly-block');
    const hourlyWeather = weather.hourly;
  
    weatherInfoHourly.forEach((item, index) => {
      let date = new Date(hourlyWeather[index].dt * 1000);
      let dateHours = date.getHours();
      let datePeriod = '';
  
      const imageHourly = hourlyWeather[index].weather[0].main.toLowerCase(),
        temp = hourlyWeather[index].temp;
  
      if (dateHours > 16 && dateHours < 6) {
        datePeriod = 'night';
      } else {
        datePeriod = 'day';
      }
  
      item.innerHTML = `<span>${dateHours}</span>
                        <img src="./images/${imageHourly}-${datePeriod}.png" alt="weather">
                        <span>${Math.round(temp)}°</span>`
    });
};