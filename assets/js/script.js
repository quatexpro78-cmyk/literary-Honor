"use strict";

const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const initializeCategorySearch = () => {
    const searchInput = document.querySelector("#category-search");
    const index = document.querySelector("#category-grid");
    const emptyMessage = document.querySelector("#no-category-results");

    if (!searchInput || !index || !emptyMessage) {
        return;
    }

    const content = window.literaryHonorsCategories ?? {};
    const categories = (content.categories ?? []).filter((item) => item.active !== false);
    const state = { query: "" };

    const renderCategoryLink = (category) => `
        <a class="home-category-row" href="categories.html" data-slug="${escapeHTML(category.slug)}">
            <span class="home-category-name">${escapeHTML(category.name)}</span>
            <span class="home-category-arrow" aria-hidden="true">&gt;</span>
        </a>
    `;

    const renderCategoryPanel = (type, title, description, icon, categoriesForType) => `
        <article class="home-category-panel home-category-panel-${escapeHTML(type)}" data-reveal="${type === "fiction" ? "left" : "right"}">
            <div class="home-category-panel-media" aria-hidden="true"></div>
            <div class="home-category-panel-content">
                <div class="home-category-panel-heading">
                    <span class="home-category-panel-icon" aria-hidden="true">${icon}</span>
                    <div>
                        <h3>${escapeHTML(title)}</h3>
                        <p>${escapeHTML(description)}</p>
                    </div>
                </div>
                <span class="home-category-panel-rule" aria-hidden="true"></span>
                <div class="home-category-list">
                    ${categoriesForType.map(renderCategoryLink).join("")}
                </div>
                <a class="home-category-panel-cta" href="categories.html">Explore ${escapeHTML(title)} <span aria-hidden="true">-&gt;</span></a>
            </div>
        </article>
    `;

    const renderIndex = () => {
        const query = state.query.trim().toLowerCase();
        const visible = categories.filter((category) => {
            const haystack = `${category.name} ${category.type} ${category.description}`.toLowerCase();
            return haystack.includes(query);
        });
        const fiction = visible.filter((category) => category.type === "fiction").slice(0, 16);
        const nonFiction = visible.filter((category) => category.type === "non-fiction").slice(0, 16);

        index.hidden = visible.length === 0;
        emptyMessage.hidden = visible.length !== 0;

        index.innerHTML = [
            fiction.length
                ? renderCategoryPanel("fiction", "Fiction", "Stories that inspire, entertain, and transport you to new worlds.", "&#10002;", fiction)
                : "",
            nonFiction.length
                ? renderCategoryPanel("non-fiction", "Non-Fiction", "Real people. True stories. A deeper understanding of our world.", '<svg viewBox="0 0 24 24"><use href="#icon-book"></use></svg>', nonFiction)
                : ""
        ].join("");
    };
    searchInput.addEventListener("input", () => {
        state.query = searchInput.value;
        renderIndex();
    });

    renderIndex();
};

const initializeHeroTitleTyping = () => {
    const title = document.querySelector(".hero-title-typing");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!title || reduceMotion) {
        return;
    }

    const text = title.textContent.trim();
    let characterIndex = 0;

    title.textContent = "";

    const typeNextCharacter = () => {
        characterIndex += 1;
        title.textContent = text.slice(0, characterIndex);

        if (characterIndex < text.length) {
            window.setTimeout(typeNextCharacter, 85);
        }
    };

    window.setTimeout(typeNextCharacter, 120);
};

const initializeRevealAnimations = () => {
    const elements = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    document.documentElement.classList.add("animations-ready");

    const screenEdgeRevealSelector = [
        ".home-page .about-copy[data-reveal]",
        ".home-page .about-quote[data-reveal]",
        ".home-page .benefit-card[data-reveal]",
        ".home-page .home-category-panel[data-reveal]",
        ".home-page .judging-process-card[data-reveal]"
    ].join(",");

    const revealTargets = new Map();

    elements.forEach((element) => {
        const target = element.matches(screenEdgeRevealSelector)
            ? element.closest("section") ?? element
            : element;
        const linkedElements = revealTargets.get(target) ?? [];

        linkedElements.push(element);
        revealTargets.set(target, linkedElements);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const linkedElements = revealTargets.get(entry.target) ?? [entry.target];

                linkedElements.forEach((element) => element.classList.add("is-visible"));
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.18 }
    );

    revealTargets.forEach((_, target) => observer.observe(target));
};

initializeCategorySearch();
initializeHeroTitleTyping();
initializeRevealAnimations();




