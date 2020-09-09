/**
 * Exercice 5
 * ----------
 *
 * Pour cet exercice, nous allons jouer avec une API de moteur de recherche.
 *
 * Cette api peut être interrogée grâce à la méthode suivante :
 * this.searchService.search(keyword, page)
 *
 * - keyword :  chaine de caractère correspondant au mot clé à rechercher
 * - page : nombre entier qui correspond au numéro de page (1ère page = 1)
 *
 * Cette methode renvoie un observable qui émet un tableau de résultats sous la forme suivante :
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
 * Chaque valeur émise doit-être une chaîne de caractères qui correspond à l'URL du résultat.
 * Les valeurs doivent être émises en respectant l'ordre des résultats du moteur de recherche.
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
const { from } = require("rxjs");
const { tap, delay, flatMap, concatMap, map } = require("rxjs/operators");

class Exercice5 {
  constructor(searchService) {
    this.searchService = searchService;
  }

  scrapSerp(keyword) {
    const pages = [1, 2, 3];
    return from(pages).pipe(
      concatMap((page) =>
        this.searchService.search(keyword, page).pipe(delay(101))
      ),
      flatMap((results) => from(results)),
      map((result) => result.url)
    );
  }
}

module.exports = Exercice5;
