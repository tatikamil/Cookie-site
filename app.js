const catalogScope = (document.body.dataset.catalogScope || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const products = window.getCatalogProducts()
  .filter((product) => !catalogScope.length || catalogScope.includes(product.sub));
const catalogPromos = window.CATALOG_PROMOS || {};
const selectedPackById = {};
let openPackDropdownId = null;
const enablePromos = document.body.dataset.promos === "true";
const initialFilter = document.body.dataset.initialFilter || "all";

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getSelectedPack(product) {
  const selectedIndex = selectedPackById[product.id] || 0;
  return product.packOptions?.[selectedIndex] || null;
}

function togglePackDropdown(productId, event) {
  event.stopPropagation();
  if (isMobileViewport()) {
    openPackMobileSheet(productId);
    return;
  }
  openPackDropdownId = openPackDropdownId === productId ? null : productId;
  render(getActiveFilter());
}

function openPackMobileSheet(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product?.packOptions?.length || !window.MobileOptionsSheet) {
    return;
  }

  const activeIndex = selectedPackById[product.id] || 0;
  window.MobileOptionsSheet.open({
    title: product.name,
    items: product.packOptions.map((option, index) => ({
      label: option.label,
      price: `${option.price} грн`,
      active: index === activeIndex,
    })),
    onSelect: (index) => {
      selectedPackById[product.id] = index;
      render(getActiveFilter());
    },
  });
}

function selectPack(productId, packIndex, event) {
  event.stopPropagation();
  selectedPackById[productId] = packIndex;
  openPackDropdownId = null;
  window.MobileOptionsSheet?.close();
  render(getActiveFilter());
}

function getActiveFilter() {
  return document.querySelector(".pill--active")?.dataset.filter || "all";
}

// === Card HTML ===
function cardHTML(p) {
  const selectedPack = getSelectedPack(p);
  const hasPackOptions = (p.packOptions?.length || 0) > 1;
  const isOpen = openPackDropdownId === p.id;
  const visibleOptions = hasPackOptions
    ? p.packOptions
        .map((option, index) => ({ option, index }))
        .filter(({ index }) => index !== (selectedPackById[p.id] || 0))
    : [];

  let dropdownMenu = "";
  if (isOpen) {
    dropdownMenu = `
      <div class="dropdown-menu">
        ${visibleOptions.map(({ option, index }) => `
          <button
            class="dropdown-menu__item"
            onclick="selectPack(${p.id}, ${index}, event)">
            <span class="dropdown-menu__flavor">${option.label}</span>
            <span class="dropdown-menu__price">${option.price} грн</span>
          </button>
        `).join("")}
      </div>`;
  }

  return `
    <div class="product-card" data-sub="${p.sub || ''}">
      <div class="product-card__image-wrap">
        <img class="product-card__image" src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-card__name"><a href="#">${p.name}</a></div>
      <div class="product-card__options">
        <div class="product-card__dropdown-wrap">
          <div class="product-card__dropdown ${hasPackOptions ? "product-card__dropdown--clickable" : ""} ${isOpen ? "product-card__dropdown--open" : ""}"
            ${hasPackOptions ? `onclick="togglePackDropdown(${p.id}, event)"` : ""}>
            <span class="product-card__weight">${selectedPack ? selectedPack.label : p.weight}</span>
            <div class="product-card__price-group">
            <span class="product-card__price">${selectedPack ? `${selectedPack.price} грн` : p.price}</span>
              ${hasPackOptions ? `<img class="product-card__caret ${isOpen ? "product-card__caret--open" : ""}" src="icons/caret-big-down-filled.svg" alt="">` : ""}
            </div>
          </div>
          ${dropdownMenu}
        </div>
      </div>
      <button class="product-card__btn">У кошик</button>
    </div>`;
}

function promoCardHTML(promo) {
  return `
    <div class="promo-card">
      <div class="promo-card__text">
        <div class="promo-card__title">${promo.title}</div>
        <div class="promo-card__desc">${promo.description}</div>
      </div>
      <a class="promo-card__btn" href="${promo.href}">
        <span class="promo-card__btn-desktop">${promo.desktopLabel}</span>
        <span class="promo-card__btn-mobile">${promo.mobileLabel}</span>
      </a>
    </div>`;
}

// === Render ===
function render(filter) {
  const grid = document.getElementById("productGrid");
  const list = filter === "all" ? products : products.filter(p => p.sub === filter);
  const cards = list.map(cardHTML);
  const promos = enablePromos ? (catalogPromos[filter] || []) : [];

  promos.forEach((promo, index) => {
    const insertAt = Math.min(promo.insertAfter + index, cards.length);
    cards.splice(insertAt, 0, promoCardHTML(promo));
  });

  grid.innerHTML = cards.join("");
}

document.addEventListener("click", () => {
  if (openPackDropdownId !== null) {
    openPackDropdownId = null;
    render(getActiveFilter());
  }
});

// === Pill filtering ===
document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("pill--active"));
    pill.classList.add("pill--active");
    openPackDropdownId = null;
    render(pill.dataset.filter);
  });
});

// === Init ===
render(initialFilter);
