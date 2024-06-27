const model = (function() {
    const apiKey = '9e7c51b9f5bd41ceb0f95320240606';
    const baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
    const fetchWeatherData = async function(country) {
        const URICountry = encodeURIComponent(country);
        const url = `${baseURL}&q=${URICountry}`;
        try {
            const response = await fetch(url);
            const weatherData = await response.json();
            console.log(weatherData);

        } catch {
            throw new Error("Couldn't fetch complete request");
        }
             
    };
    return {
        fetchWeatherData,
    };
}());

export default model;
