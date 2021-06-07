export let isMenuOpen = false;

const menu = document.querySelector('.weather-menu'),
      menuButton = document.querySelector('.menu-icon');
    let menuButtonRight = 15;

export const openMenuFunc = () => {
      menuButton.style.right = '15px';
      isMenuOpen = !isMenuOpen;
  
      if (menuButtonRight <= 15) {
        menuButton.style.right = menuButtonRight + menu.clientWidth + 'px';
        menuButtonRight = menuButton.style.right.replace('px', '');
      } else {
        menuButton.style.right = 15 + 'px';
        menuButtonRight = 15;
      }
  
      menu.classList.toggle('open-menu');
}

export const openMenu = () => {
  menuButton.addEventListener('click', openMenuFunc);
};

