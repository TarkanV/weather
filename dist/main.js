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
    const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
    console.log('WTF');
    let data;

    const makeCurrentData = function (currentData) {

        const imgSrcBase = currentData.condition.icon.split('//')[1];
        const imgSrc = `https://${imgSrcBase}`;
        return {
            tempC: currentData.temp_c,
            tempF: currentData.temp_f,
            conditionImg: imgSrc,
        }; 
     };
     const makeHourlyData = function () {
 
     };

    const makeData = function (weatherData) {
        return {
            locationName: weatherData.location.name,
            current: makeCurrentData(weatherData.current),
            hourly: makeHourlyData(weatherData.forecast),
        };
    };
    

    const fetchWeatherData = async function (location) {
        console.log('START~!!!');
        console.log(`Location : ${location}`);
        const URILocation = encodeURIComponent(location);
        const url = `${baseURL}&q=${URILocation}`;
        try {
            const response = await fetch(url);
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

    const showCurrentData = function (currentData) {
        // locationNode.textContent = `${currentData.location.name}`;
        tempCNode.textContent = currentData.tempC;
        tempFNode.textContent = currentData.tempF; 
        currentConditionImg.src = currentData.conditionImg;
    };
    
    const showData = function (dataNode) {
        const tempNode = dataNode.querySelector('.temperature');
    };

    const showAllData = function (weatherData) {
        locationNode.textContent = weatherData.locationName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ0Y7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFJLHFCQUFxQiw4Q0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2YxQjtBQUNBO0FBQ0Esc0VBQXNFLE9BQU87QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQSx1QkFBdUIsUUFBUSxLQUFLLFlBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywyQkFBMkI7QUFDdkU7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDcERyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDBCQUEwQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUM3Q3BCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTnNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5pbXBvcnQgdmlldyBmcm9tICcuL3ZpZXcnO1xyXG5cclxuY29uc3QgY29udHJvbGxlciA9IChmdW5jdGlvbiBjb250cm9sbGVyKCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBsb2FkRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZpZXcuY2F0Y2hTZWFyY2hMb2NhdGlvbihtb2RlbC5mZXRjaFdlYXRoZXJEYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvYWRFdmVudHMsICBcclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG5jb250cm9sbGVyLmxvYWRFdmVudHMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XHJcbiIsImNvbnN0IG1vZGVsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFwaUtleSA9ICc5ZTdjNTFiOWY1YmQ0MWNlYjBmOTUzMjAyNDA2MDYnO1xyXG4gICAgY29uc3QgYmFzZVVSTCA9IGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7YXBpS2V5fWA7XHJcbiAgICBjb25zb2xlLmxvZygnV1RGJyk7XHJcbiAgICBsZXQgZGF0YTtcclxuXHJcbiAgICBjb25zdCBtYWtlQ3VycmVudERhdGEgPSBmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcclxuXHJcbiAgICAgICAgY29uc3QgaW1nU3JjQmFzZSA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbi5pY29uLnNwbGl0KCcvLycpWzFdO1xyXG4gICAgICAgIGNvbnN0IGltZ1NyYyA9IGBodHRwczovLyR7aW1nU3JjQmFzZX1gO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRlbXBDOiBjdXJyZW50RGF0YS50ZW1wX2MsXHJcbiAgICAgICAgICAgIHRlbXBGOiBjdXJyZW50RGF0YS50ZW1wX2YsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbkltZzogaW1nU3JjLFxyXG4gICAgICAgIH07IFxyXG4gICAgIH07XHJcbiAgICAgY29uc3QgbWFrZUhvdXJseURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiBcclxuICAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1ha2VEYXRhID0gZnVuY3Rpb24gKHdlYXRoZXJEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9jYXRpb25OYW1lOiB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBjdXJyZW50OiBtYWtlQ3VycmVudERhdGEod2VhdGhlckRhdGEuY3VycmVudCksXHJcbiAgICAgICAgICAgIGhvdXJseTogbWFrZUhvdXJseURhdGEod2VhdGhlckRhdGEuZm9yZWNhc3QpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG4gICAgY29uc3QgZmV0Y2hXZWF0aGVyRGF0YSA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTVEFSVH4hISEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgTG9jYXRpb24gOiAke2xvY2F0aW9ufWApO1xyXG4gICAgICAgIGNvbnN0IFVSSUxvY2F0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBgJHtiYXNlVVJMfSZxPSR7VVJJTG9jYXRpb259YDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBtYWtlRGF0YSh3ZWF0aGVyRGF0YSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUZW1wZXJhdHVyZSA6ICR7d2VhdGhlckRhdGEuY3VycmVudC50ZW1wX2N9YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmV0Y2ggcmVxdWVzdC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmZXRjaFdlYXRoZXJEYXRhLFxyXG4gICAgfTtcclxufSgpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vZGVsO1xyXG4iLCJjb25zdCB2aWV3ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHNlYXJjaE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGxvY2F0aW9uTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xyXG4gICAgY29uc3QgY3VycmVudERhdGFOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtZGF0YScpO1xyXG4gICAgY29uc3QgdGVtcENOb2RlID0gY3VycmVudERhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZS5jZWxzaXVzJyk7XHJcbiAgICBjb25zdCB0ZW1wRk5vZGUgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlLmZhaHJlbmhlaXQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25JbWcgPSBjdXJyZW50RGF0YU5vZGUucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbi1pbWcgPiBpbWcnKTtcclxuXHJcbiAgICBjb25zdCBzaG93Q3VycmVudERhdGEgPSBmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcclxuICAgICAgICAvLyBsb2NhdGlvbk5vZGUudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWA7XHJcbiAgICAgICAgdGVtcENOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEM7XHJcbiAgICAgICAgdGVtcEZOb2RlLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcEY7IFxyXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb25JbWcuc3JjID0gY3VycmVudERhdGEuY29uZGl0aW9uSW1nO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3Qgc2hvd0RhdGEgPSBmdW5jdGlvbiAoZGF0YU5vZGUpIHtcclxuICAgICAgICBjb25zdCB0ZW1wTm9kZSA9IGRhdGFOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG93QWxsRGF0YSA9IGZ1bmN0aW9uICh3ZWF0aGVyRGF0YSkge1xyXG4gICAgICAgIGxvY2F0aW9uTm9kZS50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmxvY2F0aW9uTmFtZTtcclxuICAgICAgICBzaG93Q3VycmVudERhdGEod2VhdGhlckRhdGEuY3VycmVudCk7ICBcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2F0Y2hTZWFyY2hMb2NhdGlvbiA9IGZ1bmN0aW9uIChmZXRjaGVyKSB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZmV0Y2hlcihzZWFyY2hOb2RlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2hvd0FsbERhdGEod2VhdGhlckRhdGEpO1xyXG4gICAgICAgICAgICB9KCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhdGNoU2VhcmNoTG9jYXRpb24sXHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmlldztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=