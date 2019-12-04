
/**
 * Exercice 4
 * ----------
 *
 * La fonction *topContributors* prend en parametre le nom d'une organisation github (ex: "Prestashop")
 *
 * Elle va devoir récupérer les 10 utilisateurs github qui ont le plus contribué à l'ensemble des projets
 * de cette organisation.
 *
 *
 * Consignes et précisions :
 *
 *  - La fonction *topContributors* doit retourner un observable qui emmet une valeur pour chacun des 10
 *    meilleurs contributeurs
 *
 *  - Chaque valeur emise doit être un objet qui contient le login de l'utilisateur et le nombre de contributions :
 *    {login: "username", contributions: 42}
 *
 *  - Si un utilisateur a fait 12 contributions pour un projet A et 30 contributions pour un projet B,
 *    son nombre de contributions sera de 42.
 *
 *  - Les valeurs doivent être emises dans l'ordre (le plus grand contributeur d'abord)
 *
 *  - S'il y a moins de 10 contributeurs, l'observable emettra moins de 10 valeurs.
 *
 *  - Prenez en compte tous les repositories d'une organisation (même les fork)
 *
 *
 *
 * Exemple :
 *
 * input : Prestashop
 *
 * output : ({login: 'jojo', contributions: 100})-({login: 'toto', contributions: 89})- [...]
 *
 *
 * Pour arriver à ce résultat, vous devez utiliser les methodes suivantes dans le githubService :
 *
 *
 * 1) la methode `getOrgRepos(organization)` prend en paramètre le nom d'une organization et renvoie l'ensemble des
 * repositories qu'elle possède. Elle fonctionne exactement de la même façon que getUserRepos que vous avez utilisé
 * dans l'exercice précédent.
 *
 *
 * Pour avoir un vrai exemple de ce que renvoie l'API :
 * https://api.github.com/orgs/Prestashop/repos
 *
 * Notez bien l'attribut full_name, qui contient le nom complet de chaque repository.
 *
 * 2) La methode `getRepoContributors(repoFullName)` prend en paramètre le nom complet d'un repository et renvoie
 * la liste de ses contributeurs avec leurs statistiques.
 *
 * Pour avoir un vrai exemple de ce que renvoie l'API :
 * https://api.github.com/repos/PrestaShop/emailgenerator/contributors
 *
 *
 */

class Exercice4 {

    constructor(githubService) {
        this.githubService = githubService;
    }

    topContributors(organization) {

        const rx = require('rxjs');
        const {flatMap, tap, map, reduce, take} = require('rxjs/operators');

        return this.githubService.getOrgRepos(organization)
            .pipe(
                // Emit a value for each repository
                flatMap(repos => rx.from(repos)),
                // Get the repo full name of each repo
                map(repo => repo.full_name),
                // Get the contributors for each repo
                flatMap(repoFullName => this.githubService.getRepoContributors(repoFullName)),
                // Emit a value for each contributor
                flatMap(contributors => rx.from(contributors)),
                // Extract the login and the number of contributions
                map(({login, contributions}) => { return {login, contributions} }),
                // Aggregate all the values into a map, to add contributions for each login
                reduce((acc, curr) => {
                    if (!acc.has(curr.login)) {
                        acc.set(curr.login, 0);
                    }
                    acc.set(curr.login, acc.get(curr.login) + curr.contributions);
                    return acc;
                }, new Map()),
                flatMap(m => {
                    // Transform the map into an array
                    const contributors = Array.from(m).map(e => { return {login: e[0], contributions: e[1]}});
                    // Sort the array by contributions, descending orders
                    contributors.sort((c1, c2) => c2.contributions - c1.contributions);
                    // Return an observable emitting a value for each contributor
                    return rx.from(contributors);
                }),
                // Take only the first 10 values
                take(10),
            );
    };

}



module.exports = Exercice4;
