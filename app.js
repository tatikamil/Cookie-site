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
  { id: 7,  name: "Завитушка сінамон",        sub: "sandwich", weight: "L · 900 г", price: "206 грн", img: "images/zavytushka-cinamon.png" },
  { id: 8,  name: "Малібу згущене молоко",    sub: "sandwich", weight: "L · 1 кг",  price: "176 грн", img: "images/malibu-zgushenka.png" },
  { id: 9,  name: "Нова Прага какао крем",    sub: "sandwich", weight: "L · 500 г", price: "202 грн", img: "images/praha-cacao.png" },
  { id: 10, name: "Задавака",                 sub: "sandwich", weight: "L · 900 г", price: "140 грн", img: "images/zadavaka.png" },
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

// === Render ===
function render(filter) {
  const grid = document.getElementById("productGrid");
  const list = filter === "all" ? products : products.filter(p => p.sub === filter);
  grid.innerHTML = list.map(cardHTML).join("");
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
