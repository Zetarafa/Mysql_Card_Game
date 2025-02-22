

function saveDatesToLocalStorage() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
       
        if (new Date(startDate) > new Date(endDate)) {
            alert("Das Startdatum muss vor dem Enddatum liegen.");
            return;
        }

        localStorage.setItem('selectedStartDate', startDate);
        localStorage.setItem('selectedEndDate', endDate);

        
        localStorage.removeItem('selectedYears');
        localStorage.removeItem('selectedMonths');
        alert("Termine wurden erfolgreich gespeichert.");
    } else {
        alert("Bitte wählen Sie beide Termine aus.");
    }
}


function disableDuration() {
    localStorage.removeItem('selectedYears');
    localStorage.removeItem('selectedMonths');
    document.getElementById('year').innerText = 0;
    document.getElementById('month').innerText = 0;
}


function handleWeiter() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        
        localStorage.setItem('selectedStartDate', startDate);
        localStorage.setItem('selectedEndDate', endDate);

        location.href = 'selectedCardsGegner.html';
    } else {
        alert("Bitte wählen Sie beide Termine aus.");
    }
}

