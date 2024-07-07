const view = (function () {
    const searchNode = document.getElementById('search');
    const form = document.querySelector('.search-form');
    const middle = document.querySelector('.middle');
    
    const locationNode = document.querySelector('.location');
    const currentDataNode = document.querySelector('.current-data');
    const tempCNode = currentDataNode.querySelector('.temperature.celsius');
    const tempFNode = currentDataNode.querySelector('.temperature.fahrenheit');
    const currentConditionImg = currentDataNode.querySelector('.condition-img > img');
    
    const hourlyItemsNode = document.querySelector('.hourly-items');
    const hourlyItemTemplate = document.getElementById('hourly-item-template');

    const conditions = document.querySelector('.conditions');
    
    const showCurrentData = function (currentData) {
        // locationNode.textContent = `${currentData.location.name}`;
        tempCNode.textContent = currentData.tempC;
        tempFNode.textContent = currentData.tempF; 
        currentConditionImg.src = currentData.conditionImg;
    };
    const showHourlyData = function (hourlyData) {
        hourlyItemsNode.innerHTML = '';
    
        hourlyData.forEach((hourly) => {
            const hourlyNode = hourlyItemTemplate.content.cloneNode(true).firstElementChild;
            hourlyNode.querySelector('.time').textContent = hourly.time;
            hourlyNode.querySelector('.condition-img > img').src = hourly.conditionImg;
            hourlyNode.querySelector('.celsius').textContent = hourly.tempC;
            hourlyNode.querySelector('.fahrenheit').textContent = hourly.tempF;

            hourlyItemsNode.appendChild(hourlyNode);
        });
    };
    const showConditionData = function (conditionData) {
        // Reel Feel
        const realFeelNode = conditions.querySelector('.real-feel');

        realFeelNode.querySelector('.condition-value.metric').textContent = conditionData.feelslikeC;
        realFeelNode.querySelector('.condition-value.imperial').textContent = conditionData.feelslikeF;
        // Wind
        const windNode = conditions.querySelector('.wind');

        windNode.querySelector('.condition-value.metric').textContent = conditionData.windKPH;
        windNode.querySelector('.condition-value.imperial').textContent = conditionData.windMPH;
        // Chance of Rain
        const rainChance = conditions.querySelector('.rain-chance');

        rainChance.querySelector('.condition-value').textContent = conditionData.rainChance;
        // UV Index
        const uvIndex = conditions.querySelector('.uv-index');

        uvIndex.querySelector('.condition-value').textContent = conditionData.uv;
    };

    const showLoading = function (isShow) {
        if (isShow) middle.classList.add('loading');
        else middle.classList.remove('loading');
    };
    
    const showData = function (dataNode) {
        const tempNode = dataNode.querySelector('.temperature');
    };

    const showAllData = function (weatherData) {
        locationNode.textContent = weatherData.locationName;
        showCurrentData(weatherData.current);  
        showHourlyData(weatherData.hourly);
        showConditionData(weatherData.condition);
    };

    const catchSearchLocation = function (fetcher) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showLoading(true);
            (async function () {
                try {
                    const weatherData = await fetcher(searchNode.value);
                    
                    showAllData(weatherData);
                    showLoading(false);
                } catch {
                    showLoading(false);
                    throw new Error('Failed to fetch.');
                }
                
            }());
            
        });
    };
    

    return {
        catchSearchLocation,
    };
}());

export default view;
