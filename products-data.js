window.DEFAULT_PLP_PACK_OPTIONS = [
  { label: "LF · 800 г", price: 200 },
  { label: "TB · 400 г", price: 110 },
  { label: "L · 900 г", price: 200 },
  { label: "XL · 2 кг", price: 408 },
  { label: "XXL · 2 кг", price: 505 },
];

window.PRODUCTS_DATA = [
  {
    id: "amerikano",
    title: "Американо",
    category: "classic",
    catalogItems: [
      {
        id: "amerikano-drops",
        cardTitle: "Американо дропс",
        image: "images/amerikano-drops.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 800 г", price: 178 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Американо",
      flavorOptions: [
        { id: "drops", label: "дропс", image: "images/amerikano-drops.png", pcs: 4, units: 4, price: 13 },
        { id: "rodzynky", label: "родзинки", image: "images/amerikano-rodzynky.png", pcs: 4, units: 4, price: 13 },
      ],
    },
  },
  {
    id: "bilochka",
    title: "Білочка",
    category: "classic",
    catalogItems: [
      {
        id: "bilochka",
        cardTitle: "Білочка",
        image: "images/bilochka.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 800 г", price: 198 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Білочка",
      image: "images/bilochka.png",
      pcs: 4,
      units: 4,
      price: 20,
    },
  },
  {
    id: "domashne",
    title: "Домашнє",
    category: "classic",
    catalogItems: [
      {
        id: "domashne",
        cardTitle: "Домашнє",
        image: "images/domashnie.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 900 г", price: 105 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Домашнє",
      image: "images/domashnie.png",
      pcs: 4,
      units: 4,
      price: 11,
    },
  },
  {
    id: "babusyne",
    title: "Бабусине",
    category: "classic",
    catalogItems: [
      {
        id: "babusyne",
        cardTitle: "Бабусине",
        image: "images/babusyne.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 900 г", price: 138 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Бабусине",
      image: "images/babusyne.png",
      pcs: 4,
      units: 4,
      price: 14,
    },
  },
  {
    id: "kvatro",
    title: "Кватро",
    category: "classic",
    catalogItems: [
      {
        id: "kvatro-drops",
        cardTitle: "Кватро дропс",
        image: "images/kvatro-drops.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 1 кг", price: 174 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Кватро",
      flavorOptions: [
        { id: "drops", label: "дропс", image: "images/kvatro-drops.png", pcs: 4, units: 4, price: 10 },
        { id: "mak", label: "мак", image: "images/kvatro-mak.png", pcs: 4, units: 4, price: 10 },
      ],
    },
  },
  {
    id: "dzhemka",
    title: "Джемка",
    category: "classic",
    catalogItems: [
      {
        id: "dzhemka-abrykos",
        cardTitle: "Джемка абрикос",
        image: "images/dzhemka-abrykos.png",
        subcategory: "classic",
        packOptions: [{ label: "L · 900 г", price: 100 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Джемка",
      flavorOptions: [
        { id: "vyshnia", label: "вишня", image: "images/dzhemka-vyshnia.png", pcs: 4, units: 4, price: 14 },
        { id: "abrykos", label: "абрикос", image: "images/dzhemka-abrykos.png", pcs: 4, units: 4, price: 14 },
        { id: "jabluko", label: "яблуко", image: "images/dzhemka-jabluko.png", pcs: 4, units: 4, price: 14 },
        { id: "polunytsia", label: "полуниця", image: "images/dzhemka-polunytsia.png", pcs: 4, units: 4, price: 14 },
      ],
    },
  },
  {
    id: "biskvitka",
    title: "Бісквітка",
    category: "sandwich",
    catalogItems: [
      {
        id: "biskvitka",
        cardTitle: "Бісквітка",
        image: "images/biskvitka.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 800 г", price: 174 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Бісквітка",
      image: "images/biskvitka.png",
      pcs: 2,
      units: 5,
      price: 14,
    },
  },
  {
    id: "dzhaiv",
    title: "Джайв",
    category: "sandwich",
    catalogItems: [
      {
        id: "dzhaiv",
        cardTitle: "Джайв",
        image: "images/dzhaiv.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 214 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Джайв",
      image: "images/dzhaiv.png",
      pcs: 2,
      units: 5,
      price: 18,
    },
  },
  {
    id: "orbita",
    title: "Орбіта",
    category: "sandwich",
    catalogItems: [
      {
        id: "orbita",
        cardTitle: "Орбіта",
        image: "images/orbita.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 172 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Орбіта",
      image: "images/orbita.png",
      pcs: 2,
      units: 5,
      price: 14,
    },
  },
  {
    id: "magiia",
    title: "Магія",
    category: "sandwich",
    catalogItems: [
      {
        id: "magiia-arahis",
        cardTitle: "Магія арахіс",
        image: "images/magia-arahis.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 198 }],
      },
      {
        id: "magiia-kokos",
        cardTitle: "Магія кокос",
        image: "images/magia-cocos.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 198 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Магія",
      flavorOptions: [
        { id: "kokos", label: "кокос", image: "images/magia-cocos.png", pcs: 4, units: 5, price: 18 },
        { id: "arahis", label: "арахіс", image: "images/magia-arahis.png", pcs: 4, units: 5, price: 18 },
      ],
    },
  },
  {
    id: "solodka-palychka",
    title: "Солодка паличка",
    category: "sandwich",
    catalogItems: [
      {
        id: "solodka-palychka-zgushchene-moloko",
        cardTitle: "Солодка паличка згущене молоко",
        image: "images/paluchka-zgushenka.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 190 }],
      },
      {
        id: "solodka-palychka-priazhene-moloko",
        cardTitle: "Солодка паличка пряжене молоко",
        image: "images/paluchka-moloko.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 176 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Солодка паличка",
      flavorOptions: [
        { id: "zgushchene-moloko", label: "згущене молоко", image: "images/paluchka-zgushenka.png", pcs: 4, units: 5, price: 13 },
        { id: "priazhene-moloko", label: "пряжене молоко", image: "images/paluchka-moloko.png", pcs: 4, units: 5, price: 13 },
      ],
    },
  },
  {
    id: "zavytushka",
    title: "Завитушка",
    category: "sandwich",
    catalogItems: [
      {
        id: "zavytushka-arahis-zgushchene-moloko",
        cardTitle: "Завитушка арахіс та згущене молоко",
        image: "images/zavytushka-arahis.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 220 }],
      },
      {
        id: "zavytushka-zgushchene-moloko",
        cardTitle: "Завитушка згущене молоко",
        image: "images/zavytushka-zgushenka.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 188 }],
      },
      {
        id: "zavytushka-priazhene-moloko",
        cardTitle: "Завитушка пряжене молоко",
        image: "images/zavytushka-moloko.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 214 }],
      },
      {
        id: "zavytushka-mak-zgushchene-moloko",
        cardTitle: "Завитушка мак та згущене молоко",
        image: "images/zavytushka-mak.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 214 }],
      },
      {
        id: "zavytushka-synamon",
        cardTitle: "Завитушка синамон",
        image: "images/zavytushka-cinamon.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 206 }],
      },
      {
        id: "zavytushka-shokolad",
        cardTitle: "Завитушка шоколад",
        image: "images/zavytushka-choko.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 198 }],
      },
      {
        id: "zavytushka-jabluko",
        cardTitle: "Завитушка яблуко",
        image: "images/zavytushka-jabluko.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 900 г", price: 158 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Завитушки",
      flavorOptions: [
        { id: "arahis-zgushchenka", label: "арахіс та згущене молоко", image: "images/zavytushka-arahis.png", pcs: 2, units: 5, price: 16 },
        { id: "zgushchene-moloko", label: "згущене молоко", image: "images/zavytushka-zgushenka.png", pcs: 2, units: 5, price: 16 },
        { id: "priazhene-moloko", label: "пряжене молоко", image: "images/zavytushka-moloko.png", pcs: 2, units: 5, price: 16 },
        { id: "mak-zgushchene-moloko", label: "мак та згущене молоко", image: "images/zavytushka-mak.png", pcs: 2, units: 5, price: 16 },
        { id: "synamon", label: "синамон", image: "images/zavytushka-cinamon.png", pcs: 2, units: 5, price: 16 },
        { id: "shokolad", label: "шоколад", image: "images/zavytushka-choko.png", pcs: 2, units: 5, price: 16 },
        { id: "jabluko", label: "яблуко", image: "images/zavytushka-jabluko.png", pcs: 2, units: 5, price: 16 },
      ],
    },
  },
  {
    id: "malibu",
    title: "Малібу",
    category: "sandwich",
    catalogItems: [
      {
        id: "malibu-zgushchene-moloko",
        cardTitle: "Малібу згущене молоко",
        image: "images/malibu-zgushenka.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 176 }],
      },
      {
        id: "malibu-kakao-krem",
        cardTitle: "Малібу какао-крем",
        image: "images/malibu-cacao.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 180 }],
      },
      {
        id: "malibu-kreme",
        cardTitle: "Малібу креме",
        image: "images/malibu-creme.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 176 }],
      },
      {
        id: "malibu-toffi-karamel",
        cardTitle: "Малібу тоффі-карамель",
        image: "images/malibu-caramel.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 176 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Малібу",
      flavorOptions: [
        { id: "krem", label: "крем", image: "images/malibu-creme.png", pcs: 4, units: 5, price: 15 },
        { id: "kakao", label: "какао", image: "images/malibu-cacao.png", pcs: 4, units: 5, price: 15 },
        { id: "karamel", label: "карамель", image: "images/malibu-caramel.png", pcs: 4, units: 5, price: 15 },
        { id: "zgushchene-moloko", label: "згущене молоко", image: "images/malibu-zgushenka.png", pcs: 4, units: 5, price: 15 },
      ],
    },
  },
  {
    id: "nova-praha",
    title: "Нова Прага",
    category: "sandwich",
    catalogItems: [
      {
        id: "nova-praha-kakao-krem",
        cardTitle: "Нова Прага какао-крем",
        image: "images/praha-cacao.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 202 }],
      },
      {
        id: "nova-praha-fistashka",
        cardTitle: "Нова Прага фісташка",
        image: "images/praha-fistashka.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 198 }],
      },
      {
        id: "nova-praha-toffi-karamel",
        cardTitle: "Нова Прага тоффі-карамель",
        image: "images/praha-caramel.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 198 }],
      },
      {
        id: "nova-praha-kreme",
        cardTitle: "Нова Прага креме",
        image: "images/praha-creme.png",
        subcategory: "sandwich",
        packOptions: [{ label: "L · 1 кг", price: 198 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Нова Прага",
      flavorOptions: [
        { id: "toffi-karamel", label: "тоффі-карамель", image: "images/praha-caramel.png", pcs: 4, units: 5, price: 12 },
        { id: "kakao-krem", label: "какао-крем", image: "images/praha-cacao.png", pcs: 4, units: 5, price: 12 },
        { id: "kreme", label: "креме", image: "images/praha-creme.png", pcs: 4, units: 5, price: 12 },
        { id: "fistashka", label: "фісташка", image: "images/praha-fistashka.png", pcs: 4, units: 5, price: 12 },
      ],
    },
  },
  {
    id: "frutiko",
    title: "Фрутіко",
    category: "sandwich",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Фрутіко",
      flavorOptions: [
        { id: "shoko-vyshnia", label: "шоко-вишня", image: "images/frutiko-vyshnia.png", pcs: 4, units: 5, price: 16 },
        { id: "abrykos", label: "абрикос", image: "images/frutiko-abrykos.png", pcs: 4, units: 5, price: 16 },
        { id: "shokolad", label: "шоколад", image: "images/frutiko-choko.png", pcs: 4, units: 5, price: 16 },
        { id: "polunytsia", label: "полуниця", image: "images/frutiko-polynytsia.png", pcs: 4, units: 5, price: 16 },
      ],
    },
  },
  {
    id: "duetto",
    title: "Дуетто",
    category: "sandwich",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Дуетто",
      flavorOptions: [
        { id: "dabl-krem", label: "дабл-крем", image: "images/duetto-doblecreme.png", pcs: 4, units: 5, price: 17 },
        { id: "polunytsia", label: "полуниця", image: "images/duetto-polunytsia.png", pcs: 4, units: 5, price: 17 },
      ],
    },
  },
  {
    id: "nasoloda",
    title: "Насолода",
    category: "classic",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Насолода",
      image: "images/nasoloda.png",
      pcs: 4,
      units: 4,
      price: 14,
    },
  },
  {
    id: "zabava",
    title: "Забава",
    category: "classic",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Забава",
      image: "images/zabava.png",
      pcs: 4,
      units: 4,
      price: 17,
    },
  },
  {
    id: "zadavaka",
    title: "Задавака",
    category: "classic",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Задавака",
      image: "images/zadavaka.png",
      pcs: 4,
      units: 4,
      price: 15,
    },
  },
  {
    id: "bilochka-glazur",
    title: "Білочка в глазурі",
    category: "classic",
    catalogItems: [],
    boxBuilderItem: {
      cardTitle: "Білочка в глазурі",
      image: "images/bilochka-glazur.png",
      pcs: 4,
      units: 4,
      price: 20,
    },
  },
  {
    id: "donat",
    title: "Донат",
    category: "donuts",
    catalogItems: [
      {
        id: "donat-velykodnii",
        cardTitle: "Донат великодній",
        image: "images/donut-velykodniy.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 900 г", price: 260 }],
      },
      {
        id: "donat-zgushchene-moloko",
        cardTitle: "Донат згущене молоко",
        image: "images/donut-zgyshenka.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 190 }],
      },
      {
        id: "donat-shoko-apelsyn",
        cardTitle: "Донат шоко апельсин",
        image: "images/donut-choko.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 185 }],
      },
      {
        id: "donat-abrykos",
        cardTitle: "Донат абрикос",
        image: "images/donut-abrykos.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 180 }],
      },
      {
        id: "donat-persyk",
        cardTitle: "Донат персик",
        image: "images/donut-persyk.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 180 }],
      },
      {
        id: "donat-vyshnia",
        cardTitle: "Донат вишня",
        image: "images/donut-vyshnia.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 180 }],
      },
      {
        id: "donat-polunytsia",
        cardTitle: "Донат полуниця",
        image: "images/donut-polynytsia.png",
        subcategory: "donuts",
        packOptions: [{ label: "LF · 800 г", price: 190 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Донат",
      flavorOptions: [
        { id: "velykodnii", label: "великодній", image: "images/donut-velykodniy.png", pcs: 1, units: 10, price: 17 },
        { id: "persyk", label: "персик", image: "images/donut-persyk.png", pcs: 1, units: 10, price: 17 },
        { id: "zgushchenka", label: "згущенка", image: "images/donut-zgyshenka.png", pcs: 1, units: 10, price: 17 },
        { id: "abrykos", label: "абрикос", image: "images/donut-abrykos.png", pcs: 1, units: 10, price: 17 },
        { id: "polunytsia", label: "полуниця", image: "images/donut-polynytsia.png", pcs: 1, units: 10, price: 17 },
        { id: "shoko-apelsyn", label: "шоко-апельсин", image: "images/donut-choko.png", pcs: 1, units: 10, price: 17 },
        { id: "vyshnia", label: "вишня", image: "images/donut-vyshnia.png", pcs: 1, units: 10, price: 17 },
      ],
    },
  },
  {
    id: "mafin",
    title: "Мафін",
    category: "muffins",
    catalogItems: [
      {
        id: "mafin-velykodnii",
        cardTitle: "Мафін великодній",
        image: "images/mafin-velykodniy.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 240 }],
      },
      {
        id: "mafin-zgushchene-moloko",
        cardTitle: "Мафін згущене молоко",
        image: "images/mafin-zgushenka.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 170 }],
      },
      {
        id: "mafin-apelsyn",
        cardTitle: "Мафін апельсин",
        image: "images/mafin-apelsyn.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-abrykos",
        cardTitle: "Мафін абрикос",
        image: "images/mafin-abrykos.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-rodzynky",
        cardTitle: "Мафін родзинки",
        image: "images/mafin-rodzynki.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-shoko-kreme",
        cardTitle: "Мафін шоко-креме",
        image: "images/mafin-chococreme.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-persyk",
        cardTitle: "Мафін персик",
        image: "images/mafin-polunytsia.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-vyshnia",
        cardTitle: "Мафін вишня",
        image: "images/mafin-vyshnia.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
      {
        id: "mafin-kakao",
        cardTitle: "Мафін какао",
        image: "images/mafin-cacao.png",
        subcategory: "muffins",
        packOptions: [{ label: "LF · 700 г", price: 160 }],
      },
    ],
    boxBuilderItem: {
      cardTitle: "Мафін",
      flavorOptions: [
        { id: "velykodnii", label: "великодній", image: "images/mafin-velykodniy.png", pcs: 1, units: 12, price: 17 },
        { id: "polunytsia", label: "полуниця", image: "images/mafin-velykodniy2.png", pcs: 1, units: 12, price: 17 },
        { id: "kakao", label: "какао", image: "images/mafin-cacao.png", pcs: 1, units: 12, price: 17 },
        { id: "abrykos", label: "абрикос", image: "images/mafin-abrykos.png", pcs: 1, units: 12, price: 17 },
        { id: "apelsyn", label: "апельсин", image: "images/mafin-apelsyn.png", pcs: 1, units: 12, price: 17 },
        { id: "vyshnia", label: "вишня", image: "images/mafin-vyshnia.png", pcs: 1, units: 12, price: 17 },
        { id: "zgushchenka", label: "згущенка", image: "images/mafin-zgushenka.png", pcs: 1, units: 12, price: 17 },
        { id: "fistashka", label: "фісташка", image: "images/mafin-fistashka.png", pcs: 1, units: 12, price: 17 },
        { id: "shoko-krem", label: "шоко-крем", image: "images/mafin-chococreme.png", pcs: 1, units: 12, price: 17 },
        { id: "krem", label: "крем", image: "images/mafin-creme.png", pcs: 1, units: 12, price: 17 },
        { id: "rodzynky", label: "родзинки", image: "images/mafin-rodzynki.png", pcs: 1, units: 12, price: 17 },
        { id: "persyk", label: "персик", image: "images/mafin-abrykos.png", pcs: 1, units: 12, price: 17 },
      ],
    },
  },
];

window.CATALOG_PROMOS = {
  sandwich: [
    {
      insertAfter: 3,
      title: "Збери свій бокс",
      description: "Шукаєш особливий подарунок? Тоді тобі сюди. Ми навіть підпишемо від тебе листівочку",
      href: "box-builder.html",
      desktopLabel: "Зібрати свій бокс",
      mobileLabel: "Зібрати бокс",
    },
    {
      insertAfter: 14,
      title: "Хочеш все й одразу?",
      description: "Переглянь наші набори, куди входить асортимент печива, мафінів та донатів! Зібрали для тебе улюблені види в одному наборі.",
      href: "#",
      desktopLabel: "Обрати набір",
      mobileLabel: "Обрати набір",
    },
  ],
};

window.getCatalogProducts = function getCatalogProducts() {
  let idCounter = 1;

  return window.PRODUCTS_DATA.flatMap((product) =>
    (product.catalogItems || []).map((item) => {
      const packOptions = item.packOptions?.length > 1
        ? item.packOptions
        : window.DEFAULT_PLP_PACK_OPTIONS;
      const primaryPack = packOptions[0];

      return {
        id: idCounter++,
        name: item.cardTitle,
        sub: item.subcategory || product.category,
        weight: primaryPack.label,
        price: `${primaryPack.price} грн`,
        img: item.image,
        packOptions,
      };
    })
  );
};

function normalizeFlavorText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['’`"]/g, "")
    .replace(/[-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findMatchingFlavorOption(catalogItem, flavorOptions, usedIndexes) {
  const availableOptions = flavorOptions
    .map((option, index) => ({ option, index }))
    .filter(({ index }) => !usedIndexes.has(index));

  const imageMatch = availableOptions.find(({ option }) => option.image === catalogItem.image);
  if (imageMatch) {
    return imageMatch;
  }

  const normalizedTitle = normalizeFlavorText(catalogItem.cardTitle);
  const labelMatch = availableOptions.find(({ option }) =>
    normalizedTitle.includes(normalizeFlavorText(option.label))
  );

  return labelMatch || availableOptions[0] || null;
}

window.getBoxBuilderProducts = function getBoxBuilderProducts() {
  let idCounter = 1;

  return window.PRODUCTS_DATA.flatMap((product) => {
    const item = product.boxBuilderItem;

    if (!item) {
      return [];
    }

    if (item.flavorOptions?.length) {
      const usedIndexes = new Set();

      return product.catalogItems
        .map((catalogItem) => {
          const match = findMatchingFlavorOption(catalogItem, item.flavorOptions, usedIndexes);

          if (!match) {
            return null;
          }

          usedIndexes.add(match.index);

          return {
            id: idCounter++,
            category: product.category,
            name: catalogItem.cardTitle,
            pcs: match.option.pcs,
            units: match.option.units,
            price: match.option.price,
            img: match.option.image,
            flavors: null,
          };
        })
        .filter(Boolean);
    }

    return [{
      id: idCounter++,
      category: product.category,
      name: item.cardTitle,
      pcs: item.pcs,
      units: item.units,
      price: item.price,
      img: item.image,
      flavors: null,
    }];
  });
};
