const model = (function () {
    const apiKey = '9e7c51b9f5bd41ceb0f95320240606';
    const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
    console.log('WTF');


    const fetchWeatherData = async function (location) {
        console.log('START~!!!');
        console.log(`Location : ${location}`);
        const URILocation = encodeURIComponent(location);
        const url = `${baseURL}&q=${URILocation}`;
        try {
            const response = await fetch(url);
            const weatherData = await response.json();
            console.log(weatherData);
            // console.log(`Temperature : ${weatherData.current.temp_c}`);
            
            return weatherData;
        } catch {
            throw new Error("Couldn't fetch request.");
        }
             
    };
    return {
        fetchWeatherData,
    };
}());

export default model;
