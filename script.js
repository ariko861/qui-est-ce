// Launch when alpine js initialize

document.addEventListener('alpine:init', () => {
    Alpine.data('captain', () => ({

        questions: [
            "Est-ce que cette personne est un garçon ?",
            "Est-ce que cette personne a les cheveux blonds ?"
        ],
        personnes: [
            {
                nom: 'Peletier',
                prenom:'Alois',
                attributes: [true, true],
            },
            {
                nom: 'Spilotti',
                prenom: 'Arnaud',
                attributes: [true, false],
            },
            {
                nom: 'Girboux',
                prenom:'Léa',
                attributes: [false, true],
            },
            
        ],
        count: 0,
        personnesRestantes: true,

        checkIfLeft() { // vérifie si il reste plus d'une personne dans la liste
            if ( this.personnes.length == 1 ) {
                this.personnesRestantes = false; // si il ne reste plus qu'une personne mettre personnesRestantes à false
            } else {
                this.count++; // Sinon passer à la question suivante
            }
        },
        answer(bool) {
            this.personnes = this.personnes.filter(function(personne) { // filtre les personnes selon la réponse donnée
                return personne.attributes[this.count] == bool;
            }, this);
            this.checkIfLeft(); // vérifier le nombre de personnes restantes
        },
    }))
})