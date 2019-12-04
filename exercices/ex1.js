const { generate } = require("rxjs");
const { filter } = require("rxjs/operators");

/**
 * Exercice 1
 * ----------
 *
 * La fonction ex1() doit retourner un observable qui emmet la liste des nombres entiers
 * compris entre 100 et 5000 qui sont divisibles par 42.
 * Ca promet... dès le 1er exo.
 *
 */

const ex1 = () => {
    return generate({
        initialState: 100,
        condition: x => x < 5000,
        iterate: x => x + 2
    }).pipe(
        filter(x => x % 42 === 0)
    );
};

module.exports = { ex1 };
