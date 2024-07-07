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
    
    const locationNode = document.querySelector('.location');
    const currentDataNode = document.querySelector('.current-data');
    const tempCNode = currentDataNode.querySelector('.temperature.celsius');
    const tempFNode = currentDataNode.querySelector('.temperature.fahrenheit');
    const currentConditionImg = currentDataNode.querySelector('.condition-img > img');
    
    const hourlyItemsNode = document.querySelector('.hourly-items');
    const hourlyItemTemplate = document.getElementById('hourly-item-template');
    
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
    
    const showData = function (dataNode) {
        const tempNode = dataNode.querySelector('.temperature');
    };

    const showAllData = function (weatherData) {
        locationNode.textContent = weatherData.locationName;
        showCurrentData(weatherData.current);  
        showHourlyData(weatherData.hourly);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ0Y7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFJLHFCQUFxQiw4Q0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2YxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDJCQUEyQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0JBQW9CO0FBQzFDLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QywwQkFBMEIsYUFBYTtBQUN2Qyx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLE9BQU87QUFDakYsK0JBQStCLFFBQVEsS0FBSyxZQUFZO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsMkJBQTJCO0FBQ3ZFO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDOURwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ05zQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2RlbCBmcm9tICcuL21vZGVsJztcclxuaW1wb3J0IHZpZXcgZnJvbSAnLi92aWV3JztcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gY29udHJvbGxlcigpIHtcclxuICAgIFxyXG4gICAgY29uc3QgbG9hZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2aWV3LmNhdGNoU2VhcmNoTG9jYXRpb24obW9kZWwuZmV0Y2hXZWF0aGVyRGF0YSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2FkRXZlbnRzLCAgXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuY29udHJvbGxlci5sb2FkRXZlbnRzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyO1xyXG4iLCJjb25zdCBtb2RlbCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhcGlLZXkgPSAnOWU3YzUxYjlmNWJkNDFjZWIwZjk1MzIwMjQwNjA2JztcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1dURicpO1xyXG4gICAgbGV0IGRhdGE7XHJcblxyXG4gICAgY29uc3QgbWFrZUN1cnJlbnREYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSB3ZWF0aGVyRGF0YS5jdXJyZW50OyBcclxuICAgICAgICBjb25zdCBpbWdTcmMgPSBgaHR0cHM6JHtjdXJyZW50RGF0YS5jb25kaXRpb24uaWNvbn1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZW1wQzogYCR7Y3VycmVudERhdGEudGVtcF9jfSDCsENgLFxyXG4gICAgICAgICAgICB0ZW1wRjogYCR7Y3VycmVudERhdGEudGVtcF9mfSDCsEZgLFxyXG4gICAgICAgICAgICBjb25kaXRpb25JbWc6IGltZ1NyYyxcclxuICAgICAgICB9OyBcclxuICAgICB9O1xyXG4gICAgIGNvbnN0IG1ha2VIb3VybHlEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3RkYXlzID0gd2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEVwb2NoID0gd2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWRfZXBvY2g7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRFcG9jaCk7XHJcbiAgICAgICAgY29uc3QgdG9kYXlIb3VybHkgPSBmb3JlY2FzdGRheXNbMF0uaG91ci5maWx0ZXIoXHJcbiAgICAgICAgICAgIChob3VyKSA9PiAoaG91ci50aW1lX2Vwb2NoID4gY3VycmVudEVwb2NoKSxcclxuICAgICAgICApOyAgXHJcbiAgICAgICAgY29uc3QgdG9tb3Jyb3dIb3VybHkgPSBmb3JlY2FzdGRheXNbMV0uaG91ci5zbGljZSgwLCAtdG9kYXlIb3VybHkubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBob3VybHkyNCA9IFsuLi50b2RheUhvdXJseSwgLi4udG9tb3Jyb3dIb3VybHldO1xyXG4gICAgICAgIGNvbnN0IGhvdXJseSA9IGhvdXJseTI0Lm1hcCgoaG91cikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VyID0ge1xyXG4gICAgICAgICAgICAgICAgdGltZTogaG91ci50aW1lLnNwbGl0KCcgJylbMV0sXHJcbiAgICAgICAgICAgICAgICB0ZW1wQzogYCR7aG91ci50ZW1wX2N9IMKwQ2AsXHJcbiAgICAgICAgICAgICAgICB0ZW1wRjogYCR7aG91ci50ZW1wX2Z9IMKwRmAsIFxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uSW1nOiBgaHR0cHM6JHtob3VyLmNvbmRpdGlvbi5pY29ufWAsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaG91cmx5O1xyXG4gICAgIH07XHJcblxyXG4gICAgY29uc3QgbWFrZURhdGEgPSBmdW5jdGlvbiAod2VhdGhlckRhdGEpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbk5hbWU6IHdlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IG1ha2VDdXJyZW50RGF0YSh3ZWF0aGVyRGF0YSksXHJcbiAgICAgICAgICAgIGhvdXJseTogbWFrZUhvdXJseURhdGEod2VhdGhlckRhdGEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBmZXRjaFdlYXRoZXJEYXRhID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NUQVJUfiEhIScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBMb2NhdGlvbiA6ICR7bG9jYXRpb259YCk7XHJcbiAgICAgICBcclxuICAgICAgICBjb25zdCBVUklMb2NhdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VVUkwgPSBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke2FwaUtleX1gO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uVVJMID0gYCR7YmFzZVVSTH0mcT0ke1VSSUxvY2F0aW9ufSZkYXlzPTNgO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobG9jYXRpb25VUkwpO1xyXG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xyXG4gICAgICAgICAgICBkYXRhID0gbWFrZURhdGEod2VhdGhlckRhdGEpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgVGVtcGVyYXR1cmUgOiAke3dlYXRoZXJEYXRhLmN1cnJlbnQudGVtcF9jfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZldGNoIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZmV0Y2hXZWF0aGVyRGF0YSxcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb2RlbDtcclxuIiwiY29uc3QgdmlldyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBzZWFyY2hOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xyXG4gICAgXHJcbiAgICBjb25zdCBsb2NhdGlvbk5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRhTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LWRhdGEnKTtcclxuICAgIGNvbnN0IHRlbXBDTm9kZSA9IGN1cnJlbnREYXRhTm9kZS5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUuY2Vsc2l1cycpO1xyXG4gICAgY29uc3QgdGVtcEZOb2RlID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZS5mYWhyZW5oZWl0Jyk7XHJcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSW1nID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24taW1nID4gaW1nJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGhvdXJseUl0ZW1zTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktaXRlbXMnKTtcclxuICAgIGNvbnN0IGhvdXJseUl0ZW1UZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VybHktaXRlbS10ZW1wbGF0ZScpO1xyXG4gICAgXHJcbiAgICBjb25zdCBzaG93Q3VycmVudERhdGEgPSBmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcclxuICAgICAgICAvLyBsb2NhdGlvbk5vZGUudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWA7XHJcbiAgICAgICAgdGVtcENOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEM7XHJcbiAgICAgICAgdGVtcEZOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEY7IFxyXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb25JbWcuc3JjID0gY3VycmVudERhdGEuY29uZGl0aW9uSW1nO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHNob3dIb3VybHlEYXRhID0gZnVuY3Rpb24gKGhvdXJseURhdGEpIHtcclxuICAgICAgICBob3VybHlJdGVtc05vZGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBcclxuICAgICAgICBob3VybHlEYXRhLmZvckVhY2goKGhvdXJseSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBob3VybHlOb2RlID0gaG91cmx5SXRlbVRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICBob3VybHlOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50aW1lJykudGV4dENvbnRlbnQgPSBob3VybHkudGltZTtcclxuICAgICAgICAgICAgaG91cmx5Tm9kZS5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uLWltZyA+IGltZycpLnNyYyA9IGhvdXJseS5jb25kaXRpb25JbWc7XHJcbiAgICAgICAgICAgIGhvdXJseU5vZGUucXVlcnlTZWxlY3RvcignLmNlbHNpdXMnKS50ZXh0Q29udGVudCA9IGhvdXJseS50ZW1wQztcclxuICAgICAgICAgICAgaG91cmx5Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZmFocmVuaGVpdCcpLnRleHRDb250ZW50ID0gaG91cmx5LnRlbXBGO1xyXG5cclxuICAgICAgICAgICAgaG91cmx5SXRlbXNOb2RlLmFwcGVuZENoaWxkKGhvdXJseU5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3Qgc2hvd0RhdGEgPSBmdW5jdGlvbiAoZGF0YU5vZGUpIHtcclxuICAgICAgICBjb25zdCB0ZW1wTm9kZSA9IGRhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG93QWxsRGF0YSA9IGZ1bmN0aW9uICh3ZWF0aGVyRGF0YSkge1xyXG4gICAgICAgIGxvY2F0aW9uTm9kZS50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmxvY2F0aW9uTmFtZTtcclxuICAgICAgICBzaG93Q3VycmVudERhdGEod2VhdGhlckRhdGEuY3VycmVudCk7ICBcclxuICAgICAgICBzaG93SG91cmx5RGF0YSh3ZWF0aGVyRGF0YS5ob3VybHkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjYXRjaFNlYXJjaExvY2F0aW9uID0gZnVuY3Rpb24gKGZldGNoZXIpIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBmZXRjaGVyKHNlYXJjaE5vZGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzaG93QWxsRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2F0Y2hTZWFyY2hMb2NhdGlvbixcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aWV3O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==