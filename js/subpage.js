document.addEventListener("components:ready", () => {
    const breadcrumb = document.getElementById("subpage-breadcrumb");
    if (!breadcrumb) return;

    const value = document.body.getAttribute("data-breadcrumb");
    if (value && value.trim()) {
        breadcrumb.textContent = value;
    }
});
