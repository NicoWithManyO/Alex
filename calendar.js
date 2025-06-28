// Module Calendrier
const Calendar = (function() {
    let currentDate = new Date();
    let daysGenerated = 0;
    const daysToGenerate = 30;
    const container = document.getElementById('calendar-container');
    let observer;
    let startOffset = -7; // Afficher 7 jours avant la date de départ

    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    function formatDate(date) {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2);
        const dayOfWeek = daysOfWeek[date.getDay()];
        
        return {
            dayOfWeek: dayOfWeek,
            fullDate: `${day} ${month} ${year}`
        };
    }
    
    function createDayElement(date) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-row';

        // Ajout de la classe today-row si c'est aujourd'hui
        const today = new Date();
        today.setHours(0,0,0,0);
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0,0,0,0);
        if (dateToCheck.getTime() === today.getTime()) {
            dayDiv.classList.add('today-row');
        }

        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = Dimanche, 6 = Samedi
            dayDiv.classList.add('weekend');
        }

        const formattedDate = formatDate(date);
        dayDiv.textContent = `${formattedDate.dayOfWeek} ${formattedDate.fullDate}`;
        
        // Rend la ligne cliquable pour ouvrir la modale
        dayDiv.style.cursor = 'pointer';
        dayDiv.addEventListener('click', () => {
            document.getElementById('date-modal').style.display = 'flex';
            document.getElementById('date-input').focus();
        });
        
        return dayDiv;
    }
    
    function generateDays(count) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + daysGenerated + startOffset + i);
            fragment.appendChild(createDayElement(date));
        }
        daysGenerated += count;
        container.appendChild(fragment);
        document.dispatchEvent(new Event('calendarUpdated'));
    }
    
    function init() {
        // On récupère la colonne parente qui est maintenant le conteneur de défilement.
        const scrollRootElement = container.closest('.column');

        const observerOptions = {
            root: scrollRootElement, // On utilise la colonne comme "vue" pour l'observateur.
            rootMargin: '300px',
            threshold: 0,
        };

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);
                generateDays(daysToGenerate);
            }
        }, observerOptions);

        generateDays(daysToGenerate);
    }
    
    function setStartDate(date) {
        if (observer) observer.disconnect();
        currentDate = new Date(date);
        daysGenerated = 0;
        container.innerHTML = '';
        startOffset = -7; // Toujours 7 jours avant la date demandée
        generateDays(daysToGenerate);
    }

    // Après chaque mise à jour, on observe le nouvel dernier élément.
    document.addEventListener('calendarUpdated', () => {
        if (container.lastChild) {
            observer.observe(container.lastChild);
        }
    });
    
    function getCurrentDaysCount() {
        return daysGenerated;
    }
    
    function getDateForDay(dayIndex) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + dayIndex + startOffset);
        return date;
    }
    
    return {
        init,
        setStartDate,
        getCurrentDaysCount,
        getDateForDay,
    };
})(); 