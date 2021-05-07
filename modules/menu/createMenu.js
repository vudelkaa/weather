import {menuLocations} from '../../main.js';
import {createListElement} from '../createListElement.js';

const cityUL = document.querySelector('.city-block ul');

export const createMenuLocations = () => {
    if(menuLocations.length === 0) return;
  
    menuLocations.map(location => {
      createListElement(
        location.name,
        location.country,
        location.id,
        cityUL,
        'list-item'
      );
    })
};