// Launch when alpine js initialize

document.addEventListener('alpine:init', () => {
    Alpine.data('captain', () => ({

        questions: [],
        personnes: [],
        count: 0,
        questionFirstColumn: 2,
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
                return personne[this.questions[this.count]] == bool;
            }, this);
            this.checkIfLeft(); // vérifier le nombre de personnes restantes
        },

        async getFile(files){
            file = files[0]; // sélectionne le premier fichier
            const data = await file.arrayBuffer(); // converti en buffer
            var workbook = XLSX.read(data, { // lit le buffer avec un lecteur xlsx
                type: 'binary'
            });
            var workbook = XLSX.read(data);
            this.readWorkbook(workbook);
        },

        async fetchFile(url){
            let response = await (await fetch(url)).arrayBuffer();
            var workbook = XLSX.read(response);
            this.readWorkbook(workbook);
        },

        readWorkbook(workbook){ // Lit le fichier excel une fois déposé
            
            
            var rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]); // converti les lignes du excel en objets
            
            var keys = Object.keys(rows[0]); // récupère les clés 
            for ( let i = this.questionFirstColumn; i < keys.length ; i++ ){ // assigne les clés aux questions à poser, commence par la colonne définie dans questionFirstColumn
                this.questions.push(keys[i]);
            }
          
            rows.forEach(element => { // ajoute chaque ligne à la liste de personnes
                this.personnes.push(element);
            });
        },


    }))
})