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
        _view__WEBPACK_IMPORTED_MODULE_1__["default"].triggerSearchLocation(_model__WEBPACK_IMPORTED_MODULE_0__["default"].fetchWeatherData, 'sydney, australia');
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
            
        const URILocation = encodeURIComponent(location);

        const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
        const locationURL = `${baseURL}&q=${URILocation}&days=3`;
        try {
            const response = await fetch(locationURL);
            
            const weatherData = await response.json();
           
            if (!weatherData.error) {
                data = makeData(weatherData);
                return data;
            }
            return weatherData;
                
        } catch (error) {
            throw new Error(error);
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
                    
                    } else if (!weatherData) {
                                         
                    } else {     
                        
                        showAllData(weatherData);
        
                        showLoading(false);
                    }
                   
                } catch (error) {
                    // showLoading(false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ05zQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2RlbCBmcm9tICcuL21vZGVsJztcclxuaW1wb3J0IHZpZXcgZnJvbSAnLi92aWV3JztcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gY29udHJvbGxlcigpIHtcclxuICAgIFxyXG4gICAgY29uc3QgbG9hZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2aWV3LnRyaWdnZXJTZWFyY2hMb2NhdGlvbihtb2RlbC5mZXRjaFdlYXRoZXJEYXRhLCAnc3lkbmV5LCBhdXN0cmFsaWEnKTtcclxuICAgICAgICB2aWV3LmNhdGNoU2VhcmNoTG9jYXRpb24obW9kZWwuZmV0Y2hXZWF0aGVyRGF0YSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2FkRXZlbnRzLCAgXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuY29udHJvbGxlci5sb2FkRXZlbnRzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyO1xyXG4iLCJjb25zdCBtb2RlbCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhcGlLZXkgPSAnOWU3YzUxYjlmNWJkNDFjZWIwZjk1MzIwMjQwNjA2JztcclxuICAgIFxyXG4gICAgbGV0IGRhdGE7XHJcblxyXG4gICAgY29uc3QgbWFrZUN1cnJlbnREYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSB3ZWF0aGVyRGF0YS5jdXJyZW50OyBcclxuICAgICAgICBjb25zdCBpbWdTcmMgPSBgaHR0cHM6JHtjdXJyZW50RGF0YS5jb25kaXRpb24uaWNvbn1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZW1wQzogYCR7Y3VycmVudERhdGEudGVtcF9jfSDCsENgLFxyXG4gICAgICAgICAgICB0ZW1wRjogYCR7Y3VycmVudERhdGEudGVtcF9mfSDCsEZgLFxyXG4gICAgICAgICAgICBjb25kaXRpb25JbWc6IGltZ1NyYyxcclxuICAgICAgICB9OyBcclxuICAgICB9O1xyXG4gICAgIGNvbnN0IG1ha2VIb3VybHlEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3RkYXlzID0gd2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEVwb2NoID0gd2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWRfZXBvY2g7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvZGF5SG91cmx5ID0gZm9yZWNhc3RkYXlzWzBdLmhvdXIuZmlsdGVyKFxyXG4gICAgICAgICAgICAoaG91cikgPT4gKGhvdXIudGltZV9lcG9jaCA+IGN1cnJlbnRFcG9jaCksXHJcbiAgICAgICAgKTsgIFxyXG4gICAgICAgIGNvbnN0IHRvbW9ycm93SG91cmx5ID0gZm9yZWNhc3RkYXlzWzFdLmhvdXIuc2xpY2UoMCwgLXRvZGF5SG91cmx5Lmxlbmd0aCk7XHJcbiAgICAgICAgY29uc3QgaG91cmx5MjQgPSBbLi4udG9kYXlIb3VybHksIC4uLnRvbW9ycm93SG91cmx5XTtcclxuICAgICAgICBjb25zdCBob3VybHkgPSBob3VybHkyNC5tYXAoKGhvdXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SG91ciA9IHtcclxuICAgICAgICAgICAgICAgIHRpbWU6IGhvdXIudGltZS5zcGxpdCgnICcpWzFdLFxyXG4gICAgICAgICAgICAgICAgdGVtcEM6IGAke2hvdXIudGVtcF9jfSDCsENgLFxyXG4gICAgICAgICAgICAgICAgdGVtcEY6IGAke2hvdXIudGVtcF9mfSDCsEZgLCBcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbkltZzogYGh0dHBzOiR7aG91ci5jb25kaXRpb24uaWNvbn1gLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBob3VybHk7XHJcbiAgICAgfTtcclxuXHJcbiAgICAgY29uc3QgbWFrZUNvbmRpdGlvbkRhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgICAgZmVlbHNsaWtlQzogYCR7d2VhdGhlckRhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gwrBDYCxcclxuICAgICAgICAgICAgZmVlbHNsaWtlRjogYCR7d2VhdGhlckRhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCxcclxuICAgICAgICAgICAgd2luZEtQSDogYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGAsXHJcbiAgICAgICAgICAgIHdpbmRNUEg6IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9tcGh9IG1waGAsXHJcbiAgICAgICAgICAgIHJhaW5DaGFuY2U6IGAke3dlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgICAgICAgICAgdXY6IHdlYXRoZXJEYXRhLmN1cnJlbnQudXYsXHJcbiAgICAgICAgfTtcclxuICAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1ha2VEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9jYXRpb25OYW1lOiBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lfSwgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWAsXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IG1ha2VDdXJyZW50RGF0YSh3ZWF0aGVyRGF0YSksXHJcbiAgICAgICAgICAgIGhvdXJseTogbWFrZUhvdXJseURhdGEod2VhdGhlckRhdGEpLFxyXG4gICAgICAgICAgICBjb25kaXRpb246IG1ha2VDb25kaXRpb25EYXRhKHdlYXRoZXJEYXRhKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgZmV0Y2hXZWF0aGVyRGF0YSA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBjb25zdCBVUklMb2NhdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VVUkwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHthcGlLZXl9YDtcclxuICAgICAgICBjb25zdCBsb2NhdGlvblVSTCA9IGAke2Jhc2VVUkx9JnE9JHtVUklMb2NhdGlvbn0mZGF5cz0zYDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGxvY2F0aW9uVVJMKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXdlYXRoZXJEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbWFrZURhdGEod2VhdGhlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGZldGNoV2VhdGhlckRhdGEsXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9kZWw7XHJcbiIsImNvbnN0IHZpZXcgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKTtcclxuICAgIGNvbnN0IG1pZGRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWRkbGUnKTtcclxuICAgIFxyXG4gICAgY29uc3QgbG9jYXRpb25Ob2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YU5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1kYXRhJyk7XHJcbiAgICBjb25zdCB0ZW1wQ05vZGUgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlLm1ldHJpYycpO1xyXG4gICAgY29uc3QgdGVtcEZOb2RlID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZS5pbXBlcmlhbCcpO1xyXG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbkltZyA9IGN1cnJlbnREYXRhTm9kZS5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uLWltZyA+IGltZycpO1xyXG4gICAgXHJcbiAgICBjb25zdCBob3VybHlJdGVtc05vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cmx5LWl0ZW1zJyk7XHJcbiAgICBjb25zdCBob3VybHlJdGVtVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cmx5LWl0ZW0tdGVtcGxhdGUnKTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbnMnKTtcclxuXHJcbiAgICBjb25zdCB1bml0U3dpdGNoZXJOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuaXQtc3dpdGNoZXInKTsgXHJcblxyXG4gICAgY29uc3Qgc2VhcmNoRXJyb3JOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1lcnJvcicpO1xyXG4gICAgXHJcbiAgICBjb25zdCBzd2l0Y2hVbml0ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB1bml0U3dpdGNoZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpYycpLmZvckVhY2goKHVuaXROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1bml0Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZC11bml0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW1wZXJpYWwnKS5mb3JFYWNoKCh1bml0Tm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdW5pdE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQtdW5pdCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiAgICBjb25zdCBzaG93Q3VycmVudERhdGEgPSBmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcclxuICAgICAgICAvLyBsb2NhdGlvbk5vZGUudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWA7XHJcbiAgICAgICAgdGVtcENOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEM7XHJcbiAgICAgICAgdGVtcEZOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEY7IFxyXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb25JbWcuc3JjID0gY3VycmVudERhdGEuY29uZGl0aW9uSW1nO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHNob3dIb3VybHlEYXRhID0gZnVuY3Rpb24gKGhvdXJseURhdGEpIHtcclxuICAgICAgICBob3VybHlJdGVtc05vZGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBcclxuICAgICAgICBob3VybHlEYXRhLmZvckVhY2goKGhvdXJseSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBob3VybHlOb2RlID0gaG91cmx5SXRlbVRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50aW1lJykudGV4dENvbnRlbnQgPSBob3VybHkudGltZTtcclxuICAgICAgICAgICAgaG91cmx5Tm9kZS5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uLWltZyA+IGltZycpLnNyYyA9IGhvdXJseS5jb25kaXRpb25JbWc7XHJcbiAgICAgICAgICAgIGhvdXJseU5vZGUucXVlcnlTZWxlY3RvcignLm1ldHJpYycpLnRleHRDb250ZW50ID0gaG91cmx5LnRlbXBDO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5pbXBlcmlhbCcpLnRleHRDb250ZW50ID0gaG91cmx5LnRlbXBGO1xyXG5cclxuICAgICAgICAgICAgaG91cmx5SXRlbXNOb2RlLmFwcGVuZENoaWxkKGhvdXJseU5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHNob3dDb25kaXRpb25EYXRhID0gZnVuY3Rpb24gKGNvbmRpdGlvbkRhdGEpIHtcclxuICAgICAgICAvLyBSZWVsIEZlZWxcclxuICAgICAgICBjb25zdCByZWFsRmVlbE5vZGUgPSBjb25kaXRpb25zLnF1ZXJ5U2VsZWN0b3IoJy5yZWFsLWZlZWwnKTtcclxuXHJcbiAgICAgICAgcmVhbEZlZWxOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5hc3BlY3QtdmFsdWUubWV0cmljJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLmZlZWxzbGlrZUM7XHJcbiAgICAgICAgcmVhbEZlZWxOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5hc3BlY3QtdmFsdWUuaW1wZXJpYWwnKS50ZXh0Q29udGVudCA9IGNvbmRpdGlvbkRhdGEuZmVlbHNsaWtlRjtcclxuICAgICAgICAvLyBXaW5kXHJcbiAgICAgICAgY29uc3Qgd2luZE5vZGUgPSBjb25kaXRpb25zLnF1ZXJ5U2VsZWN0b3IoJy53aW5kJyk7XHJcblxyXG4gICAgICAgIHdpbmROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5hc3BlY3QtdmFsdWUubWV0cmljJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLndpbmRLUEg7XHJcbiAgICAgICAgd2luZE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5pbXBlcmlhbCcpLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YS53aW5kTVBIO1xyXG4gICAgICAgIC8vIENoYW5jZSBvZiBSYWluXHJcbiAgICAgICAgY29uc3QgcmFpbkNoYW5jZSA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLnJhaW4tY2hhbmNlJyk7XHJcblxyXG4gICAgICAgIHJhaW5DaGFuY2UucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZScpLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YS5yYWluQ2hhbmNlO1xyXG4gICAgICAgIC8vIFVWIEluZGV4XHJcbiAgICAgICAgY29uc3QgdXZJbmRleCA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLnV2LWluZGV4Jyk7XHJcblxyXG4gICAgICAgIHV2SW5kZXgucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZScpLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YS51djtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2hvd0xvYWRpbmcgPSBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlzU2hvdykgbWlkZGxlLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcclxuICAgICAgICBlbHNlIG1pZGRsZS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBzaG93RGF0YSA9IGZ1bmN0aW9uIChkYXRhTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBOb2RlID0gZGF0YU5vZGUucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNob3dBbGxEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgbG9jYXRpb25Ob2RlLnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEubG9jYXRpb25OYW1lO1xyXG4gICAgICAgIHNob3dDdXJyZW50RGF0YSh3ZWF0aGVyRGF0YS5jdXJyZW50KTsgIFxyXG4gICAgICAgIHNob3dIb3VybHlEYXRhKHdlYXRoZXJEYXRhLmhvdXJseSk7XHJcbiAgICAgICAgc2hvd0NvbmRpdGlvbkRhdGEod2VhdGhlckRhdGEuY29uZGl0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCB0cmlnZ2VyU2VhcmNoTG9jYXRpb24gPSBmdW5jdGlvbiAoZmV0Y2hlciwgbG9jYXRpb24pIHtcclxuICAgICAgICBzZWFyY2hFcnJvck5vZGUudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICBzZWFyY2hFcnJvck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNob3dMb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IGZldGNoZXIobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3ZWF0aGVyRGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hFcnJvck5vZGUudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hFcnJvck5vZGUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0FsbERhdGEod2VhdGhlckRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3dMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2F0Y2hTZWFyY2hMb2NhdGlvbiA9IGZ1bmN0aW9uIChmZXRjaGVyKSB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJTZWFyY2hMb2NhdGlvbihmZXRjaGVyLCBzZWFyY2hOb2RlLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2F0Y2hTZWFyY2hMb2NhdGlvbixcclxuICAgICAgICB0cmlnZ2VyU2VhcmNoTG9jYXRpb24sXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmlldztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=