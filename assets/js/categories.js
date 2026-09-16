"use strict";

const categoryPageContent = window.literaryHonorsCategories ?? {};
const categoryState = { type: "all", query: "" };

const escapeCategoryHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderCategorySummary = () => {
    const container = document.querySelector("#category-summary");
    if (!container) return;

    container.innerHTML = (categoryPageContent.summary ?? [])
        .map(
            (item, index) => `
                <div class="stat-item" data-reveal="up" style="transition-delay: ${index * 100}ms">
                    <strong>${escapeCategoryHTML(item.value)}</strong>
                    <span>${escapeCategoryHTML(item.label)}</span>
                </div>
            `
        )
        .join("");
};

const renderCategoryFilters = () => {
    const container = document.querySelector("#category-filters");
    if (!container) return;

    container.innerHTML = (categoryPageContent.filters ?? [])
        .map(
            (filter) => `
                <button
                    class="category-filter${filter.value === categoryState.type ? " is-active" : ""}"
                    type="button"
                    data-filter="${escapeCategoryHTML(filter.value)}"
                    aria-pressed="${filter.value === categoryState.type}"
                >${escapeCategoryHTML(filter.label)}</button>
            `
        )
        .join("");
};

const getVisibleCategories = () => {
    const query = categoryState.query.trim().toLowerCase();

    return (categoryPageContent.categories ?? []).filter((category) => {
        const matchesType = categoryState.type === "all" || category.type === categoryState.type;
        const searchableText = `${category.name} ${category.type} ${category.description}`.toLowerCase();
        return category.active !== false && matchesType && searchableText.includes(query);
    });
};

/* =========================================================
   CATEGORY DETAIL DIALOG
   Opened by clicking (or pressing Enter/Space on) any card in
   the category index. Previous / Next walk the same list that
   is currently visible, so it follows the active filter.
   ========================================================= */

const categoryModalState = { id: null, lastFocused: null };

const CATEGORY_MODAL_POINTS = [
    "Judged on writing quality, originality, presentation and reader impact.",
    "Open to books published from 2025 onward.",
    "Enter up to five categories for the same book."
];

const openCategoryModal = (categoryId) => {
    const modal = document.querySelector("#category-modal");
    if (!modal || !categoryId) return;

    const list = getVisibleCategories();
    const category = list.find((item) => item.id === categoryId);
    if (!category) return;

    const position = list.indexOf(category);

    modal.querySelector("#category-modal-type").textContent =
        category.type === "non-fiction" ? "Non-Fiction" : "Fiction";
    modal.querySelector("#category-modal-title").textContent = category.name;
    modal.querySelector("#category-modal-description").textContent =
        category.detail ?? category.description;
    modal.querySelector("#category-modal-points").innerHTML = CATEGORY_MODAL_POINTS
        .map((point) => `<li>${escapeCategoryHTML(point)}</li>`)
        .join("");
    modal.querySelector("#category-modal-position").textContent =
        `${position + 1} of ${list.length}`;

    modal.querySelectorAll("[data-category-step]").forEach((button) => {
        const step = Number(button.dataset.categoryStep);
        button.disabled = list.length < 2;
        button.dataset.targetId = list[(position + step + list.length) % list.length]?.id ?? "";
    });

    if (categoryModalState.id === null) {
        categoryModalState.lastFocused = document.activeElement;
    }

    categoryModalState.id = category.id;
    modal.hidden = false;
    document.body.classList.add("has-open-modal");

    requestAnimationFrame(() => {
        modal.classList.add("is-open");
        modal.querySelector(".category-modal-close")?.focus();
    });

    const status = document.querySelector("#category-detail-status");
    if (status) status.textContent = `${category.name} details opened.`;
};

const closeCategoryModal = () => {
    const modal = document.querySelector("#category-modal");
    if (!modal || modal.hidden) return;

    modal.classList.remove("is-open");
    categoryModalState.id = null;
    document.body.classList.remove("has-open-modal");

    window.setTimeout(() => {
        modal.hidden = true;
    }, 220);

    categoryModalState.lastFocused?.focus?.();
    categoryModalState.lastFocused = null;
};

