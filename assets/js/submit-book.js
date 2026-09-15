"use strict";

(() => {
    const select = document.querySelector(".book-submission-form #category");
    if (!select) return;

    const maxCategories = Number(select.dataset.maxCategories) || 5;
    const picker = document.createElement("div");
    picker.className = "category-picker";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.id = "category-toggle";
    trigger.className = "category-trigger";
    trigger.style.fontSize = getComputedStyle(select).fontSize;
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "category-options");
    trigger.setAttribute("aria-describedby", "category-help");

    const menu = document.createElement("div");
    menu.id = "category-options";
    menu.className = "category-options";
    menu.hidden = true;
    menu.setAttribute("role", "group");
    menu.setAttribute("aria-label", "Book categories");

    const help = document.createElement("p");
    help.id = "category-help";
    help.className = "category-help";
    help.setAttribute("aria-live", "polite");
    menu.append(help);

    const choices = Array.from(select.options)
        .filter((option) => option.value)
        .map((option) => {
            const label = document.createElement("label");
            label.className = "category-option";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const text = document.createElement("span");
            text.textContent = option.textContent.trim();
            label.append(checkbox, text);
            menu.append(label);

            checkbox.addEventListener("change", () => {
                option.selected = checkbox.checked;
                select.dispatchEvent(new Event("change", { bubbles: true }));
            });

            return { option, checkbox, label };
        });

    picker.append(trigger, menu);
    select.after(picker);
    select.hidden = true;
    select.closest(".field").querySelector("label").htmlFor = trigger.id;

    const updateSelection = () => {
        let selected = choices.filter(({ option }) => option.selected);
        selected.slice(maxCategories).forEach(({ option }) => { option.selected = false; });
        selected = choices.filter(({ option }) => option.selected);

        choices.forEach(({ option, checkbox, label }) => {
            checkbox.checked = option.selected;
            checkbox.disabled = !option.selected && selected.length >= maxCategories;
            label.classList.toggle("is-disabled", checkbox.disabled);
        });

        const names = selected.map(({ option }) => option.textContent.trim());
        trigger.textContent = names.length ? names.join(", ") : "Select Category";
        trigger.setAttribute("aria-label", `Book categories: ${trigger.textContent}`);
        help.textContent = selected.length
            ? `${selected.length} of ${maxCategories} categories selected.`
            : `Select up to ${maxCategories} categories.`;
    };

    const closeMenu = (restoreFocus = false) => {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        if (restoreFocus) trigger.focus();
    };

    trigger.addEventListener("click", () => {
        menu.hidden = !menu.hidden;
        trigger.setAttribute("aria-expanded", String(!menu.hidden));
    });

    picker.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) {
            event.preventDefault();
            closeMenu(true);
        }
    });

    document.addEventListener("click", (event) => {
        if (!picker.contains(event.target)) closeMenu();
    });

    document.addEventListener("focusin", (event) => {
        if (!picker.contains(event.target)) closeMenu();
    });

    select.addEventListener("change", updateSelection);
    select.form.addEventListener("reset", () => {
        closeMenu();
        setTimeout(updateSelection, 0);
    });

    updateSelection();
})();
