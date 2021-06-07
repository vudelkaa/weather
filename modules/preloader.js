const preloader = document.querySelector('.preloader');

export const showPreloader = () => {
    preloader.style.display = 'flex';
};

export const hidePreloader = () => {
    preloader.style.opacity = 0;
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 100);
};
