# Analyseur de plateforme de reservation
## Creation de memoireLogement
- creer:
        memoireLogement = {}
        nombreNoteCinq = 0;
        nombreNoteUn = 0

- parcourir le tableau reservations 
    - pour chaque reservation
         - si memoireLogement[reservation.logementId] n'existe pas:
            - creer :
                    memoireLogement[reservation.logementId] = {
                    nombreReservationConfimer: 0, 
                    totalNuit : 0,
                    totalNote: 0,
                    nombreDeNote: 0,    
                       } 
        - si reservation.statut === "confirmee" :
            - memoireLogement[reservation.logementId].nombreReservationConfimer ++
            - memoireLogement[reservation.logementId].totalNuit += reservation.nuits
            - memoireLogement[reservation.logementId].totalNote += reservation.note
            - memoireLogement[reservation.logementId].nombreDeNote ++
            - si reservation.note === 5 :
                nombreNoteCinq++
            - si reservation.note === 1 :
                nombreNoteUn ++ 
        
- return:
         memoireLogement
         nombreNoteCinq ;
         nombreNoteUn

## creation de logementsDonnees
- on creer un nouveau tableau :logementsDonnees
- parcourir le tableau logements:
    - pour chaque logement:
        - si verifier si memoireLogement[logement.id] existe . si oui :
                - creer une variable logementStatiatique et lui attribuer les information de memoireLogement[logement.id] correspondant
                - fusioner les information de logementStatiatique au information de du logement et stocker l'ensemble dans logementsDonnees
        - si non :
                - creer une variable objet logementStatiatique et lui atribuer
                    nombreReservationConfimer: 0, 
                    totalNuit : 0,
                    totalNote: 0,
                    nombreDeNote: 0, 
                - fusioner les information de logementStatiatique au information de du logement et stocker l'ensemble dans logementsDonnees
- return logementsDonnees


## Analyse des utilisateurs
- creer:
        memoireUtilisateur = {}
- creer :
         utilisateurLeplusAgé = null
         utilisateurLeMoinsAgé = null
         utilisateurAvecLePlusDeReservation = null
         utilisateurAvecLePlusDeDepense = null
         sommeDesAges = 0

- calculer totalUtilisateur =  utilisateurs.length

- Parcourir le tableau utlisateurs
    - pour chaque utilisateur :
        - sommeDesAges += utilisateur.age
        - Attribuer a utilisateurLeplusAgé l'utilisateur ayant l'age maximal
        - attribuer a utilisateurLeMoinsAgé l'utilisateur ayant l'age minimal

- calculer ageMoyen = sommeDesAges / totalUtilisateur

- parcourir le tableau reservations
    - pour chaque reservation:
        - si satatut === "confirmee"
            - si reservation.utilisateurId n'exsiste pas dans  memoireUtilisateur :
            creer :
                     memoireUtilisateur[reservation.utilisateurId]={
                        nombreDeReservation : 0,
                        totalDepense : 0,
                     }
                     
            - nombreDeReservation ++
            - creer une variable infoLogement , chercher les informations de reservation.logementId dans le tableau logements et les stockers dans la variable infoLogement
            - calculer depense = reservation.nuits * infoLogement.prixParNuit
            - totalDepense += depense 

- attribuer a utilisateurAvecLePlusDeReservation l'utilisateur dont memoireUtilisateur[reservation.utilisateurId].nombreDeReservation est le maximal 

- attribuer a utilisateurAvecLePlusDeDepense l'utilisateur dont memoireUtilisateur[reservation.utilisateurId].totalDepense est le maximal 

- return :
         totalUtilisateur
         ageMoyen
         utilisateurLeplusAgé 
         utilisateurLeMoinsAgé 
         utilisateurAvecLePlusDeReservation 
         utilisateurAvecLePlusDeDepense

## analyse des logements
- recuperer le tableau logementsDonnees

- creer :
        logementAyantLePlusDeNuits = null 
        logementAyantLePlusDeReservations = null
        logementAyantLePlusDeRevenu = null
        logementAyantLaMeilleureNoteMoyenne = null
        logementAyantPireMoyenne = null
        nombreTotalDeLogement = 0
        nombreNotesGenerale = 0
        sommeTotalNote = 0

