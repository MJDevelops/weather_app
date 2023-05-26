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
            UI.displayWeather();
        });
    }
    static async displayWeather() {
        const weatherDisplay = document.querySelector('.weather-card-main');
        const city = DOMContent.getCitySearch();
        const condition = await WeatherAPI.getWeatherCondition(city);
        console.log(condition);
        weatherDisplay.children[0].textContent = condition.cityName;
        weatherDisplay.children[1].innerHTML = condition.tempC + '&deg;C';
        weatherDisplay.children[2].textContent = condition.conditionText;
    }
    static constructP(content) {
        const p = document.createElement('p');
        p.textContent = content;
    }
}