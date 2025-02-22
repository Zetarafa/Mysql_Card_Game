document.addEventListener("DOMContentLoaded", function () {
    fetch("get_cardsp.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cards-container");
            const selectedContainer = document.querySelector(".selected-cards");

            if (!container || !selectedContainer) {
                console.error("Error: One of the containers was not found in the DOM");
                return;
            }

            // 🔹 Load selected cards from all categories
            let selectedCardsPlatform = JSON.parse(localStorage.getItem("selectedCardsPlatform")) || [];
            let selectedCardsNewOld = JSON.parse(localStorage.getItem("selectedCardsNewOld")) || [];
            let selectedCardsGegner = JSON.parse(localStorage.getItem("selectedCardsGegner")) || [];
            let selectedCardsWorkers = JSON.parse(localStorage.getItem("selectedCardsWorkers")) || [];

            let allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

            /** 🔹 Update mini-cards display */
            function updateSelectedCards() {
                selectedContainer.innerHTML = ""; // Clear before updating

                allSelectedCards.forEach((card, index) => {
                    const miniCard = document.createElement("div");
                    miniCard.classList.add("mini-card");
                    miniCard.style.backgroundImage = `url(${card.artwork})`;
                    miniCard.innerHTML = `<p>${card.name}</p>`;

                    // 🔹 Arrange in a fan layout
                    const offset = index * 8;
                    miniCard.style.transform = `translate(${offset - 30}px, 10px) rotate(${offset / 15}deg)`;

                    // 🔹 Click to remove the mini-card and deselect it from all pages
                    miniCard.addEventListener("click", function () {
                        removeCard(card.id);
                    });

                    selectedContainer.appendChild(miniCard);
                });
            }

            /** 🔹 Remove a card from selection */
            function removeCard(cardId) {
                // 🔹 Remove the card from all categories
                selectedCardsPlatform = selectedCardsPlatform.filter(c => c.id !== cardId);
                selectedCardsNewOld = selectedCardsNewOld.filter(c => c.id !== cardId);
                selectedCardsGegner = selectedCardsGegner.filter(c => c.id !== cardId);
                selectedCardsWorkers = selectedCardsWorkers.filter(c => c.id !== cardId);

                // 🔹 Save changes in localStorage
                localStorage.setItem("selectedCardsPlatform", JSON.stringify(selectedCardsPlatform));
                localStorage.setItem("selectedCardsNewOld", JSON.stringify(selectedCardsNewOld));
                localStorage.setItem("selectedCardsGegner", JSON.stringify(selectedCardsGegner));
                localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));

                // 🔹 Refresh `allSelectedCards`
                allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                updateSelectedCards(); // Refresh mini-cards
                updateMainCards(); // Refresh main cards
            }

            /** 🔹 Update main card appearance */
            function updateMainCards() {
                document.querySelectorAll(".card").forEach(card => {
                    const cardId = card.dataset.id;
                    if (selectedCardsPlatform.some(c => c.id == cardId)) {
                        card.classList.add("selected");
                        card.style.opacity = "0.5";
                        card.style.transform = "scale(0.85)";
                    } else {
                        card.classList.remove("selected");
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }
                });
            }

            /** 🔹 Load the cards and enable selection */
            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.dataset.id = card.id;
                cardElement.style.backgroundImage = `url('${card.artwork}')`;

                if (selectedCardsPlatform.some(c => c.id == card.id)) {
                    cardElement.classList.add("selected");
                }

                cardElement.addEventListener("click", function () {
                    const index = selectedCardsPlatform.findIndex(c => c.id == card.id);
                    if (index > -1) {
                        removeCard(card.id);
                    } else {
                        selectedCardsPlatform.push(card);
                        cardElement.classList.add("selected");
                    }
                    localStorage.setItem("selectedCardsPlatform", JSON.stringify(selectedCardsPlatform));

                    allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                    updateSelectedCards();
                    updateMainCards();
                });

                container.appendChild(cardElement);
            });

            /** 🔹 Initial update */
            updateSelectedCards();
            updateMainCards();
        })
        .catch(error => console.error("Error loading cards:", error));
});
