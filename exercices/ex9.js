const { throwError, of, timer } = require('rxjs');
const { catchError, retry, timeoutWith, tap, mergeMap, delay, map } = require('rxjs/operators');
/**
 * Exercice 9
 * ----------
 *
 * Pour cet exercice, nous allons jouer avec une l'API d'une billetterie pour acheter une place de concert :
 *
 * this.ticketingService.buyTicket(concertId);
 *
 * - concertId est une chaine de caractère.
 *
 * Lorsque la réservation a fonctionné, la methode renvoie un observable qui émet une seule valeur qui ressemble à :
 *
 * {ticketId: "bc7239b2-8d5b-4c7b-9b95-52060e7f33b3", concert: "Chantal Goya", status: "reserved"}
 *
 *
 * Lorsque le ticket n'est pas réservable, l'observable renvoyé est en erreur, avec l'erreur suivante :
 * new Error("Invalid concertId");
 *
  *
 * Lors des moments d'affluence, l'API est TRÈS sollicitée et renvoie souvent des erreurs
 * ("Bad Gateway", "Service Unavailable", "Try again later", "Game over" ...et j'en passe !)
 *
 *
 *
 * Votre mission sera de coder la fonction buyTicketWithRetry(concertId) qui renvoie un observable.
 *
 * Celle ci doit appeler l'API pour reserver un ticket pour le concertId envoyé en paramètre.
 *
 * Si la réservation réussit, l'observable doit émettre une seule valeur : la même chose que ce qu'a renvoyé l'API.s
 *
 * En cas d'erreur "Invalid concertId" renvoyée par l'API, votre Observable doit être un erreur avec cette même erreur.
 *
 * Si jamais une autre erreur se produit, vous devez réessayer d'appeler l'API un peu plus tard.
 * Les essais doivent se faire de manière incrémentale, en commençant à 100ms et en ajoutant 50ms à chaque fois.
 *
 * Si au bout de 3 secondes (à partir du moment où votre fonction est appelée) vous n'avez pas réussi à commander
 * le ticket, vous devez renvoyer l'erreur "Timeout".
 *
 * Exemple
 * -> 1ere tentative
 * -> Attente de 100ms puis 2eme tentative
 * -> Attente de 150ms puis 3e tentative
 * -> Attente de 200ms puis 4e tentative
 * -> Attente de 250ms puis 4e tentative
 * -> ...
 * -> Timeout au bout de 3 secondes
 *
 *
 */

class Exercice8 {

    constructor(ticketingService) {
        this.ticketingService = ticketingService;
    }

    buyTicketWithRetry(concertId) {
        let retryDelay = 50;
        return this.ticketingService.buyTicket(concertId).pipe(
            catchError((error, caught) => {
                if (error.message === 'Invalid concertId') {
                    throw error;
                }
                retryDelay += 50;
                return timer(retryDelay).pipe(mergeMap(i => caught)); // FIXME: pas trouvé
            }),
            mergeMap(v => {
                if (v === 'Invalid concertId') {
                    return throwError(new Error(v));
                }
                return v;
            }),
            timeoutWith(3000, throwError(new Error('Timeout')))
        );
    };

}



module.exports = Exercice8;
