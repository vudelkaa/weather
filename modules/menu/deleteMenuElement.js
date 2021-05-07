import {menuLocations} from '../../main.js'

const cityUL = document.querySelector('.city-block ul');

export const deleteMenuLocationsElement = () => {
    cityUL.addEventListener('click', (event) => {
      let target = event.target;
  
      if(target.tagName !== 'IMG') return;
  
      const city = target.closest('li');
      menuLocations = menuLocations.filter(location => location.id != city.dataset.id);
      localStorage.setItem('menuLocations', JSON.stringify(menuLocations));
  
      city.remove();
    })
};