/* ==========================================================================

   LITERARY HONORS
   LITERARY ARCHIVE CAROUSEL JAVASCRIPT

   PURPOSE:
   - Literary Archive ke book cards ko Previous / Next buttons se move karna
   - Desktop par 6 books show karna
   - Tablet par 4 books show karna
   - Mobile par 2 books show karna
   - Progress indicator update karna
   - Current position update karna
   - Buttons ko start/end par disable karna

   IMPORTANT:
   - Is code ko script.js ke END mein paste karo.
   - Existing JavaScript code ko delete mat karna.
   - Agar page par Literary Archive section nahi hai,
     to ye code automatically kuch nahi karega.

========================================================================== */


document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------------------------
       LITERARY ARCHIVE ELEMENTS

       HTML ke andar jo classes humne banayi hain,
       un elements ko JavaScript yahan select karega.
    ---------------------------------------------------------------------- */

    const archiveSection = document.querySelector(".literary-archive");

    const archiveViewport = document.querySelector(".archive-viewport");

    const archiveTrack = document.querySelector(".archive-track");

    const archiveBooks = document.querySelectorAll(".archive-book");

    const archivePrev = document.querySelector(".archive-prev");

    const archiveNext = document.querySelector(".archive-next");

    const archiveProgress = document.querySelector(
        ".archive-progress span"
    );

    const archiveCurrent = document.querySelector(
        ".archive-current"
    );

    const archiveTotal = document.querySelector(
        ".archive-total"
    );


    /* ----------------------------------------------------------------------
       SAFETY CHECK

       Agar kisi page par Literary Archive section nahi hai,
       to JavaScript error nahi dega.

       Ye important hai kyunki script.js multiple pages par load ho sakti hai.
    ---------------------------------------------------------------------- */

    if (
        !archiveSection ||
        !archiveViewport ||
        !archiveTrack ||
        !archiveBooks.length ||
        !archivePrev ||
        !archiveNext
    ) {
        return;
    }


    /* ----------------------------------------------------------------------
       BASIC CAROUSEL SETTINGS

       currentIndex:
       Abhi hum kis book position par hain.

       visibleBooks:
       Ek waqt mein kitni books screen par visible hain.

       Total books:
       Archive HTML mein total kitni books hain.
    ---------------------------------------------------------------------- */

    let currentIndex = 0;

    let visibleBooks = 6;

    const totalBooks = archiveBooks.length;


    /* ----------------------------------------------------------------------
       VISIBLE BOOKS CALCULATOR

       Desktop:
       6 books

       Tablet:
       4 books

       Mobile:
       2 books
    ---------------------------------------------------------------------- */

    function getVisibleBooks() {

        const screenWidth = window.innerWidth;


        /* Mobile screens */

        if (screenWidth <= 650) {
            return 2;
        }


        /* Tablet screens */

        if (screenWidth <= 900) {
            return 4;
        }


        /* Desktop screens */

        return 6;
    }


    /* ----------------------------------------------------------------------
       MAXIMUM SLIDE POSITION

       Example:

       Total books = 12
       Visible books = 6

       Maximum movement:
       12 - 6 = 6

       Iska matlab last position par remaining 6 books visible hongi.
    ---------------------------------------------------------------------- */

    function getMaxIndex() {
        const step = getBookStep();
        const maxTranslate = Math.max(
            0,
            archiveTrack.scrollWidth - archiveViewport.clientWidth
        );

        return step > 0
            ? Math.ceil(maxTranslate / step)
            : 0;
    }


    /* ----------------------------------------------------------------------
       BOOK STEP CALCULATOR

       Ek card ki width + cards ke darmiyan gap calculate karta hai.

       Isi value se carousel ko left/right move kiya jayega.
    ---------------------------------------------------------------------- */

    function getBookStep() {

        if (!archiveBooks.length) {
            return 0;
        }


        const firstBook = archiveBooks[0];

        const bookWidth = firstBook.getBoundingClientRect().width;


        /* CSS gap read karna */

        const trackStyles = window.getComputedStyle(
            archiveTrack
        );

        const gap = parseFloat(
            trackStyles.gap
        ) || 0;


        return bookWidth + gap;
    }


    /* ----------------------------------------------------------------------
       UPDATE CAROUSEL

       Ye function:

       - Track ko move karta hai
       - Current number update karta hai
       - Progress line update karta hai
       - Previous button disable/enable karta hai
       - Next button disable/enable karta hai
    ---------------------------------------------------------------------- */

    function updateArchive() {

        /* Current screen ke hisaab se visible books dobara calculate */

        visibleBooks = getVisibleBooks();


        /* Maximum allowed position */

        const maxIndex = getMaxIndex();


        /* Safety:
           currentIndex ko allowed range ke andar rakho.
        */

        currentIndex = Math.max(
            0,
            Math.min(
                currentIndex,
                maxIndex
            )
        );


        /* Ek book move karne ki distance */

        const step = getBookStep();


        /* --------------------------------------------------------------
           TRACK MOVE

           Example:

           currentIndex = 1

           Track:
           -1 × book width

           Matlab ek card left move hoga.
        -------------------------------------------------------------- */

        const maxTranslate = Math.max(
            0,
            archiveTrack.scrollWidth - archiveViewport.clientWidth
        );

        const translateX = Math.min(
            currentIndex * step,
            maxTranslate
        );


        archiveTrack.style.transform =
            `translateX(-${translateX}px)`;


        /* --------------------------------------------------------------
           CURRENT COUNTER

           Example:
           01
           02
           03
        -------------------------------------------------------------- */

        if (archiveCurrent) {

            archiveCurrent.textContent =
                String(currentIndex + 1).padStart(
                    2,
                    "0"
                );
        }


        /* --------------------------------------------------------------
           TOTAL COUNTER

           Example:
           /12
        -------------------------------------------------------------- */

        if (archiveTotal) {

            archiveTotal.textContent =
                String(totalBooks).padStart(
                    2,
                    "0"
                );
        }


        /* --------------------------------------------------------------
           PROGRESS BAR

           Carousel ki current position ke according
           progress line width change hogi.
        -------------------------------------------------------------- */

        if (archiveProgress) {

            const totalPositions =
                maxIndex + 1;

            const progressPercentage =
                totalPositions > 0
                    ? ((currentIndex + 1) / totalPositions) * 100
                    : 0;


            archiveProgress.style.width =
                `${progressPercentage}%`;
        }


        /* --------------------------------------------------------------
           PREVIOUS BUTTON

           Agar first position par hain,
           Previous disabled hoga.
        -------------------------------------------------------------- */

        if (currentIndex <= 0) {

            archivePrev.disabled = true;

            archivePrev.setAttribute(
                "aria-disabled",
                "true"
            );

        } else {

            archivePrev.disabled = false;

            archivePrev.setAttribute(
                "aria-disabled",
                "false"
            );
        }


        /* --------------------------------------------------------------
           NEXT BUTTON

           Agar last position par hain,
           Next disabled hoga.
        -------------------------------------------------------------- */

        if (currentIndex >= maxIndex) {

            archiveNext.disabled = true;

            archiveNext.setAttribute(
                "aria-disabled",
                "true"
            );

        } else {

            archiveNext.disabled = false;

            archiveNext.setAttribute(
                "aria-disabled",
                "false"
            );
        }
    }


    /* ----------------------------------------------------------------------
       NEXT BUTTON

       User jab right arrow click karega,
       carousel ek book position aage move karega.
    ---------------------------------------------------------------------- */

    archiveNext.addEventListener(
        "click",
        function () {

            const maxIndex = getMaxIndex();


            if (currentIndex < maxIndex) {

                currentIndex++;

                updateArchive();
            }
        }
    );


    /* ----------------------------------------------------------------------
       PREVIOUS BUTTON

       User jab left arrow click karega,
       carousel ek book position peeche move karega.
    ---------------------------------------------------------------------- */

    archivePrev.addEventListener(
        "click",
        function () {

            if (currentIndex > 0) {

                currentIndex--;

                updateArchive();
            }
        }
    );


    /* ----------------------------------------------------------------------
       WINDOW RESIZE

       Browser ki width change hone par:

       Desktop → 6 books
       Tablet  → 4 books
       Mobile  → 2 books

       Carousel automatically recalculate hoga.
    ---------------------------------------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            visibleBooks = getVisibleBooks();

            updateArchive();
        }
    );


    /* ----------------------------------------------------------------------
       INITIALIZE ARCHIVE

       Page load hote hi carousel ko correct position par set karna.
    ---------------------------------------------------------------------- */

    visibleBooks = getVisibleBooks();

    currentIndex = 0;

    updateArchive();


});


/* ==========================================================================

   END — LITERARY ARCHIVE CAROUSEL JAVASCRIPT

   NEXT:
   - Archive cards ka content/images baad mein easily change kiya ja sakta hai.
   - Previous / Next movement isi section se control hoti hai.
   - Responsive behaviour bhi isi code se handle ho raha hai.

========================================================================== */
