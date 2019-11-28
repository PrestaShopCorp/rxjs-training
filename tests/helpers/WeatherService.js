const {Subject, of, defer, concat} = require("rxjs");
const {map, delay} = require('rxjs/operators');

class WeatherService {

    constructor() {
        this.initialTemp = 25;
        this.unit = 'C';
        this.tempSensor = new Subject();
    }

    watchTemperature() {

        return defer(() => concat(
            of(this.initialTemp).pipe(delay(50)),
            this.tempSensor
        )
            .pipe(map(t => {
                return {temp: t, unit: this.unit}
            })))
    }


}

module.exports = WeatherService;