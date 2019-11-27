const  {throwError, of, defer} = require("rxjs");
const md5Hex = require('md5-hex');

class ImmoService {

    constructor() {
        this.calls = 0;
    }

    estimate(address) {
        return defer(() => {
            this.calls += 1;
            if (!address.includes('safe-address') && (!(this.calls % 3 === 0) || address === "buggy-address")) {
                return throwError(new Error("Service unavailable"));
            }
            return of(parseInt(md5Hex(address).slice(0, 6), 16) % 400000 + 50000);
        });
    }

}

module.exports = ImmoService;