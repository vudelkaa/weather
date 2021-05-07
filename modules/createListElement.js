export const createListElement = (name, country, id, list, className) => {
    let listItem = document.createElement('li');
  
    if(className === 'list-item') {
      listItem.innerHTML = `<span>${name} - ${country}</span> 
                            <img src="./images/close.png" alt="close-icon">`;           
    } else {
      listItem.textContent = `${name} - ${country}`;
  
    }
  
    listItem.classList.add(className);
    listItem.dataset.id = id;
  
    list.append(listItem);
  }