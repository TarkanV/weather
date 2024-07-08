/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");



const controller = (function controller() {
    
    const loadEvents = function () {
        _view__WEBPACK_IMPORTED_MODULE_1__["default"].catchSearchLocation(_model__WEBPACK_IMPORTED_MODULE_0__["default"].fetchWeatherData);
    };
    return {
        loadEvents,  
    };
}());

controller.loadEvents();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);


/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
            locationName: weatherData.location.name,
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (model);


/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ0Y7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFJLHFCQUFxQiw4Q0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2YxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDJCQUEyQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0JBQW9CO0FBQzFDLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QywwQkFBMEIsYUFBYTtBQUN2Qyx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUNBQWlDO0FBQzVELDJCQUEyQixpQ0FBaUM7QUFDNUQsd0JBQXdCLDhCQUE4QjtBQUN0RCx3QkFBd0IsOEJBQThCO0FBQ3RELDJCQUEyQiw2REFBNkQ7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLE9BQU87QUFDakYsK0JBQStCLFFBQVEsS0FBSyxZQUFZO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsMkJBQTJCO0FBQ3ZFO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNsR3BCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTnNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5pbXBvcnQgdmlldyBmcm9tICcuL3ZpZXcnO1xyXG5cclxuY29uc3QgY29udHJvbGxlciA9IChmdW5jdGlvbiBjb250cm9sbGVyKCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBsb2FkRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZpZXcuY2F0Y2hTZWFyY2hMb2NhdGlvbihtb2RlbC5mZXRjaFdlYXRoZXJEYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvYWRFdmVudHMsICBcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5jb250cm9sbGVyLmxvYWRFdmVudHMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XHJcbiIsImNvbnN0IG1vZGVsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFwaUtleSA9ICc5ZTdjNTFiOWY1YmQ0MWNlYjBmOTUzMjAyNDA2MDYnO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnV1RGJyk7XHJcbiAgICBsZXQgZGF0YTtcclxuXHJcbiAgICBjb25zdCBtYWtlQ3VycmVudERhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IHdlYXRoZXJEYXRhLmN1cnJlbnQ7IFxyXG4gICAgICAgIGNvbnN0IGltZ1NyYyA9IGBodHRwczoke2N1cnJlbnREYXRhLmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRlbXBDOiBgJHtjdXJyZW50RGF0YS50ZW1wX2N9IMKwQ2AsXHJcbiAgICAgICAgICAgIHRlbXBGOiBgJHtjdXJyZW50RGF0YS50ZW1wX2Z9IMKwRmAsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbkltZzogaW1nU3JjLFxyXG4gICAgICAgIH07IFxyXG4gICAgIH07XHJcbiAgICAgY29uc3QgbWFrZUhvdXJseURhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBjb25zdCBmb3JlY2FzdGRheXMgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcclxuICAgICAgICBjb25zdCBjdXJyZW50RXBvY2ggPSB3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZF9lcG9jaDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEVwb2NoKTtcclxuICAgICAgICBjb25zdCB0b2RheUhvdXJseSA9IGZvcmVjYXN0ZGF5c1swXS5ob3VyLmZpbHRlcihcclxuICAgICAgICAgICAgKGhvdXIpID0+IChob3VyLnRpbWVfZXBvY2ggPiBjdXJyZW50RXBvY2gpLFxyXG4gICAgICAgICk7ICBcclxuICAgICAgICBjb25zdCB0b21vcnJvd0hvdXJseSA9IGZvcmVjYXN0ZGF5c1sxXS5ob3VyLnNsaWNlKDAsIC10b2RheUhvdXJseS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGhvdXJseTI0ID0gWy4uLnRvZGF5SG91cmx5LCAuLi50b21vcnJvd0hvdXJseV07XHJcbiAgICAgICAgY29uc3QgaG91cmx5ID0gaG91cmx5MjQubWFwKChob3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiBob3VyLnRpbWUuc3BsaXQoJyAnKVsxXSxcclxuICAgICAgICAgICAgICAgIHRlbXBDOiBgJHtob3VyLnRlbXBfY30gwrBDYCxcclxuICAgICAgICAgICAgICAgIHRlbXBGOiBgJHtob3VyLnRlbXBfZn0gwrBGYCwgXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb25JbWc6IGBodHRwczoke2hvdXIuY29uZGl0aW9uLmljb259YCxcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBob3VybHk7XHJcbiAgICAgfTtcclxuXHJcbiAgICAgY29uc3QgbWFrZUNvbmRpdGlvbkRhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgICAgZmVlbHNsaWtlQzogYCR7d2VhdGhlckRhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gwrBDYCxcclxuICAgICAgICAgICAgZmVlbHNsaWtlRjogYCR7d2VhdGhlckRhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCxcclxuICAgICAgICAgICAgd2luZEtQSDogYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGAsXHJcbiAgICAgICAgICAgIHdpbmRNUEg6IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9tcGh9IG1waGAsXHJcbiAgICAgICAgICAgIHJhaW5DaGFuY2U6IGAke3dlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgICAgICAgICAgdXY6IHdlYXRoZXJEYXRhLmN1cnJlbnQudXYsXHJcbiAgICAgICAgfTtcclxuICAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1ha2VEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9jYXRpb25OYW1lOiB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBjdXJyZW50OiBtYWtlQ3VycmVudERhdGEod2VhdGhlckRhdGEpLFxyXG4gICAgICAgICAgICBob3VybHk6IG1ha2VIb3VybHlEYXRhKHdlYXRoZXJEYXRhKSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBtYWtlQ29uZGl0aW9uRGF0YSh3ZWF0aGVyRGF0YSksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IGZldGNoV2VhdGhlckRhdGEgPSBhc3luYyBmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU1RBUlR+ISEhJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYExvY2F0aW9uIDogJHtsb2NhdGlvbn1gKTtcclxuICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFVSSUxvY2F0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVVSTCA9IGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7YXBpS2V5fWA7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25VUkwgPSBgJHtiYXNlVVJMfSZxPSR7VVJJTG9jYXRpb259JmRheXM9M2A7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChsb2NhdGlvblVSTCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBtYWtlRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUZW1wZXJhdHVyZSA6ICR7d2VhdGhlckRhdGEuY3VycmVudC50ZW1wX2N9YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmV0Y2ggcmVxdWVzdC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmZXRjaFdlYXRoZXJEYXRhLFxyXG4gICAgfTtcclxufSgpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vZGVsO1xyXG4iLCJjb25zdCB2aWV3ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHNlYXJjaE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XHJcbiAgICBjb25zdCBtaWRkbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWlkZGxlJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGxvY2F0aW9uTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xyXG4gICAgY29uc3QgY3VycmVudERhdGFOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtZGF0YScpO1xyXG4gICAgY29uc3QgdGVtcENOb2RlID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZS5jZWxzaXVzJyk7XHJcbiAgICBjb25zdCB0ZW1wRk5vZGUgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlLmZhaHJlbmhlaXQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25JbWcgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbi1pbWcgPiBpbWcnKTtcclxuICAgIFxyXG4gICAgY29uc3QgaG91cmx5SXRlbXNOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1pdGVtcycpO1xyXG4gICAgY29uc3QgaG91cmx5SXRlbVRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdXJseS1pdGVtLXRlbXBsYXRlJyk7XHJcblxyXG4gICAgY29uc3QgY29uZGl0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb25zJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHNob3dDdXJyZW50RGF0YSA9IGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xyXG4gICAgICAgIC8vIGxvY2F0aW9uTm9kZS50ZXh0Q29udGVudCA9IGAke2N1cnJlbnREYXRhLmxvY2F0aW9uLm5hbWV9YDtcclxuICAgICAgICB0ZW1wQ05vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YS50ZW1wQztcclxuICAgICAgICB0ZW1wRk5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YS50ZW1wRjsgXHJcbiAgICAgICAgY3VycmVudENvbmRpdGlvbkltZy5zcmMgPSBjdXJyZW50RGF0YS5jb25kaXRpb25JbWc7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2hvd0hvdXJseURhdGEgPSBmdW5jdGlvbiAoaG91cmx5RGF0YSkge1xyXG4gICAgICAgIGhvdXJseUl0ZW1zTm9kZS5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgICAgIGhvdXJseURhdGEuZm9yRWFjaCgoaG91cmx5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJseU5vZGUgPSBob3VybHlJdGVtVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICAgIGhvdXJseU5vZGUucXVlcnlTZWxlY3RvcignLnRpbWUnKS50ZXh0Q29udGVudCA9IGhvdXJseS50aW1lO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24taW1nID4gaW1nJykuc3JjID0gaG91cmx5LmNvbmRpdGlvbkltZztcclxuICAgICAgICAgICAgaG91cmx5Tm9kZS5xdWVyeVNlbGVjdG9yKCcuY2Vsc2l1cycpLnRleHRDb250ZW50ID0gaG91cmx5LnRlbXBDO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5mYWhyZW5oZWl0JykudGV4dENvbnRlbnQgPSBob3VybHkudGVtcEY7XHJcblxyXG4gICAgICAgICAgICBob3VybHlJdGVtc05vZGUuYXBwZW5kQ2hpbGQoaG91cmx5Tm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2hvd0NvbmRpdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29uZGl0aW9uRGF0YSkge1xyXG4gICAgICAgIC8vIFJlZWwgRmVlbFxyXG4gICAgICAgIGNvbnN0IHJlYWxGZWVsTm9kZSA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLnJlYWwtZmVlbCcpO1xyXG5cclxuICAgICAgICByZWFsRmVlbE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5tZXRyaWMnKS50ZXh0Q29udGVudCA9IGNvbmRpdGlvbkRhdGEuZmVlbHNsaWtlQztcclxuICAgICAgICByZWFsRmVlbE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5pbXBlcmlhbCcpLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YS5mZWVsc2xpa2VGO1xyXG4gICAgICAgIC8vIFdpbmRcclxuICAgICAgICBjb25zdCB3aW5kTm9kZSA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuXHJcbiAgICAgICAgd2luZE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5tZXRyaWMnKS50ZXh0Q29udGVudCA9IGNvbmRpdGlvbkRhdGEud2luZEtQSDtcclxuICAgICAgICB3aW5kTm9kZS5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlLmltcGVyaWFsJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLndpbmRNUEg7XHJcbiAgICAgICAgLy8gQ2hhbmNlIG9mIFJhaW5cclxuICAgICAgICBjb25zdCByYWluQ2hhbmNlID0gY29uZGl0aW9ucy5xdWVyeVNlbGVjdG9yKCcucmFpbi1jaGFuY2UnKTtcclxuXHJcbiAgICAgICAgcmFpbkNoYW5jZS5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLnJhaW5DaGFuY2U7XHJcbiAgICAgICAgLy8gVVYgSW5kZXhcclxuICAgICAgICBjb25zdCB1dkluZGV4ID0gY29uZGl0aW9ucy5xdWVyeVNlbGVjdG9yKCcudXYtaW5kZXgnKTtcclxuXHJcbiAgICAgICAgdXZJbmRleC5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLnV2O1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG93TG9hZGluZyA9IGZ1bmN0aW9uIChpc1Nob3cpIHtcclxuICAgICAgICBpZiAoaXNTaG93KSBtaWRkbGUuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xyXG4gICAgICAgIGVsc2UgbWlkZGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IHNob3dEYXRhID0gZnVuY3Rpb24gKGRhdGFOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcE5vZGUgPSBkYXRhTm9kZS5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2hvd0FsbERhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBsb2NhdGlvbk5vZGUudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5sb2NhdGlvbk5hbWU7XHJcbiAgICAgICAgc2hvd0N1cnJlbnREYXRhKHdlYXRoZXJEYXRhLmN1cnJlbnQpOyAgXHJcbiAgICAgICAgc2hvd0hvdXJseURhdGEod2VhdGhlckRhdGEuaG91cmx5KTtcclxuICAgICAgICBzaG93Q29uZGl0aW9uRGF0YSh3ZWF0aGVyRGF0YS5jb25kaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjYXRjaFNlYXJjaExvY2F0aW9uID0gZnVuY3Rpb24gKGZldGNoZXIpIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2hvd0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgIChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZmV0Y2hlcihzZWFyY2hOb2RlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzaG93QWxsRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2F0Y2hTZWFyY2hMb2NhdGlvbixcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aWV3O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==