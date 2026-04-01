// === Product data (shortened, values from Figma) ===
const products = [
  // Класичне
  { id: 1,  name: "Американо дропс",     sub: "classic",  weight: "L · 800 г",  price: "178 грн", img: "images/amerikano-drops.png" },
  { id: 2,  name: "Білочка",             sub: "classic",  weight: "L · 800 г",  price: "198 грн", img: "images/bilochka.png" },
  { id: 3,  name: "Домашнє",             sub: "classic",  weight: "L · 900 г",  price: "105 грн", img: "images/domashne.png" },
  { id: 4,  name: "Бабусине",            sub: "classic",  weight: "L · 900 г",  price: "138 грн", img: "images/babusyne.png" },
  { id: 5,  name: "Кватро дропс",        sub: "classic",  weight: "L · 1 кг",   price: "174 грн", img: "images/kvatro-drops.png" },
  { id: 6,  name: "Джемка абрикос",      sub: "classic",  weight: "L · 900 г",  price: "100 грн", img: "images/dzhemka-abrykos.png" },
  // Сендвіч
  { id: 7,  name: "Бісквітка",                          sub: "sandwich", weight: "L · 800 г", price: "174 грн", img: "images/biskvitka.png" },
  { id: 8,  name: "Джайв",                              sub: "sandwich", weight: "L · 1 кг",  price: "214 грн", img: "images/dzhaiv.png" },
  { id: 9,  name: "Орбіта",                             sub: "sandwich", weight: "L · 1 кг",  price: "172 грн", img: "images/orbita.png" },
  { id: 10, name: "Магія Арахіс",                       sub: "sandwich", weight: "L · 1 кг",  price: "198 грн", img: "images/magia-arahis.png" },
  { id: 11, name: "Магія Кокос",                        sub: "sandwich", weight: "L · 1 кг",  price: "198 грн", img: "images/magia-cocos.png" },
  { id: 12, name: "Солодка паличка згущене молоко",     sub: "sandwich", weight: "L · 900 г", price: "190 грн", img: "images/paluchka-zgushenka.png" },
  { id: 13, name: "Солодка паличка пряжене молоко",     sub: "sandwich", weight: "L · 900 г", price: "176 грн", img: "images/paluchka-moloko.png" },
  { id: 14, name: "Завитушка арахіс та згущене молоко", sub: "sandwich", weight: "L · 900 г", price: "220 грн", img: "images/zavytushka-arahis.png" },
  { id: 15, name: "Завитушка згущене молоко",           sub: "sandwich", weight: "L · 900 г", price: "188 грн", img: "images/zavytushka-zgushenka.png" },
  { id: 16, name: "Завитушка пряжене молоко",           sub: "sandwich", weight: "L · 900 г", price: "214 грн", img: "images/zavytushka-moloko.png" },
  { id: 17, name: "Завитушка мак та згущене молоко",    sub: "sandwich", weight: "L · 900 г", price: "214 грн", img: "images/zavytushka-mak.png" },
  { id: 18, name: "Завитушка сінамон",                  sub: "sandwich", weight: "L · 900 г", price: "206 грн", img: "images/zavytushka-cinamon.png" },
  { id: 19, name: "Завитушки шоко",                     sub: "sandwich", weight: "L · 900 г", price: "198 грн", img: "images/zavytushka-choko.png" },
  { id: 20, name: "Завитушка яблуко",                   sub: "sandwich", weight: "L · 900 г", price: "158 грн", img: "images/zavytushka-jabluko.png" },
  { id: 21, name: "Малібу згущене молоко",              sub: "sandwich", weight: "L · 1 кг",  price: "176 грн", img: "images/malibu-zgushenka.png" },
  { id: 22, name: "Малібу какао крем",                  sub: "sandwich", weight: "L · 1 кг",  price: "180 грн", img: "images/malibu-cacao.png" },
  { id: 23, name: "Малібу креме",                       sub: "sandwich", weight: "L · 1 кг",  price: "176 грн", img: "images/malibu-creme.png" },
  { id: 24, name: "Малібу тоффі-карамель",              sub: "sandwich", weight: "L · 1 кг",  price: "176 грн", img: "images/malibu-caramel.png" },
  { id: 25, name: "Нова Прага какао крем",              sub: "sandwich", weight: "L · 1 кг",  price: "202 грн", img: "images/praha-cacao.png" },
  { id: 26, name: "Нова Прага фісташка",                sub: "sandwich", weight: "L · 1 кг",  price: "198 грн", img: "images/praha-fistashka.png" },
  { id: 27, name: "Нова Прага тоффі-карамель",          sub: "sandwich", weight: "L · 1 кг",  price: "198 грн", img: "images/praha-caramel.png" },
  { id: 28, name: "Нова Прага креме",                   sub: "sandwich", weight: "L · 1 кг",  price: "198 грн", img: "images/praha-creme.png" },
];

// === Card HTML ===
function cardHTML(p) {
  return `
    <div class="product-card" data-sub="${p.sub || ''}">
      <div class="product-card__image-wrap">
        <img class="product-card__image" src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-card__name"><a href="#">${p.name}</a></div>
      <div class="product-card__options">
        <div class="product-card__dropdown">
          <span class="product-card__weight">${p.weight}</span>
          <div class="product-card__price-group">
            <span class="product-card__price">${p.price}</span>
            <img class="product-card__caret" src="icons/caret-big-down-filled.svg" alt="">
          </div>
        </div>
      </div>
      <button class="product-card__btn">У кошик</button>
    </div>`;
}

// === Promo Cards HTML ===
const promoBoxHTML = `
    <div class="promo-card">
      <div class="promo-card__text">
        <div class="promo-card__title">Збери свій бокс</div>
        <div class="promo-card__desc">Шукаєш особливий подарунок? Тоді тобі сюди. Ми навіть підпишемо від тебе листівочку</div>
      </div>
      <a class="promo-card__btn" href="box-builder.html">
        <span class="promo-card__btn-desktop">Зібрати свій бокс</span>
        <span class="promo-card__btn-mobile">Зібрати бокс</span>
      </a>
    </div>`;

const promoSetsHTML = `
    <div class="promo-card">
      <div class="promo-card__text">
        <div class="promo-card__title">Хочеш все й одразу?</div>
        <div class="promo-card__desc">Переглянь наші набори, куди входить асортимент печива, мафінів та донатів! Зібрали для тебе улюблені види в одному наборі.</div>
      </div>
      <a class="promo-card__btn" href="#">
        <span class="promo-card__btn-desktop">Обрати набір</span>
        <span class="promo-card__btn-mobile">Обрати набір</span>
      </a>
    </div>`;

// === Render ===
function render(filter) {
  const grid = document.getElementById("productGrid");
  const list = filter === "all" ? products : products.filter(p => p.sub === filter);
  const cards = list.map(cardHTML);
  // Insert promo cards for sandwich tab
  if (filter === "sandwich") {
    cards.splice(3, 0, promoBoxHTML);   // row 1, position 4
    cards.splice(15, 0, promoSetsHTML); // row 4, position 4
  }
  grid.innerHTML = cards.join("");
}

// === Pill filtering ===
document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("pill--active"));
    pill.classList.add("pill--active");
    render(pill.dataset.filter);
  });
});

// === Init ===
render("all");
