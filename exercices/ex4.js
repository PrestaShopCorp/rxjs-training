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

const { flatMap } = require('rxjs/operators');
const { from } = require("rxjs");

class Exercice4 {

    constructor(githubService) {
        this.githubService = githubService;
    }

    topContributors(organization) {
        // TODO: Fix this function !
        const output = [];
        const orgRepos = this.githubService.getOrgRepos(organization);
         orgRepos.pipe(
            flatMap((val) => {
                val.forEach((item, index) => {
                    this.githubService.getRepoContributors(item.full_name).pipe(
                        flatMap((repoContributors) => {
                            repoContributors.forEach((contributors) => {
                                if(contributors.id in output){
                                    output[contributors.id] = { login: contributors.login, contributions: output[contributors.id]+contributors.contributions}
                                }else{
                                    output[contributors.id] = { login: contributors.login, contributions: contributors.contributions}
                                }
                            })
                            return repoContributors;  
                        })
                    ).subscribe()
                })

                return val
            })
        ).subscribe ();

        output.sort(function (a, b) {
            return b.contributions - a.contributions;
          });
        return from(output.slice(0,10));
    };

}



module.exports = Exercice4;
