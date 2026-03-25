document.addEventListener("components:ready", () => {
    const breadcrumb = document.getElementById("subpage-breadcrumb");
    if (breadcrumb) {
        const value = document.body.getAttribute("data-breadcrumb");
        if (value && value.trim()) {
            breadcrumb.textContent = value;
        }
    }

    // ========== BPO Diagram Lightbox Logic ==========
    const diagram = document.querySelector(".provision-diagram");
    const lightbox = document.getElementById("diagram-lightbox");
    const container = document.getElementById("lightbox-container");
    const closeBtn = document.querySelector(".lightbox-close");
    const backdrop = document.querySelector(".lightbox-backdrop");

    if (diagram && lightbox && container) {
        diagram.addEventListener("click", () => {
            // Only trigger on mobile screens (< 900px)
            if (window.innerWidth > 900) return;

            // Clone the diagram
            const clone = diagram.cloneNode(true);
            
            // Clear and inject
            container.innerHTML = "";
            container.appendChild(clone);

            // Show lightbox
            lightbox.classList.add("is-active");
            document.body.style.overflow = "hidden";
        });

        const closeLightbox = () => {
            lightbox.classList.remove("is-active");
            document.body.style.overflow = "";
            setTimeout(() => { container.innerHTML = ""; }, 300); // Clean up after fade out
        };

        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
        if (backdrop) backdrop.addEventListener("click", closeLightbox);
        
        // Close on Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
                closeLightbox();
            }
        });
    }
});
