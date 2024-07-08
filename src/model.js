const model = (function () {
    const apiKey = '9e7c51b9f5bd41ceb0f95320240606';
    
    console.log('WTF');
    let data;

    const makeCurrentData = function (weatherData) {
        const currentData = weatherData.current; 
        const imgSrc = `https:${currentData.condition.icon}`;
        
        return {
            
            tempC: `${currentData.temp_c} °C`,
            tempF: `${currentData.temp_f} °F`,
            conditionImg: imgSrc,
        }; 
     };
     const makeHourlyData = function (weatherData) {
        const forecastdays = weatherData.forecast.forecastday;
        const currentEpoch = weatherData.current.last_updated_epoch;

        console.log(currentEpoch);
        const todayHourly = forecastdays[0].hour.filter(
            (hour) => (hour.time_epoch > currentEpoch),
        );  
        const tomorrowHourly = forecastdays[1].hour.slice(0, -todayHourly.length);
        const hourly24 = [...todayHourly, ...tomorrowHourly];
        const hourly = hourly24.map((hour) => {
            const newHour = {
                time: hour.time.split(' ')[1],
                tempC: `${hour.temp_c} °C`,
                tempF: `${hour.temp_f} °F`, 
                conditionImg: `https:${hour.condition.icon}`,

            };
            return newHour;
        });
        
        return hourly;
     };

     const makeConditionData = function (weatherData) {
        return { 
            feelslikeC: `${weatherData.current.feelslike_c} °C`,
            feelslikeF: `${weatherData.current.feelslike_f} °F`,
            windKPH: `${weatherData.current.wind_kph} km/h`,
            windMPH: `${weatherData.current.wind_mph} mph`,
            rainChance: `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`,
            uv: weatherData.current.uv,
        };
     };

    const makeData = function (weatherData) {
        return {
            locationName: `${weatherData.location.name}, ${weatherData.location.country}`,
            current: makeCurrentData(weatherData),
            hourly: makeHourlyData(weatherData),
            condition: makeConditionData(weatherData),
        };
    };
    
    const fetchWeatherData = async function (location) {
        console.log('START~!!!');
        console.log(`Location : ${location}`);
       
        const URILocation = encodeURIComponent(location);

        const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
        const locationURL = `${baseURL}&q=${URILocation}&days=3`;
        try {
            const response = await fetch(locationURL);
            
            const weatherData = await response.json();
            console.log(weatherData);
            if (!weatherData.error) {
                data = makeData(weatherData);
                return data;
            }
            return weatherData;
            // console.log(`Temperature : ${weatherData.current.temp_c}`);
            
            
        } catch (error) {
            throw new Error(error);
        }
             
    };
    return {
        fetchWeatherData,
    };
}());

export default model;
