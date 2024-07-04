const model = (function () {
    const apiKey = '9e7c51b9f5bd41ceb0f95320240606';
    
    console.log('WTF');
    let data;

    const makeCurrentData = function (weatherData) {
        const currentData = weatherData.current; 
        const imgSrcBase = currentData.condition.icon.split('//')[1];
        const imgSrc = `https://${imgSrcBase}`;
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
        const todayLength = todayHourly.length;
        const tomorrowHourly = forecastdays[1].hour.slice(0, -todayLength);
        const hourly24 = [...todayHourly, ...tomorrowHourly];
        console.table(hourly24);
     };

    const makeData = function (weatherData) {
        return {
            locationName: weatherData.location.name,
            current: makeCurrentData(weatherData),
            hourly: makeHourlyData(weatherData),
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
            data = makeData(weatherData);
            // console.log(`Temperature : ${weatherData.current.temp_c}`);
            
            return data;
        } catch {
            throw new Error("Couldn't fetch request.");
        }
             
    };
    return {
        fetchWeatherData,
    };
}());

export default model;
