"use strict";

/* Book categories are chosen in a popup: how many categories, fiction or
   non-fiction, and then one dropdown per category the author is entering. */
(() => {
    const select = document.querySelector(".book-submission-form #category");
    if (!select) return;

    const form = select.form;
    const csrfInput = form.querySelector('input[name="csrf_token"]');
    fetch("../api/csrf.php", { credentials: "same-origin" })
        .then((response) => response.ok ? response.json() : null)
        .then((data) => {
            if (data?.token && csrfInput) csrfInput.value = data.token;
        })
        .catch(() => {});

    const data = window.literaryHonorsCategories ?? {};
    const allCategories = (data.categories ?? []).filter((item) => item.active !== false);
    const packages = data.entryOptions ?? [];
    const maxCategories = Number(select.dataset.maxCategories) || 5;
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th"];

    const field = select.closest(".field");
    const picker = document.createElement("div");
    picker.className = "category-picker";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.id = "category-toggle";
    trigger.className = "category-trigger";
    trigger.style.fontSize = getComputedStyle(select).fontSize;
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "category-options");

    const overlay = document.createElement("div");
    overlay.className = "category-overlay";
    overlay.hidden = true;

    const menu = document.createElement("div");
    menu.id = "category-options";
    menu.className = "category-options";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    menu.setAttribute("aria-label", "Book categories");

    const head = document.createElement("div");
    head.className = "category-popup-head";

    const heading = document.createElement("p");
    heading.className = "category-popup-title";
    heading.textContent = "Choose Your Categories";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "category-close";
    close.setAttribute("aria-label", "Close category list");
    close.textContent = "×";

    head.append(heading, close);

    const tagline = document.createElement("p");
    tagline.className = "category-popup-tagline";
    tagline.append("More categories.", document.createElement("br"), "More opportunities. More savings.");

    const buildField = (labelText, id) => {
        const wrapper = document.createElement("div");
        wrapper.className = "category-popup-field";
        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = labelText;
        const dropdown = document.createElement("select");
        dropdown.id = id;
        wrapper.append(label, dropdown);
        return { wrapper, dropdown, label };
    };

    const countField = buildField("How Many Categories Are You Submitting for?", "category-count");
    const typeField = buildField("Is your Book Fiction or Non-Fiction?", "category-type");

    packages.slice(0, maxCategories).forEach((entry, index) => {
        const option = document.createElement("option");
        option.value = String(index + 1);
        const saving = entry.saving ? ` - You ${entry.saving}` : "";
        option.textContent = `${entry.count} ${entry.label} (${entry.price}${saving})`;
        countField.dropdown.append(option);
    });

    [["fiction", "Fiction"], ["non-fiction", "Non-Fiction"]].forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        typeField.dropdown.append(option);
    });

    const choiceFields = ordinals.map((ordinal, index) => {
        const item = buildField(`${ordinal} Category`, `category-choice-${index + 1}`);
        item.ordinal = ordinal;
        return item;
    });

    const done = document.createElement("button");
    done.type = "button";
    done.className = "category-done";
    done.textContent = "Done";

    const body = document.createElement("div");
    body.className = "category-popup-body";
    body.append(tagline, countField.wrapper, typeField.wrapper);
    choiceFields.forEach(({ wrapper }) => body.append(wrapper));

    menu.append(head, body, done);
    overlay.append(menu);
    picker.append(trigger);
    document.body.append(overlay);
    select.after(picker);
    select.hidden = true;
    field.querySelector("label").htmlFor = trigger.id;

    // the original select only carries the values that get submitted
    select.innerHTML = "";

    const typeLabel = () => (typeField.dropdown.value === "fiction" ? "Fiction" : "Non-Fiction");

    const fillChoices = () => {
        const options = allCategories.filter((item) => item.type === typeField.dropdown.value);

        choiceFields.forEach(({ dropdown, wrapper, label, ordinal }, index) => {
            const previous = dropdown.value;
            const visible = index < Number(countField.dropdown.value);
            wrapper.hidden = !visible;
            label.textContent = `${typeLabel()} ${ordinal} Category`;

            dropdown.innerHTML = "";
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Select an Option";
            dropdown.append(placeholder);

            options.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.name;
                option.textContent = item.name;
                dropdown.append(option);
            });

            dropdown.value = visible && options.some((item) => item.name === previous) ? previous : "";
        });
    };

    const updateSelection = () => {
        const chosen = choiceFields
            .filter(({ wrapper }) => !wrapper.hidden)
            .map(({ dropdown }) => dropdown.value)
            .filter(Boolean);

        select.innerHTML = "";
        chosen.forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            option.selected = true;
            select.append(option);
        });

        trigger.textContent = chosen.length ? chosen.join(", ") : "Select Category";
        trigger.setAttribute("aria-label", `Book categories: ${trigger.textContent}`);
    };

    const closeMenu = (restoreFocus = false) => {
        overlay.hidden = true;
        document.body.classList.remove("has-open-modal");
        trigger.setAttribute("aria-expanded", "false");
        if (restoreFocus) trigger.focus();
    };

    const openMenu = () => {
        overlay.hidden = false;
        document.body.classList.add("has-open-modal");
        trigger.setAttribute("aria-expanded", "true");
        countField.dropdown.focus();
    };

    trigger.addEventListener("click", () => {
        if (overlay.hidden) openMenu(); else closeMenu(true);
    });

    done.addEventListener("click", () => closeMenu(true));
    close.addEventListener("click", () => closeMenu(true));

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeMenu(true);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !overlay.hidden) {
            event.preventDefault();
            closeMenu(true);
        }
    });

    countField.dropdown.addEventListener("change", () => { fillChoices(); updateSelection(); });
    typeField.dropdown.addEventListener("change", () => { fillChoices(); updateSelection(); });
    choiceFields.forEach(({ dropdown }) => dropdown.addEventListener("change", updateSelection));

    form.addEventListener("reset", () => {
        closeMenu();
        window.setTimeout(() => {
            countField.dropdown.selectedIndex = 0;
            typeField.dropdown.selectedIndex = 0;
            fillChoices();
            updateSelection();
        }, 0);
    });

    fillChoices();
    updateSelection();
})();
