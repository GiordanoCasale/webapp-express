const mysql = require('mysql2');
// Importa il modulo mysql2, una libreria per connettersi e interagire con database MySQL da Node.js

const connection = mysql.createConnection({
    host: 'localhost',   // Indirizzo del server MySQL (qui locale)
    port: '3306',        // Porta predefinita per MySQL
    user: 'root',        // Nome utente per connettersi al DB
    password: "",  // Password associata all’utente
    database: 'db_movie' // Nome del database a cui ci si connette
});

connection.connect(() => {
    console.log('Connected to MySQL!')
});
// Stabilisce la connessione con il database
// Esegue la funzione callback quando la connessione è stabilita
// Qui semplicemente stampa un messaggio di conferma in console

module.exports = connection;
// Esporta l’oggetto connection così da poterlo riutilizzare in altri file per eseguire query
