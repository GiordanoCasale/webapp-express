const mysql = require('mysql2');
// Importa il modulo mysql2, una libreria per connettersi e interagire con database MySQL da Node.js

const connection = mysql.createConnection({
    host: process.env.DB_HOST,   // Indirizzo del server MySQL (qui locale)
    port: process.env.DB_PORT,        // Porta predefinita per MySQL
    user: process.env.DB_USER,        // Nome utente per connettersi al DB
    password: process.env.DB_PASSWORD,  // Password associata all’utente
    database: process.env.DB_NAME // Nome del database a cui ci si connette
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});
// Stabilisce la connessione con il database
// Esegue la funzione callback quando la connessione è stabilita
// Qui semplicemente stampa un messaggio di conferma in console

module.exports = connection;
// Esporta l’oggetto connection così da poterlo riutilizzare in altri file per eseguire query
