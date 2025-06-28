// Module Équipe 5x8
const Team5x8 = (function() {
    const container = document.getElementById('team-5x8-container');
    let currentDaysCount = 0;
    
    // Cycle 5x8 classique sur 10 jours
    const cycle = ['Matin', 'Matin', 'Après-Midi', 'Après-Midi', 'Nuit', 'Nuit', 'Repos', 'Repos', 'Repos', 'Repos'];
    const cycleLength = cycle.length;
    // Date de référence : 20/06/2025 = Premier Matin
    const referenceDate = new Date(2025, 5, 20); // Mois 5 = Juin (0-indexé)
    const referenceShift = 'Matin'; // Pour clarté

    function getShiftForDay(dayIndex) {
        // On récupère la date du jour à afficher
        const date = Calendar.getDateForDay(dayIndex);
        // Calcul du nombre de jours entre la date de référence et la date courante
        const diffTime = date.setHours(0,0,0,0) - referenceDate.setHours(0,0,0,0);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        // On trouve l'index dans le cycle
        const cycleIndex = ((diffDays % cycleLength) + cycleLength) % cycleLength;
        return cycle[cycleIndex];
    }
    
    function createShiftElement(shift) {
        const shiftDiv = document.createElement('div');
        let className = shift.toLowerCase().replace('après-midi', 'apres-midi');
        shiftDiv.className = `team-5x8-shift shift-${className}`;
        
        const abbreviations = {
            'Matin': 'M',
            'Après-Midi': 'AM',
            'Nuit': 'N',
            'Repos': 'R'
        };
        const shortText = abbreviations[shift] || shift;

        shiftDiv.innerHTML = `<span class="full-text">${shift}</span><span class="short-text">${shortText}</span>`;
        return shiftDiv;
    }
    
    function createDayRow(dayIndex) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-row';
        
        // Ajout de la classe today-row si la date correspond à aujourd'hui
        const date = Calendar.getDateForDay(dayIndex);
        const today = new Date();
        today.setHours(0,0,0,0);
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0,0,0,0);
        if (dateToCheck.getTime() === today.getTime()) {
            dayDiv.classList.add('today-row');
        }

        const shift = getShiftForDay(dayIndex);
        const shiftElement = createShiftElement(shift);
        
        dayDiv.appendChild(shiftElement);
        return dayDiv;
    }
    
    function generateShifts(count) {
        for (let i = 0; i < count; i++) {
            const dayElement = createDayRow(currentDaysCount + i);
            container.appendChild(dayElement);
        }
        currentDaysCount += count;
    }
    
    function updateShifts() {
        const calendarDaysCount = Calendar.getCurrentDaysCount();
        const neededDays = calendarDaysCount - currentDaysCount;
        
        if (neededDays > 0) {
            generateShifts(neededDays);
        }
    }
    
    function reset() {
        container.innerHTML = '';
        currentDaysCount = 0;
    }
    
    function init() {
        // On écoute l'événement personnalisé du calendrier pour se mettre à jour.
        document.addEventListener('calendarUpdated', updateShifts);
    }
    
    return {
        init: init,
        reset: reset
    };
})(); 