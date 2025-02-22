document.addEventListener("DOMContentLoaded", function () {
    const selectedCardsContainer = document.getElementById("selected-cards");
    const timeContainer = document.querySelector(".time");
    let allSelectedCards = [
        ...JSON.parse(localStorage.getItem("selectedCardsPlatform") || "[]"),
        ...JSON.parse(localStorage.getItem("selectedCardsNewOld") || "[]"),
        ...JSON.parse(localStorage.getItem("selectedCardsGegner") || "[]"),
        ...JSON.parse(localStorage.getItem("selectedCardsWorkers") || "[]")
    ];

    allSelectedCards.forEach(card => {
        const miniCard = document.createElement("div");
        miniCard.classList.add("mini-card");
        miniCard.style.backgroundImage = `url(${card.artwork})`;
        miniCard.innerHTML = `<p>${card.name}</p>`;

        // Click para eliminar la carta antes de enviar
        miniCard.addEventListener("click", function () {
            allSelectedCards = allSelectedCards.filter(c => c.id !== card.id);
            localStorage.setItem("selectedCardsPlatform", JSON.stringify(allSelectedCards.filter(c => c.category === "Platform")));
            localStorage.setItem("selectedCardsNewOld", JSON.stringify(allSelectedCards.filter(c => c.category === "NewOld")));
            localStorage.setItem("selectedCardsGegner", JSON.stringify(allSelectedCards.filter(c => c.category === "Gegner")));
            localStorage.setItem("selectedCardsWorkers", JSON.stringify(allSelectedCards.filter(c => c.category === "Worker")));
            miniCard.remove();
        });

        selectedCardsContainer.appendChild(miniCard);
    });

    function updateTimeDisplay() {
        if (!timeContainer) return;
        timeContainer.innerHTML = "";

        const sphere = document.createElement("div");
        sphere.classList.add("sphere2");
        const subtitle = document.createElement("div");
        subtitle.classList.add("duration-subtitle");

        const years = parseInt(localStorage.getItem("selectedYears"), 10) || 0;
        const months = parseInt(localStorage.getItem("selectedMonths"), 10) || 0;
        const startDate = localStorage.getItem("selectedStartDate");
        const endDate = localStorage.getItem("selectedEndDate");

        if (startDate && endDate) {
            subtitle.innerHTML = `VON: <a href='./time.html'>${startDate}</a> BIS: <a href='./time.html'>${endDate}</a>`;
        } else if (years > 0 || months > 0) {
            subtitle.innerHTML = `DAUER: <a href='./time.html'>${years} JAHRE, ${months} MONATE</a>`;
        } else {
            subtitle.innerHTML = "<a href='./time.html'>KEINE DAUER ANGEGEBEN.</a>";
        }

        sphere.appendChild(subtitle);
        timeContainer.appendChild(sphere);
    }
    updateTimeDisplay();
});
