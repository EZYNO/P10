/* pseudo code achitecture
analyseDePlateformeDeReservation (){

creationDeMemoireLogement(reservations){
return :
         memoireLogement 
         nombreNoteCinq
         nombreNoteUn
}

creationDeLogementsDonnees(memoireLogement, logements){
- creer le tableau logementsDonnees 
- fusionner les information memoireLogement et logements pour chaque logement 
et les stoker dans logementsDonnees 
- return logementsDonnees 
}

analyserUtilisateur(utilisateurs, reservations){
return :
         totalUtilisateur
         ageMoyen
         utilisateurLeplusAgé 
         utilisateurLeMoinsAgé 
         utilisateurAvecLePlusDeReservation 
         utilisateurAvecLePlusDeDepense
}

analyserLogement(logementsDonnees){
 return :
        logementAyantLePlusDeNuits 
        logementAyantLePlusDeReservations 
        logementAyantLePlusDeRevenu
        logementAyantLaMeilleureNoteMoyenne 
        logementAyantPireMoyenne
        nombreTotalDeLogement
        moyenneNoteGeneral  
}

analyserVilles(logementsDonnees){
return :
        memoireVille
        villeAyantLePlusDeRevenu
        villeAyantLePlusDeNuit

}

analyserCategorie(logementsDonnees)
return:
         memoireCategorie 
         categorieAyantLePlusDeRevenu
}
*/
const utilisateurs = [
    {
        id: 1,
        nom: "Alice",
        age: 28,
        ville: "Cotonou"
    },
    {
        id: 2,
        nom: "Bob",
        age: 35,
        ville: "Porto-Novo"
    },
    {
        id: 3,
        nom: "David",
        age: 24,
        ville: "Cotonou"
    },
    {
        id: 4,
        nom: "Emma",
        age: 31,
        ville: "Parakou"
    },
    {
        id: 5,
        nom: "Paul",
        age: 27,
        ville: "Cotonou"
    }
];

const logements = [
    {
        id: 101,
        titre: "Appartement moderne",
        ville: "Cotonou",
        categorie: "Appartement",
        prixParNuit: 35000
    },
    {
        id: 102,
        titre: "Villa avec piscine",
        ville: "Cotonou",
        categorie: "Villa",
        prixParNuit: 75000
    },
    {
        id: 103,
        titre: "Maison familiale",
        ville: "Porto-Novo",
        categorie: "Maison",
        prixParNuit: 45000
    },
    {
        id: 104,
        titre: "Studio centre-ville",
        ville: "Cotonou",
        categorie: "Studio",
        prixParNuit: 20000
    },
    {
        id: 105,
        titre: "Villa familiale",
        ville: "Parakou",
        categorie: "Villa",
        prixParNuit: 60000
    }
];

const reservations = [
    {
        id: 1001,
        utilisateurId: 1,
        logementId: 101,
        nuits: 3,
        statut: "confirmee",
        note: 5
    },
    {
        id: 1002,
        utilisateurId: 2,
        logementId: 102,
        nuits: 2,
        statut: "confirmee",
        note: 4
    },
    {
        id: 1003,
        utilisateurId: 1,
        logementId: 104,
        nuits: 4,
        statut: "annulee",
        note: null
    },
    {
        id: 1004,
        utilisateurId: 3,
        logementId: 101,
        nuits: 2,
        statut: "confirmee",
        note: 4
    },
    {
        id: 1005,
        utilisateurId: 4,
        logementId: 105,
        nuits: 5,
        statut: "confirmee",
        note: 5
    },
    {
        id: 1006,
        utilisateurId: 5,
        logementId: 103,
        nuits: 3,
        statut: "en_attente",
        note: null
    },
    {
        id: 1007,
        utilisateurId: 3,
        logementId: 102,
        nuits: 1,
        statut: "confirmee",
        note: 5
    },
    {
        id: 1008,
        utilisateurId: 1,
        logementId: 103,
        nuits: 2,
        statut: "confirmee",
        note: 3
    }
];

