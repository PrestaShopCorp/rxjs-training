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
 */
const { of, from, timer, empty } = require("rxjs");
const {
  tap,
  retryWhen,
  map,
  concatMap,
  mergeMap,
  catchError,
  pluck,
} = require("rxjs/operators");

class Exercice6 {
  constructor(immoService) {
    this.immoService = immoService;
  }

  genericRetryStrategy({ maxRetryAttempts = 3, scalingDuration = 100 } = {}) {
    return (attempts) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          if (retryAttempt > maxRetryAttempts) {
            return throwError(error);
          }
          // console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
          return timer(retryAttempt * scalingDuration);
        })
      );
    };
  }

  estimateWithRetry(addresses) {
    return from(addresses).pipe(
      concatMap((address) => {
        return this.immoService.estimate(address).pipe(
          retryWhen(this.genericRetryStrategy()),
          catchError((error) => {
            // log.error(error);
            return empty();
          }),
          map((estimation) => ({ estimation, address }))
        );
      })
    );
  }
}

module.exports = Exercice6;
