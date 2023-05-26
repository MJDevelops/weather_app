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
            // mute error
        }
    }

    static async getExtraWeatherData(city) {
        try {
            const url = baseURL + `forecast.json?key=${APIKEY}&q=${city}&days=1&aqi=no&alerts=yes`;
            const data = await fetch(url);
            const json = await data.json();
            const current = json['current'];
            const forecast = json['forecast']['forecastday'][0]['day'];
            const pressure = current['pressure_mb'];
            const windKPH = forecast['maxwind_kph'];
            const uv = forecast['uv'];
            const chanceRain = forecast['daily_chance_of_rain'];

            return { pressure, windKPH, uv, chanceRain }
        } catch (err) {
            // mute error
        }
    }
}