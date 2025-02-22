let year = 0; // initial year
let month = 0;   // initial month

function adjustYear(change) {
    if (year + change >= 0) {  
        year += change;
        document.getElementById('year').innerText = year;
        saveToLocalStorage();
    }
}

function adjustMonth(change) {
    month += change;
    if (month > 12) {
        month = 1;
        adjustYear(1);
    } else if (month < 1) {
        month = 12;
        adjustYear(-1);
    }
    document.getElementById('month').innerText = month;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    
    if (!localStorage.getItem('selectedStartDate') && !localStorage.getItem('selectedEndDate')) {
        localStorage.setItem('selectedYears', year);
        localStorage.setItem('selectedMonths', month);
    }
}


function disableDates() {
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    localStorage.removeItem('selectedStartDate');
    localStorage.removeItem('selectedEndDate');
}

document.getElementById('year').innerText = year;
document.getElementById('month').innerText = month;