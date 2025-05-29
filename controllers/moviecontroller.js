const connection = require("../data/db")
// Importa la connessione al database definita nel file ../data/db
// Presumibilmente è un oggetto configurato per eseguire query SQL

function index(req, res) {
    // Funzione controller per gestire la richiesta GET /movies
    // Ha lo scopo di restituire tutti i film presenti nel database

    const sql = 'SELECT*FROM movies';
    // Query SQL per selezionare tutti i record dalla tabella "movies"
    // Nota: meglio mettere uno spazio dopo SELECT (SELECT * FROM movies) per chiarezza

    connection.query(sql, (err, results) => {
        // Esegue la query sul DB
        // err -> eventuale errore restituito dal DB
        // results -> array dei film ottenuti dal DB

        if (err) return res.status(500).json({ error: 'Database query failed' });
        // Se c’è un errore nella query, risponde con status 500 e messaggio di errore

        res.json(results);
        // Se va tutto bene, risponde con la lista dei film in formato JSON
    });
};

const show = (req, res) => {
    // Funzione controller per gestire la richiesta GET /movies/:id
    // Restituisce un singolo film insieme alle sue recensioni

    const id = req.params.id;
    // Prende l'id del film dai parametri della richiesta

    // Prima query per prendere il film
    const sql = 'SELECT * FROM movies WHERE id = ?';
    // Query parametrizzata per prendere il film con id specificato

    connection.query(sql, [id], (err, movies) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Errore durante la lettura dei film: ' + err });
        }
        if (movies.length === 0) {
            // Se non trova il film con quell'id, risponde con 404
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const movie = movies[0];
        // Prende il primo (e unico) film risultato dalla query

        // Seconda query per prendere le recensioni associate al film
        const reviewssql = 'SELECT * FROM reviews WHERE movie_id = ?';

        connection.query(reviewssql, [id], (err, reviews) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Errore durante la lettura delle recensioni: ' + err });
            }

            // Aggiunge le recensioni all’oggetto movie
            movie.reviews = reviews;

            // Invia la risposta JSON con film + recensioni
            res.json(movie);
        });
    });
};

module.exports = {
    index,
    show
}
// Esporta le funzioni index e show per poterle usare in altri file, es. router
