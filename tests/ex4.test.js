const {Observable, forkJoin} = require("rxjs");

const GithubService = require('./helpers/GithubService');
const Exercice4 = require("../exercices/ex4");
const {toArray, tap, distinct} = require("rxjs/operators");

describe("Exercice4", () => {

    beforeAll(() => {
        this.exercice = new Exercice4(new GithubService());
    });

    it('Return an observable', () => {
        expect(this.exercice.topContributors('Prestashop')).toBeInstanceOf(Observable);
    });

    it("Emit a value for each of the top 10 contributors across all organization projects", (done) => {

        this.exercice.topContributors('Prestashop').pipe(toArray())
            .subscribe(
                n => {
                    expect(n.length).toEqual(10);
                    expect(n).toEqual([
                        {login: 'gRoussac', contributions: 6836},
                        {login: 'rGaillard', contributions: 5818},
                        {login: 'vAugagneur', contributions: 4780},
                        {login: 'raphaelMalie', contributions: 3320},
                        {login: 'NinjaOfWeb', contributions: 3141},
                        {login: 'Quetzacoalt91', contributions: 2086},
                        {login: 'bmancone', contributions: 1798},
                        {login: 'julienbourdeau', contributions: 1693},
                        {login: 'Asenar', contributions: 1637},
                        {login: 'sarjon', contributions: 1565},
                    ]);
                    done();
                },
            null,
            null
        )
    });

});

