
/**
 * Exercice 1
 * ----------
 *
 * La fonction ex1() doit retourner un observable qui emmet la liste des nombres entiers
 * compris entre 100 et 5000 qui sont divisibles par 42.
 *
 */

const ex1 = () => {

    const {range} = require("rxjs");
    const {filter} = require('rxjs/operators');

    // Generate a sequence from 100 to 5000s
    return range(100, 4901)
        .pipe(
            // Keep only values divisible by 42
            filter(n => n % 42 === 0)
        );

};


module.exports = {ex1};
