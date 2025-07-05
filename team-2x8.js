// Module Équipe 2x8
const Team2x8 = (function() {
    const container = document.getElementById('team-2x8-container');
    let currentDaysCount = 0;

    // Date de référence fixe : 30 juin 2025 (lundi) = MATIN
    const REFERENCE_DATE = new Date(2025, 5, 30); // 30 juin 2025 (mois 0-indexé)

    // Helper pour obtenir un ID unique pour une semaine (basé sur son lundi de départ)
    function getWeekId(date) {
        const d = new Date(date);
        const day = d.getDay(); // Dimanche = 0, Lundi = 1, etc.
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Revenir au lundi
        d.setDate(diff);
        d.setHours(0, 0, 0, 0); // Normaliser l'heure
        return d.getTime();
    }

    function getShiftForDay(dayIndex) {
        const date = Calendar.getDateForDay(dayIndex);
        const dayOfWeek = date.getDay(); // 0 pour Dimanche, 6 pour Samedi

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return 'Repos';
        }

        // Calculer la différence de semaines par rapport à la référence fixe
        const referenceWeekId = getWeekId(REFERENCE_DATE);
        const currentWeekId = getWeekId(date);

        const weekInMillis = 7 * 24 * 60 * 60 * 1000;
        const weekDifference = Math.round((currentWeekId - referenceWeekId) / weekInMillis);

        // Semaine de référence (30 juin 2025) = MATIN
        // Alternance : pair = MATIN, impair = APRÈS-MIDI
        if (weekDifference % 2 === 0) {
            return 'Matin';
        } else {
            return 'Après-Midi';
        }
    }

    function createShiftElement(shift) {
        const shiftDiv = document.createElement('div');
        let className = shift.toLowerCase().replace('après-midi', 'apres-midi');
        shiftDiv.className = `team-2x8-shift shift-${className}`;

        const abbreviations = {
            'Matin': 'M',
            'Après-Midi': 'AM',
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
        // Au lieu d'écouter le scroll, on écoute l'événement personnalisé du calendrier.
        // C'est plus propre et évite les conflits.
        document.addEventListener('calendarUpdated', updateShifts);
    }

    return {
        init: init,
        reset: reset
    };
})();
