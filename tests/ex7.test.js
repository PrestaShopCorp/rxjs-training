const { Observable } = require("rxjs");

const WeatherService = require("./helpers/WeatherService");
const AtomicClockService = require("./helpers/AtomicClockService");
const GpsService = require("./helpers/GpsService");
const Exercice7 = require("../exercices/ex7");
const { toArray } = require("rxjs/operators");

describe("Exercice7", () => {
  beforeEach(() => {
    this.weatherService = new WeatherService();
    this.gpsService = new GpsService();
    this.atomicClockService = new AtomicClockService();
    this.exercice = new Exercice7(
      this.gpsService,
      this.weatherService,
      this.atomicClockService
    );
  });

  it("Return an observable", () => {
    expect(this.exercice.initDisplay(["safe-address"])).toBeInstanceOf(
      Observable
    );
  });

  it("Emit a value with the correct format in less than 90ms", (done) => {
    const t1 = Date.now();
    this.gpsService.city = "Clermont-Ferrand";
    this.weatherService.initialTemp = 42;
    this.atomicClockService._getDate = () => {
      let d = new Date();
      d.setHours(11);
      d.setMinutes(42);
      d.setSeconds(38);
      return d;
    };
    this.exercice
      .initDisplay()
      .pipe(toArray())
      .subscribe(
        (msgs) => {
          expect(msgs).toEqual(["Clermont-Ferrand - 42°C - 11:42"]);
          expect(Date.now() - t1).toBeLessThanOrEqual(90);
          done();
        },
        (err) => console.error(err),
        null
      );
    this.weatherService.tempSensor.next(25);
  });
});
