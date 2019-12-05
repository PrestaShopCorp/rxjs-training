const { zip, of, from } = require('rxjs');
const { flatMap, map, filter, retry, catchError } = require('rxjs/operators');

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
        return zip(
            // address
            from(addresses),
            // estimation
            from(addresses).pipe(
                flatMap(address => this.immoService.estimate(address).pipe(
                    retry(3),
                    catchError(err => of(-1))
                ))
            )
        ).pipe(
            map(([address, estimation]) => ({ address, estimation })),
            filter(i => i.estimation > -1)
        )
    };

}

module.exports = Exercice6;
