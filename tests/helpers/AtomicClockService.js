const  {interval, of, defer, concat} = require("rxjs");
const {map, delay} = require('rxjs/operators');

class AtomicClockService {

    constructor() {
        this._getDate = () => new Date();
    }

    watchTime() {

        const dateObj = () => {
            const d = this._getDate();
            return {
                hour: d.getHours(),
                minute: d.getMinutes(),
                second: d.getSeconds(),
            }
        };

        return defer(() => concat(
            of(dateObj()).pipe(delay(50)),
            interval(1000).pipe(map(dateObj))
        ));
    }

}

module.exports = AtomicClockService;