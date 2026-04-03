document.addEventListener("DOMContentLoaded", () => {
    const targets = [
        { id: "global-header", path: "components/header.html" },
        { id: "subpage-hero", path: "components/subpage-hero.html" },
        { id: "global-footer", path: "components/footer.html" }
    ];

    const activeTargets = targets.filter(({ id }) => document.getElementById(id));

    Promise.all(
        activeTargets.map(({ id, path }) =>
            fetch(path)
                .then((response) => response.text())
                .then((markup) => {
                    const element = document.getElementById(id);
                    if (element) element.innerHTML = markup;
                })
        )
    ).then(() => {
        initMobileMenu();
        highlightActiveLink();
        document.dispatchEvent(new CustomEvent("components:ready"));
    });
});

function highlightActiveLink() {
    const desktopLinks = document.querySelectorAll(".desktop-nav-links a");
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";

    desktopLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentFile) {
            link.classList.add("active");
            
            // If the link is inside a dropdown, highlight the parent too
            const parentDropdown = link.closest(".nav-item.has-dropdown");
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector("> a");
                if (parentLink) parentLink.classList.add("active");
            }
        }
    });

    // Special case for subpages if needed (e.g. column detail pages)
    if (currentFile.startsWith("column-") || currentFile.includes("column_detail")) {
        const columnLink = document.querySelector('.desktop-nav-links a[href="columns.html"]');
        if (columnLink) columnLink.classList.add("active");
    }
    
    if (currentFile.startsWith("news-") || currentFile.includes("news_detail") || currentFile === "news.html") {
        const newsLink = document.querySelector('.desktop-nav-links a[href="news.html"]');
        if (newsLink) newsLink.classList.add("active");
    }

    if (currentFile === "purpose.html" || currentFile === "features.html" || currentFile === "company.html") {
        const companyLink = document.querySelector('.desktop-nav-links a[href="company.html"]');
        if (companyLink) companyLink.classList.add("active");
    }
}

function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const closeBtn = document.querySelector(".menu-close");
    if (!toggle || !nav) return;

    function openMenu() {
        nav.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }

    // Close when tapping the dim backdrop
    nav.addEventListener("click", (e) => {
        if (e.target === nav || e.target === nav.querySelector("::before")) {
            closeMenu();
        }
    });
}