const creerMemoireLogement = (reservations)=>{
    let memoireLogement = {};
    let nombreNoteCinq = 0;
    let nombreNoteUn = 0;
    let sommeGlobalNote = 0;
    let nombreGlobalNote = 0;

    reservations.forEach(reservation => {

        if (!memoireLogement[reservation.logementId]) {
           memoireLogement[reservation.logementId]={
            reservationConfirmé : 0,
            nombreDeNuits : 0,
            sommeDesNotes: 0,
            nombreDeNotes: 0,
           } 
        }

        if (reservation.statut === "confirmee") {
            memoireLogement[reservation.logementId].reservationConfirmé ++ ;
            memoireLogement[reservation.logementId].nombreDeNuits += reservation.nuits ;

            if (reservation.note === 5) {
            nombreNoteCinq ++ ;
            }

            if (reservation.note === 1) {
            nombreNoteUn ++ ;
            }

            if (reservation.note !== null) {
                memoireLogement[reservation.logementId].nombreDeNotes ++ ;
                memoireLogement[reservation.logementId].sommeDesNotes += reservation.note ;
                sommeGlobalNote += reservation.note;
                nombreGlobalNote ++;
            }
        }

    });

    const moyenneGeneralNote = sommeGlobalNote / nombreGlobalNote;

    return{
         memoireLogement,
         nombreNoteCinq,
         nombreNoteUn,
         moyenneGeneralNote,
         nombreGlobalNote
     }

};

const creerLogementDonnes = (memoireLogement , logements)=>{
    const logementsDonnes = logements.map((logement) => {
        const logementsStatistique = memoireLogement[logement.id];
        return Object.assign({}, logement , logementsStatistique);
       
    })

    return logementsDonnes;

}

const analyserUtilisateur = (utilisateurs , reservations, logements)=>{
    let memoireUtilisateur = {};
    let utilisateurLeplusAgé = null;
    let utilisateurLeMoinsAgé = null;
    let utilisateurAvecLePlusDeDepense = null;
    let utilisateurAvecLePlusDeReservation = null;
    let sommeDesAges = 0;
    const nombreDUtilisateur = utilisateurs.length ;

    utilisateurs.forEach(utilisateur => {
        sommeDesAges += utilisateur.age;

        if (utilisateurLeplusAgé === null || utilisateur.age > utilisateurLeplusAgé.age) {
            utilisateurLeplusAgé = {
                nom: utilisateur.nom,
                age: utilisateur.age
            }
        }

        if (utilisateurLeMoinsAgé === null || utilisateur.age < utilisateurLeMoinsAgé.age) {
            utilisateurLeMoinsAgé = {
                nom: utilisateur.nom,
                age: utilisateur.age
            }
        }
    });

    reservations.forEach(reservation => {
        if (!memoireUtilisateur[reservation.utilisateurId]) {
            memoireUtilisateur[reservation.utilisateurId]={
                nombreDeReservation: 0,
                totalDepense: 0,
            }
        }

        if (reservation.statut === "confirmee") {
            memoireUtilisateur[reservation.utilisateurId].nombreDeReservation ++ ;
            const infoLogement = logements.find((logement) => logement.id === reservation.logementId);
            const depense = reservation.nuits * infoLogement.prixParNuit;
            memoireUtilisateur[reservation.utilisateurId].totalDepense += depense;
        }

        
    });

    Object.entries(memoireUtilisateur).forEach(info => {
        if (utilisateurAvecLePlusDeDepense === null || info[1].totalDepense > utilisateurAvecLePlusDeDepense.revenu ) {
            utilisateurAvecLePlusDeDepense = {
               id: info[0],
               revenu: info[1].totalDepense,
               reservations: info[1].nombreDeReservation
            }
        }

        if (utilisateurAvecLePlusDeReservation === null || info[1].nombreDeReservation > utilisateurAvecLePlusDeReservation.reservations ) {
            utilisateurAvecLePlusDeReservation = {
                id: info[0],
                reservations: info[1].nombreDeReservation
            }
        }
    });

    const ageMoyen = sommeDesAges / nombreDUtilisateur ;

    return {
        ageMoyen,
        utilisateurLeMoinsAgé,
        utilisateurLeplusAgé,
        utilisateurAvecLePlusDeDepense,
        utilisateurAvecLePlusDeReservation,
        nombreDUtilisateur
    }
}

