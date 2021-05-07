export const setBackgroungImg = (weatherType, period = 'day') => {
    const weatherField = document.querySelector('.weather-field');
    weatherType = weatherType.toLowerCase();

    document.body.style.backgroundImage = `url('../images/background/${weatherType}-${period}.jpeg')`;
    weatherField.style.backgroundImage = `url('../images/background/${weatherType}-${period}.jpeg')`;
}