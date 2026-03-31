// === Box Builder Logic ===

const BOX_CAPACITY = 360;
const TOTAL_CELLS = 36;
const UNITS_PER_CELL = 10;

// === Product data ===
const products = [
  // --- Печиво-сендвіч (units: 5 per qty) ---
  { id: 1, category: "sandwich", name: "Біскавітка", pcs: 2, units: 5, price: 172, img: "images/biskvitka.png", flavors: null },
  { id: 2, category: "sandwich", name: "Орбіта",    pcs: 2, units: 5, price: 172, img: "images/orbita.png",     flavors: null },
  { id: 3, category: "sandwich", name: "Джайв",     pcs: 2, units: 5, price: 214, img: "images/dzhaiv.png",     flavors: null },
  {
    id: 4, category: "sandwich", name: "Нова Прага", pcs: 4, units: 5,
    flavors: [
      { name: "тоффі-карамель", price: 40, img: "images/praha-caramel.png" },
      { name: "какао-крем",     price: 40, img: "images/praha-cacao.png" },
      { name: "креме",          price: 40, img: "images/praha-creme.png" },
      { name: "фісташка",       price: 40, img: "images/praha-fistashka.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 5, category: "sandwich", name: "Малібу", pcs: 4, units: 5,
    flavors: [
      { name: "крем",            price: 50, img: "images/malibu-creme.png" },
      { name: "какао",           price: 50, img: "images/malibu-cacao.png" },
      { name: "карамель",        price: 50, img: "images/malibu-caramel.png" },
      { name: "згущене молоко",  price: 50, img: "images/malibu-zgushenka.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 19, category: "sandwich", name: "Магія", pcs: 4, units: 5,
    flavors: [
      { name: "кокос",   price: 78, img: "images/magia-cocos.png" },
      { name: "арахіс",  price: 78, img: "images/magia-arahis.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 20, category: "sandwich", name: "Солодка паличка", pcs: 4, units: 5,
    flavors: [
      { name: "згущене молоко", price: 55, img: "images/paluchka-zgushenka.png" },
      { name: "молоко",         price: 55, img: "images/paluchka-moloko.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 21, category: "sandwich", name: "Завитушки", pcs: 2, units: 5,
    flavors: [
      { name: "арахіс-згущенка",  price: 65, img: "images/zavytushka-arahis.png" },
      { name: "шоколад",           price: 65, img: "images/zavytushka-choko.png" },
      { name: "цукор",             price: 65, img: "images/zavytushka-tsukor.png" },
      { name: "яблуко",            price: 65, img: "images/zavytushka-jabluko.png" },
      { name: "молоко",            price: 65, img: "images/zavytushka-moloko.png" },
      { name: "кориця",            price: 65, img: "images/zavytushka-cinamon.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 22, category: "sandwich", name: "Фрутіко", pcs: 4, units: 5,
    flavors: [
      { name: "шоко-вишня",  price: 65, img: "images/frutiko-vyshnia.png" },
      { name: "абрикос",     price: 65, img: "images/frutiko-abrykos.png" },
      { name: "шоколад",     price: 65, img: "images/frutiko-choko.png" },
      { name: "полуниця",    price: 65, img: "images/frutiko-polynytsia.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 23, category: "sandwich", name: "Дуетто", pcs: 4, units: 5,
    flavors: [
      { name: "дабл крем",  price: 65, img: "images/duetto-doblecreme.png" },
      { name: "полуниця",   price: 65, img: "images/duetto-polunytsia.png" },
    ],
    activeFlavor: 0,
  },

  // --- Печиво класичне (units: 4 per qty) ---
  { id: 6,  category: "classic", name: "Домашнє",          pcs: 4, units: 4, price: 105, img: "images/domashne.png",      flavors: null },
  { id: 7,  category: "classic", name: "Бабусине",         pcs: 4, units: 4, price: 138, img: "images/babusyne.png",      flavors: null },
  { id: 8,  category: "classic", name: "Насолода",         pcs: 4, units: 4, price: 138, img: "images/nasoloda.png",      flavors: null },
  { id: 9,  category: "classic", name: "Забава",           pcs: 4, units: 4, price: 164, img: "images/zabava.png",        flavors: null },
  { id: 10, category: "classic", name: "Задавака",         pcs: 4, units: 4, price: 140, img: "images/zadavaka.png",      flavors: null },
  {
    id: 11, category: "classic", name: "Американо", pcs: 4, units: 4,
    flavors: [
      { name: "шоко-дропс", price: 48, img: "images/amerikano-drops.png" },
      { name: "родзинки",   price: 48, img: "images/amerikano-rodzynky.png" },
    ],
    activeFlavor: 0,
  },
  { id: 12, category: "classic", name: "Білочка",          pcs: 4, units: 4, price: 198, img: "images/bilochka.png",      flavors: null },
  { id: 13, category: "classic", name: "Білочка в глазурі", pcs: 4, units: 4, price: 204, img: "images/bilochka-glazur.png", flavors: null },
  {
    id: 14, category: "classic", name: "Кватро", pcs: 4, units: 4,
    flavors: [
      { name: "шоко-дропс", price: 32, img: "images/kvatro-drops.png" },
      { name: "мак",         price: 32, img: "images/kvatro-mak.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 15, category: "classic", name: "Джемка", pcs: 4, units: 4,
    flavors: [
      { name: "вишня",    price: 55, img: "images/dzhemka-vyshnia.png" },
      { name: "абрикос",  price: 55, img: "images/dzhemka-abrykos.png" },
      { name: "яблуко",   price: 55, img: "images/dzhemka-jabluko.png" },
      { name: "полуниця", price: 55, img: "images/dzhemka-polunytsia.png" },
    ],
    activeFlavor: 0,
  },
  {
    id: 16, category: "classic", name: "Завитушка", pcs: 4, units: 4,
    flavors: [
      { name: "кориця",         price: 56, img: "images/zavytushka-korytsia.png" },
      { name: "мак",            price: 56, img: "images/zavytushka-mak.png" },
      { name: "арахіс",         price: 56, img: "images/zavytushka-arahis.png" },
      { name: "згущене молоко", price: 56, img: "images/zavytushka-zgushenka.png" },
    ],
    activeFlavor: 0,
  },

  // --- Донати ---
  {
    id: 17, category: "donuts", name: "Донат", pcs: 1, units: 10,
    flavors: [
      { name: "великодній",    price: 17, img: "images/donut-velykodniy.png" },
      { name: "персик",        price: 17, img: "images/donut-velykodniy2.png" },
      { name: "згущенка",      price: 17, img: "images/donut-zgyshenka.png" },
      { name: "абрикос",       price: 17, img: "images/Донат абрикос.png" },
      { name: "полуниця",      price: 17, img: "images/donut-polynytsia.png" },
      { name: "шоко-апельсин", price: 17, img: "images/donut-choko.png" },
      { name: "вишня",         price: 17, img: "images/donut-vyshnia.png" },
    ],
    activeFlavor: 0,
  },
  // --- Мафіни ---
  {
    id: 18, category: "muffins", name: "Мафін", pcs: 1, units: 12,
    flavors: [
      { name: "великодній",    price: 17, img: "images/mafin-velykodniy.png" },
      { name: "полуниця",      price: 17, img: "images/mafin-velykodniy2.png" },
      { name: "какао",         price: 17, img: "images/mafin-cacao.png" },
      { name: "абрикос",       price: 17, img: "images/mafin-abrykos.png" },
      { name: "апельсин",      price: 17, img: "images/mafin-apelsyn.png" },
      { name: "вишня",         price: 17, img: "images/mafin-vyshnia.png" },
      { name: "згущенка",      price: 17, img: "images/mafin-zgushenka.png" },
      { name: "фісташка",      price: 17, img: "images/mafin-fistashka.png" },
      { name: "шоко-крем",     price: 17, img: "images/mafin-chococreme.png" },
      { name: "крем",          price: 17, img: "images/mafin-creme.png" },
      { name: "родзинки",      price: 17, img: "images/mafin-rodzynki.png" },
      { name: "персик",        price: 17, img: "images/mafin-abrykos.png" },
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
    return { name: p.name, flavor: f.name, img: f.img, price: f.price, pcs: p.pcs, units: p.units };
  }
  return { name: p.name, flavor: null, img: p.img, price: p.price, pcs: p.pcs, units: p.units };
}

// Current card key (what will be added with current dropdown selection)
function currentCardKey(p) {
  if (p.flavors) return boxKey(p.id, p.activeFlavor);
  return boxKey(p.id);
}

// === Box state ===
const box = {}; // { "productId" or "productId:flavorIndex": quantity }

// === Units-based capacity functions ===
function getTotalUnits() {
  const keys = Object.keys(box).filter(k => box[k] > 0);
  return keys.reduce((sum, k) => {
    const data = getItemData(k);
    return sum + box[k] * data.units;
  }, 0);
}

function getRemainingUnits() {
  return BOX_CAPACITY - getTotalUnits();
}

function isBoxFull() {
  return getTotalUnits() >= BOX_CAPACITY;
}

function canAddItem(key) {
  const data = getItemData(key);
  return getRemainingUnits() >= data.units;
}

function getBoxStats() {
  const keys = Object.keys(box).filter(k => box[k] > 0);
  const totalProducts = keys.length;
  const totalPieces = keys.reduce((sum, k) => {
    return sum + box[k];
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

// === Box map grid HTML ===
function boxMapHTML() {
  const totalUnits = getTotalUnits();
  const fullCells = Math.floor(totalUnits / UNITS_PER_CELL);
  const partialUnits = totalUnits % UNITS_PER_CELL;
  const full360 = totalUnits >= BOX_CAPACITY;

  let cells = '';
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (i < fullCells) {
      // Fully filled cell
      if (full360) {
        cells += `<div class="box-map__cell box-map__cell--full"><div class="box-map__cell-inner" style="height:50px;"></div></div>`;
      } else {
        cells += `<div class="box-map__cell box-map__cell--filled"><div class="box-map__cell-inner" style="height:50px;"></div></div>`;
      }
    } else if (i === fullCells && partialUnits > 0) {
      // Partially filled cell
      const fillHeight = Math.round((partialUnits / UNITS_PER_CELL) * 50);
      if (full360) {
        cells += `<div class="box-map__cell box-map__cell--full box-map__cell--partial"><div class="box-map__cell-inner" style="height:${fillHeight}px;"></div></div>`;
      } else {
        cells += `<div class="box-map__cell box-map__cell--filled box-map__cell--partial"><div class="box-map__cell-inner" style="height:${fillHeight}px;"></div></div>`;
      }
    } else {
      // Empty cell
      cells += `<div class="box-map__cell"></div>`;
    }
  }

  return `
    <div class="box-map">
      <div class="box-map__title">Заповнення коробки:</div>
      <div class="box-map__grid">${cells}</div>
    </div>`;
}

// === Mini box map (9 segments for bottom bar) ===
const MINI_SEGMENTS = 9;
const UNITS_PER_SEGMENT = BOX_CAPACITY / MINI_SEGMENTS; // 40

function updateMiniBoxMap() {
  const container = document.getElementById('boxMiniMap');
  if (!container) return;

  const totalUnits = getTotalUnits();
  const full = isBoxFull();
  const fullSegs = Math.floor(totalUnits / UNITS_PER_SEGMENT);
  const partialUnits = totalUnits % UNITS_PER_SEGMENT;

  let html = '';
  for (let i = 0; i < MINI_SEGMENTS; i++) {
    if (i < fullSegs) {
      const cls = full ? 'box-mini-map__seg box-mini-map__seg--full box-mini-map__seg--complete' : 'box-mini-map__seg box-mini-map__seg--full';
      html += `<div class="${cls}"></div>`;
    } else if (i === fullSegs && partialUnits > 0) {
      const pct = Math.round((partialUnits / UNITS_PER_SEGMENT) * 100);
      const cls = full ? 'box-mini-map__seg box-mini-map__seg--partial box-mini-map__seg--complete' : 'box-mini-map__seg box-mini-map__seg--partial';
      html += `<div class="${cls}"><div class="box-mini-map__seg-fill" style="width:${pct}%"></div></div>`;
    } else {
      html += `<div class="box-mini-map__seg"></div>`;
    }
  }

  container.innerHTML = html;
}

// === Helper block HTML ===
function helperHTML() {
  const remaining = getRemainingUnits();
  if (remaining <= 0 || getTotalUnits() === 0) return '';

  const maxDonuts = Math.floor(remaining / 10);
  const maxMuffins = Math.floor(remaining / 12);
  const maxSandwich = Math.floor(remaining / 5);
  const maxClassic = Math.floor(remaining / 4);

  return `
    <div class="box-sidebar__helper">
      <div class="box-sidebar__helper-title">Ще можна додати:</div>
      <ul class="box-sidebar__helper-list">
        <li class="box-sidebar__helper-row">
          <span class="box-sidebar__helper-label">\u2022 донатів</span>
          <span class="box-sidebar__helper-value">до ${maxDonuts}</span>
        </li>
        <li class="box-sidebar__helper-row">
          <span class="box-sidebar__helper-label">\u2022 мафінів</span>
          <span class="box-sidebar__helper-value">до ${maxMuffins}</span>
        </li>
        <li class="box-sidebar__helper-row">
          <span class="box-sidebar__helper-label">\u2022 печив-сендвіч</span>
          <span class="box-sidebar__helper-value">до ${maxSandwich}</span>
        </li>
        <li class="box-sidebar__helper-row">
          <span class="box-sidebar__helper-label">\u2022 класичних печив</span>
          <span class="box-sidebar__helper-value">до ${maxClassic}</span>
        </li>
      </ul>
    </div>`;
}

// === Flavor card HTML (individual card per flavor, used for muffins) ===
function flavorCardHTML(p, flavorIndex) {
  const f = p.flavors[flavorIndex];
  const key = boxKey(p.id, flavorIndex);
  const inBox = box[key] && box[key] > 0;
  const qty = box[key] || 0;
  const canAdd = canAddItem(key);
  const canIncrement = getRemainingUnits() >= p.units;

  let bottomSection;
  if (inBox) {
    const plusDisabled = !canIncrement ? ' product-card__counter-btn--disabled' : '';
    const plusOnclick = canIncrement ? `onclick="updateQty('${key}', 1)"` : '';
    bottomSection = `<div class="product-card__counter">
        <button class="product-card__counter-btn" onclick="updateQty('${key}', -1)">${ICON_MINUS}</button>
        <span class="product-card__counter-value">${qty}</span>
        <button class="product-card__counter-btn${plusDisabled}" ${plusOnclick}>${ICON_PLUS}</button>
      </div>`;
  } else if (!canAdd) {
    bottomSection = `<button class="product-card__btn product-card__btn--disabled" disabled>Додати у бокс</button>`;
  } else {
    bottomSection = `<button class="product-card__btn" onclick="addToBox('${key}')">Додати у бокс</button>`;
  }

  return `
    <div class="product-card" data-id="${p.id}" data-flavor="${flavorIndex}">
      <div class="product-card__image-wrap">
        <img class="product-card__image" src="${f.img}" alt="${p.name} ${f.name}">
      </div>
      <div class="product-card__name"><a href="#">${p.name} ${f.name}</a><span class="product-card__pcs">${p.pcs} шт</span></div>
      <div class="product-card__options">
        <div class="product-card__dropdown">
          <span class="product-card__weight"></span>
          <div class="product-card__price-group">
            <span class="product-card__price">${f.price} грн</span>
          </div>
        </div>
      </div>
      ${bottomSection}
    </div>`;
}

// === Card HTML ===
function cardHTML(p) {
  const key = currentCardKey(p);
  const inBox = box[key] && box[key] > 0;
  const qty = box[key] || 0;
  const img = p.flavors ? p.flavors[p.activeFlavor].img : p.img;
  const price = p.flavors ? p.flavors[p.activeFlavor].price : p.price;
  const flavorName = p.flavors ? p.flavors[p.activeFlavor].name : null;
  const isOpen = openDropdownId === p.id;

  const canAdd = canAddItem(key);
  const canIncrement = getRemainingUnits() >= p.units;

  let bottomSection;
  if (inBox) {
    const plusDisabled = !canIncrement ? ' product-card__counter-btn--disabled' : '';
    const plusOnclick = canIncrement ? `onclick="updateQty('${key}', 1)"` : '';
    bottomSection = `<div class="product-card__counter">
        <button class="product-card__counter-btn" onclick="updateQty('${key}', -1)">${ICON_MINUS}</button>
        <span class="product-card__counter-value">${qty}</span>
        <button class="product-card__counter-btn${plusDisabled}" ${plusOnclick}>${ICON_PLUS}</button>
      </div>`;
  } else if (!canAdd) {
    bottomSection = `<button class="product-card__btn product-card__btn--disabled" disabled>Додати у бокс</button>`;
  } else {
    bottomSection = `<button class="product-card__btn" onclick="addToBox('${key}')">Додати у бокс</button>`;
  }

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
  const displayName = data.flavor ? `${data.name} ${data.flavor}` : data.name;

  return `
    <div class="box-sidebar__item">
      <div class="box-sidebar__item-info">
        <img class="box-sidebar__item-img" src="${data.img}" alt="${displayName}">
        <div class="box-sidebar__item-text">
          <span class="box-sidebar__item-name">${displayName}</span>
          <span class="box-sidebar__item-price">${qty} \u00d7 ${data.price} грн</span>
        </div>
      </div>
      <button class="box-sidebar__item-remove" onclick="removeFromBox('${key}')">${ICON_CLOSE}</button>
    </div>`;
}

// === Render ===
function render() {
  // Render product grid
  const grid = document.getElementById("productGrid");
  const filtered = getFilteredProducts();

  if (activeCategory === "donuts" || activeCategory === "muffins") {
    // Each flavor as a separate card
    let cards = '';
    filtered.forEach(p => {
      if (p.flavors) {
        p.flavors.forEach((f, i) => {
          cards += flavorCardHTML(p, i);
        });
      } else {
        cards += cardHTML(p);
      }
    });
    grid.innerHTML = cards;
  } else {
    grid.innerHTML = filtered.map(cardHTML).join("");
  }

  // Render full sidebar
  const sidebar = document.getElementById("boxSidebar");
  const keys = Object.keys(box).filter(k => box[k] > 0);
  const stats = getBoxStats();
  const totalUnits = getTotalUnits();
  const boxFull = isBoxFull();

  // Preserve postcard text
  const existingTextarea = sidebar.querySelector('.box-sidebar__postcard-text');
  const postcardText = existingTextarea ? existingTextarea.value : '';

  // Box map
  const mapSection = boxMapHTML();

  // Stats
  const statsSection = `
    <div class="box-sidebar__stats">
      <div class="box-sidebar__stat-row">
        <span class="box-sidebar__stat-label">Різних продуктів:</span>
        <span class="box-sidebar__stat-value">${stats.totalProducts}</span>
      </div>
      <div class="box-sidebar__stat-row">
        <span class="box-sidebar__stat-label">Всього штук:</span>
        <span class="box-sidebar__stat-value">${stats.totalPieces}</span>
      </div>
    </div>`;

  // Items list or empty state
  let itemsSection;
  if (keys.length === 0) {
    itemsSection = `
      <div class="box-sidebar__items">
        <div class="box-sidebar__empty">Ваш бокс порожній.\nДодайте продукти зліва.</div>
      </div>`;
  } else {
    itemsSection = `
      <div class="box-sidebar__items">
        ${keys.map(sidebarItemHTML).join("")}
      </div>`;
  }

  // Helper block (only when partially filled: has items but not full)
  const helperSection = helperHTML();

  // Postcard
  const postcardSection = `
    <div class="box-sidebar__postcard">
      <div class="box-sidebar__postcard-header">
        <span class="box-sidebar__postcard-title">Текст листівки:</span>
      </div>
      <textarea class="box-sidebar__postcard-text" placeholder="Напишіть побажання..." rows="3">${postcardText}</textarea>
    </div>`;

  // Total
  const totalSection = `
    <div class="box-sidebar__total">
      <span class="box-sidebar__total-label">Сума:</span>
      <span class="box-sidebar__total-value">${stats.totalPrice} грн</span>
    </div>`;

  // CTA
  let ctaSection;
  if (boxFull) {
    ctaSection = `<button class="box-sidebar__checkout box-sidebar__checkout--active">Покласти у кошик</button>`;
  } else {
    ctaSection = `<button class="box-sidebar__checkout box-sidebar__checkout--disabled" disabled>Заповніть бокс, щоб продовжити</button>`;
  }

  // Title
  const titleSection = `<h2 class="box-sidebar__title">Ваш бокс</h2>`;

  sidebar.innerHTML = titleSection + mapSection + statsSection + itemsSection + helperSection + postcardSection + totalSection + ctaSection;

  // === Update mobile drawer content (if present) ===
  const drawerContent = document.getElementById('boxDrawerContent');
  if (drawerContent) {
    const drawerTextarea = drawerContent.querySelector('.box-sidebar__postcard-text');
    const drawerPostcardText = drawerTextarea ? drawerTextarea.value : postcardText;

    drawerContent.innerHTML = mapSection + statsSection + itemsSection + helperSection + postcardSection + totalSection + ctaSection;

    const newDrawerTextarea = drawerContent.querySelector('.box-sidebar__postcard-text');
    if (newDrawerTextarea) {
      newDrawerTextarea.value = drawerPostcardText;
    }
  }

  // === Update mobile bottom bar summary (if present) ===
  const bottomBarSummary = document.getElementById('bottomBarSummary');
  if (bottomBarSummary) {
    bottomBarSummary.textContent = `${stats.totalPieces} шт \u00b7 ${stats.totalPrice} грн`;
  }

  // === Update mini box map on bottom bar ===
  updateMiniBoxMap();
}

// === Actions ===
function addToBox(key) {
  if (!canAddItem(key)) return;
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
  if (delta > 0) {
    // Check if adding one more would exceed capacity
    if (getRemainingUnits() < data.units) return;
  }
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
