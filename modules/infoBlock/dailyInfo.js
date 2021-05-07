export const setDailyInfo = (weather) => {
    const weatherInfoDaily = document.querySelectorAll('.weather-info--daily .hourly-block');
    const dailyWeather = weather.daily;
    const weekDays = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
  
    weatherInfoDaily.forEach((item, index) => {
      let date = new Date(dailyWeather[index].dt * 1000);
      let dateDay = date.getDay();
  
      const imageHourly = dailyWeather[index].weather[0].main.toLowerCase(),
        temp = dailyWeather[index].temp.day;
  
      item.innerHTML = `<span>${weekDays[dateDay]}</span>
                        <img src="./images/${imageHourly}-day.png" alt="weather">
                        <span>${Math.round(temp)}°</span>`
    });
  
  };