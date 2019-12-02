
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
        // TODO: Fix this function !

    };

}



module.exports = Exercice8;
