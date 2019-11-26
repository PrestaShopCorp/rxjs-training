const {Observable} = require("rxjs");

const {ex1} = require("../exercices/ex1");
const {toArray, tap, distinct} = require("rxjs/operators");

describe("Exercice1", () => {

    it("return a list of numbers divisible by 42, between 100 and 5000", (done) => {

        const res = ex1();
        expect(res).toBeInstanceOf(Observable);
        res
            .pipe(
                tap(n => expect(n).toBeGreaterThanOrEqual(100)),
                tap(n => expect(n).toBeLessThanOrEqual(5000)),
                tap(n => expect(n % 42).toEqual(0)),
                distinct(),
                toArray()
            )
            .subscribe(
                n => {
                    expect(n.length).toEqual(117);
                    done();
                },
            null,
            null
        )
    });

});

