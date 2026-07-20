import { config } from './config';

export const fetchWeather = async (city) => {
    const API_KEY = config.getApiKey('VITE_WEATHER_API_KEY');
    if (!city || city.trim() === '' || city.toLowerCase() === 'current' || city.toLowerCase() === 'here') {
        return "ERROR: Missing valid city parameter. Please ask the user for their location.";
    }
    const CACHE_KEY = `LIYA_WEATHER_CACHE_${city.toLowerCase()}`;
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, content } = JSON.parse(cached);
        if (Date.now() - timestamp < 15 * 60 * 1000) {
            console.log(`[Cache] Returning cached weather for: ${city}`);
            return content;
        }
    }

    if (!API_KEY) {
        console.error("Weather API Key missing!");
        return null;
    }

    try {
        // Connect directly to openweathermap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            console.error("Weather API Failed:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();

        if (data && data.weather) {
            const resultString = `[Current Weather in ${data.name}, ${data.sys.country}:
            - Condition: ${data.weather[0].description}
            - Temp: ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)
            - Humidity: ${data.main.humidity}%
            - Wind: ${data.wind.speed} m/s
            ]`;

            // SAVE TO CACHE
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                content: resultString
            }));

            return resultString;
        }

        return "[Weather data not found]";

    } catch (e) {
        console.error("Weather Fetch Error:", e);
        return null;
    }
};
