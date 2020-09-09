const { generate } = require("rxjs");
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
  return generate(
    0,
    (x) => x < 5000,
    (x) => x + 42
  ).pipe(filter((n) => n > 100));
};

module.exports = { ex1 };
