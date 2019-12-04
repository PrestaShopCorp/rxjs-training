const { combineLatest } = require('rxjs');
const { map, take } = require('rxjs/operators');

/**
 * Exercice 7
 * ----------
 *
 * Pour cet exercice, nous allons réaliser le programme d'initialisation d'un panneau d'affichage lumineux pour
 * une pharmacie. Ce panneau de nouvelle génération sera le plus réactif, le plus précis et le plus moderne du monde.
 * C'est de la haute technologie !
 *
 *
 * Vous disposez d'instruments de mesure interne (Military Grade) qui vous offrent les API suivantes :
 *
 *
 *  Un GPS :
 *  --------
 *
 *  this.gpsService.getCurrentLocation();
 *
 *  Cette fonction ne prend aucun paramètre et renvoie un Observable qui émet une seule valeur.
 *  Cette valeur est un objet qui a la forme suivante :
 *
 *  -> {city_name: "Paris", country: "France"}
 *
 *  En général, cette méthode met environ 42ms pour émettre la valeur.
 *
 *
 *  Une station météo :
 *  -------------------
 *
 *  this.weatherService.watchTemperature()
 *
 *  Cette fonction ne prend aucun paramètre et renvoie un Observable qui émet une valeur à chaque fois que la
 *  température change. Cet Observable ne se complète jamais.
 *
 *  La valeur émise à chaque changement de température est un objet qui a la forme suivante :
 *
 *  -> {unit: 'C', temp: 25}
 *
 *  En général, le premier résultat arrive en 50ms et les suivants arrivent dès que la température change.
 *
 *
 *  Une horloge atomique :
 *  ----------------------
 *
 *  this.atomicClockService.watchTime()
 *
 *
 *  Cette fonction ne prend aucun paramètre et renvoie un Observable qui émet une valeur dès que l'heure change.
 *  Cet Observable ne se complète jamais.
 *
 *  La valeur émise à chaque changement d'heure est un objet qui a la forme suivante :
 *
 *  {hour: 16, minute: 32, second: 50, timezone: "Europe/Paris"}
 *
 *  Le premier résultat arrive généralement très rapidement (~50ms) et les autres arrivent à chaque
 *  fois que l'heure change.
 *
 *
 * **************
 * Instructions *
 * **************
 *
 *
 *  Votre mission, si vous l'acceptez, sera de coder la methode *initDisplay*.
 *  Celle ci doit renvoyer un Observable qui emmet une seule valeur.
 *  Cette valeur est une chaine de caractère avec le format suivant :
 *
 *  "{city_name} - {temp}°{unit} - {hour}:{minute}"
 *
 *  Par exemple : "Paris - 25°C - 16:32"
 *
 *
 *  Vous devez renvoyer cette chaîne le plus rapidement possible.
 *  Pour que ce panneau puisse être homologué «Military Grade», vous devez renvoyer la chaîne en moins de 90ms.
 *
 *
 *
 */

class Exercice7 {

    constructor(gpsService, weatherService, atomicClockService) {
        this.gpsService = gpsService;
        this.weatherService = weatherService;
        this.atomicClockService = atomicClockService;
    }

    initDisplay() {
        // 1. this.gpsService.getCurrentLocation(); -> 1 valeur {city_name: "Paris", country: "France"} en 42ms, puis complete
        // 2. this.weatherService.watchTemperature() -> n valeurs {unit: 'C', temp: 25}, async, never complete. 1st 50ms
        // 3. this.atomicClockService.watchTime() -> 1 valeur {hour: 16, minute: 32, second: 50, timezone: "Europe/Paris"} par minute, async, never complete, 1st 50ms
        // emettre 1 seule valeur à chaque update: "{city_name} - {temp}°{unit} - {hour}:{minute}" < 90ms

        // paralléliser 1., 2., 3.
        // 1. ne renvoie qu'au début, il faudra donc garder la valeur dans le temps et l'associer aux autres valeurs de 2. et 3.
        // dès que 2. ou 3. emettent une valeur, il faut emettre notre update avec les dernières valeurs de chaque source : combineLatest.

        return combineLatest(
            //concat(this.gpsService.getCurrentLocation(), NEVER), // after first value of the gps service, must keep an observable that never complete? NO NEED !
            this.gpsService.getCurrentLocation(),
            this.weatherService.watchTemperature(),
            this.atomicClockService.watchTime()
        ).pipe(
            map(([location, temperature, time]) => `${location.city_name} - ${temperature.temp}°${temperature.unit} - ${time.hour}:${time.minute}`),
            take(1)
        );

        // FIXME: bon, dans l'exo7 j'ai déjà codé l'exo8, j'avais pas compris que ct uniquement l'init en 7 et update en 8... Pourquoi avoir séparé les 2 ?
        // => pour utiliser en 7 un autre operator... a trouver !
    };

}

module.exports = Exercice7;
