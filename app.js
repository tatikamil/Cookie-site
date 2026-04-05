const catalogScope = (document.body.dataset.catalogScope || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const products = window.getCatalogProducts()
  .filter((product) => !catalogScope.length || catalogScope.includes(product.sub));
const catalogPromos = window.CATALOG_PROMOS || {};
const selectedPackById = {};
const productOrder = new Map(products.map((product, index) => [String(product.id), index]));
let openPackDropdownId = null;
let activeSort = "default";
const enablePromos = document.body.dataset.promos === "true";
const initialFilter = document.body.dataset.initialFilter || "all";
const SORT_OPTIONS = [
  { value: "default", label: "За замовчуванням" },
  { value: "popular", label: "За популярністю" },
  { value: "price-asc", label: "За зростанням ціни" },
  { value: "price-desc", label: "За спаданням ціни" },
];

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

function getPriceValue(value) {
  if (typeof value === "number") {
    return value;
  }

  const normalized = Number(String(value || "").replace(/[^\d.,]/g, "").replace(",", "."));
  return Number.isFinite(normalized) ? normalized : 0;
}

function getProductPrice(product) {
  const selectedPack = getSelectedPack(product);
  if (selectedPack?.price != null) {
    return getPriceValue(selectedPack.price);
  }
  return getPriceValue(product.price);
}

function sortProducts(list) {
  const sorted = list.slice();

  if (activeSort === "default" || activeSort === "popular") {
    return sorted.sort((a, b) => (productOrder.get(String(a.id)) || 0) - (productOrder.get(String(b.id)) || 0));
  }

  sorted.sort((a, b) => {
    const diff = getProductPrice(a) - getProductPrice(b);
    if (diff !== 0) {
      return activeSort === "price-asc" ? diff : -diff;
    }
    return (productOrder.get(String(a.id)) || 0) - (productOrder.get(String(b.id)) || 0);
  });

  return sorted;
}

function updateSortUI() {
  const labelNode = document.querySelector("[data-sort-label]");
  const sortButton = document.querySelector("[data-sort-button]");
  const sortMenu = document.querySelector("[data-sort-menu]");
  const currentOption = SORT_OPTIONS.find((option) => option.value === activeSort) || SORT_OPTIONS[0];

  if (labelNode) {
    labelNode.textContent = currentOption.label;
  }

  document.querySelectorAll("[data-sort-value]").forEach((button) => {
    button.classList.toggle("sort-control__option--active", button.dataset.sortValue === activeSort);
  });

  if (sortButton && sortMenu?.hidden) {
    sortButton.setAttribute("aria-expanded", "false");
    sortButton.classList.remove("is-open");
  }
}

function closeSortMenu() {
  const sortButton = document.querySelector("[data-sort-button]");
  const sortMenu = document.querySelector("[data-sort-menu]");
  if (!sortMenu) return;
  sortMenu.hidden = true;
  if (sortButton) {
    sortButton.setAttribute("aria-expanded", "false");
    sortButton.classList.remove("is-open");
  }
}

function openSortMobileSheet() {
  if (!window.MobileOptionsSheet) return;

  window.MobileOptionsSheet.open({
    title: "Сортувати",
    items: SORT_OPTIONS.map((option) => ({
      label: option.label,
      active: option.value === activeSort,
    })),
    onSelect: (index) => {
      activeSort = SORT_OPTIONS[index]?.value || "default";
      updateSortUI();
      render(getActiveFilter());
    },
  });
}

function toggleSortMenu(event) {
  event.stopPropagation();

  if (isMobileViewport()) {
    openSortMobileSheet();
    return;
  }

  const sortButton = document.querySelector("[data-sort-button]");
  const sortMenu = document.querySelector("[data-sort-menu]");
  if (!sortButton || !sortMenu) return;

  const willOpen = sortMenu.hidden;
  sortMenu.hidden = !willOpen;
  sortButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
  sortButton.classList.toggle("is-open", willOpen);
}

function selectSort(sortValue, event) {
  event.stopPropagation();
  activeSort = sortValue;
  closeSortMenu();
  updateSortUI();
  render(getActiveFilter());
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
    <div class="product-card product-card--with-dropdown" data-sub="${p.sub || ''}">
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
  const list = sortProducts(filter === "all" ? products : products.filter((p) => p.sub === filter));
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
  closeSortMenu();
});

// === Pill filtering ===
document.querySelectorAll(".pill[data-filter]").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill[data-filter]").forEach(p => p.classList.remove("pill--active"));
    pill.classList.add("pill--active");
    openPackDropdownId = null;
    closeSortMenu();
    render(pill.dataset.filter);
  });
});

document.querySelector("[data-sort-button]")?.addEventListener("click", toggleSortMenu);
document.querySelectorAll("[data-sort-value]").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectSort(button.dataset.sortValue || "default", event);
  });
});

// === Init ===
updateSortUI();
render(initialFilter);
