const {Observable, forkJoin} = require("rxjs");

const SearchService = require('./helpers/SearchService');
const Exercice5 = require("../exercices/ex5");
const {toArray} = require("rxjs/operators");

describe("Exercice5", () => {

    beforeEach(() => {
        this.exercice = new Exercice5(new SearchService());
    });

    it('Return an observable', () => {
        expect(this.exercice.scrapSerp('prestashop')).toBeInstanceOf(Observable);
    });

    it("Emit a value for each of the search results for the first 3 pages", (done) => {

        this.exercice.scrapSerp('prestashop').pipe(toArray())
            .subscribe(
                n => {
                    expect(n.length).toEqual(9);
                    expect(n).toEqual([
                             "https://www.prestashop.com/en",
                             "https://www.prestashop.com/en/download",
                             "https://www.prestashop.com/forums/",
                             "https://en.wikipedia.org/wiki/PrestaShop",
                             "https://fr.wikipedia.org/wiki/PrestaShop",
                             "https://github.com/PrestaShop/PrestaShop",
                             "https://github.com/PrestaShop",
                             "https://www.joptimisemonsite.fr/avis-prestashop-logo-logiciel-creation-site/",
                             "https://www.journaldunet.com/solutions/dsi/1184083-prestashop-tout-ce-qu-il-faut-savoir/",
                    ]);
                    done();
                },
            null,
            null
        )
    });

    it("The order of the results is maintained", (done) => {

        this.exercice.scrapSerp('ecommerce').pipe(toArray())
            .subscribe(
                n => {
                    expect(n.length).toEqual(8);
                    expect(n).toEqual([
                        "https://en.wikipedia.org/wiki/E-commerce",
                        "https://www.doofinder.com/fr/blog/qu-est-ce-que-le-ecommerce",
                        "https://www.bigcommerce.com/blog/ecommerce/",
                        "https://www.oberlo.com/ecommerce-wiki/ecommerce",
                        "https://www.networksolutions.com/education/what-is-ecommerce/",
                        "https://www.investopedia.com/terms/e/ecommerce.asp",
                        "https://www.ecommerceceo.com/start-ecommerce-business/",
                        "https://www.ecommerce-nation.fr/",
                    ]);
                    done();
                },
                null,
                null
            )
    });

});

