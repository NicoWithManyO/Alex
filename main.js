// Fichier principal - Initialisation et synchronisation
document.addEventListener('DOMContentLoaded', function() {
    Team2x8.init();
    Team5x8.init();
    Calendar.init();

    // La logique de synchronisation est maintenant toujours active.
    const calendarContainer = document.getElementById('calendar-container');
    const team2x8Container = document.getElementById('team-2x8-container');
    const team5x8Container = document.getElementById('team-5x8-container');

    // Le calendrier est le SEUL pilote. Son défilement est répercuté sur les autres.
    calendarContainer.addEventListener('scroll', () => {
        const scrollHeight = calendarContainer.scrollHeight - calendarContainer.clientHeight;
        const scrollPercentage = scrollHeight > 0 ? calendarContainer.scrollTop / scrollHeight : 0;

        // On applique le défilement aux autres colonnes.
        const team2x8ScrollHeight = team2x8Container.scrollHeight - team2x8Container.clientHeight;
        team2x8Container.scrollTop = team2x8ScrollHeight * scrollPercentage;
        
        const team5x8ScrollHeight = team5x8Container.scrollHeight - team5x8Container.clientHeight;
        team5x8Container.scrollTop = team5x8ScrollHeight * scrollPercentage;
    });
    
    window.setStartDate = function(dateString) {
        const newDate = new Date(dateString);
        if (!isNaN(newDate.getTime())) {
            Team2x8.reset();
            Team5x8.reset();
            Calendar.setStartDate(newDate);
        } else {
            console.error('Date invalide');
        }
    };

    window.getPlanningInfo = function() {
        return {
            currentDaysCount: Calendar.getCurrentDaysCount(),
            startDate: Calendar.getDateForDay(0),
            lastDate: Calendar.getDateForDay(Calendar.getCurrentDaysCount() - 1)
        };
    };

    // --- Événement de réinitialisation du calendrier ---
    document.getElementById('reset-calendar').addEventListener('click', () => {
        // On remet tous les scrolls à zéro
        [
            document.getElementById('calendar-container'),
            document.getElementById('team-2x8-container'),
            document.getElementById('team-5x8-container')
        ].forEach(c => c.scrollTop = 0);

        // On réinitialise la date à aujourd'hui
        window.setStartDate(new Date());
    });

    console.log('Planning des équipes initialisé');
    console.log('Date de début:', Calendar.getDateForDay(0).toLocaleDateString('fr-FR'));
    console.log('Utilisez setStartDate("YYYY-MM-DD") pour changer la date de début');
    console.log('Utilisez getPlanningInfo() pour obtenir les informations du planning');

    // --- Logique de la modale pour atteindre une date ---
    const modal = document.getElementById('date-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const dateForm = document.getElementById('date-form');
    const dateInput = document.getElementById('date-input');

    // Ajout automatique des "/" lors de la saisie de la date
    dateInput.addEventListener('input', () => {
        const input = dateInput;
        // On ne garde que les chiffres pour reconstruire le format.
        let value = input.value.replace(/\D/g, '');

        // On limite à 6 chiffres (JJMMYY)
        if (value.length > 6) {
            value = value.slice(0, 6);
        }

        // On ré-applique le format JJ/MM/AA
        if (value.length > 4) {
            input.value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        } else if (value.length > 2) {
            input.value = `${value.slice(0, 2)}/${value.slice(2)}`;
        } else {
            input.value = value;
        }
    });

    const closeModal = () => {
        modal.style.display = 'none';
        dateInput.value = ''; // On vide le champ
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Fermer la modale si on clique sur l'overlay
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    dateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const dateString = dateInput.value; // ex: "12/06/26"

        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Les mois sont 0-indexed en JS
            const year = parseInt(parts[2], 10) + 2000; // On assume 21ème siècle

            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                const newDate = new Date(year, month, day);
                
                // On remet tous les scrolls à zéro
                [
                    document.getElementById('calendar-container'),
                    document.getElementById('team-2x8-container'),
                    document.getElementById('team-5x8-container')
                ].forEach(c => c.scrollTop = 0);
                
                window.setStartDate(newDate);
                closeModal();
            } else {
                alert('Format de date invalide.');
            }
        } else {
            alert('Format de date invalide.');
        }
    });
});