const analyserLogement = (logementsDonnes)=>{
    let nombreTotalDeLogement = 0 ;
    let logementAyantLePlusDeReservations = null;
    let logementAyantLePlusDeNuits = null;
    let logementAyantLePlusDeRevenu = null;
    let logementAyantLaMeilleureNoteMoyenne = null;
    let logementAyantPireMoyenne = null;

    logementsDonnes.forEach(logement => {
       nombreTotalDeLogement++;

       const logementRevenu = logement.nombreDeNuits * logement.prixParNuit;
       if (logementAyantLePlusDeRevenu === null || logementRevenu > logementAyantLePlusDeRevenu.revenu ) {
            logementAyantLePlusDeRevenu = {
                id: logement.id,
                revenu: logementRevenu,
            }
       }

       if (logement.nombreDeNotes > 0) {
            const moyenneLogement = logement.sommeDesNotes / logement.nombreDeNotes;
            if (logementAyantLaMeilleureNoteMoyenne === null || moyenneLogement > logementAyantLaMeilleureNoteMoyenne.moyenne ) {
                logementAyantLaMeilleureNoteMoyenne = {
                    id: logement.id,
                    moyenne: moyenneLogement
                }  
            }

            if (logementAyantPireMoyenne === null || moyenneLogement < logementAyantPireMoyenne.moyenne) {
                logementAyantPireMoyenne = {
                    id: logement.id,
                    moyenne: moyenneLogement
                }
            }
       }

       if (logementAyantLePlusDeReservations === null || logement.reservationConfirmé > logementAyantLePlusDeReservations.nombreReservation) {
        logementAyantLePlusDeReservations = {
          id: logement.id,
          nombreReservation: logement.reservationConfirmé  
        }
       }

       if (logementAyantLePlusDeNuits === null || logement.nombreDeNuits > logementAyantLePlusDeNuits.totalNuits) {
        logementAyantLePlusDeNuits = {
            id: logement.id,
            totalNuits: logement.nombreDeNuits
        }
       }
    });

    return {
        nombreTotalDeLogement,
        logementAyantLaMeilleureNoteMoyenne,
        logementAyantLePlusDeNuits,
        logementAyantLePlusDeReservations,
        logementAyantPireMoyenne,
        logementAyantLePlusDeRevenu
    }
    
}

const analyserVilles = (logementsDonnes)=>{
    let memoireVille ={};
    let villeAyantLePlusDeRevenu = null;
    let villeAyantLePlusDeNuit = null;

    logementsDonnes.forEach(logement => {
        if (!memoireVille[logement.ville]) {
            memoireVille[logement.ville] = {
                nombreLogement: 0,
                nombreReservationConfirmé: 0,
                nombreDeNuitsReservé: 0,
                revenuGenerés:0
            }
        }

        memoireVille[logement.ville].nombreLogement ++;
        if (logement.reservationConfirmé > 0) {
             memoireVille[logement.ville].nombreReservationConfirmé += logement.reservationConfirmé;
             memoireVille[logement.ville].nombreDeNuitsReservé += logement.nombreDeNuits;
             memoireVille[logement.ville].revenuGenerés += logement.nombreDeNuits * logement.prixParNuit;
        }
      
    });

    Object.entries(memoireVille).forEach(ville => {
        if (villeAyantLePlusDeRevenu === null || ville[1].revenuGenerés > villeAyantLePlusDeRevenu.revenu) {
            villeAyantLePlusDeRevenu = {
                nom: ville[0],
                revenu: ville[1].revenuGenerés
            }
        }

        if (villeAyantLePlusDeNuit === null || ville[1].nombreDeNuitsReservé > villeAyantLePlusDeNuit.nuits) {
            villeAyantLePlusDeNuit = {
                nom: ville[0],
                nuits: ville[1].nombreDeNuitsReservé
            }
        }

    });

    return{
        memoireVille,
        villeAyantLePlusDeNuit,
        villeAyantLePlusDeRevenu

    }
}

