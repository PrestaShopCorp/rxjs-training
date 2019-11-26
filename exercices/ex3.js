
/**
 * Exercice 3
 * ----------
 *
 * La fonction *ex3* prend en parametre l'identifiant d'un utilisateur github et renvoie un observable.
 *
 * L'observable renvoyé par la fonction doit émettre une valeur pour chaque repository possédé par l'utilisateur et
 * qui n'est pas un fork. Les valeurs émises doivent correspondre à l'URL publique du repository (html_url
 * renvoyé par l'API).
 *
 * Pour réussir cela, devez utiliser la methode `this.githubService.getUserRepos(user)` qui simule un appel à l'API
 * github. Elle renvoie un Observable qui emmet l'objet JSON renvoyé par l'API.
 *
 * Pour avoir un vrai exemple de ce que renvoie l'API :
 * https://api.github.com/users/staltz/repos
 *
 * Notez bien les attributs "fork" et "html_url" de chaque repository.
 *
 * Exemple :
 *
 * input : staltz
 *
 * output :
 * -("https://github.com/staltz/amicispace")-("https://github.com/staltz/ams")-("https://github.com/staltz/annankatu")- [...]
 *
 */

class Exercice3 {

    constructor(githubService) {
        this.githubService = githubService;
    }

    ex3(githubUser) {
        // TODO: Fix this function !
        return this.githubService.getUserRepos(githubUser);
    };

}



module.exports = Exercice3;
