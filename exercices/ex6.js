
/**
 * Exercice 6
 * ----------
 *
 * Pour cet exercice, nous allons jouer avec une API qui permet d'estimer un bien immobilier.
 *
 * Cette API peut être interrogée avec la methode suivante :
 * this.immoService.estimate(address)
 *
 * - address est une chaine de caractère.
 *
 * La fonction renvoie un observable qui émet une seule valeur : un nombre entier correspondant au
 * prix estimé (en dollar canadien).
 *
 *
 * Le seul problème de cette API, c'est qu'elle a de gros problèmes de disponibilité... Elle renvoie souvent des
 * erreurs, il faut insister pour qu'elle réponde correctement.
 *
 * Lorsque l'API renvoie une erreur, l'observable renvoyé par la methode estimate est en erreur ("Service unavailable").
 *
 *
 *
 * L'exercice consiste à coder la methode estimateWithRetry(addresses), qui a les caractéristiques suivantes :
 *
 *  - Elle prend en paramètre un tableau d'adresses.
 *    Exemple : ["10 rue de la cantoche, 42000 Saint-Etienne", "32 Rue de Londres, 75009 Paris"]
 *
 *  - Elle renvoie un observable.
 *
 * L'observable renvoyé doit emettre une valeur par adresse.
 * Chaque valeur emise doit etre un objet ayant la forme suivante :
 *
 * {
 *     address: "10 rue de la cantoche, 42000 Saint-Etienne",
 *     estimation: 104000
 * }
 *
 *
 * Si jamais l'API vous renvoie une erreur, vous **devez** réessayer.
 * Mais ne faites pas plus de 4 appels à l'API par adresse !
 *
 * Si jamais après 4 tentatives, l'API ne veut pas vous répondre, ignorez l'adresse
 * et ne la renvoyez pas dans l'observable final.
 *
 *
 * Exemple :
 *
 * input : ["adresse1", "adresse2", "buggy-address", "adresse3"]
 *
 * output : ({address: "addresse1", estimation: 114171})-({adress: "adresse2", estimation: 272586})-({address: "adresse3", estimation: 401002})-|
 *
 *
 *
 */

class Exercice6 {

    constructor(immoService) {
        this.immoService = immoService;
    }

    estimateWithRetry(addresses) {

        const rx = require('rxjs');
        const {map, flatMap, retry, tap, catchError} = require('rxjs/operators');

        // Create an observable from addresses array
        return rx.from(addresses)
            .pipe(
                flatMap(address => {
                    // Call the estimate API for each address
                    return this.immoService.estimate(address)
                        .pipe(
                            // Retry 3 times max on error
                            retry(3),
                            // Format the object to return
                            map(estimation => {
                                return {address, estimation}
                            }),
                            // If an error occurs here, it means that we have retried 3 times and it still failed.
                            // In this case, we intercept the error and replace it with an empty observable to
                            // ignore it
                            catchError((err) => rx.EMPTY),
                        )
                }),
            );
    };

}



module.exports = Exercice6;
