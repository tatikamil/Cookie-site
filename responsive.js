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
