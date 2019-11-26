const {Observable, forkJoin} = require("rxjs");

const GithubService = require('./helpers/GithubService');
const Exercice3 = require("../exercices/ex3");
const {toArray, tap, distinct} = require("rxjs/operators");

describe("Exercice3", () => {

    beforeAll(() => {
        this.exercice = new Exercice3(new GithubService());
    });

    it('Return an observable', () => {
        expect(this.exercice.ex3('totodu63')).toBeInstanceOf(Observable);
    });

    it("Return the list of repository URLs which are not a fork", (done) => {

        const res = forkJoin({
            'staltz': this.exercice.ex3('staltz').pipe(toArray()),
            'torvalds': this.exercice.ex3('torvalds').pipe(toArray()),
            'fabpot': this.exercice.ex3('fabpot').pipe(toArray()),
            'totodu63': this.exercice.ex3('totodu63').pipe(toArray()),
        });

        res
            .subscribe(
                n => {
                    expect(n.staltz.length).toEqual(15);
                    expect(n.staltz).toEqual([
                        "https://github.com/staltz/amicispace",
                        "https://github.com/staltz/ams",
                        "https://github.com/staltz/annankatu",
                        "https://github.com/staltz/asyncstorage-mock-another",
                        "https://github.com/staltz/asyncstorage-test",
                        "https://github.com/staltz/aw-projects",
                        "https://github.com/staltz/benchmark-callbags-versus-pull-stream",
                        "https://github.com/staltz/bibichatbot",
                        "https://github.com/staltz/callbag-basics",
                        "https://github.com/staltz/callbag-combine",
                        "https://github.com/staltz/callbag-concat",
                        "https://github.com/staltz/callbag-filter",
                        "https://github.com/staltz/callbag-flatten",
                        "https://github.com/staltz/callbag-for-each",
                        "https://github.com/staltz/callbag-from-event",
                    ]);

                    expect(n.torvalds.length).toEqual(4);
                    expect(n.torvalds).toEqual([
                        "https://github.com/torvalds/linux",
                        "https://github.com/torvalds/pesconvert",
                        "https://github.com/torvalds/test-tlb",
                        "https://github.com/torvalds/uemacs",
                    ]);

                    expect(n.totodu63.length).toEqual(0);

                    expect(n.fabpot.length).toEqual(1);
                    expect(n.fabpot).toEqual([
                        "https://github.com/fabpot/gitter",
                    ]);

                    done();
                },
            null,
            null
        )
    });

});

