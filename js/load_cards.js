document.addEventListener("DOMContentLoaded", function () {
    fetch("get_cards.php") 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cards-container");
            container.innerHTML = ""; 

            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.innerHTML = `
                    
                        <div class="card" style="background-image: url('${card.artwork}')">
                            <div class="header">
                                <h2>${card.name}</h2>
                            </div>
                            <div class="description">${card.description}</div>
                            <div class="attribute">
                                ${card.strength} <br> <span>Fuerza</span>
                            </div>
                            <div class="attribute">
                                ⚡ ${card.energy_cost} <br> <span>Costo de Energía</span>
                            </div>
                        </div>
                    
                `;
                container.appendChild(cardElement);
            });
        })
        .catch(error => console.error("Fehler beim Laden der Karten:", error));
});
