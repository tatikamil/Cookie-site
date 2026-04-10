(function () {
  const SEARCH_PATHS = {
    classic: "pechuvo.html",
    sandwich: "pechuvo.html",
    muffins: "muffins-donuts.html",
    donuts: "muffins-donuts.html",
    boxes: "nabory.html",
    assorti: "nabory.html",
  };

  const SEARCH_SCOPE_LABELS = {
    classic: "Печиво · класичне",
    sandwich: "Печиво · сендвіч",
    muffins: "Мафіни і Донати · мафіни",
    donuts: "Мафіни і Донати · донати",
    boxes: "Набори · бокси",
    assorti: "Набори · асорті",
  };

  const VEGAN_SEARCH_TERMS = ["веган", "веганське", "вегетаріанське", "пісне"];

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/['’`"]/g, "")
      .replace(/[-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenizeText(value) {
    return normalizeText(value)
      .split(" ")
      .map((token) => token.trim())
      .filter(Boolean);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSearchKeywords(name) {
    const normalizedName = normalizeText(name);
    if (normalizedName.startsWith("джемка") || normalizedName === "задавака") {
      return VEGAN_SEARCH_TERMS;
    }
    return [];
  }

  function highlightMatch(text, rawQuery) {
    const queryTokens = tokenizeText(rawQuery).filter((token) => token.length >= 2);
    if (!queryTokens.length) {
      return escapeHtml(text);
    }

    const source = String(text || "");
    const lowerSource = source.toLowerCase();
    const ranges = [];

    queryTokens.forEach((token) => {
      let startIndex = 0;
      while (startIndex < lowerSource.length) {
        const foundIndex = lowerSource.indexOf(token, startIndex);
        if (foundIndex === -1) break;
        ranges.push([foundIndex, foundIndex + token.length]);
        startIndex = foundIndex + token.length;
      }
    });

    if (!ranges.length) {
      return escapeHtml(text);
    }

    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    ranges.forEach(([start, end]) => {
      const previous = merged[merged.length - 1];
      if (!previous || start > previous[1]) {
        merged.push([start, end]);
      } else {
        previous[1] = Math.max(previous[1], end);
      }
    });

    let cursor = 0;
    let output = "";
    merged.forEach(([start, end]) => {
      output += escapeHtml(source.slice(cursor, start));
      output += `<mark class="site-search__highlight">${escapeHtml(source.slice(start, end))}</mark>`;
      cursor = end;
    });
    output += escapeHtml(source.slice(cursor));

    return output;
  }

  function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const prev = Array.from({ length: b.length + 1 }, (_, index) => index);
    const next = new Array(b.length + 1);

    for (let i = 1; i <= a.length; i += 1) {
      next[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        next[j] = Math.min(
          next[j - 1] + 1,
          prev[j] + 1,
          prev[j - 1] + cost
        );
      }
      for (let j = 0; j <= b.length; j += 1) {
        prev[j] = next[j];
      }
    }

    return prev[b.length];
  }

  function getFuzzyThreshold(token) {
    if (token.length <= 3) return 0;
    if (token.length <= 6) return 1;
    return 2;
  }

  function getBestTokenDistance(queryToken, candidateTokens) {
    let best = Number.POSITIVE_INFINITY;
    candidateTokens.forEach((token) => {
      const distance = levenshteinDistance(queryToken, token);
      if (distance < best) {
        best = distance;
      }
    });
    return best;
  }

  function getSuggestionRank(item, query) {
    const name = normalizeText(item.name);
    const label = normalizeText(item.label);
    const keywords = normalizeText((item.keywords || []).join(" "));
    const allTokens = [
      ...tokenizeText(item.name),
      ...tokenizeText(item.label),
      ...tokenizeText(keywords),
    ];
    const queryTokens = tokenizeText(query);

    if (!queryTokens.length) {
      return null;
    }

    const tokenDistances = queryTokens.map((queryToken) => getBestTokenDistance(queryToken, allTokens));
    const totalTokenDistance = tokenDistances.reduce((sum, distance) => sum + distance, 0);
    const nameDistance = levenshteinDistance(query, name);
    const labelDistance = levenshteinDistance(query, label);
    const keywordDistance = keywords ? levenshteinDistance(query, keywords) : Number.POSITIVE_INFINITY;
    const directPenalty = name.includes(query) || label.includes(query) || keywords.includes(query) ? 0 : 2;

    return {
      distance: totalTokenDistance,
      phraseDistance: Math.min(nameDistance, labelDistance, keywordDistance),
      directPenalty,
      order: item.order,
    };
  }

  function getSearchItems() {
    const items = [];

    if (typeof window.getCatalogProducts === "function") {
      window.getCatalogProducts().forEach((product, index) => {
        items.push({
          type: "product",
          id: product.catalogId,
          name: product.name,
          label: SEARCH_SCOPE_LABELS[product.sub] || "Каталог",
          keywords: getSearchKeywords(product.name),
          filter: product.sub,
          href: SEARCH_PATHS[product.sub] || "pechuvo.html",
          price: product.price,
          img: product.img,
          order: index,
        });
      });
    }

    (window.SETS_DATA || []).forEach((item, index) => {
      items.push({
        type: "set",
        id: item.id,
        name: item.name,
        label: SEARCH_SCOPE_LABELS[item.category] || "Набори",
        keywords: [],
        filter: item.category,
        href: "nabory.html",
        price: item.price || (item.packOptions?.[0] ? `${item.packOptions[0].price} грн` : ""),
        img: item.img,
        order: 1000 + index,
      });
    });

    return items;
  }

  function getResultUrl(item) {
    const params = new URLSearchParams();
    if (item.filter) params.set("filter", item.filter);
    return `${item.href}?${params.toString()}#${encodeURIComponent(item.id)}`;
  }

  function scoreItem(item, query) {
    const name = normalizeText(item.name);
    const label = normalizeText(item.label);
    const keywords = normalizeText((item.keywords || []).join(" "));
    const haystack = `${name} ${label} ${keywords}`.trim();
    const nameTokens = tokenizeText(item.name);
    const labelTokens = tokenizeText(item.label);
    const keywordTokens = tokenizeText(keywords);
    const allTokens = [...nameTokens, ...labelTokens, ...keywordTokens];
    const queryTokens = tokenizeText(query);
    const directIndex = haystack.indexOf(query);

    if (name === query) {
      return { tier: 0, detail: 0, index: 0, order: item.order };
    }

    if (name.startsWith(query)) {
      return { tier: 1, detail: 0, index: 0, order: item.order };
    }

    const allTokensStart = queryTokens.length > 0 && queryTokens.every((queryToken) =>
      allTokens.some((token) => token.startsWith(queryToken))
    );
    if (allTokensStart) {
      const firstIndex = allTokens.findIndex((token) => token.startsWith(queryTokens[0] || ""));
      return { tier: 2, detail: 0, index: firstIndex === -1 ? 99 : firstIndex, order: item.order };
    }

    if (directIndex !== -1) {
      return { tier: 3, detail: directIndex, index: directIndex, order: item.order };
    }

    if (!queryTokens.length) {
      return null;
    }

    const fuzzyDistances = queryTokens.map((queryToken) => getBestTokenDistance(queryToken, allTokens));
    const withinThreshold = fuzzyDistances.every((distance, index) => distance <= getFuzzyThreshold(queryTokens[index]));
    if (withinThreshold) {
      const totalDistance = fuzzyDistances.reduce((sum, distance) => sum + distance, 0);
      return { tier: 4, detail: totalDistance, index: totalDistance, order: item.order };
    }

    const phraseDistance = getBestTokenDistance(query, [name, ...allTokens]);
    if (query.length >= 4 && phraseDistance <= getFuzzyThreshold(query)) {
      return { tier: 5, detail: phraseDistance, index: phraseDistance, order: item.order };
    }

    return null;
  }

  let header = null;
  let searchBox = null;
  let input = null;
  let results = null;
  let empty = null;
  let items = [];
  let mobileTrigger = null;

  function isMobileSearchMode() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function mountSearchBox() {
    if (!searchBox) return;

    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const mobileMenuNav = mobileMenuOverlay?.querySelector(".mobile-menu__nav");
    mobileTrigger = mobileMenuNav?.querySelector("[data-search-trigger]") || null;
    const headerRight = header?.querySelector(".header__right");
    const icons = header?.querySelector(".header__icons");

    if (isMobileSearchMode() && mobileMenuOverlay?.classList.contains("is-open") && mobileMenuNav && mobileTrigger) {
      searchBox.classList.add("header-search-inline--menu");
      mobileTrigger.hidden = true;
      if (searchBox.parentElement !== mobileMenuNav) {
        mobileMenuNav.insertBefore(searchBox, mobileTrigger.nextSibling);
      }
      return;
    }

    searchBox.classList.remove("header-search-inline--menu");
    if (mobileTrigger) {
      mobileTrigger.hidden = false;
    }
    if (headerRight && icons && searchBox.parentElement !== headerRight) {
      headerRight.insertBefore(searchBox, icons);
    }
  }

  function renderResults(rawQuery) {
    if (!results || !empty) return;

    const query = normalizeText(rawQuery);

    if (!query) {
      results.innerHTML = "";
      empty.hidden = true;
      const dropdown = searchBox?.querySelector(".header-search-inline__dropdown");
      if (dropdown) {
        dropdown.hidden = true;
      }
      return;
    }

    const dropdown = searchBox?.querySelector(".header-search-inline__dropdown");
    if (dropdown) {
      dropdown.hidden = false;
    }

    const matched = items
      .map((item) => {
        const rank = scoreItem(item, query);
        return rank ? { item, rank } : null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.rank.tier !== b.rank.tier) return a.rank.tier - b.rank.tier;
        if (a.rank.detail !== b.rank.detail) return a.rank.detail - b.rank.detail;
        if (a.rank.index !== b.rank.index) return a.rank.index - b.rank.index;
        return a.rank.order - b.rank.order;
      })
      .slice(0, 8)
      .map(({ item }) => item);

    const suggested = !matched.length
      ? items
        .map((item) => ({ item, rank: getSuggestionRank(item, query) }))
        .filter(({ rank }) => rank !== null)
        .sort((a, b) => {
          if (a.rank.directPenalty !== b.rank.directPenalty) return a.rank.directPenalty - b.rank.directPenalty;
          if (a.rank.distance !== b.rank.distance) return a.rank.distance - b.rank.distance;
          if (a.rank.phraseDistance !== b.rank.phraseDistance) return a.rank.phraseDistance - b.rank.phraseDistance;
          return a.rank.order - b.rank.order;
        })
        .slice(0, 5)
        .map(({ item }) => item)
      : [];

    if (!matched.length) {
      if (!suggested.length) {
        results.innerHTML = "";
        empty.hidden = false;
        empty.textContent = "Нічого не знайдено";
        return;
      }
    }

    const displayItems = matched.length ? matched : suggested;
    empty.hidden = true;
    results.innerHTML = displayItems.map((item) => `
      <a class="site-search__result" href="${getResultUrl(item)}">
        <div class="site-search__result-media">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="site-search__result-copy">
          <span class="site-search__result-name">${highlightMatch(item.name, query)}</span>
          <span class="site-search__result-meta">${item.label}</span>
        </div>
        <span class="site-search__result-price">${item.price || ""}</span>
      </a>
    `).join("");

    if (!matched.length) {
      results.insertAdjacentHTML("afterbegin", `<div class="site-search__suggestion-title">Можливо, ви шукали</div>`);
    }
  }

  function closeSearch() {
    if (!header || !searchBox) return;
    header.classList.remove("header--search-open");
    searchBox.hidden = true;
    if (mobileTrigger) {
      mobileTrigger.hidden = false;
    }
    if (input) {
      input.value = "";
      input.blur();
    }
    renderResults("");
  }

  function ensureSearchBox() {
    if (searchBox) return;

    header = document.querySelector(".header");
    if (!header) return;
    const headerRight = header.querySelector(".header__right");
    const icons = header.querySelector(".header__icons");
    if (!headerRight || !icons) return;

    searchBox = document.createElement("div");
    searchBox.className = "header-search-inline";
    searchBox.hidden = true;
    searchBox.innerHTML = `
      <div class="header-search-inline__inner">
        <div class="site-search__field">
          <img class="site-search__field-icon" src="icons/search.svg" width="24" height="24" alt="">
          <input class="site-search__input" type="search" placeholder="Почніть вводити назву товарів" autocomplete="off">
        </div>
        <div class="header-search-inline__dropdown" hidden>
          <div class="site-search__empty">Почніть вводити назву товару</div>
          <div class="site-search__results"></div>
        </div>
      </div>
    `;

    headerRight.insertBefore(searchBox, icons);
    input = searchBox.querySelector(".site-search__input");
    results = searchBox.querySelector(".site-search__results");
    empty = searchBox.querySelector(".site-search__empty");

    input.addEventListener("input", () => {
      renderResults(input.value);
    });
    searchBox.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!header.classList.contains("header--search-open")) return;
      if (!searchBox.contains(event.target) && !event.target.closest("[data-search-trigger]")) {
        closeSearch();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("header--search-open")) {
        closeSearch();
      }
    });
  }

  function openSearch() {
    ensureSearchBox();
    if (!header || !searchBox) return;

    items = getSearchItems();
    mountSearchBox();
    searchBox.hidden = false;
    if (!isMobileSearchMode()) {
      header.classList.add("header--search-open");
    }
    if (input) {
      input.value = "";
      renderResults("");
      window.requestAnimationFrame(() => input.focus());
    }
  }

  function toggleSearch(event) {
    event.preventDefault();

    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

    ensureSearchBox();
    if (!header || !searchBox) return;

    if (header.classList.contains("header--search-open")) {
      closeSearch();
      return;
    }

    openSearch();
  }

  document.getElementById("mobileMenuClose")?.addEventListener("click", closeSearch);
  document.getElementById("mobileMenuOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "mobileMenuOverlay") {
      closeSearch();
    }
  });

  window.addEventListener("resize", () => {
    if (!searchBox || searchBox.hidden) return;
    mountSearchBox();
  });

  document.querySelectorAll("[data-search-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", toggleSearch);
  });
})();