const initCategoryModal = () => {
    const modal = document.querySelector("#category-modal");
    if (!modal) return;

    modal.querySelectorAll("[data-category-modal-close]").forEach((element) => {
        element.addEventListener("click", closeCategoryModal);
    });

    modal.querySelectorAll("[data-category-step]").forEach((button) => {
        button.addEventListener("click", () => {
            if (button.dataset.targetId) openCategoryModal(button.dataset.targetId);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (modal.hidden) return;

        if (event.key === "Escape") {
            closeCategoryModal();
        } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            const step = event.key === "ArrowRight" ? 1 : -1;
            const button = modal.querySelector(`[data-category-step="${step}"]`);
            if (button && !button.disabled && button.dataset.targetId) {
                openCategoryModal(button.dataset.targetId);
            }
        }
    });
};

const renderCategoryGrid = () => {
    const grid = document.querySelector("#main-category-grid");
    const emptyState = document.querySelector("#category-empty-state");
    const resultsStatus = document.querySelector("#category-results-status");
    const detailStatus = document.querySelector("#category-detail-status");
    if (!grid || !emptyState || !resultsStatus || !detailStatus) return;

    const categories = getVisibleCategories();
    grid.hidden = categories.length === 0;
    emptyState.hidden = categories.length !== 0;
    resultsStatus.textContent = `${categories.length} ${categories.length === 1 ? "category" : "categories"} shown`;

    grid.innerHTML = categories
        .map(
            (category, index) => `
                <article
                    class="main-category-card"
                    data-reveal="up"
                    data-category-id="${escapeCategoryHTML(category.id)}"
                    role="button"
                    tabindex="0"
                    aria-haspopup="dialog"
                    style="transition-delay: ${(index % 9) * 55}ms"
                >
                    <span class="main-category-type">${escapeCategoryHTML(category.type)}</span>
                    <h3>${escapeCategoryHTML(category.name)}</h3>
                    <p>${escapeCategoryHTML(category.description)}</p>
                </article>
            `
        )
        .join("");

    grid.querySelectorAll(".main-category-card").forEach((card) => {
        card.addEventListener("click", () => openCategoryModal(card.dataset.categoryId));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCategoryModal(card.dataset.categoryId);
            }
        });
    });

    if (document.documentElement.classList.contains("animations-ready")) {
        requestAnimationFrame(() => {
            grid.querySelectorAll("[data-reveal]").forEach((card) => card.classList.add("is-visible"));
        });
    }
};

const renderChoicePrinciples = () => {
    const container = document.querySelector("#choice-principles");
    if (!container) return;

    container.innerHTML = (categoryPageContent.principles ?? [])
        .map(
            (principle, index) => `
                <article class="choice-principle" data-reveal="up" style="transition-delay: ${index * 120}ms">
                    <span>${escapeCategoryHTML(principle.number)}</span>
                    <h3>${escapeCategoryHTML(principle.title)}</h3>
                    <p>${escapeCategoryHTML(principle.description)}</p>
                </article>
            `
        )
        .join("");
};

const renderEntryOptions = () => {
    const container = document.querySelector("#entry-options");
    if (!container) return;

    container.innerHTML = (categoryPageContent.entryOptions ?? [])
        .map(
            (option, index) => `
                <article class="entry-option" data-reveal="up" style="transition-delay: ${index * 80}ms">
                    <span class="entry-count">${escapeCategoryHTML(option.count)}</span>
                    <span class="entry-label">${escapeCategoryHTML(option.label)}</span>
                    <strong>${escapeCategoryHTML(option.price)}</strong>
                    <small>${option.saving ? escapeCategoryHTML(option.saving) : "Standard entry"}</small>
                </article>
            `
        )
        .join("");
};

const initializeCategoryControls = () => {
    const filters = document.querySelector("#category-filters");
    const search = document.querySelector("#main-category-search");
    const clearButton = document.querySelector("#clear-category-search");
    if (!filters || !search || !clearButton) return;

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;

        categoryState.type = button.dataset.filter;
        filters.querySelectorAll("[data-filter]").forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("is-active", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });
        renderCategoryGrid();
    });

    search.addEventListener("input", () => {
        categoryState.query = search.value;
        renderCategoryGrid();
    });

    clearButton.addEventListener("click", () => {
        categoryState.query = "";
        categoryState.type = "all";
        search.value = "";
        renderCategoryFilters();
        renderCategoryGrid();
        search.focus();
    });
};

renderCategorySummary();
renderCategoryFilters();
renderCategoryGrid();
renderChoicePrinciples();
renderEntryOptions();
initializeCategoryControls();
initCategoryModal();
