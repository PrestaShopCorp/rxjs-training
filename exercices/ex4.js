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
const { flatMap, groupBy, reduce, toArray, take } = require("rxjs/operators");

class Exercice4 {
  constructor(githubService) {
    this.githubService = githubService;
  }

  topContributors(organization) {
    return this.githubService.getOrgRepos(organization).pipe(
      flatMap((repos) => repos.map((repo) => repo.full_name)),
      flatMap((fullName) => this.githubService.getRepoContributors(fullName)),
      flatMap((contribs) =>
        contribs.map(({ login, contributions }) => ({ login, contributions }))
      ),
      groupBy((contributor) => contributor.login),
      flatMap((group) =>
        group.pipe(
          reduce((acc, val) => ({
            login: val.login,
            contributions: acc.contributions + val.contributions,
          }))
        )
      ),
      toArray(),
      flatMap((contributors) =>
        contributors.sort((a, b) =>
          a.contributions < b.contributions ? 1 : -1
        )
      ),
      take(10)
    );
  }
}

module.exports = Exercice4;
