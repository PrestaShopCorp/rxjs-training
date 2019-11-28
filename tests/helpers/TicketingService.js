const  {defer, of, throwError} = require("rxjs");
const {delay} = require('rxjs/operators');

class TicketingService {

    constructor(successAfterMillis) {
        this.successAfter = Date.now() + successAfterMillis;
        this.calls = 0;
    }

    buyTicket(concertId) {
        return defer(() => {
            this.calls += 1;
            if(concertId.includes('invalid')) {
                return throwError(new Error("Invalid concertId"));
            }
            if (this.successAfter <= Date.now()) {
                return of({ticketId: "662db134-801c-42d3-842f-2e649e89c151", concert: "Britney Spears tour 2020", status: "reserved"});
            }
            return throwError(new Error("Bad gateway unavailable"));
        });
    }

}

module.exports = TicketingService;