export const checkedTimingInfo = () => {
    const headers = document.querySelectorAll('.weather-info--headers .header'),
      infoBlock = document.querySelector('.weather-info--time');
  
    let isHourly = true;
  
      headers.forEach((header) => {
        header.addEventListener('click', function() {
  
          if(this.classList.contains('header-active')) return;
  
          headers.forEach(header => header.classList.toggle('header-active'))
  
          if (isHourly) {
            infoBlock.style.left = 0 - infoBlock.clientWidth/2 - 20  + 'px';
  
            isHourly = false;
          } else {
            infoBlock.style.left = +infoBlock.style.left.replace('px', '') + infoBlock.clientWidth/2 + 20 + 'px';
  
            isHourly = true;
          }
        })
      })
  };