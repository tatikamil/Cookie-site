// === Box Builder Logic ===

const BOX_CAPACITY = 360;
const TOTAL_CELLS = 36;
const UNITS_PER_CELL = 10;

const products = window.getBoxBuilderProducts();

// === Active category filter ===
let activeCategory = "sandwich";

function getFilteredProducts() {
  return products.filter(p => p.category === activeCategory);
}

// === Box key helpers ===
function boxKey(productId) {
  return `${productId}`;
}

function parseBoxKey(key) {
  return {
    productId: Number(key),
    flavorIndex: null,
  };
}

function getItemData(key) {
  const { productId } = parseBoxKey(key);
  const p = products.find(pr => pr.id === productId);
  return { name: p.name, flavor: null, img: p.img, price: p.price, pcs: p.pcs, units: p.units };
}

// Current card key
function currentCardKey(p) {
  return boxKey(p.id);
}

// === Box state ===
const box = {}; // { "productId": quantity }

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
        cells += `<div class="box-map__cell box-map__cell--full"><div class="box-map__cell-inner" style="height:100%;"></div></div>`;
      } else {
        cells += `<div class="box-map__cell box-map__cell--filled"><div class="box-map__cell-inner" style="height:100%;"></div></div>`;
      }
    } else if (i === fullCells && partialUnits > 0) {
      // Partially filled cell
      const fillPct = Math.round((partialUnits / UNITS_PER_CELL) * 100);
      if (full360) {
        cells += `<div class="box-map__cell box-map__cell--full box-map__cell--partial"><div class="box-map__cell-inner" style="height:${fillPct}%;"></div></div>`;
      } else {
        cells += `<div class="box-map__cell box-map__cell--filled box-map__cell--partial"><div class="box-map__cell-inner" style="height:${fillPct}%;"></div></div>`;
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

// === Card HTML ===
function cardHTML(p) {
  const key = currentCardKey(p);
  const inBox = box[key] && box[key] > 0;
  const qty = box[key] || 0;
  const img = p.img;
  const price = p.price;

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
    <div class="product-card product-card--without-dropdown" data-id="${p.id}">
      <div class="product-card__image-wrap">
        <img class="product-card__image" src="${img}" alt="${p.name}">
      </div>
      <div class="product-card__body product-card__body--without-dropdown">
        <div class="product-card__name"><a href="#">${p.name}</a></div>
        <div class="product-card__meta">
          <span class="product-card__meta-label">FP · ${p.pcs} шт</span>
          <span class="product-card__meta-price">${price} грн</span>
        </div>
        ${bottomSection}
      </div>
    </div>`;
}

// === Sidebar item HTML ===
function sidebarItemHTML(key) {
  const data = getItemData(key);
  const qty = box[key];
  const displayName = data.flavor ? `${data.name} ${data.flavor}` : data.name;
  const canIncrement = getRemainingUnits() >= data.units;
  const plusDisabled = !canIncrement ? ' box-sidebar__qty-btn--disabled' : '';
  const plusOnclick = canIncrement ? `onclick="updateQty('${key}', 1)"` : '';

  return `
    <div class="box-sidebar__item">
      <div class="box-sidebar__item-info">
        <img class="box-sidebar__item-img" src="${data.img}" alt="${displayName}">
        <div class="box-sidebar__item-text">
          <span class="box-sidebar__item-name">${displayName}</span>
          <span class="box-sidebar__item-price">${data.price} грн / шт</span>
        </div>
      </div>
      <div class="box-sidebar__item-actions">
        <div class="box-sidebar__qty-control">
          <button class="box-sidebar__qty-btn" onclick="updateQty('${key}', -1)" aria-label="Зменшити кількість">${ICON_MINUS}</button>
          <span class="box-sidebar__qty-value">${qty}</span>
          <button class="box-sidebar__qty-btn${plusDisabled}" ${plusOnclick} aria-label="Збільшити кількість">${ICON_PLUS}</button>
        </div>
        <button class="box-sidebar__item-remove" onclick="removeFromBox('${key}')" aria-label="Видалити позицію">${ICON_CLOSE}</button>
      </div>
    </div>`;
}

// === Render ===
function render() {
  // Render product grid
  const grid = document.getElementById("productGrid");
  const filtered = getFilteredProducts();
  grid.innerHTML = filtered.map(cardHTML).join("");

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
      <textarea class="box-sidebar__postcard-text" placeholder="Напишіть побажання..." rows="1" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';">${postcardText}</textarea>
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
