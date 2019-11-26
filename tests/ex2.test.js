const {Observable, of, from, EMPTY} = require("rxjs");

const {ex2} = require("../exercices/ex2");
const {toArray, tap, distinct} = require("rxjs/operators");

describe("Exercice2", () => {

    it('Return an observable', () => {
        expect(ex2(from([]))).toBeInstanceOf(Observable);
        expect(ex2(EMPTY)).toBeInstanceOf(Observable);
    });

    it("Ignore the 3 first values emitted by input$", (done) => {

        const res = ex2(from(['A', 'B', 'C']));
        res
            .pipe(
                toArray()
            )
            .subscribe(
                n => {
                    expect(n.length).toEqual(0);
                    done();
                },
            null,
            null
        )
    });

    it("Ignore the 4 last values emitted by input$", (done) => {

        const res = ex2(from(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']));
        res
            .pipe(
                toArray()
            )
            .subscribe(
                n => {
                    expect(n.length).toEqual(2);
                    expect(n).toEqual(['D', 'E']);
                    done();
                },
                null,
                null
            )
    });

    it("Complete when the value 'STOP' is emitted by input$ ", (done) => {

        const res = ex2(from(['A', 'B', 'C', 'D', 'STOP', 'E', 'F', 'G', 'H', 'I']));
        res
            .pipe(
                toArray()
            )
            .subscribe(
                n => {
                    expect(n.length).toEqual(1);
                    expect(n).toEqual(['D']);
                    done();
                },
                null,
                null
            )
    });

    it("The 'STOP' value is ignored if present in the first 3 values emitted by input$", (done) => {

        const res = ex2(from(['A', 'STOP', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']));
        res
            .pipe(
                toArray()
            )
            .subscribe(
                n => {
                    expect(n.length).toEqual(3);
                    expect(n).toEqual(['C', 'D', 'E']);
                    done();
                },
                null,
                null
            )
    });

});

