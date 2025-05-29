const express = require("express");
// Importa il framework Express per creare router e gestire le rotte

const router = express.Router();
// Crea un nuovo router Express, che permette di definire rotte modulari e separare la logica

const movieController = require("../controllers/moviecontroller")
// Importa il controller dei film, che contiene le funzioni per gestire le richieste sulle rotte

router.get("/", movieController.index)
// Definisce la rotta GET /movies (se il router è montato su /movies)
// Quando arriva una richiesta GET su /, esegue la funzione index del controller
// Funzione che tipicamente restituisce la lista di tutti i film

router.get("/:id", movieController.show)
// Definisce la rotta GET /movies/:id
// Quando arriva una richiesta GET con un parametro id, esegue la funzione show del controller
// Funzione che tipicamente restituisce i dettagli del film con quell’id

module.exports = router;
// Esporta il router così che possa essere usato nel file principale dell’applicazione