- parcourir logementsDonnees
    - pour chaque logement :
        - nombreTotalDeLogement ++
        - nombreNotesGenerale += logement.nombreDeNote
        - sommeTotalNote += logement.totalNote
        - calculer revenu = logement.prixParNuit * logement.totalNuit 
        - si nombreDeNote > 0 :
          - calculer moyenneNote = totalNote / nombreDeNote
          - attribuer a logementAyantLaMeilleureNoteMoyenne le logement ayant la moyenneNote maximal
          - attribuer a logementAyantPireMoyenne le logement ayant la moyenneNote minimum         
        - attribuer a logementAyantLePlusDeNuits le logement ayant le maximal totalNuit 
        - attribuer a logementAyantLePlusDeReservations le logement ayant le maximal nombreReservationConfimer
        - attribuer a logementAyantLePlusDeRevenu le logement ayant le revenu maximal 
        

- calculer moyenneNoteGeneral = sommeTotalNote / nombreNotesGenerale

- return :
        logementAyantLePlusDeNuits 
        logementAyantLePlusDeReservations 
        logementAyantLePlusDeRevenu
        logementAyantLaMeilleureNoteMoyenne 
        logementAyantPireMoyenne
        nombreTotalDeLogement
        moyenneNoteGeneral  

## analyse des villes 
- recuperer le tableau logementsDonnees

- creer :
        memoireVille = {}
        villeAyantLePlusDeRevenu = null
        villeAyantLePlusDeNuit = null
    
- parcourir logementsDonnees 
    - pour chaque logement:
        - si memoireVille[logement.ville] n'existe pas :
        creer :
              memoireVille[logement.ville] = {
                nombreDeLogement :0,
                nombreDeReservationConfirmees : 0,
                nombreTotalDeNuits: 0,
                revenusGenerer: 0
              } 
        - calculer revenu = prixParNuit * totalNuit
        - memoireVille[logement.ville].nombreDeLogement ++
        - memoireVille[logement.ville].nombreDeReservationConfirmees += logement.nombreReservationConfimer
        - memoireVille[logement.ville].nombreTotalDeNuits += logement.totalNuit
        - memoireVille[logement.ville].revenusGenerer +=  revenu 

- parcourir memoireVille :
    - attribuer a villeAyantLePlusDeRevenu la ville ayant generer le plus de revenusGenerer
    - attribuer a villeAyantLePlusDeNuit la ville ayant le maximal de nombreTotalDeNuits

- return :
        memoireVille
        villeAyantLePlusDeRevenu
        villeAyantLePlusDeNuit

## analyse categorie 
- recuperer le tableau logementsDonnees

- creer :
        memoireCategorie = {}
        categorieAyantLePlusDeRevenu = null

- parcourir logementsDonnees 
    - pour chaque logement :
        - si memoireCategorie[logement.categorie] n'existe pas 
        creer:
              memoireCategorie[logement.categorie]={
                nombreDeLogement :0,
                nombreDeReservationConfirmees : 0,
                nombreTotalDeNuits: 0,
                revenusGenerer: 0,
                sommeTotalNote: 0,
                nombreDeNoteCategorie: 0,
                moyenneNote: 0
                         }                   
        -  calculer revenu = logement.prixParNuit * logement.totalNuit
        - nombreDeLogement++
        - nombreDeReservationConfirmees += logement.nombreReservationConfimer
        - nombreTotalDeNuits += logement.totalNuit
        - revenusGenerer += revenu
        - sommeTotalNote += logement.totalNote
        - nombreDeNoteCategorie += logement.nombreDeNote

- parcourir memoireCategorie 
   - pour chaque categorie:
        - si nombreDeNoteCategorie > 0 :
                - calculer memoireCategorie[categorie].moyenneNote = sommeTotalNote / nombreDeNoteCategorie
        - attribuer a categorieAyantLePlusDeRevenu la categorie ayant le revenu maximal


- return:
         memoireCategorie 
        categorieAyantLePlusDeRevenu

  
