const view = (function () {
    const searchNode = document.getElementById('search');
    const form = document.querySelector('.search-form');
    
    const locationNode = document.querySelector('.location');
    const currentDataNode = document.querySelector('.current-data');
    const tempCNode = currentDataNode.querySelector('.temperature.celsius');
    const tempFNode = currentDataNode.querySelector('.temperature.fahrenheit');
    const currentConditionImg = currentDataNode.querySelector('.condition-img > img');

    const showCurrentData = function (currentData) {
        // locationNode.textContent = `${currentData.location.name}`;
        tempCNode.textContent = `${currentData.temp_c} °C`;
        tempFNode.textContent = `${currentData.temp_f} °F`; 
        
        const imgSrc = currentData.condition.icon.split('//')[1];
        console.log(imgSrc);
        currentConditionImg.src = `https://${imgSrc}`;
    };
    
    const showData = function (dataNode) {
        const tempNode = dataNode.querySelector('.temperature');
    };

    const showAllData = function (weatherData) {
        locationNode.textContent = weatherData.location.name;
        showCurrentData(weatherData.current);  
    };

    const catchSearchLocation = function (fetcher) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            (async function () {
                
                const weatherData = await fetcher(searchNode.value);
                
                showAllData(weatherData);
            }());
            
        });
    };
    

    return {
        catchSearchLocation,
    };
}());

export default view;
