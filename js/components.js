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
        document.dispatchEvent(new CustomEvent("components:ready"));
    });
});

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
