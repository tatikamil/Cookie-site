// === Box Builder Logic ===

const MAX_PRODUCTS = 10;
const MAX_PIECES = 36;

// === Product data ===
const products = [
  // --- Печиво-сендвіч ---
  { id: 1, category: "sandwich", name: "Біскавітка", pcs: 4, price: 172, img: "images/biskvitka.png", flavors: null },
  { id: 2, category: "sandwich", name: "Орбіта",    pcs: 4, price: 172, img: "images/orbita.png",     flavors: null },
  { id: 3, category: "sandwich", name: "Джайв",     pcs: 4, price: 214, img: "images/dzhaiv.png",     flavors: null },
  {
    id: 4, category: "sandwich", name: "Нова Прага", pcs: 4,
    flavors: [
      { name: "тоффі-карамель", price: 40, img: "images/praha-caramel.png" },
      { name: "какао-крем",     price: 40, img: "images/praha-cacao.png" },
      { name: "креме",          price: 40, img: "images/praha-creme.png" },
      { name: "фісташка",       price: 40, img: "images/praha-fistashka.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 5, category: "sandwich", name: "Малібу", pcs: 4,
    flavors: [
      { name: "крем",            price: 50, img: "images/malibu-creme.png" },
      { name: "какао",           price: 50, img: "images/malibu-cacao.png" },
      { name: "карамель",        price: 50, img: "images/malibu-caramel.png" },
      { name: "згущене молоко",  price: 50, img: "images/malibu-zgushenka.png" },
    ],
    activeFlavor: 0,
  },

  // --- Печиво класичне ---
  { id: 6,  category: "classic", name: "Домашнє",          pcs: 4, price: 105, img: "images/domashne.png",      flavors: null },
  { id: 7,  category: "classic", name: "Бабусине",         pcs: 4, price: 138, img: "images/babusyne.png",      flavors: null },
  { id: 8,  category: "classic", name: "Насолода",         pcs: 4, price: 138, img: "images/nasoloda.png",      flavors: null },
  { id: 9,  category: "classic", name: "Забава",           pcs: 4, price: 164, img: "images/zabava.png",        flavors: null },
  { id: 10, category: "classic", name: "Задавака",         pcs: 4, price: 140, img: "images/zadavaka.png",      flavors: null },
  {
    id: 11, category: "classic", name: "Американо", pcs: 4,
    flavors: [
      { name: "шоко-дропс", price: 48, img: "images/amerikano-drops.png" },
      { name: "родзинки",   price: 48, img: "images/amerikano-rodzynky.png" },
    ],
    activeFlavor: 0,
  },
  { id: 12, category: "classic", name: "Білочка",          pcs: 4, price: 198, img: "images/bilochka.png",      flavors: null },
  { id: 13, category: "classic", name: "Білочка в глазурі", pcs: 4, price: 204, img: "images/bilochka-glazur.png", flavors: null },
  {
    id: 14, category: "classic", name: "Кватро", pcs: 4,
    flavors: [
      { name: "шоко-дропс", price: 32, img: "images/kvatro-drops.png" },
      { name: "мак",         price: 32, img: "images/kvatro-mak.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 15, category: "classic", name: "Джемка", pcs: 4,
    flavors: [
      { name: "вишня",    price: 55, img: "images/dzhemka-vyshnia.png" },
      { name: "абрикос",  price: 55, img: "images/dzhemka-abrykos.png" },
      { name: "яблуко",   price: 55, img: "images/dzhemka-jabluko.png" },
      { name: "полуниця", price: 55, img: "images/dzhemka-polunytsia.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 16, category: "classic", name: "Завитушка", pcs: 4,
    flavors: [
      { name: "кориця",         price: 56, img: "images/zavytushka-korytsia.png" },
      { name: "мак",            price: 56, img: "images/zavytushka-mak.png" },
      { name: "арахіс",         price: 56, img: "images/zavytushka-arahis.png" },
      { name: "згущене молоко", price: 56, img: "images/zavytushka-zgushenka.png" },
    ],
    activeFlavor: 0,
  },

  // --- Мафіни & Донати ---
  {
    id: 17, category: "muffins", name: "Донат", pcs: 4,
    flavors: [
      { name: "великодній",    price: 120, img: "images/donut-velykodniy.png" },
      { name: "великодній 2",  price: 120, img: "images/donut-velykodniy2.png" },
      { name: "згущенка",      price: 120, img: "images/donut-zgyshenka.png" },
      { name: "абрикос",       price: 120, img: "images/Донат абрикос.png" },
      { name: "полуниця",      price: 120, img: "images/donut-polynytsia.png" },
      { name: "шоколад",       price: 120, img: "images/donut-choko.png" },
      { name: "вишня",         price: 120, img: "images/donut-vyshnia.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 18, category: "muffins", name: "Мафін", pcs: 4,
    flavors: [
      { name: "великодній",    price: 125, img: "images/mafin-velykodniy.png" },
      { name: "великодній 2",  price: 125, img: "images/mafin-velykodniy2.png" },
      { name: "какао",         price: 125, img: "images/mafin-cacao.png" },
      { name: "абрикос",       price: 125, img: "images/mafin-abrykos.png" },
      { name: "апельсин",      price: 125, img: "images/mafin-apelsyn.png" },
      { name: "вишня",         price: 125, img: "images/mafin-vyshnia.png" },
      { name: "згущенка",      price: 125, img: "images/mafin-zgushenka.png" },
      { name: "фісташка",      price: 125, img: "images/mafin-fistashka.png" },
      { name: "шоко-крем",     price: 125, img: "images/mafin-chococreme.png" },
      { name: "крем",          price: 125, img: "images/mafin-creme.png" },
      { name: "родзинки",      price: 125, img: "images/mafin-rodzynki.png" },
      { name: "персик",        price: 125, img: "images/mafin-abrykos.png" },
    ],
    activeFlavor: 0,
  },
];

// === Active category filter ===
let activeCategory = "sandwich";

function getFilteredProducts() {
  return products.filter(p => p.category === activeCategory);
}

// === Box key helpers ===
// Key format: "productId" for no-flavor, "productId:flavorIndex" for flavored
function boxKey(productId, flavorIndex) {
  return flavorIndex != null ? `${productId}:${flavorIndex}` : `${productId}`;
}

function parseBoxKey(key) {
  const parts = key.split(":");
  return {
    productId: Number(parts[0]),
    flavorIndex: parts[1] != null ? Number(parts[1]) : null,
  };
}

function getItemData(key) {
  const { productId, flavorIndex } = parseBoxKey(key);
  const p = products.find(pr => pr.id === productId);
  if (flavorIndex != null) {
    const f = p.flavors[flavorIndex];
    return { name: `${p.name} ${p.pcs} шт`, flavor: f.name, img: f.img, price: f.price, pcs: p.pcs };
  }
  return { name: `${p.name} ${p.pcs} шт`, flavor: null, img: p.img, price: p.price, pcs: p.pcs };
}

// Current card key (what will be added with current dropdown selection)
function currentCardKey(p) {
  if (p.flavors) return boxKey(p.id, p.activeFlavor);
  return boxKey(p.id);
}

// === Box state ===
const box = {}; // { "productId" or "productId:flavorIndex": quantity }

function getBoxStats() {
  const keys = Object.keys(box).filter(k => box[k] > 0);
  const totalProducts = keys.length;
  const totalPieces = keys.reduce((sum, k) => {
    const data = getItemData(k);
    return sum + box[k] * data.pcs;
  }, 0);
  const totalPrice = keys.reduce((sum, k) => {
    const data = getItemData(k);
    return sum + box[k] * data.price;
  }, 0);
  return { totalProducts, totalPieces, totalPrice };
}

// === SVG icons ===
const ICON_MINUS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="3" y1="8" x2="13" y2="8" stroke="#00A439" stroke-width="2" stroke-linecap="round"/></svg>`;
const ICON_PLUS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="3" y1="8" x2="13" y2="8" stroke="#00A439" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="3" x2="8" y2="13" stroke="#00A439" stroke-width="2" stroke-linecap="round"/></svg>`;
const ICON_CLOSE = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="4" y1="4" x2="12" y2="12" stroke="#3A332C" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="4" x2="4" y2="12" stroke="#3A332C" stroke-width="1.5" stroke-linecap="round"/></svg>`;

// === Dropdown state ===
let openDropdownId = null;

function toggleDropdown(id, e) {
  e.stopPropagation();
  openDropdownId = openDropdownId === id ? null : id;
  render();
}

function selectFlavor(productId, flavorIndex, e) {
  e.stopPropagation();
  const product = products.find(p => p.id === productId);
  product.activeFlavor = flavorIndex;
  openDropdownId = null;
  render();
}

document.addEventListener("click", () => {
  if (openDropdownId !== null) {
    openDropdownId = null;
    render();
  }
});

// === Card HTML ===
function cardHTML(p) {
  const key = currentCardKey(p);
  const inBox = box[key] && box[key] > 0;
  const qty = box[key] || 0;
  const img = p.flavors ? p.flavors[p.activeFlavor].img : p.img;
  const price = p.flavors ? p.flavors[p.activeFlavor].price : p.price;
  const flavorName = p.flavors ? p.flavors[p.activeFlavor].name : null;
  const isOpen = openDropdownId === p.id;

  const bottomSection = inBox
    ? `<div class="product-card__counter">
        <button class="product-card__counter-btn" onclick="updateQty('${key}', -1)">${ICON_MINUS}</button>
        <span class="product-card__counter-value">${qty}</span>
        <button class="product-card__counter-btn" onclick="updateQty('${key}', 1)">${ICON_PLUS}</button>
      </div>`
    : `<button class="product-card__btn" onclick="addToBox('${key}')">Додати у бокс</button>`;

  let dropdownMenu = '';
  if (p.flavors && isOpen) {
    const options = p.flavors.map((f, i) => {
      const fKey = boxKey(p.id, i);
      const fQty = box[fKey] || 0;
      const badge = fQty > 0 ? `<span class="dropdown-menu__badge">${fQty}</span>` : '';
      return `
      <button class="dropdown-menu__item ${i === p.activeFlavor ? 'dropdown-menu__item--active' : ''}"
              onclick="selectFlavor(${p.id}, ${i}, event)">
        <span class="dropdown-menu__flavor">${f.name}${badge}</span>
        <span class="dropdown-menu__price">${f.price} грн</span>
      </button>`;
    }).join('');
    dropdownMenu = `<div class="dropdown-menu">${options}</div>`;
  }

  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-card__image-wrap">
        <img class="product-card__image" src="${img}" alt="${p.name}">
      </div>
      <div class="product-card__name"><a href="#">${p.name}</a><span class="product-card__pcs">${p.pcs} шт</span></div>
      <div class="product-card__options" style="position:relative">
        <div class="product-card__dropdown ${p.flavors ? 'product-card__dropdown--clickable' : ''}"
             ${p.flavors ? `onclick="toggleDropdown(${p.id}, event)"` : ''}>
          <span class="product-card__weight">${flavorName || ''}</span>
          <div class="product-card__price-group">
            <span class="product-card__price">${price} грн</span>
            ${p.flavors ? `<img class="product-card__caret ${isOpen ? 'product-card__caret--open' : ''}" src="icons/caret-big-down-filled.svg" alt="">` : ''}
          </div>
        </div>
        ${dropdownMenu}
      </div>
      ${bottomSection}
    </div>`;
}

// === Sidebar item HTML ===
function sidebarItemHTML(key) {
  const data = getItemData(key);
  const qty = box[key];
  const displayName = data.flavor ? `${data.name.replace(/ \d+ шт$/, '')} ${data.flavor}` : data.name;

  return `
    <div class="box-sidebar__item">
      <div class="box-sidebar__item-info">
        <img class="box-sidebar__item-img" src="${data.img}" alt="${displayName}">
        <div class="box-sidebar__item-text">
          <span class="box-sidebar__item-name">${displayName}</span>
          <span class="box-sidebar__item-price">${qty} × ${data.price} грн</span>
        </div>
      </div>
      <button class="box-sidebar__item-remove" onclick="removeFromBox('${key}')">${ICON_CLOSE}</button>
    </div>`;
}

// === Render ===
function render() {
  const grid = document.getElementById("productGrid");
  const filtered = getFilteredProducts();
  grid.innerHTML = filtered.map(cardHTML).join("");

  const itemsContainer = document.getElementById("boxItems");
  const keys = Object.keys(box).filter(k => box[k] > 0);

  if (keys.length === 0) {
    itemsContainer.innerHTML = '<div class="box-sidebar__empty">Додайте печиво до боксу</div>';
  } else {
    itemsContainer.innerHTML = keys.map(sidebarItemHTML).join("");
  }

  const stats = getBoxStats();
  document.getElementById("statProducts").textContent = `${stats.totalProducts} / ${MAX_PRODUCTS}`;
  document.getElementById("statPieces").textContent = `${stats.totalPieces} / ${MAX_PIECES}`;
  document.getElementById("totalPrice").textContent = `${stats.totalPrice} грн`;
}

// === Actions ===
function addToBox(key) {
  const stats = getBoxStats();
  const data = getItemData(key);
  if (stats.totalProducts >= MAX_PRODUCTS && !box[key]) return;
  if (stats.totalPieces + data.pcs > MAX_PIECES) return;
  box[key] = (box[key] || 0) + 1;
  render();
}

function removeFromBox(key) {
  delete box[key];
  render();
}

function updateQty(key, delta) {
  const newQty = (box[key] || 0) + delta;
  if (newQty <= 0) {
    removeFromBox(key);
    return;
  }
  const data = getItemData(key);
  const stats = getBoxStats();
  const newPieces = stats.totalPieces + delta * data.pcs;
  if (newPieces > MAX_PIECES) return;
  box[key] = newQty;
  render();
}

// === Pill filtering ===
document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("pill--active"));
    pill.classList.add("pill--active");
    activeCategory = pill.dataset.filter;
    openDropdownId = null;
    render();
  });
});

// === Init ===
render();
