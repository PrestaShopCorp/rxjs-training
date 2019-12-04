const { combineLatest } = require('rxjs');
const { map, distinct } = require('rxjs/operators');

/**
 * Exercice 8
 * ----------
 *
 * Pour cet exercice, nous allons améliorer notre panneau d'affichage de pharmacie.
 * En effet, celui-ci s'initialise bien, mais les informations qu'il affiche sont figées.
 *
 * À l'aide des même methodes que pour l'exercice 7, vous allez développer la méthode
 * updateDisplay().
 *
 *
 * Celle-ci renvoie un observable qui émet une nouvelle valeur à chaque fois que la température change ou bien que
 * l'heure à afficher change.
 *
 * Exemple de sortie :
 *
 * ("Paris - 25°C - 16:32")-("Paris - 26°C - 16:32")-("Paris - 26°C - 16:33")-("Paris - 26°C - 16:34") [...]
 *
 *
 */

class Exercice8 {

    constructor(gpsService, weatherService, atomicClockService) {
        this.gpsService = gpsService;
        this.weatherService = weatherService;
        this.atomicClockService = atomicClockService;
    }

    updateDisplay() {
        return combineLatest(
            //concat(this.gpsService.getCurrentLocation(), NEVER), // after first value of the gps service, must keep an observable that never complete? NO NEED !
            this.gpsService.getCurrentLocation(),
            this.weatherService.watchTemperature(),
            this.atomicClockService.watchTime()
        ).pipe(
            map(([location, temperature, time]) => `${location.city_name} - ${temperature.temp}°${temperature.unit} - ${time.hour}:${time.minute}`),
            distinct()
        );
    };
}

module.exports = Exercice8;
