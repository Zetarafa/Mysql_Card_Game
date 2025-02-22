
document.addEventListener('DOMContentLoaded', () => {
    // Clean localStorage
    localStorage.removeItem('selectedYears');
    localStorage.removeItem('selectedMonths');
    localStorage.removeItem('selectedStartDate');
    localStorage.removeItem('selectedEndDate');
});
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.classList.contains('zeitraum') ? 'zeitraum' : 'datum';

    if (currentPage === 'zeitraum') {
        
        localStorage.removeItem('selectedStartDate');
        localStorage.removeItem('selectedEndDate');
    } else if (currentPage === 'datum') {
        
        localStorage.removeItem('selectedYears');
        localStorage.removeItem('selectedMonths');
    }
    
});
