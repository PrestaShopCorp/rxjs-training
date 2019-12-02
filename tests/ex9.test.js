const {Observable} = require("rxjs");


const TicketingService = require('./helpers/TicketingService');
const Exercice9 = require("../exercices/ex9");
const {toArray} = require("rxjs/operators");

describe("Exercice9", () => {

    it('Return an observable', () => {
        const ex = new Exercice9(new TicketingService(0));
        expect(ex.buyTicketWithRetry('Pouet against the machine')).toBeInstanceOf(Observable);
    });

    it("Return an error if the API respond with error Invalid concertId", (done) => {

        const ticketingService = new TicketingService(0);
        const ex = new Exercice9(ticketingService);

        ex.buyTicketWithRetry("invalid-concert")
            .subscribe(
                null,
                (err) => {
                    expect(err.message).toEqual("Invalid concertId");
                    expect(ticketingService.calls).toBe(1);
                    done();
                },
                () => {
                    done(new Error("Observable must return an error when API respond with an error sInvalid concertId"));
                }
            );
    });

    it("Incremental retry on other errors", (done) => {

        const ticketingService = new TicketingService(450);
        const ex = new Exercice9(ticketingService);

        ex.buyTicketWithRetry("Chantal Goya")
            .pipe(toArray())
            .subscribe(
                (n) => {
                    expect(n.length).toEqual(1);
                    expect(n[0]).toEqual({ticketId: "662db134-801c-42d3-842f-2e649e89c151", concert: "Britney Spears tour 2020", status: "reserved"});
                    expect(ticketingService.calls).toEqual(4);
                    done();
                },
                (err) => {
                    done(new Error(`Unexpected error received : ${err.message}`));
                }
            )
    });

    it("Timeout after 3s", (done) => {

        const ticketingService = new TicketingService(4000);
        const ex = new Exercice9(ticketingService);

        ex.buyTicketWithRetry("2 Unlimited - No limit tour")
            .subscribe(
                null,
                (err) => {
                    expect(err.message.toLowerCase().includes('timeout')).toBe(true);
                    expect(ticketingService.calls).toBe(10);
                    done();
                },
                () => {
                    done(new Error("Observable must emit a Timeout error after 3s"));
                }
            );
    });

});

