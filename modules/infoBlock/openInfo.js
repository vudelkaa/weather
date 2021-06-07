import {isMenuOpen, openMenuFunc} from '../menu/openMenu.js';

let isOpen = false;

export const openInfo = () => {
    const weatherInfo = document.querySelector('.weather-info'),
      arrowButton = document.querySelector('.arrow-icon');
  
      arrowButton.addEventListener('click', () => {
        arrowButton.classList.toggle('arrow-icon--open');
        weatherInfo.classList.toggle('weather-info--open');
        isOpen = !isOpen;

        if (isOpen && isMenuOpen) {
          openMenuFunc();
        }
      })
};
  