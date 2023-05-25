import UI from "./ui";

const baseURL = "http://api.weatherapi.com/v1/";
const APIKEY = "2ee2dbba72b44f08a87201202232205";

export default class WeatherAPI {
    static async getCurrentWeather(city) {
        const currentWeatherURL = baseURL + `current.json?key=${APIKEY}&q=${city}`;
        const data = await fetch(currentWeatherURL);
        const json = await data.json();
        return json;
    }

    static async getWeatherCondition(city) {
        try {
            const data = await WeatherAPI.getCurrentWeather(city);
            const currentWeather = data['current'];
            const cityName = data['location'].name;
            const condition = currentWeather.condition;
            const conditionText = condition['text'];
            const tempC = currentWeather['temp_c'];

            return { cityName, conditionText, tempC };
        } catch (err) {
            console.log(err);
            return UI.constructP('City was not found.');
        }
    }
}