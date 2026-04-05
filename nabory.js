const sets = window.SETS_DATA || [];
let activeSetsFilter = "all";
let openSetDropdownId = null;
const selectedSetPackById = {};
const setOrder = new Map(sets.map((item, index) => [item.id, index]));
let activeSort = "default";
const SORT_OPTIONS = [
  { value: "default", label: "За замовчуванням" },
  { value: "popular", label: "За популярністю" },
  { value: "price-asc", label: "За зростанням ціни" },
  { value: "price-desc", label: "За спаданням ціни" },
];

function getSetsList() {
  const list = activeSetsFilter === "all"
    ? sets
    : sets.filter((item) => item.category === activeSetsFilter);

  return sortSets(list);
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getSelectedPack(item) {
  const selectedIndex = selectedSetPackById[item.id] || 0;
  return item.packOptions?.[selectedIndex] || null;
}

function getPriceValue(value) {
  if (typeof value === "number") {
    return value;
  }

  const normalized = Number(String(value || "").replace(/[^\d.,]/g, "").replace(",", "."));
  return Number.isFinite(normalized) ? normalized : 0;
}

function getSetPrice(item) {
  const selectedPack = getSelectedPack(item);
  if (selectedPack?.price != null) {
    return getPriceValue(selectedPack.price);
  }
  return getPriceValue(item.price);
}

function sortSets(list) {
  const sorted = list.slice();

  if (activeSort === "default" || activeSort === "popular") {
    return sorted.sort((a, b) => (setOrder.get(a.id) || 0) - (setOrder.get(b.id) || 0));
  }

  sorted.sort((a, b) => {
    const diff = getSetPrice(a) - getSetPrice(b);
    if (diff !== 0) {
      return activeSort === "price-asc" ? diff : -diff;
    }
    return (setOrder.get(a.id) || 0) - (setOrder.get(b.id) || 0);
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
      renderSets();
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
  renderSets();
}

function toggleSetDropdown(itemId, event) {
  event.stopPropagation();
  if (isMobileViewport()) {
    openSetMobileSheet(itemId);
    return;
  }

  openSetDropdownId = openSetDropdownId === itemId ? null : itemId;
  renderSets();
}

function openSetMobileSheet(itemId) {
  const item = sets.find((entry) => entry.id === itemId);
  if (!item?.packOptions?.length || !window.MobileOptionsSheet) {
    return;
  }

  const activeIndex = selectedSetPackById[item.id] || 0;
  window.MobileOptionsSheet.open({
    title: item.name,
    items: item.packOptions.map((option, index) => ({
      label: option.label,
      price: `${option.price} грн`,
      active: index === activeIndex,
    })),
    onSelect: (index) => {
      selectedSetPackById[item.id] = index;
      renderSets();
    },
  });
}

function selectSetPack(itemId, packIndex, event) {
  event.stopPropagation();
  selectedSetPackById[itemId] = packIndex;
  openSetDropdownId = null;
  window.MobileOptionsSheet?.close();
  renderSets();
}

function setCardHTML(item) {
  const hasPackOptions = (item.packOptions?.length || 0) > 1;
  const selectedPack = getSelectedPack(item);
  const isOpen = openSetDropdownId === item.id;
  const visibleOptions = hasPackOptions
    ? item.packOptions
        .map((option, index) => ({ option, index }))
        .filter(({ index }) => index !== (selectedSetPackById[item.id] || 0))
    : [];

  const controlBlock = hasPackOptions ? `
    <div class="set-card__control-wrap">
      <div class="set-card__control ${isOpen ? 'set-card__control--open' : ''}" onclick="toggleSetDropdown('${item.id}', event)">
        <span class="set-card__weight">${selectedPack.label}</span>
        <div class="set-card__price-group">
          <span class="set-card__price">${selectedPack.price} грн</span>
          <img class="set-card__caret ${isOpen ? 'set-card__caret--open' : ''}" src="icons/caret-big-down-filled.svg" alt="">
        </div>
      </div>
      ${isOpen ? `
        <div class="set-card__dropdown-menu">
          ${visibleOptions.map(({ option, index }) => `
            <button class="set-card__dropdown-item" type="button" onclick="selectSetPack('${item.id}', ${index}, event)">
              <span class="set-card__dropdown-label">${option.label}</span>
              <span class="set-card__dropdown-price">${option.price} грн</span>
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  ` : `
    <div class="set-card__meta">
      <span class="set-card__label">${item.weight}</span>
      <span class="set-card__price">${item.price}</span>
    </div>
  `;

  return `
    <article class="set-card ${hasPackOptions ? 'set-card--with-dropdown' : 'set-card--without-dropdown'}" data-category="${item.category}">
      <div class="set-card__image-wrap">
        <img class="set-card__image" src="${item.img}" alt="${item.name}">
      </div>
      <div class="set-card__body">
        <h3 class="set-card__title">${item.name}</h3>
        ${controlBlock}
        <button class="set-card__btn">У кошик</button>
      </div>
    </article>
  `;
}

function setPromoHTML() {
  return `
    <article class="set-promo-card">
      <div class="set-promo-card__text">
        <h3 class="set-promo-card__title">Збери свій бокс</h3>
        <p class="set-promo-card__desc">як хочеться саме тобі.<br>А ми додамо листівочку з Твоїм текстом</p>
      </div>
      <a class="set-promo-card__btn" href="box-builder.html">Зібрати бокс</a>
    </article>
  `;
}

function renderSets() {
  const grid = document.getElementById("setsGrid");
  if (!grid) return;

  const cards = getSetsList().map(setCardHTML);

  if (activeSetsFilter === "boxes") {
    cards.push(setPromoHTML());
  } else if (activeSetsFilter === "assorti") {
    cards.push(setPromoHTML());
  }

  grid.innerHTML = cards.join("");
}

document.addEventListener("click", () => {
  if (openSetDropdownId !== null) {
    openSetDropdownId = null;
    renderSets();
  }
  closeSortMenu();
});

document.querySelectorAll(".pill[data-filter]").forEach((pill) => {
  pill.addEventListener("click", () => {
    const filter = pill.dataset.filter;
    if (!filter) return;
    activeSetsFilter = filter;
    document.querySelectorAll(".pill[data-filter]").forEach((item) => item.classList.remove("pill--active"));
    pill.classList.add("pill--active");
    closeSortMenu();
    renderSets();
  });
});

document.querySelector("[data-sort-button]")?.addEventListener("click", toggleSortMenu);
document.querySelectorAll("[data-sort-value]").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectSort(button.dataset.sortValue || "default", event);
  });
});

updateSortUI();
renderSets();
