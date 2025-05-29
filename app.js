const express = require('express');
// Importa il modulo Express, framework per creare server web in Node.js

const app = express();
// Crea un’istanza dell’app Express, che rappresenta il server web

const port = 3000;
// Definisce la porta su cui il server ascolterà le richieste HTTP

const moviesRouter = require('./routers/movies');
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

app.listen(port, () => {
    console.log(`server del catalogo in ascolto alla porta ${port}`);
});
// Avvia il server sulla porta definita (3000)
// Quando il server parte, stampa in console un messaggio di conferma
