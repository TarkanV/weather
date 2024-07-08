const view = (function () {
    const searchNode = document.getElementById('search');
    const form = document.querySelector('.search-form');
    const middle = document.querySelector('.middle');
    
    const locationNode = document.querySelector('.location');
    const currentDataNode = document.querySelector('.current-data');
    const tempCNode = currentDataNode.querySelector('.temperature.metric');
    const tempFNode = currentDataNode.querySelector('.temperature.imperial');
    const currentConditionImg = currentDataNode.querySelector('.condition-img > img');
    
    const hourlyItemsNode = document.querySelector('.hourly-items');
    const hourlyItemTemplate = document.getElementById('hourly-item-template');

    const conditions = document.querySelector('.conditions');

    const unitSwitcherNode = document.querySelector('.unit-switcher'); 

    const searchErrorNode = document.querySelector('.search-error');
    
    const switchUnit = (function () {
        unitSwitcherNode.addEventListener('click', (e) => {
            document.querySelectorAll('.metric').forEach((unitNode) => {
                unitNode.classList.toggle('selected-unit');
            });
            document.querySelectorAll('.imperial').forEach((unitNode) => {
                unitNode.classList.toggle('selected-unit');
            });
        });
    }());
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
            hourlyNode.querySelector('.metric').textContent = hourly.tempC;
            hourlyNode.querySelector('.imperial').textContent = hourly.tempF;

            hourlyItemsNode.appendChild(hourlyNode);
        });
    };
    const showConditionData = function (conditionData) {
        // Reel Feel
        const realFeelNode = conditions.querySelector('.real-feel');

        realFeelNode.querySelector('.aspect-value.metric').textContent = conditionData.feelslikeC;
        realFeelNode.querySelector('.aspect-value.imperial').textContent = conditionData.feelslikeF;
        // Wind
        const windNode = conditions.querySelector('.wind');

        windNode.querySelector('.aspect-value.metric').textContent = conditionData.windKPH;
        windNode.querySelector('.aspect-value.imperial').textContent = conditionData.windMPH;
        // Chance of Rain
        const rainChance = conditions.querySelector('.rain-chance');

        rainChance.querySelector('.aspect-value').textContent = conditionData.rainChance;
        // UV Index
        const uvIndex = conditions.querySelector('.uv-index');

        uvIndex.querySelector('.aspect-value').textContent = conditionData.uv;
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
    const triggerSearchLocation = function (fetcher, location) {
        searchErrorNode.textContent = '';
        searchErrorNode.classList.remove('visible');
        
        showLoading(true);
            (async function () {
                try {
                    const weatherData = await fetcher(location);
                    if (weatherData.error) {
                        searchErrorNode.textContent = weatherData.error.message;
                        searchErrorNode.classList.add('visible');
                    }
                    else {
                        
                        showAllData(weatherData);
                        showLoading(false);
                    }
                   
                } catch (error) {
                    showLoading(false);
                    throw new Error(error);
                }
                
            }());
    };
    const catchSearchLocation = function (fetcher) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            triggerSearchLocation(fetcher, searchNode.value);
        });
    };
    
    return {
        catchSearchLocation,
        triggerSearchLocation,
    };
}());

export default view;
