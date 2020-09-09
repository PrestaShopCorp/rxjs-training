/**
 * Exercice 2
 * ----------
 *
 * La fonction *ex2* prend en parametre un Observable (input$)
 *
 * Elle doit renvoyer un observable qui émet les mêmes valeurs que input$
 * mais avec les contraintes suivantes :
 *   1- Ignorer les 3 premieres valeurs emises par input$
 *   2- Ignorer les 4 dernieres valeurs emises par input$
 *   3- Arrêter d'émettre quoi que ce soit dès que la valeur "STOP" est rencontrée dans les valeurs restantes
 *
 *
 *  Exemples :
 *
 *  input$ =   (A)-(B)-(C)-(D)-(E)-(F)-(G)-(H)-(I)-|
 *  output$ = (D)-(E)-|
 *
 *  input$ =   (A)-(B)-(C)-(D)-(STOP)-(E)-(F)-(G)-(H)-(I)-|
 *  output$ = (D)-|
 *
 *  input$ =   (A)-(STOP)-(B)-(C)-(D)-(E)-(F)-(G)-(H)-(I)-|
 *  output$ = (C)-(D)-(E)-|
 *
 *
 */

const ex2 = (input$) => {
  // TODO: Fix this function !
};

module.exports = { ex2 };
