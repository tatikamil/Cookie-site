// === Burger Menu Toggle ===
(function () {
  const burgerBtn = document.querySelector('.header__burger-btn');
  const overlay = document.getElementById('mobileMenuOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!burgerBtn || !overlay) return;

  burgerBtn.addEventListener('click', function () {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
})();

// === Box Builder Drawer Toggle ===
(function () {
  const bottomBar = document.getElementById('boxBottomBar');
  const toggleBtn = document.getElementById('bottomBarToggle');
  const drawerOverlay = document.getElementById('boxDrawerOverlay');
  const drawerClose = document.getElementById('boxDrawerClose');

  if (!bottomBar || !toggleBtn || !drawerOverlay) return;

  toggleBtn.addEventListener('click', function () {
    drawerOverlay.classList.add('is-open');
    toggleBtn.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', function () {
      drawerOverlay.classList.remove('is-open');
      toggleBtn.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  drawerOverlay.addEventListener('click', function (e) {
    if (e.target === drawerOverlay) {
      drawerOverlay.classList.remove('is-open');
      toggleBtn.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
})();

// === Shared Mobile Options Sheet ===
(function () {
  let overlay = null;
  let titleNode = null;
  let listNode = null;
  let onSelect = null;

  function ensureSheet() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'mobile-options-sheet';
    overlay.innerHTML = `
      <div class="mobile-options-sheet__panel" role="dialog" aria-modal="true" aria-label="Вибір опції">
        <div class="mobile-options-sheet__handle"></div>
        <div class="mobile-options-sheet__header">
          <span class="mobile-options-sheet__title"></span>
          <button class="mobile-options-sheet__close" type="button" aria-label="Закрити">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="6" y1="6" x2="18" y2="18" stroke="#3A332C" stroke-width="2" stroke-linecap="round"/>
              <line x1="18" y1="6" x2="6" y2="18" stroke="#3A332C" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="mobile-options-sheet__list"></div>
      </div>
    `;

    document.body.appendChild(overlay);
    titleNode = overlay.querySelector('.mobile-options-sheet__title');
    listNode = overlay.querySelector('.mobile-options-sheet__list');

    overlay.querySelector('.mobile-options-sheet__close').addEventListener('click', closeSheet);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeSheet();
      }
    });
  }

  function closeSheet() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    onSelect = null;
  }

  function openSheet(config) {
    ensureSheet();
    titleNode.textContent = config.title || 'Вибір опції';
    onSelect = config.onSelect || null;
    listNode.innerHTML = (config.items || []).map(function (item, index) {
      const activeClass = item.active ? ' mobile-options-sheet__item--active' : '';
      const badge = item.badge ? `<span class="mobile-options-sheet__badge">${item.badge}</span>` : '';
      const price = item.price ? `<span class="mobile-options-sheet__item-price">${item.price}</span>` : '';
      return `
        <button class="mobile-options-sheet__item${activeClass}" type="button" data-index="${index}">
          <span class="mobile-options-sheet__item-label" title="${item.label}">${item.label}${badge}</span>
          ${price}
        </button>
      `;
    }).join('');

    listNode.querySelectorAll('.mobile-options-sheet__item').forEach(function (button) {
      button.addEventListener('click', function () {
        const index = Number(button.dataset.index);
        if (typeof onSelect === 'function') {
          onSelect(index);
        }
        closeSheet();
      });
    });

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  window.MobileOptionsSheet = {
    open: openSheet,
    close: closeSheet,
  };
})();
