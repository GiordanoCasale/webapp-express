const express = require('express');
// Importa il modulo Express, framework per creare server web in Node.js

const app = express();
// Crea un’istanza dell’app Express, che rappresenta il server web

const cors = require('cors')


const port = process.env.SERVER_PORT || 3000;
// Definisce la porta su cui il server ascolterà le richieste HTTP

app.use(cors({ origin: process.env.FE_APP }));

const moviesRouter = require('./routers/movies');
const { notFound, errorHandler } = require('./middleware/middlewareerror');

// Importa il router dedicato alle rotte /movies, definito in un file separato

app.use(express.json());
// Middleware built-in di Express che permette di interpretare il corpo delle richieste in formato JSON
// Utile per ricevere dati da client tramite POST, PUT ecc.

app.use("/movies", moviesRouter);
// Dice all’app di usare il router 'moviesRouter' per tutte le richieste che iniziano con /movies
// Esempio: /movies, /movies/1, /movies/delete ecc. saranno gestite da questo router

app.use(express.static("public"));
// Serve file statici dalla cartella "public"
// Ad esempio se c’è public/index.html sarà raggiungibile da localhost:3000/index.html
// Utile per servire risorse come immagini, CSS, JS client-side

app.get("/", (req, res) => {
    res.send("benvenuti nel mio catalogo")
});
// Definisce la rotta GET per la root "/" del sito
// Quando un client fa richiesta a "/", risponde con un semplice messaggio di benvenuto

app.use(notFound);
// Middleware per gestire tutte le richieste che non corrispondono a nessuna rotta definita
// Deve essere dichiarato dopo tutte le altre rotte
// Restituisce un errore 404 in formato JSON


app.use(errorHandler);
// Middleware per gestire tutti gli errori che avvengono nelle route o middleware precedenti
// Registra l’errore e invia una risposta con codice 500 (o altro se già impostato)


app.listen(port, () => {
    console.log(`server del catalogo in ascolto alla porta ${port}`);
});
// Avvia il server sulla porta definita (3000)
// Quando il server parte, stampa in console un messaggio di conferma
