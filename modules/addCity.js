import {cityList, menuLocations} from '../main.js';
import {createListElement} from './createListElement.js';

export const addCity = () => {
    const input = document.querySelector('.location-search input'),
      searchList = document.querySelector('.search-list ul'),
      searchBlock = document.querySelector('.search-list'),
      infoBlock = document.querySelector('.search-list .info-block'),
      cityUL = document.querySelector('.city-block ul');

    let foundCities = [];
  
    function showSearchList() {
      setSearchBlockHeight(foundCities.length, infoBlock, input.value === '');
  
      input.onblur = () => {
        setTimeout(() => {
          setSearchBlockHeight(0, infoBlock, true);
        }, 100);
        input.onblur = null;
      };
    }
  
    function addCityToTheMenu(event) {
      let isExist = false;
      let target = event.target;
console.log(menuLocations);

  
      if (target.tagName !== 'LI') return;

      menuLocations.forEach(item => {
        if (item.id === target.dataset.id) {
          isExist = true;
        }
      } );

      if (isExist) {
        input.value = '';
        return;
      }
  
      let countryName = target.textContent.split(' - ');
  
      createListElement(
        countryName[0],
        countryName[1],
        target.dataset.id,
        cityUL,
        'list-item'
      );
  
      menuLocations.push({name: countryName[0], country: countryName[1], id: target.dataset.id, lat: target.dataset.lat, lon: target.dataset.lon});
      localStorage.setItem('menuLocations', JSON.stringify(menuLocations));
  
      input.value = '';
      setSearchBlockHeight(foundCities.length, infoBlock, true);
    }
  
    const setSearchBlockHeight = (countCity, info, isBlur = false) => {
      if(countCity === 0 && !isBlur) { 
        info.style.display = 'flex'; 
        searchBlock.style.height = 85 + 'px';
  
      } else if(isBlur) {
        searchBlock.style.height = 0 + 'px';
        info.style.display = 'none'; 
  
      } else {
        let blockHeight = 46 * countCity;
  
        searchBlock.style.height = blockHeight + 'px';
        info.style.display = 'none'; 
      }
    }
  
    input.addEventListener('input', () => {
      if(input.value === '') {
        setSearchBlockHeight(0, infoBlock, true);
  
        return;
      }
  
      let count = 1;
      foundCities = cityList.filter((item) =>  {
          if(count > 5) {
            return;
          } 
  
          const firstBool = item.name.toLowerCase().includes(input.value.toLowerCase().trim()),
            secondBool = input.value[0].toLowerCase() === item.name[0].toLowerCase();
          
          if(firstBool && secondBool){
            count++;
            return true;
          }
        }
      );
  
      setSearchBlockHeight(foundCities.length, infoBlock);
  
      searchList.innerHTML = '';
  
      foundCities.map((item) => {
        createListElement(
          item.name,
          item.country,
          item.id,
          searchList,
          'search-list--item-style'
        );
      });
    });
  
    input.addEventListener('focus', showSearchList);
    searchList.addEventListener('click', addCityToTheMenu);
  };