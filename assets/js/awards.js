"use strict";

const awardsContent = window.literaryHonorsAwards ?? {};

const awardsIcon = (name) => `
    <svg aria-hidden="true">
        <use href="#icon-${name}"></use>
    </svg>
`;

/* Wrap the numeric part of a stat (e.g. "70+", "$65") so it can count up from 0. */
const formatStatValue = (value) => {
    const match = String(value).match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match || /[a-z]/i.test(value) || Number(match[2]) >= 1000) return value;
    return `${match[1]}<span class="stat-count" data-count="${match[2]}">0</span>${match[3]}`;
};

const animateStatCounts = () => {
    const counters = document.querySelectorAll("#award-stats .stat-count");
    if (!counters.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
        counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
        return;
    }

    const countUp = (counter) => {
        const target = Number(counter.dataset.count);
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            countUp(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
};

const renderAwardStats = () => {
    const container = document.querySelector("#award-stats");
    if (!container) return;

    container.innerHTML = (awardsContent.stats ?? [])
        .map(
            (stat, index) => `
                <div class="stat-item" data-reveal="up" style="transition-delay: ${index * 100}ms">
                    <strong>${formatStatValue(stat.value)}${stat.suffix ? ` <small>${stat.suffix}</small>` : ""}</strong>
                    <span>${stat.label}</span>
                </div>
            `
        )
        .join("");
};

const renderAwardSteps = () => {
    const container = document.querySelector("#award-process");
    if (!container) return;

    container.innerHTML = (awardsContent.steps ?? [])
        .map(
            (step, index) => `
                <article class="award-process-step" data-reveal="up" style="transition-delay: ${index * 150}ms">
                    <span class="award-step-number">${step.number}</span>
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </article>
            `
        )
        .join("");
};

const renderEligibility = () => {
    const container = document.querySelector("#eligibility-list");
    if (!container) return;

    container.innerHTML = (awardsContent.eligibility ?? [])
        .map(
            (item, index) => `
                <li data-reveal="up" style="transition-delay: ${index * 80}ms">
                    <span aria-hidden="true">✓</span>${item}
                </li>
            `
        )
        .join("");
};

const renderCategoryPreview = () => {
    const container = document.querySelector("#awards-category-grid");
    if (!container) return;

    container.innerHTML = (awardsContent.categoryPreview ?? [])
        .map(
            (category, index) => `
                <a class="awards-category-card" href="${sitePath("pages/categories.html")}" data-reveal="up" style="transition-delay: ${index * 65}ms">
                    <span class="awards-category-icon">${awardsIcon(category.icon)}</span>
                    <span>${category.name}</span>
                    <b aria-hidden="true">→</b>
                </a>
            `
        )
        .join("");
};

const renderAwardBenefits = () => {
    const container = document.querySelector("#award-benefits");
    if (!container) return;

    container.innerHTML = (awardsContent.benefits ?? [])
        .map(
            (benefit, index) => `
                <article class="award-benefit" data-reveal="up" style="transition-delay: ${index * 90}ms">
                    <span class="award-benefit-number">${benefit.number}</span>
                    <span class="award-benefit-icon">${awardsIcon(benefit.icon)}</span>
                    <h3>${benefit.title}</h3>
                    <p>${benefit.description}</p>
                </article>
            `
        )
        .join("");
};

const renderWinnerCards = () => {
    const track = document.querySelector("#winner-track");
    if (!track) return;

    track.innerHTML = (awardsContent.winners ?? [])
        .map(
            (winner, index) => `
                <article class="winner-card" data-reveal="up" style="transition-delay: ${index * 70}ms">
                    <div class="winner-cover" data-cover="${winner.cover}" role="img" aria-label="Book cover for ${winner.title}">
                        ${winner.image
                            ? `<img src="${sitePath(winner.image)}" alt="Cover for ${winner.title}" loading="lazy">`
                            : `<span class="winner-cover-mark" aria-hidden="true">LH</span><strong>${winner.title}</strong><span>Literary Honors</span>`}
                    </div>
                    <h3>${winner.title}</h3>
                    <p>${winner.category}</p>
                    <span class="winner-year">${winner.year}</span>
                </article>
            `
        )
        .join("");
};

const initializeWinnerCarousel = () => {
    const viewport = document.querySelector("#winner-carousel");
    const previousButton = document.querySelector("#winner-prev");
    const nextButton = document.querySelector("#winner-next");

    if (!viewport || !previousButton || !nextButton) return;

    const updateControls = () => {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        previousButton.disabled = viewport.scrollLeft <= 2;
        nextButton.disabled = viewport.scrollLeft >= maxScroll - 2;
    };

    const moveCarousel = (direction) => {
        const firstCard = viewport.querySelector(".winner-card");
        const track = viewport.querySelector(".winner-track");
        const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
        const step = firstCard ? firstCard.getBoundingClientRect().width + gap : viewport.clientWidth * 0.82;
        viewport.scrollLeft += step * direction;
    };

    previousButton.addEventListener("click", () => moveCarousel(-1));
    nextButton.addEventListener("click", () => moveCarousel(1));
    viewport.addEventListener("scroll", updateControls, { passive: true });
    viewport.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
    });
    window.addEventListener("resize", updateControls);
    requestAnimationFrame(updateControls);
};

const initializeTestimonials = () => {
    const stage = document.querySelector("#testimonial-stage");
    const previousButton = document.querySelector("#testimonial-prev");
    const nextButton = document.querySelector("#testimonial-next");
    const status = document.querySelector("#testimonial-status");
    const testimonials = awardsContent.testimonials ?? [];

    if (!stage || !previousButton || !nextButton || !status || testimonials.length === 0) return;

    let activeIndex = 0;
    let changing = false;

    const renderTestimonial = () => {
        const testimonial = testimonials[activeIndex];
        stage.innerHTML = `
            <figure class="testimonial-portrait" aria-hidden="true"></figure>
            <blockquote class="testimonial-quote">
                <span class="testimonial-placeholder-label">Sample testimonial</span>
                <p>“${testimonial.quote}”</p>
                <footer>
                    <strong>${testimonial.author}</strong>
                    <span>${testimonial.recognition}</span>
                </footer>
            </blockquote>
        `;
        status.textContent = `Testimonial ${activeIndex + 1} of ${testimonials.length}`;
    };

    const changeTestimonial = (direction) => {
        if (changing || testimonials.length < 2) return;
        changing = true;
        stage.classList.add("is-changing");

        window.setTimeout(() => {
            activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
            renderTestimonial();
            requestAnimationFrame(() => stage.classList.remove("is-changing"));
            window.setTimeout(() => { changing = false; }, 420);
        }, 190);
    };

    previousButton.addEventListener("click", () => changeTestimonial(-1));
    nextButton.addEventListener("click", () => changeTestimonial(1));
    renderTestimonial();
};

renderAwardStats();
animateStatCounts();
renderAwardSteps();
renderEligibility();
renderCategoryPreview();
renderAwardBenefits();
renderWinnerCards();
initializeWinnerCarousel();
initializeTestimonials();
