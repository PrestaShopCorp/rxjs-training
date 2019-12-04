/**
 * Exercice 1
 * ----------
 *
 * La fonction ex1() doit retourner un observable qui emmet la liste des nombres entiers
 * compris entre 100 et 5000 qui sont divisibles par 42.
 *
 */

const { generate } = require("rxjs");
const { filter } = require('rxjs/operators');

const ex1 = () => {
    return generate(100, x => x < 5000, x => x + 1)
        .pipe(
            filter(num => num % 42 === 0)
        );
};


module.exports = { ex1 };
