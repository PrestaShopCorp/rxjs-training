const {Observable, Subject, defer, of} = require("rxjs");

const WeatherService = require('./helpers/WeatherService');
const AtomicClockService = require('./helpers/AtomicClockService');
const GpsService = require('./helpers/GpsService');
const Exercice8 = require("../exercices/ex8");
const {toArray, delay} = require("rxjs/operators");

describe("Exercice8", () => {

    beforeEach(() => {
        this.weatherService = new WeatherService();
        this.gpsService = new GpsService();
        this.atomicClockService = new AtomicClockService();
        this.exercice = new Exercice8(this.gpsService, this.weatherService, this.atomicClockService);
    });

    it('Return an observable', () => {
        expect(this.exercice.updateDisplay()).toBeInstanceOf(Observable);
    });

    it("Emit a value each time the value to display changes", (done) => {

        const clockSubject = new Subject();
        this.atomicClockService.watchTime = () => clockSubject;
        this.gpsService.city = 'Paris';
        this.weatherService.initialTemp = 22;


        this.exercice.updateDisplay().pipe(toArray())
            .subscribe(
                msgs => {
                    expect(msgs).toEqual([
                        'Paris - 22°C - 18:30',
                        'Paris - 23°C - 18:30',
                        'Paris - 23°C - 18:31',
                        'Paris - 22°C - 18:31',
                    ]);
                    done();
                },
                (err) => console.error(err),
            null
        );


        of({hour: 18, minute: 30, second: 57}).pipe(delay(51)).subscribe(t => clockSubject.next(t), null, null);

        of({hour: 18, minute: 30, second: 58}).pipe(delay(56)).subscribe(t => clockSubject.next(t), null, null);

        of(23).pipe(delay(60)).subscribe(t => this.weatherService.tempSensor.next(t), null, null);

        of({hour: 18, minute: 30, second: 59}).pipe(delay(65)).subscribe(t => clockSubject.next(t), null, null);


        of({hour: 18, minute: 31, second: 0}).pipe(delay(70)).subscribe(t => clockSubject.next(t), null, null);

        of({hour: 18, minute: 31, second: 1}).pipe(delay(80)).subscribe(t => clockSubject.next(t), null, null);


        of(22).pipe(delay(100)).subscribe(t => this.weatherService.tempSensor.next(t), null, null);

        //clockSubject.complete();
        of(0).pipe(delay(110)).subscribe(() => {
            this.weatherService.tempSensor.complete();
            clockSubject.complete();
        }, null, null);
    });

});

