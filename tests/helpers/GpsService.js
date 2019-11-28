const  {defer, of} = require("rxjs");
const {delay} = require('rxjs/operators');

class GpsService {

    constructor() {
        this.city = 'Paris';
        this.country = 'France';

    }

    getCurrentLocation() {
        return defer(() => of({city_name: this.city, country: this.country}).pipe(delay(42)));
    }

}

module.exports = GpsService ;