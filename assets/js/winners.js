"use strict";

(() => {
    const data = window.literaryHonorsWinners;

    if (!data) {
        return;
    }

    const state = {
        query: "",
        year: "all",
        category: "all",
        limit: 12
    };

    const escapeHTML = (value) =>
        String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    const statContainer = document.querySelector("#winners-stats");
    const featuredContainer = document.querySelector("#featured-winners");
    const galleryContainer = document.querySelector("#recognition-gallery");
    const groupsContainer = document.querySelector("#winner-groups");
    const resultsCount = document.querySelector("#winner-results-count");
    const emptyState = document.querySelector("#winner-empty-state");
    const loadMoreButton = document.querySelector("#load-more-winners");
    const resetButton = document.querySelector("#reset-winner-filters");
    const searchInput = document.querySelector("#winner-search");
    const yearSelect = document.querySelector("#winner-year");
    const categorySelect = document.querySelector("#winner-category");
    const yearContainer = document.querySelector("#winner-years");
    const actionStatus = document.querySelector("#winner-action-status");
    const filterForm = document.querySelector("#winner-filters");

    const renderStats = () => {
        if (!statContainer) {
            return;
        }

        statContainer.innerHTML = data.stats
            .map(
                (stat) => `
                    <div class="stat-item">
                        <strong>${escapeHTML(stat.value)}</strong>
                        <span>${escapeHTML(stat.label)}</span>
                    </div>
                `
            )
            .join("");
    };

    const winnerLink = (winner, label) => `
        <a class="winner-detail-link" href="#winners-list" data-winner-link data-future-href="/winners/${encodeURIComponent(winner.id)}">
            ${escapeHTML(label)} <span aria-hidden="true">→</span>
        </a>
    `;

    const renderFeaturedWinners = () => {
        if (!featuredContainer) {
            return;
        }

        const featured = data.winners.filter((winner) => winner.featured).slice(0, 3);

        featuredContainer.innerHTML = featured
            .map(
                (winner, index) => `
                    <article class="featured-winner${index === 0 ? " is-large" : ""}" data-reveal="${index === 0 ? "scale" : "up"}" style="transition-delay: ${index * 90}ms">
                        <img src="${escapeHTML(winner.featuredImage)}" alt="Featured recognition imagery for ${escapeHTML(winner.bookTitle)} by ${escapeHTML(winner.authorName)}" loading="lazy">
                        <div class="featured-winner-content">
                            <span class="featured-winner-label">${escapeHTML(winner.category)} · ${escapeHTML(winner.awardYear)} Winner</span>
                            <h3>${escapeHTML(winner.bookTitle)}</h3>
                            <p class="featured-winner-author">by ${escapeHTML(winner.authorName)}</p>
                            <p class="featured-winner-description">${escapeHTML(winner.description)}</p>
                            ${winnerLink(winner, "View Honoree")}
                        </div>
                    </article>
                `
            )
            .join("");
    };

    const renderGallery = () => {
        if (!galleryContainer) {
            return;
        }

        galleryContainer.innerHTML = data.gallery
            .map(
                (item, index) => `
                    <figure class="recognition-image" data-reveal="up" style="transition-delay: ${index * 90}ms">
                        <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" loading="lazy">
                    </figure>
                `
            )
            .join("");
    };

    const initializeSelects = () => {
        if (!yearSelect || !categorySelect) {
            return;
        }

        yearSelect.innerHTML = [
            '<option value="all">All Years</option>',
            ...data.years.map((year) => `<option value="${escapeHTML(year)}">${escapeHTML(year)}</option>`)
        ].join("");

        const categories = [...new Set(data.winners.map((winner) => winner.category))].sort();
        categorySelect.innerHTML = [
            '<option value="all">All Categories</option>',
            ...categories.map((category) => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`)
        ].join("");
    };

    const renderYearButtons = () => {
        if (!yearContainer) {
            return;
        }

        const highlightedYear = state.year === "all" ? data.years[0] : Number(state.year);

        yearContainer.innerHTML = data.years
            .map(
                (year, index) => `
                    <button
                        class="winner-year-button${year === highlightedYear ? " is-active" : ""}"
                        type="button"
                        data-winner-year="${escapeHTML(year)}"
                        aria-pressed="${state.year !== "all" && year === highlightedYear}"
                        style="transition-delay: ${index * 80}ms"
                    >${escapeHTML(year)}</button>
                `
            )
            .join("");
    };

    const getFilteredWinners = () => {
        const query = state.query.toLowerCase();

        return data.winners.filter((winner) => {
            const searchableText = `${winner.bookTitle} ${winner.authorName} ${winner.category}`.toLowerCase();
            const matchesQuery = searchableText.includes(query);
            const matchesYear = state.year === "all" || winner.awardYear === Number(state.year);
            const matchesCategory = state.category === "all" || winner.category === state.category;

            return matchesQuery && matchesYear && matchesCategory;
        });
    };

    const renderWinnerCard = (winner, index) => `
        <article class="winner-card" data-reveal="up" style="transition-delay: ${(index % 4) * 65}ms">
            <div class="winner-book-cover" data-theme="${escapeHTML(winner.coverTheme)}" role="img" aria-label="Book cover for ${escapeHTML(winner.bookTitle)}">
                ${winner.coverImage
                    ? `<img src="${escapeHTML(winner.coverImage)}" alt="Cover for ${escapeHTML(winner.bookTitle)}" loading="lazy">`
                    : `<div class="book-cover-content"><strong>${escapeHTML(winner.bookTitle)}</strong><small>${escapeHTML(winner.authorName)}</small></div>`}
            </div>
            <div class="winner-card-copy">
                <span class="winner-label">${escapeHTML(winner.awardYear)} Winner</span>
                <h4>${escapeHTML(winner.bookTitle)}</h4>
                <p class="winner-author">${escapeHTML(winner.authorName)}</p>
                <p class="winner-category">${escapeHTML(winner.category)}</p>
                ${winnerLink(winner, "View Details")}
            </div>
        </article>
    `;

    const revealNewContent = () => {
        if (!document.documentElement.classList.contains("animations-ready")) {
            return;
        }

        groupsContainer?.querySelectorAll("[data-reveal]").forEach((element) => {
            requestAnimationFrame(() => element.classList.add("is-visible"));
        });
    };

    const renderWinnerArchive = () => {
        if (!groupsContainer || !resultsCount || !emptyState || !loadMoreButton) {
            return;
        }

        const filteredWinners = getFilteredWinners();
        const visibleWinners = filteredWinners.slice(0, state.limit);
        const groupedWinners = visibleWinners.reduce((groups, winner) => {
            if (!groups.has(winner.category)) {
                groups.set(winner.category, []);
            }
            groups.get(winner.category).push(winner);
            return groups;
        }, new Map());

        groupsContainer.innerHTML = [...groupedWinners.entries()]
            .map(
                ([category, winners]) => `
                    <section class="winner-group" aria-labelledby="group-${escapeHTML(category.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}" data-reveal="up">
                        <h3 class="winner-group-heading" id="group-${escapeHTML(category.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">${escapeHTML(category)}</h3>
                        <div class="winner-card-grid">
                            ${winners.map((winner, index) => renderWinnerCard(winner, index)).join("")}
                        </div>
                    </section>
                `
            )
            .join("");

        resultsCount.textContent = filteredWinners.length
            ? `Showing ${visibleWinners.length} of ${filteredWinners.length} honorees`
            : "No matching honorees";
        emptyState.hidden = filteredWinners.length !== 0;
        loadMoreButton.hidden = filteredWinners.length <= state.limit;
        renderYearButtons();
        revealNewContent();
    };

    const resetFilters = () => {
        state.query = "";
        state.year = "all";
        state.category = "all";
        state.limit = 12;

        if (searchInput) searchInput.value = "";
        if (yearSelect) yearSelect.value = "all";
        if (categorySelect) categorySelect.value = "all";

        renderWinnerArchive();
    };

    filterForm?.addEventListener("submit", (event) => event.preventDefault());

    searchInput?.addEventListener("input", () => {
        state.query = searchInput.value.trim();
        state.limit = 12;
        renderWinnerArchive();
    });

    yearSelect?.addEventListener("change", () => {
        state.year = yearSelect.value;
        state.limit = 12;
        renderWinnerArchive();
    });

    categorySelect?.addEventListener("change", () => {
        state.category = categorySelect.value;
        state.limit = 12;
        renderWinnerArchive();
    });

    loadMoreButton?.addEventListener("click", () => {
        state.limit += 8;
        renderWinnerArchive();
    });

    resetButton?.addEventListener("click", resetFilters);

    yearContainer?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-winner-year]");
        if (!button) {
            return;
        }

        state.year = button.dataset.winnerYear;
        state.limit = 12;
        if (yearSelect) yearSelect.value = state.year;
        renderWinnerArchive();
        document.querySelector("#winners-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.addEventListener("click", (event) => {
        const winnerLinkElement = event.target.closest("[data-winner-link]");
        if (!winnerLinkElement) {
            return;
        }

        event.preventDefault();
        if (actionStatus) {
            actionStatus.textContent = "Winner detail pages will be connected when the backend is added.";
        }
    });

    renderStats();
    renderFeaturedWinners();
    renderGallery();
    initializeSelects();
    renderWinnerArchive();
})();
