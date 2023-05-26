import WeatherAPI from "./weatherapi";
import DOMContent from "./domcontent";

export default class UI {
    static loadUI() {
        UI.searchBtnEvent();
    }
    static searchBtnEvent() {
        const btn = document.querySelector('.search-btn');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            UI.checkForErrorP();
            UI.displayWeather();
            UI.displayExtraWeatherData();
        });
    }
    static async displayWeather() {
        try {
            const weatherDisplay = document.querySelector('.weather-card-main');
            const city = DOMContent.getCitySearch();
            const condition = await WeatherAPI.getWeatherCondition(city);
            weatherDisplay.children[0].textContent = condition.cityName;
            weatherDisplay.children[1].innerHTML = condition.tempC + '&deg;C';
            weatherDisplay.children[2].textContent = condition.conditionText;
            weatherDisplay.classList.remove('hidden');
        } catch (err) {
            // mute error
        }
    }
    static async displayExtraWeatherData() {
        try {
            const city = DOMContent.getCitySearch();
            const data = await WeatherAPI.getExtraWeatherData(city);
            const weatherDiv = document.querySelector('.extra-weather-info');
            const windKPH = document.querySelector('.wind-speed');
            const rainChance = document.querySelector('.rain-chance');
            const pressure = document.querySelector('.pressure');
            const uv = document.querySelector('.uv-index');

            windKPH.children[1].textContent = data['windKPH'];
            rainChance.children[1].textContent = data['chanceRain'];
            pressure.children[1].textContent = data['pressure'];
            uv.children[1].textContent = data['uv'];
            weatherDiv.classList.remove('hidden');
        } catch (err) {
            if (!document.querySelector('.error')) {
                const weatherDiv = document.querySelector('#weather');
                weatherDiv.appendChild(UI.constructP('There was an error processing your request. Please try again.', 'error'));
            }
        }
    }
    static constructP(content, className) {
        const p = document.createElement('p');
        p.textContent = content;
        p.classList.add(className);
        return p;
    }
    static checkForErrorP() {
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove();
        }
    }
}