const analyserCategorie = (logementsDonnes)=> {
    let memoireCategorie = {};
    let categorieAyantLePlusDeRevenu = null;

    logementsDonnes.forEach(logement => {
        if (!memoireCategorie[logement.categorie]) {
            memoireCategorie[logement.categorie] ={
                nombreDeLogements: 0,
                nombreDeReservation: 0,
                nombreDeNuitsReservé: 0,
                revenuGenerés: 0,
                sommeGlobalNote: 0,
                nombreNoteGlobal: 0,
            }
        }

        memoireCategorie[logement.categorie].nombreDeLogements ++;
        memoireCategorie[logement.categorie].nombreDeReservation += logement.reservationConfirmé ;
        memoireCategorie[logement.categorie].nombreDeNuitsReservé += logement.nombreDeNuits;
        memoireCategorie[logement.categorie].revenuGenerés += logement.prixParNuit * logement.nombreDeNuits ;
        memoireCategorie[logement.categorie].sommeGlobalNote += logement.sommeDesNotes ;
        memoireCategorie[logement.categorie].nombreNoteGlobal += logement.nombreDeNotes; 

    });

    Object.entries(memoireCategorie).forEach(categorie => {
        if (categorie[1].nombreNoteGlobal > 0) {
            memoireCategorie[categorie[0]].noteMoyenne = categorie[1].sommeGlobalNote / categorie[1].nombreNoteGlobal ;
        }

        if (categorieAyantLePlusDeRevenu === null || categorie[1].revenuGenerés > categorieAyantLePlusDeRevenu.revenu ) {
            categorieAyantLePlusDeRevenu = {
                nom: categorie[0],
                revenu: categorie[1].revenuGenerés
            }
        }
    });

    return{
        memoireCategorie,
        categorieAyantLePlusDeRevenu
    }

}

const analyseDePlateformeDeReservation = (utilisateurs ,logements ,reservations)=>{

    const memoireLogementCree = creerMemoireLogement(reservations);
    const memoireLogement = memoireLogementCree.memoireLogement;
    const logementsDonnees = creerLogementDonnes(memoireLogement, logements);
    const analyseUtilisateurs = analyserUtilisateur(utilisateurs, reservations, logements);
    const analyseLogements = analyserLogement(logementsDonnees);
    const analyseVilles = analyserVilles(logementsDonnees);
    const analyseCategorie = analyserCategorie(logementsDonnees)

    return{
        logementsDonnees: logementsDonnees,
        nombreNoteCinq: memoireLogementCree.nombreNoteCinq ,
        nombreNoteUn: memoireLogementCree.nombreNoteUn ,
        moyenneGeneralNote: memoireLogementCree.moyenneGeneralNote ,
        nombreNoteGlobal: memoireLogementCree.nombreGlobalNote ,
        ageMoyen: analyseUtilisateurs.ageMoyen ,
        utilisateurLeMoinsAgé: analyseUtilisateurs.utilisateurLeMoinsAgé ,
        utilisateurLeplusAgé: analyseUtilisateurs.utilisateurLeplusAgé ,
        utilisateurAvecLePlusDeDepense: analyseUtilisateurs.utilisateurAvecLePlusDeDepense ,
        utilisateurAvecLePlusDeReservation: analyseUtilisateurs.utilisateurAvecLePlusDeReservation ,
        nombreDUtilisateur: analyseUtilisateurs.nombreDUtilisateur ,
        nombreTotalDeLogement: analyseLogements.nombreTotalDeLogement ,
        logementAyantLaMeilleureNoteMoyenne: analyseLogements.logementAyantLaMeilleureNoteMoyenne,
        logementAyantLePlusDeNuits: analyseLogements.logementAyantLePlusDeNuits,
        logementAyantLePlusDeReservations: analyseLogements.logementAyantLePlusDeReservations,
        logementAyantPireMoyenne: analyseLogements.logementAyantPireMoyenne,
        logementAyantLePlusDeRevenu: analyseLogements.logementAyantLePlusDeRevenu,
        memoireVille:analyseVilles.memoireVille,
        villeAyantLePlusDeNuit:analyseVilles.villeAyantLePlusDeNuit,
        villeAyantLePlusDeRevenu:analyseVilles.villeAyantLePlusDeRevenu,
        memoireCategorie: analyseCategorie.memoireCategorie,
        categorieAyantLePlusDeRevenu: analyseCategorie.categorieAyantLePlusDeRevenu,
    }

    


}


console.log(analyseDePlateformeDeReservation(utilisateurs,logements,reservations))  