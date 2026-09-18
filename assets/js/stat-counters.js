"use strict";

/* Counts the numbers in the gold statistics strip up from zero the first time
   the strip scrolls into view. Runs on every page that has one. */
(function initStatCounters() {
    const numbers = [];

    document.querySelectorAll(".stats-grid .stat-item strong").forEach((value) => {
        // the suffix lives in its own <small>, so only the plain text is measured
        const suffix = value.querySelector("small");
        const text = Array.from(value.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join("")
            .trim();
        const match = text.match(/^([^\d]*)(\d+)([^\d]*)$/);
        if (!match || Number(match[2]) >= 1000) return;

        const counter = document.createElement("span");
        counter.className = "stat-count";
        counter.textContent = "0";

        value.textContent = match[1];
        value.appendChild(counter);
        value.append(match[3]);
        if (suffix) {
            value.append(" ");
            value.appendChild(suffix);
        }

        numbers.push({ counter, target: Number(match[2]) });
    });

    if (!numbers.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
        numbers.forEach(({ counter, target }) => { counter.textContent = target; });
        return;
    }

    const countUp = ({ counter, target }) => {
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                numbers.forEach(countUp);
                observer.disconnect();
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(document.querySelector(".stats-grid"));
})();
