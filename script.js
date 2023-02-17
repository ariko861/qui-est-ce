// Launch when alpine js initialize

document.addEventListener('alpine:init', () => {
    Alpine.data('captain', () => ({

        questions: [],
        personnes: [],
        count: 0,
        questionFirstColumn: 2,
        personnesRestantes: true,
        options: [],
        images: [],


        populateImages(){ // fonction pour remplir la liste d'images des images du excel
            this.personnes.forEach(personne => {
                this.images.push({
                    prenom: personne.prenom,
                    url: personne.image,
                    show: true
                })
            });
        },

        checkImages(){
            this.images.forEach(image => {
                let correspondant = this.personnes.find(personne => personne.prenom == image.prenom);
                if ( !correspondant ) {
                    image.show = false;
                }
            });
        },

        checkIfLeft() { // vérifie si il reste plus d'une personne dans la liste
            if (this.personnes.length == 1) {
                this.personnesRestantes = false; // si il ne reste plus qu'une personne mettre personnesRestantes à false
            } else {
                this.count++; // Sinon passer à la question suivante
            }
        },

        answer(bool) {
            this.personnes = this.personnes.filter(function (personne) { // filtre les personnes selon la réponse donnée 
                return personne[this.questions[this.count]] == bool;
            }, this);
            this.checkIfLeft(); // vérifier le nombre de personnes restantes
            this.checkAvailableOptions(); // vérifier les options disponibles pour la question
            this.checkImages();
            console.log(this.images);
        },

        checkAvailableOptions() {
            this.options = []
            this.personnes.forEach(personne => {
                let option = personne[this.questions[this.count]];
                if (this.options.indexOf(option) == -1) {
                    this.options.push(option);
                }
            }, this);
            if (this.options.length < 2 && this.personnesRestantes) {
                this.answer(this.options[0]);
            }
        },

        async getFile(files) {
            file = files[0]; // sélectionne le premier fichier
            const data = await file.arrayBuffer(); // converti en buffer
            var workbook = XLSX.read(data, { // lit le buffer avec un lecteur xlsx
                type: 'binary'
            });
            var workbook = XLSX.read(data);
            this.readWorkbook(workbook);
        },

        async fetchFile(url) {
            let response = await (await fetch(url)).arrayBuffer();
            var workbook = XLSX.read(response);
            this.readWorkbook(workbook);
        },

        readWorkbook(workbook) { // Lit le fichier excel une fois déposé


            var rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]); // converti les lignes du excel en objets

            var keys = Object.keys(rows[0]); // récupère les clés 
            for (let i = this.questionFirstColumn; i < keys.length; i++) { // assigne les clés aux questions à poser, commence par la colonne définie dans questionFirstColumn
                this.questions.push(keys[i]);
            }

            rows.forEach(element => { // ajoute chaque ligne à la liste de personnes
                this.personnes.push(element);
            });
            this.checkAvailableOptions();
            this.populateImages();
        },


    }))
})