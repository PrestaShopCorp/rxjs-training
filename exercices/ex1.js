const {of, range, EMPTY} = require('rxjs');
const {flatMap} = require('rxjs/operators');

/**
 * Exercice 1
 * ----------
 *
 * La fonction ex1() doit retourner un observable qui emmet la liste des nombres entiers
 * compris entre 100 et 5000 qui sont divisibles par 42.
 *
 */

const ex1 = () => {
  return range(100, 4900)
  .pipe(
    flatMap(number => number % 42 ? EMPTY : of(number))
  )
};

module.exports = {ex1};
