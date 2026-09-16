"use strict";

/* =========================================================
   SITE PATHS
   index.html sits at the site root and the other pages live
   one level down in /pages, so any path a script builds has
   to be resolved against the root rather than the document.
   Pages in a sub-folder declare their depth with
   <html data-base="../">; sitePath() applies it.
   ========================================================= */

window.SITE_BASE = document.documentElement.dataset.base || "";

window.sitePath = function sitePath(path) {
    if (typeof path !== "string" || path === "") return path;
    // absolute URLs, root-relative paths and fragments are already resolved
    if (/^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(path)) return path;
    return window.SITE_BASE + path;
};
