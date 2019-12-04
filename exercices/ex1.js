const { range } = require("rxjs");
const { filter } = require("rxjs/operators");

/**
 * Exercice 1
 * ----------
 *
 * La fonction ex1() doit retourner un observable qui emmet la liste des nombres entiers
 * compris entre 100 et 5000 qui sont divisibles par 42.
 *
 */

const ex1 = () => {
  return range(100, 4900).pipe(filter(num => num % 42 == 0));
};

module.exports = { ex1 };
