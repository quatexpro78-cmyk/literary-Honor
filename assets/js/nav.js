"use strict";

/* =========================================================
   MOBILE NAVIGATION
   The header shows the full link row on desktop. Below the
   nav breakpoint the links collapse behind a toggle and drop
   down as a panel, while the submit CTA stays in the bar.
   ========================================================= */

(function initMobileNavigation() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const inner = header.querySelector(".header-inner");
    const navigation = header.querySelector(".main-navigation");
    if (!inner || !navigation) return;

    // The CTA sits beside the nav rather than inside it, so it stays
    // visible in the bar once the links move into the drop-down panel.
    const cta = navigation.querySelector(".header-cta");
    if (cta) inner.appendChild(cta);

    if (!navigation.id) navigation.id = "main-navigation";

    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", navigation.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    inner.insertBefore(toggle, navigation);

    const setOpen = (open) => {
        header.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => {
        setOpen(!header.classList.contains("nav-open"));
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (event) => {
        if (!header.classList.contains("nav-open")) return;
        if (!header.contains(event.target)) setOpen(false);
    });

    const wide = window.matchMedia("(min-width: 801px)");
    const syncBreakpoint = () => {
        if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", syncBreakpoint);
})();
