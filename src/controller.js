import model from './model';
import view from './view';

const controller = (function controller() {
    
    const loadEvents = function () {
        view.catchSearchLocation(model.fetchWeatherData);
    };
    return {
        loadEvents,  
    };
}());

controller.loadEvents();

export default controller;
