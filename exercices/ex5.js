
/**
 * Exercice 5
 * ----------
 *
 * Pour cet exercice, nous allons jouer avec une API de moteur de recherche.
 *
 * Cette api peut être intérrogée grâce à la méthode suivante :
 * this.searchService.search(keyword, page)
 *
 * - keyword :  chaine de caractère correspondant au mot clé à rechercher
 * - page : nombre entier qui correspond au numéro de page (1ère page = 1)
 *
 * Cette methode renvoie un observable qui emmet un tableau de résultats sous la forme suivante :
 *
 * [
 *  {title: "Titre de la page", url: "http://example.pouet/"},
 *  {title: "Titre 2", url: "http://example2.pouet/"},
 *  {title: "Titre 3", url: "http://example3.pouet/"},
 * ]
 *
 * Cette API a par contre une petite particularité : elle est rate-limitée.
 * Vous ne pouvez pas l'appeler plus d'une fois toutes les 100ms.
 *
 * Si vous dépassez la limite, l'observable renvoyé sera en erreur
 * (erreur = new Error("Rate limit exceeded");
 *
 *
 * Maintenant, voici les instructions pour l'exercice à réaliser :
 *
 * La fonction *scrapSerp* prend en paramètre un mot clé et renvoie un observable.
 *
 * Vous devez récupérer les 3 premières pages de résultat correspondant à la recherche
 * de ce mot clé via l'API.
 *
 * L'observable renvoyé par cette fonction doit emettre une valeur par résultat du moteur de recherche.
 * Chaque valeur emise doit être une chaine de caractères qui correspond à l'URL du résultat.
 * Les valeurs doivent être emises en respectant l'ordre des résultats du moteur de recherche.
 *
 *
 * Exemple :
 *
 * input : "example"
 *
 * output : ("http://example.pouet/")-("http://example2.pouet/")-("http://example3.pouet/")-("http://example4.pouet/")-[...]
 *
 *
 *
 *
 */

class Exercice5 {

    constructor(searchService) {
        this.searchService = searchService;
    }

    /*
     * One possible implementation with "timer"
     */
    scrapSerp(keyword) {

        const rx = require('rxjs');
        const {map, flatMap, take} = require('rxjs/operators');

        return rx.timer(0, 100)
            .pipe(
                take(3),
                flatMap(i => this.searchService.search(keyword, i + 1)),
                flatMap(results => rx.from(results)),
                map(result => result.url),
            );
    }

    /*
     * Another implementation with interval + startWith()
     * (startWith to avoid a delay before the first request)
     */

    scrapSerpInterval(keyword) {

        const rx = require('rxjs');
        const {map, take, flatMap, tap, startWith} = require('rxjs/operators');

        return rx.interval(110)
            .pipe(
                take(2),
                map(i => i + 1),
                startWith(0),
                flatMap(i => this.searchService.search(keyword, i + 1)),
                flatMap(results => rx.from(results)),
                map(result => result.url),
            );
    }


    /*
     * Another implementation with map + concatAll
     */

    scrapSerpConcatAll(keyword) {

        const rx = require('rxjs');
        const {map, flatMap, delay, concatAll} = require('rxjs/operators');

        // Generate an observable emitting a value for each page number to scrap
        return rx.range(1, 3)
            .pipe(
                // Prepare the request to execute for each page
                map(page => rx.defer(() => this.searchService.search(keyword, page)
                    .pipe(
                        // Add a delay of 100ms after each call
                        delay(100)
                    )
                )),
                // At this point, we have an observable containing observables.
                // Each of the observable is materializing the request to execute.
                // But since nothing is subscribed to them, they are not executed yet.s
                //
                // We use the concatMap operator to execute them sequentially :
                // (the first one is executed, and the next one is executed only when the previous is completed)
                // All resulting values are emitted on the resulting observable.
                concatAll(),
                // For each page, we extract the results to emit one value per result.
                flatMap(results => rx.from(results)),
                // We extract the url of each value
                map(result => result.url),
            );
    };

}



module.exports = Exercice5;
