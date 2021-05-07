export const showPreloader = () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'flex';
};

export const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = 0;
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);

};