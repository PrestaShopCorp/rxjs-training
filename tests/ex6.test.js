const { Observable } = require("rxjs");

const ImmoService = require("./helpers/ImmoService");
const Exercice6 = require("../exercices/ex6");
const { toArray } = require("rxjs/operators");

describe("Exercice6", () => {
  beforeEach(() => {
    this.immoService = new ImmoService();
    this.exercice = new Exercice6(this.immoService);
  });

  it("Return an observable", () => {
    expect(this.exercice.estimateWithRetry(["safe-address"])).toBeInstanceOf(
      Observable
    );
  });

  it("Emit a value for each of the address to estimate", (done) => {
    this.exercice
      .estimateWithRetry(["safe-address-1", "safe-address-2", "safe-address-3"])
      .pipe(toArray())
      .subscribe(
        (n) => {
          expect(n.length).toEqual(3);
          expect(n).toEqual([
            {
              address: "safe-address-1",
              estimation: 392826,
            },
            {
              address: "safe-address-2",
              estimation: 234730,
            },
            {
              address: "safe-address-3",
              estimation: 193214,
            },
          ]);
          done();
        },
        (err) => console.error(err),
        null
      );
  });

  it("Retry on API error", (done) => {
    this.exercice
      .estimateWithRetry(["address-1", "address-2"])
      .pipe(toArray())
      .subscribe(
        (n) => {
          expect(n.length).toEqual(2);
          expect(n).toEqual([
            {
              address: "address-1",
              estimation: 103836,
            },
            {
              address: "address-2",
              estimation: 231926,
            },
          ]);
          done();
        },
        (err) => {
          console.error(err);
          expect(true).toBe(false);
        },
        null
      );
  });

  it("Call the API 4 times per address max", (done) => {
    this.exercice
      .estimateWithRetry(["buggy-address"])
      .pipe(toArray())
      .subscribe(
        (n) => {
          expect(this.immoService.calls).toBeLessThanOrEqual(4);
          done();
        },
        (err) => {
          console.error(err);
          expect(true).toBe(false);
        },
        null
      );
  });

  it("Adresses impossible to estimate due to a high amount of errors must be ignored", (done) => {
    this.exercice
      .estimateWithRetry(["10 rue du test", "buggy-address", "11 rue du test"])
      .pipe(toArray())
      .subscribe(
        (n) => {
          expect(n.length).toEqual(2);
          expect(n).toEqual([
            {
              address: "10 rue du test",
              estimation: 284859,
            },
            {
              address: "11 rue du test",
              estimation: 182967,
            },
          ]);
          done();
        },
        (err) => {
          console.error(err);
          expect(true).toBe(false);
        },
        null
      );
  });
});
