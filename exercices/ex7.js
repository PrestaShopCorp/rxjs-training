
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

const {of, zip} = require('rxjs');
const {flatMap} = require('rxjs/operators');

class Exercice7 {

  constructor(gpsService, weatherService, atomicClockService) {
    this.gpsService = gpsService;
    this.weatherService = weatherService;
    this.atomicClockService = atomicClockService;
  }

  initDisplay() {
    return zip(
      this.gpsService.getCurrentLocation(),
      this.weatherService.watchTemperature(),
      this.atomicClockService.watchTime(),
    ).pipe(
      flatMap(data => of(`${data[0].city_name} - ${data[1].temp}°${data[1].unit} - ${data[2].hour}:${data[2].minute}`)),
    );
  };

}



module.exports = Exercice7;
