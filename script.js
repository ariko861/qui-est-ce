// Launch when alpine js initialize

document.addEventListener('alpine:init', () => {
    Alpine.data('captain', () => ({

        questions: [
            "Est-ce que cette personne est un garçon ?",
            "Est-ce que cette personne a les cheveux blonds ?"
        ],
        message: "Est-ce que cette personne est un garçon ?",
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

        checkIfLeft() {
            if ( this.personnes.length == 1 ) {
                this.personnesRestantes = false;
                // console.log(this.personnes);

            }
        },
        answer(bool) {
            this.personnes = this.personnes.filter(function(personne) {
                // console.log(this.count);
                return personne.attributes[this.count] == bool;
            }, this);
            this.count++;
            this.checkIfLeft();
            // console.log(this.personnes);
        },
    }))
})