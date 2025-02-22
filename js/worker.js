/*document.addEventListener("DOMContentLoaded", function () {
    fetch("get_cardsw.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cards-container");
            const selectedContainer = document.querySelector(".selected-cards");

            if (!container || !selectedContainer) {
                console.error("Error: No se encontró uno de los contenedores en el DOM");
                return;
            }

            // 🔹 Cargar cartas seleccionadas de localStorage
            let selectedCardsWorkers = JSON.parse(localStorage.getItem("selectedCardsWorkers")) || [];
            let selectedCardsPlatform = JSON.parse(localStorage.getItem("selectedCardsPlatform")) || [];
            let selectedCardsNewOld = JSON.parse(localStorage.getItem("selectedCardsNewOld")) || [];
            let selectedCardsGegner = JSON.parse(localStorage.getItem("selectedCardsGegner")) || [];

            let allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

            // 🔹 Función para actualizar las mini-cartas 
            function updateSelectedCards() {
                selectedContainer.innerHTML = ""; // Limpiar antes de actualizar

                allSelectedCards.forEach((card, index) => {
                    const miniCard = document.createElement("div");
                    miniCard.classList.add("mini-card");
                    miniCard.style.backgroundImage = `url(${card.artwork})`;
                    miniCard.innerHTML = `<p>${card.name}</p>`;

                    // 🔹 Posicionar en abanico
                    const offset = index * 8;
                    miniCard.style.transform = `translate(${offset - 30}px, 10px) rotate(${offset / 15}deg)`;

                    // 🔹 Click para eliminar la mini-carta
                    miniCard.addEventListener("click", function () {
                        removeCard(card.id);
                    });

                    selectedContainer.appendChild(miniCard);
                });
            }

            // 🔹 Función para eliminar una carta según su categoría 
            function removeCard(cardId) {
                // 🔹 Buscar la carta en todas las categorías y eliminarla correctamente
                selectedCardsWorkers = selectedCardsWorkers.filter(c => c.id !== cardId);
                selectedCardsPlatform = selectedCardsPlatform.filter(c => c.id !== cardId);
                selectedCardsNewOld = selectedCardsNewOld.filter(c => c.id !== cardId);
                selectedCardsGegner = selectedCardsGegner.filter(c => c.id !== cardId);

                // 🔹 Guardar los cambios en localStorage
                localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));
                localStorage.setItem("selectedCardsPlatform", JSON.stringify(selectedCardsPlatform));
                localStorage.setItem("selectedCardsNewOld", JSON.stringify(selectedCardsNewOld));
                localStorage.setItem("selectedCardsGegner", JSON.stringify(selectedCardsGegner));

                // 🔹 Volver a generar `allSelectedCards` sin la carta eliminada
                allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                updateSelectedCards(); // Actualizar mini-cartas
                updateMainCards(); // Actualizar cartas grandes
            }

            // 🔹 Función para actualizar la apariencia de las cartas principales 
            function updateMainCards() {
                document.querySelectorAll(".card").forEach(card => {
                    const cardId = card.dataset.id;
                    if (selectedCardsWorkers.some(c => c.id == cardId)) {
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

            // 🔹 Cargar cartas y permitir la selección 
            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.dataset.id = card.id;
                cardElement.innerHTML = `
                    
                        <div class="card" style="background-image: url('${card.artwork}')">
                            <div class="header">
                                <h2>${card.name}</h2>
                            </div>
                            <div class="description">${card.description}</div>
                            <div class="attribute">
                                ${card.strength} <br> <span>Force</span>
                            </div>
                            <div class="attribute">
                                ⚡ ${card.energy_cost} <br> <span>Cost</span>
                            </div>
                        </div>
                    
                `;


                if (selectedCardsWorkers.some(c => c.id == card.id)) {
                    cardElement.classList.add("selected");
                }

                cardElement.addEventListener("click", function () {
                    const index = selectedCardsWorkers.findIndex(c => c.id == card.id);
                    if (index > -1) {
                        removeCard(card.id);
                    } else {
                        selectedCardsWorkers.push(card);
                        cardElement.classList.add("selected");
                    }
                    localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));

                    allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                    updateSelectedCards();
                    updateMainCards();
                });

                container.appendChild(cardElement);
            });

            // 🔹 Ejecutar la actualización inicial de mini-cartas 
            updateSelectedCards();
            updateMainCards();
        })
        .catch(error => console.error("Fehler beim Aufladen der Karten:", error));

        //  Manejo del tiempo
        const timeContainer = document.querySelector(".time");
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
});*/
document.addEventListener("DOMContentLoaded", function () {
    fetch("get_cardsw.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cards-container");
            const selectedContainer = document.querySelector(".selected-cards");

            if (!container || !selectedContainer) {
                console.error("Error: One of the containers was not found in the DOM.");
                return;
            }

            let selectedCardsWorkers = JSON.parse(localStorage.getItem("selectedCardsWorkers")) || [];
            let selectedCardsPlatform = JSON.parse(localStorage.getItem("selectedCardsPlatform")) || [];
            let selectedCardsNewOld = JSON.parse(localStorage.getItem("selectedCardsNewOld")) || [];
            let selectedCardsGegner = JSON.parse(localStorage.getItem("selectedCardsGegner")) || [];

            let allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

            /** 🔹 Function to update the mini-card display */
            function updateSelectedCards() {
                selectedContainer.innerHTML = "";

                allSelectedCards.forEach((card, index) => {
                    const miniCard = document.createElement("div");
                    miniCard.classList.add("mini-card");
                    miniCard.style.backgroundImage = `url(${card.artwork})`;
                    miniCard.innerHTML = `<p>${card.name}</p>`;

                    const offset = index * 8;
                    miniCard.style.transform = `translate(${offset - 30}px, 10px) rotate(${offset / 15}deg)`;

                    miniCard.addEventListener("click", function () {
                        removeCard(card.id);
                    });

                    selectedContainer.appendChild(miniCard);
                });
            }

            /** 🔹 Function to remove a card */
            function removeCard(cardId) {
                selectedCardsWorkers = selectedCardsWorkers.filter(c => c.id !== cardId);
                localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));

                allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                updateSelectedCards();
                updateMainCards();
            }

            /** 🔹 Function to update main cards' appearance */
            function updateMainCards() {
                document.querySelectorAll(".card").forEach(card => {
                    const cardId = card.dataset.id;
                    if (selectedCardsWorkers.some(c => c.id == cardId)) {
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

            /** 🔹 Load cards and apply flip effect for workers */
            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card", "flip-container");
                cardElement.dataset.id = card.id;

                cardElement.innerHTML = `
                    <div class="flip-card-inner">
                        <div class="card-front" style="background-image: url('${card.artwork}')">
                            <div class="header"><h2>${card.name}</h2></div>
                        </div>
                        <div class="card-back" style="background-image: url('${card.back_artwork}')">
                            <p>${card.back_description}</p>
                        </div>
                    </div>
                `;

                if (selectedCardsWorkers.some(c => c.id == card.id)) {
                    cardElement.classList.add("selected");
                }

                cardElement.addEventListener("click", function () {
                    const index = selectedCardsWorkers.findIndex(c => c.id == card.id);
                    if (index > -1) {
                        removeCard(card.id);
                    } else {
                        selectedCardsWorkers.push(card);
                        cardElement.classList.add("selected");
                    }
                    localStorage.setItem("selectedCardsWorkers", JSON.stringify(selectedCardsWorkers));

                    allSelectedCards = [...selectedCardsPlatform, ...selectedCardsNewOld, ...selectedCardsGegner, ...selectedCardsWorkers];

                    updateSelectedCards();
                    updateMainCards();
                });

                container.appendChild(cardElement);
            });

            updateSelectedCards();
            updateMainCards();
        })
        .catch(error => console.error("Error loading worker cards:", error));

        //  Manejo del tiempo
        const timeContainer = document.querySelector(".time");
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

