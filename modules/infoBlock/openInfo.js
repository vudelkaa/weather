export const openInfo = () => {
    const weatherInfo = document.querySelector('.weather-info'),
      arrowButton = document.querySelector('.arrow-icon');
  
      arrowButton.addEventListener('click', () => {
        arrowButton.classList.toggle('arrow-icon--open');
        weatherInfo.classList.toggle('weather-info--open');
      })
};
  