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
                    
                    } else if (weatherData) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTnNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5pbXBvcnQgdmlldyBmcm9tICcuL3ZpZXcnO1xyXG5cclxuY29uc3QgY29udHJvbGxlciA9IChmdW5jdGlvbiBjb250cm9sbGVyKCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBsb2FkRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZpZXcudHJpZ2dlclNlYXJjaExvY2F0aW9uKG1vZGVsLmZldGNoV2VhdGhlckRhdGEsICdzeWRuZXksIGF1c3RyYWxpYScpO1xyXG4gICAgICAgIHZpZXcuY2F0Y2hTZWFyY2hMb2NhdGlvbihtb2RlbC5mZXRjaFdlYXRoZXJEYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvYWRFdmVudHMsICBcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5jb250cm9sbGVyLmxvYWRFdmVudHMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XHJcbiIsImNvbnN0IG1vZGVsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFwaUtleSA9ICc5ZTdjNTFiOWY1YmQ0MWNlYjBmOTUzMjAyNDA2MDYnO1xyXG4gICAgXHJcbiAgICBsZXQgZGF0YTtcclxuXHJcbiAgICBjb25zdCBtYWtlQ3VycmVudERhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IHdlYXRoZXJEYXRhLmN1cnJlbnQ7IFxyXG4gICAgICAgIGNvbnN0IGltZ1NyYyA9IGBodHRwczoke2N1cnJlbnREYXRhLmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRlbXBDOiBgJHtjdXJyZW50RGF0YS50ZW1wX2N9IMKwQ2AsXHJcbiAgICAgICAgICAgIHRlbXBGOiBgJHtjdXJyZW50RGF0YS50ZW1wX2Z9IMKwRmAsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbkltZzogaW1nU3JjLFxyXG4gICAgICAgIH07IFxyXG4gICAgIH07XHJcbiAgICAgY29uc3QgbWFrZUhvdXJseURhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBjb25zdCBmb3JlY2FzdGRheXMgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcclxuICAgICAgICBjb25zdCBjdXJyZW50RXBvY2ggPSB3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZF9lcG9jaDtcclxuXHJcbiAgICAgICAgY29uc3QgdG9kYXlIb3VybHkgPSBmb3JlY2FzdGRheXNbMF0uaG91ci5maWx0ZXIoXHJcbiAgICAgICAgICAgIChob3VyKSA9PiAoaG91ci50aW1lX2Vwb2NoID4gY3VycmVudEVwb2NoKSxcclxuICAgICAgICApOyAgXHJcbiAgICAgICAgY29uc3QgdG9tb3Jyb3dIb3VybHkgPSBmb3JlY2FzdGRheXNbMV0uaG91ci5zbGljZSgwLCAtdG9kYXlIb3VybHkubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBob3VybHkyNCA9IFsuLi50b2RheUhvdXJseSwgLi4udG9tb3Jyb3dIb3VybHldO1xyXG4gICAgICAgIGNvbnN0IGhvdXJseSA9IGhvdXJseTI0Lm1hcCgoaG91cikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VyID0ge1xyXG4gICAgICAgICAgICAgICAgdGltZTogaG91ci50aW1lLnNwbGl0KCcgJylbMV0sXHJcbiAgICAgICAgICAgICAgICB0ZW1wQzogYCR7aG91ci50ZW1wX2N9IMKwQ2AsXHJcbiAgICAgICAgICAgICAgICB0ZW1wRjogYCR7aG91ci50ZW1wX2Z9IMKwRmAsIFxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uSW1nOiBgaHR0cHM6JHtob3VyLmNvbmRpdGlvbi5pY29ufWAsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhvdXJseTtcclxuICAgICB9O1xyXG5cclxuICAgICBjb25zdCBtYWtlQ29uZGl0aW9uRGF0YSA9IGZ1bmN0aW9uICh3ZWF0aGVyRGF0YSkge1xyXG4gICAgICAgIHJldHVybiB7IFxyXG4gICAgICAgICAgICBmZWVsc2xpa2VDOiBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfSDCsENgLFxyXG4gICAgICAgICAgICBmZWVsc2xpa2VGOiBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mfSDCsEZgLFxyXG4gICAgICAgICAgICB3aW5kS1BIOiBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LndpbmRfa3BofSBrbS9oYCxcclxuICAgICAgICAgICAgd2luZE1QSDogYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX21waH0gbXBoYCxcclxuICAgICAgICAgICAgcmFpbkNoYW5jZTogYCR7d2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgICAgICAgICB1djogd2VhdGhlckRhdGEuY3VycmVudC51dixcclxuICAgICAgICB9O1xyXG4gICAgIH07XHJcblxyXG4gICAgY29uc3QgbWFrZURhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbk5hbWU6IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLmNvdW50cnl9YCxcclxuICAgICAgICAgICAgY3VycmVudDogbWFrZUN1cnJlbnREYXRhKHdlYXRoZXJEYXRhKSxcclxuICAgICAgICAgICAgaG91cmx5OiBtYWtlSG91cmx5RGF0YSh3ZWF0aGVyRGF0YSksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogbWFrZUNvbmRpdGlvbkRhdGEod2VhdGhlckRhdGEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBmZXRjaFdlYXRoZXJEYXRhID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFVSSUxvY2F0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVVSTCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke2FwaUtleX1gO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uVVJMID0gYCR7YmFzZVVSTH0mcT0ke1VSSUxvY2F0aW9ufSZkYXlzPTNgO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobG9jYXRpb25VUkwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghd2VhdGhlckRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBtYWtlRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd2VhdGhlckRhdGE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZmV0Y2hXZWF0aGVyRGF0YSxcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb2RlbDtcclxuIiwiY29uc3QgdmlldyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBzZWFyY2hOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xyXG4gICAgY29uc3QgbWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZScpO1xyXG4gICAgXHJcbiAgICBjb25zdCBsb2NhdGlvbk5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRhTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LWRhdGEnKTtcclxuICAgIGNvbnN0IHRlbXBDTm9kZSA9IGN1cnJlbnREYXRhTm9kZS5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUubWV0cmljJyk7XHJcbiAgICBjb25zdCB0ZW1wRk5vZGUgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlLmltcGVyaWFsJyk7XHJcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSW1nID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24taW1nID4gaW1nJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGhvdXJseUl0ZW1zTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktaXRlbXMnKTtcclxuICAgIGNvbnN0IGhvdXJseUl0ZW1UZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VybHktaXRlbS10ZW1wbGF0ZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9ucycpO1xyXG5cclxuICAgIGNvbnN0IHVuaXRTd2l0Y2hlck5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdC1zd2l0Y2hlcicpOyBcclxuXHJcbiAgICBjb25zdCBzZWFyY2hFcnJvck5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWVycm9yJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHN3aXRjaFVuaXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHVuaXRTd2l0Y2hlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljJykuZm9yRWFjaCgodW5pdE5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHVuaXROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkLXVuaXQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbXBlcmlhbCcpLmZvckVhY2goKHVuaXROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1bml0Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZC11bml0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSgpKTtcclxuICAgIGNvbnN0IHNob3dDdXJyZW50RGF0YSA9IGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xyXG4gICAgICAgIC8vIGxvY2F0aW9uTm9kZS50ZXh0Q29udGVudCA9IGAke2N1cnJlbnREYXRhLmxvY2F0aW9uLm5hbWV9YDtcclxuICAgICAgICB0ZW1wQ05vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YS50ZW1wQztcclxuICAgICAgICB0ZW1wRk5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YS50ZW1wRjsgXHJcbiAgICAgICAgY3VycmVudENvbmRpdGlvbkltZy5zcmMgPSBjdXJyZW50RGF0YS5jb25kaXRpb25JbWc7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2hvd0hvdXJseURhdGEgPSBmdW5jdGlvbiAoaG91cmx5RGF0YSkge1xyXG4gICAgICAgIGhvdXJseUl0ZW1zTm9kZS5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgICAgIGhvdXJseURhdGEuZm9yRWFjaCgoaG91cmx5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJseU5vZGUgPSBob3VybHlJdGVtVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICAgIGhvdXJseU5vZGUucXVlcnlTZWxlY3RvcignLnRpbWUnKS50ZXh0Q29udGVudCA9IGhvdXJseS50aW1lO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24taW1nID4gaW1nJykuc3JjID0gaG91cmx5LmNvbmRpdGlvbkltZztcclxuICAgICAgICAgICAgaG91cmx5Tm9kZS5xdWVyeVNlbGVjdG9yKCcubWV0cmljJykudGV4dENvbnRlbnQgPSBob3VybHkudGVtcEM7XHJcbiAgICAgICAgICAgIGhvdXJseU5vZGUucXVlcnlTZWxlY3RvcignLmltcGVyaWFsJykudGV4dENvbnRlbnQgPSBob3VybHkudGVtcEY7XHJcblxyXG4gICAgICAgICAgICBob3VybHlJdGVtc05vZGUuYXBwZW5kQ2hpbGQoaG91cmx5Tm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2hvd0NvbmRpdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29uZGl0aW9uRGF0YSkge1xyXG4gICAgICAgIC8vIFJlZWwgRmVlbFxyXG4gICAgICAgIGNvbnN0IHJlYWxGZWVsTm9kZSA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLnJlYWwtZmVlbCcpO1xyXG5cclxuICAgICAgICByZWFsRmVlbE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5tZXRyaWMnKS50ZXh0Q29udGVudCA9IGNvbmRpdGlvbkRhdGEuZmVlbHNsaWtlQztcclxuICAgICAgICByZWFsRmVlbE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5pbXBlcmlhbCcpLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YS5mZWVsc2xpa2VGO1xyXG4gICAgICAgIC8vIFdpbmRcclxuICAgICAgICBjb25zdCB3aW5kTm9kZSA9IGNvbmRpdGlvbnMucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuXHJcbiAgICAgICAgd2luZE5vZGUucXVlcnlTZWxlY3RvcignLmFzcGVjdC12YWx1ZS5tZXRyaWMnKS50ZXh0Q29udGVudCA9IGNvbmRpdGlvbkRhdGEud2luZEtQSDtcclxuICAgICAgICB3aW5kTm9kZS5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlLmltcGVyaWFsJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLndpbmRNUEg7XHJcbiAgICAgICAgLy8gQ2hhbmNlIG9mIFJhaW5cclxuICAgICAgICBjb25zdCByYWluQ2hhbmNlID0gY29uZGl0aW9ucy5xdWVyeVNlbGVjdG9yKCcucmFpbi1jaGFuY2UnKTtcclxuXHJcbiAgICAgICAgcmFpbkNoYW5jZS5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLnJhaW5DaGFuY2U7XHJcbiAgICAgICAgLy8gVVYgSW5kZXhcclxuICAgICAgICBjb25zdCB1dkluZGV4ID0gY29uZGl0aW9ucy5xdWVyeVNlbGVjdG9yKCcudXYtaW5kZXgnKTtcclxuXHJcbiAgICAgICAgdXZJbmRleC5xdWVyeVNlbGVjdG9yKCcuYXNwZWN0LXZhbHVlJykudGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhLnV2O1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG93TG9hZGluZyA9IGZ1bmN0aW9uIChpc1Nob3cpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNTaG93KSBtaWRkbGUuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xyXG4gICAgICAgIGVsc2UgbWlkZGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcclxuICAgICAgICBcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IHNob3dEYXRhID0gZnVuY3Rpb24gKGRhdGFOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcE5vZGUgPSBkYXRhTm9kZS5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2hvd0FsbERhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICBsb2NhdGlvbk5vZGUudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5sb2NhdGlvbk5hbWU7XHJcbiAgICAgICAgc2hvd0N1cnJlbnREYXRhKHdlYXRoZXJEYXRhLmN1cnJlbnQpOyAgXHJcbiAgICAgICAgc2hvd0hvdXJseURhdGEod2VhdGhlckRhdGEuaG91cmx5KTtcclxuICAgICAgICBzaG93Q29uZGl0aW9uRGF0YSh3ZWF0aGVyRGF0YS5jb25kaXRpb24pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyaWdnZXJTZWFyY2hMb2NhdGlvbiA9IGZ1bmN0aW9uIChmZXRjaGVyLCBsb2NhdGlvbikge1xyXG4gICAgICAgIHNlYXJjaEVycm9yTm9kZS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgIHNlYXJjaEVycm9yTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2hvd0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgIChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZmV0Y2hlcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlYXRoZXJEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVycm9yTm9kZS50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVycm9yTm9kZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3ZWF0aGVyRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QWxsRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkaW5nKGZhbHNlKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3dMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2F0Y2hTZWFyY2hMb2NhdGlvbiA9IGZ1bmN0aW9uIChmZXRjaGVyKSB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJTZWFyY2hMb2NhdGlvbihmZXRjaGVyLCBzZWFyY2hOb2RlLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2F0Y2hTZWFyY2hMb2NhdGlvbixcclxuICAgICAgICB0cmlnZ2VyU2VhcmNoTG9jYXRpb24sXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmlldztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=