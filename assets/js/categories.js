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
                <article class="main-category-card" data-reveal="up" style="transition-delay: ${(index % 9) * 55}ms">
                    <span class="main-category-type">${escapeCategoryHTML(category.type)}</span>
                    <h3>${escapeCategoryHTML(category.name)}</h3>
                    <p>${escapeCategoryHTML(category.description)}</p>
                </article>
            `
        )
        .join("");

    grid.querySelectorAll(".main-category-card a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            detailStatus.textContent = `${link.dataset.categoryName} detail page will be connected after the design phase.`;
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
