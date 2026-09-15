"use strict";

const aboutData = window.literaryHonorsAbout;

const escapeAboutText = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

const renderAboutPage = () => {
    if (!aboutData) {
        return;
    }

    const purposeCopy = document.querySelector("#purpose-copy");
    const storyBody = document.querySelector("#story-body");
    const founderDetails = document.querySelector("#founder-details");
    const valuesGrid = document.querySelector("#values-grid");
    const peopleGrid = document.querySelector("#people-grid");
    const standardsGrid = document.querySelector("#standards-grid");
    const journeyTimeline = document.querySelector("#journey-timeline");
    const commitmentList = document.querySelector("#commitment-list");
    const futureBody = document.querySelector("#future-body");

    if (purposeCopy) {
        purposeCopy.innerHTML = `
            ${aboutData.purpose.paragraphs.map((paragraph) => `<p>${escapeAboutText(paragraph)}</p>`).join("")}
            <blockquote>“${escapeAboutText(aboutData.purpose.quote)}”</blockquote>
        `;
    }

    if (storyBody) {
        storyBody.innerHTML = `
            <p class="copy-status">${escapeAboutText(aboutData.story.status)}</p>
            ${aboutData.story.paragraphs.map((paragraph) => `<p>${escapeAboutText(paragraph)}</p>`).join("")}
        `;
    }

    if (founderDetails) {
        founderDetails.innerHTML = `
            <p class="founder-name">${escapeAboutText(aboutData.founder.name)}</p>
            <p class="founder-title">${escapeAboutText(aboutData.founder.title)}</p>
            <p class="founder-biography">${escapeAboutText(aboutData.founder.biography)}</p>
            <blockquote><span aria-hidden="true">“</span>${escapeAboutText(aboutData.founder.quote)}</blockquote>
        `;
    }

    if (valuesGrid) {
        valuesGrid.innerHTML = aboutData.values
            .map(
                (value, index) => `
                    <article class="value-item" data-reveal="up" style="transition-delay: ${index * 90}ms">
                        <span class="value-number">${escapeAboutText(value.number)}</span>
                        <span class="value-rule" aria-hidden="true"></span>
                        <h3>${escapeAboutText(value.title)}</h3>
                        <p>${escapeAboutText(value.description)}</p>
                    </article>
                `
            )
            .join("");
    }

    if (peopleGrid) {
        peopleGrid.innerHTML = aboutData.peopleGroups
            .map(
                (group, index) => `
                    <article class="people-group" data-reveal="up" style="transition-delay: ${index * 100}ms">
                        <span aria-hidden="true">0${index + 1}</span>
                        <h3>${escapeAboutText(group.title)}</h3>
                        <p>${escapeAboutText(group.description)}</p>
                    </article>
                `
            )
            .join("");
    }

    if (standardsGrid) {
        standardsGrid.innerHTML = aboutData.standards
            .map(
                (principle, index) => `
                    <article class="standard-item" data-reveal="up" style="transition-delay: ${index * 100}ms">
                        <span aria-hidden="true">0${index + 1}</span>
                        <h3>${escapeAboutText(principle.title)}</h3>
                        <p>${escapeAboutText(principle.description)}</p>
                    </article>
                `
            )
            .join("");
    }

    if (journeyTimeline) {
        journeyTimeline.innerHTML = aboutData.timeline
            .map(
                (milestone, index) => `
                    <article class="journey-item ${index % 2 === 0 ? "journey-item-left" : "journey-item-right"}" data-reveal="up">
                        <span class="journey-dot" aria-hidden="true"></span>
                        <div class="journey-year">${escapeAboutText(milestone.year)}</div>
                        <div class="journey-content">
                            <h3>${escapeAboutText(milestone.title)}</h3>
                            <p>${escapeAboutText(milestone.description)}</p>
                        </div>
                    </article>
                `
            )
            .join("");
    }

    if (commitmentList) {
        commitmentList.innerHTML = aboutData.commitments
            .map(
                (commitment, index) => `
                    <article class="commitment-item" data-reveal="right" style="transition-delay: ${index * 80}ms">
                        <span>${escapeAboutText(commitment.number)}</span>
                        <div>
                            <h3>${escapeAboutText(commitment.title)}</h3>
                            <p>${escapeAboutText(commitment.description)}</p>
                        </div>
                    </article>
                `
            )
            .join("");
    }

    if (futureBody) {
        futureBody.textContent = aboutData.future;
    }
};

renderAboutPage();
