const { throwError, of, defer } = require("rxjs");

class SearchService {
  constructor() {
    this.responses = {
      prestashop: {
        1: [
          {
            title: "Create and develop your business with PrestaShop",
            url: "https://www.prestashop.com/en",
          },
          {
            title: "Download PrestaShop and develop your online business",
            url: "https://www.prestashop.com/en/download",
          },
          {
            title: "Forums Ecommerce - PrestaShop",
            url: "https://www.prestashop.com/forums/",
          },
        ],
        2: [
          {
            title: "PrestaShop - Wikipedia",
            url: "https://en.wikipedia.org/wiki/PrestaShop",
          },
          {
            title: "PrestaShop — Wikipédia",
            url: "https://fr.wikipedia.org/wiki/PrestaShop",
          },
          {
            title:
              "PrestaShop/PrestaShop: PrestaShop offers a fully ... - GitHub",
            url: "https://github.com/PrestaShop/PrestaShop",
          },
        ],
        3: [
          {
            title: "PrestaShop · GitHub",
            url: "https://github.com/PrestaShop",
          },
          {
            title:
              "Prestashop Avis 2019 - Faut-il utiliser Prestashop pour son e ...",
            url:
              "https://www.joptimisemonsite.fr/avis-prestashop-logo-logiciel-creation-site/",
          },
          {
            title: "PrestaShop : tout ce qu'il faut savoir - JDN",
            url:
              "https://www.journaldunet.com/solutions/dsi/1184083-prestashop-tout-ce-qu-il-faut-savoir/",
          },
        ],
      },

      ecommerce: {
        1: [
          {
            title: "E-commerce - Wikipedia",
            url: "https://en.wikipedia.org/wiki/E-commerce",
          },
          {
            title:
              "Qu'est-ce que le e-commerce ? Guide explicatif et conseils de ...",
            url: "https://www.doofinder.com/fr/blog/qu-est-ce-que-le-ecommerce",
          },
          {
            title:
              "Ecommerce 101: Learn What It is + History of Online Shopping",
            url: "https://www.bigcommerce.com/blog/ecommerce/",
          },
        ],
        2: [
          {
            title: "What Is eCommerce? Everything You Need to Know About ...",
            url: "https://www.oberlo.com/ecommerce-wiki/ecommerce",
          },
          {
            title: "What is Ecommerce? - Network Solutions",
            url:
              "https://www.networksolutions.com/education/what-is-ecommerce/",
          },
          {
            title: "Electronic Commerce (e-commerce) - Investopedia",
            url: "https://www.investopedia.com/terms/e/ecommerce.asp",
          },
        ],
        3: [
          {
            title: "How To Start an Ecommerce Business From Scratch - 2019",
            url: "https://www.ecommerceceo.com/start-ecommerce-business/",
          },
          {
            title:
              "E-commerce Nation, le media communautaire du e-commerce ...",
            url: "https://www.ecommerce-nation.fr/",
          },
        ],
      },
    };

    this.lastCall = 0;
    this.calls = 0;
  }

  search(keyword, page = 1) {
    return defer(() => {
      const currentTimestamp = Date.now();

      if (currentTimestamp - this.lastCall < 100) {
        const diff = currentTimestamp - this.lastCall;
        return throwError(
          new Error(`Rate limit exceeed (last call was ${diff} ms ago)`)
        );
      }

      this.lastCall = currentTimestamp;
      this.calls += 1;

      if (
        this.responses.hasOwnProperty(keyword) &&
        this.responses[keyword].hasOwnProperty(page)
      ) {
        return of(this.responses[keyword][page]);
      }

      return of([
        {
          title: "Vous Etes Perdu ?",
          url: "https://www.perdu.com/",
        },
        {
          title:
            "Perdu : Définition simple et facile du dictionnaire - L'Internaute",
          url: "https://www.linternaute.fr/dictionnaire/fr/definition/perdu/",
        },
        {
          title: "perdu — Wiktionnaire",
          url: "https://fr.wiktionary.org/wiki/perdu",
        },
      ]);
    });
  }
}

module.exports = SearchService;
