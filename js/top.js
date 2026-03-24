document.addEventListener("components:ready", () => {
    const mission = document.querySelector(".mission-overlay");
    if (!mission) return;

    mission.style.opacity = "0";
    mission.style.transform = "translateY(20px)";
    mission.style.transition = "opacity 500ms ease, transform 500ms ease";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            mission.style.opacity = "1";
            mission.style.transform = "translateY(0)";
            observer.disconnect();
        });
    }, { threshold: 0.2 });

    observer.observe(mission);
});
