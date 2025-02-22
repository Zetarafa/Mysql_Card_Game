document.addEventListener("DOMContentLoaded", function () {
    fetch("get_cardsn.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cards-container");
            const selectedCardsContainer = document.querySelector(".selected-cards");

            if (!container || !selectedCardsContainer) {
                console.error("Error: One of the containers was not found in the DOM");
                return;
            }

            // 🔹 Load previously selected cards from all categories
            let selectedCardsPlatform = JSON.parse(localStorage.getItem("selectedCardsPlatform")) || [];
            let selectedCardsNewOld = JSON.parse(localStorage.getItem("selectedCardsNewOld")) || [];
            let selectedCardsGegner = JSON.parse(localStorage.getItem("selectedCardsGegner")) || [];
            let selectedCardsWorkers = JSON.parse(localStorage.getItem("selectedCardsWorkers")) || [];

            let allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

            /** 🔹 Update mini-cards display */
            function updateSelectedCards() {
                selectedCardsContainer.innerHTML = ""; // Clear before updating

                allSelectedCards.forEach((card, index) => {
                    const miniCard = document.createElement("div");
                    miniCard.classList.add("mini-card");
                    miniCard.style.backgroundImage = `url(${card.artwork})`;
                    miniCard.innerHTML = `<p>${card.name}</p>`;

                    // 🔹 Arrange in a fan layout
                    const offset = index * 5;
                    miniCard.style.transform = `translate(${offset - 30}px, 10px) rotate(${offset / 15}deg)`;

                    // 🔹 Click to remove the mini-card and deselect it from all pages
                    miniCard.addEventListener("click", function () {
                        removeCard(card.id);
                    });

                    selectedCardsContainer.appendChild(miniCard);
                });
            }

            /** 🔹 Remove a card from selection */
            function removeCard(cardId) {
                selectedCardsPlatform = selectedCardsPlatform.filter(c => c.id !== cardId);
                selectedCardsNewOld = selectedCardsNewOld.filter(c => c.id !== cardId);
                selectedCardsGegner = selectedCardsGegner.filter(c => c.id !== cardId);
                selectedCardsWorkers = selectedCardsWorkers.filter(c => c.id !== cardId);

                // 🔹 Save changes in localStorage
                localStorage.setItem("selectedCardsPlatform", JSON.stringify(selectedCardsPlatform));
                localStorage.setItem("selectedCardsNewOld", JSON.stringify(selectedCardsNewOld));
                localStorage.setItem("selectedCardsGegner", JSON.stringify(selectedCardsGegner));
                localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));

                allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                updateSelectedCards();
                updateMainCards();
            }

            /** 🔹 Update main card appearance */
            function updateMainCards() {
                document.querySelectorAll(".card").forEach(card => {
                    const cardId = card.dataset.id;
                    if (selectedCardsNewOld.some(c => c.id == cardId)) {
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

            /** 🔹 Load cards from database and allow selection */
            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.dataset.id = card.id;
                cardElement.dataset.category = "NewOld"; // Assign category
                cardElement.innerHTML = `
                    
                        <div class="card" style="background-image: url('${card.artwork}')">
                            <div class="header">
                                <h2>${card.name}</h2>
                            </div>
                        </div>
                    
                `;
                // Restore previously selected card
                if (selectedCardsNewOld.some(c => c.id == card.id)) {
                    cardElement.classList.add("selected");
                }

                // 🔹 Click event to select only one card at a time
                cardElement.addEventListener("click", function () {
                    selectedCardsNewOld = [{ ...card, category: "NewOld" }]; // Store only one card

                    // Remove "selected" class from all NewOld cards
                    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));

                    // Highlight only the newly selected card
                    cardElement.classList.add("selected");

                    // Save to localStorage
                    localStorage.setItem("selectedCardsNewOld", JSON.stringify(selectedCardsNewOld));

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
