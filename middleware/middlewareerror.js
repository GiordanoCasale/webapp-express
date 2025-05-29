const notFound = (req, res, next) => {
    // Middleware Express che si attiva se nessuna rotta precedente ha gestito la richiesta
    // Viene usato alla fine della "catena" di middleware

    res.status(404).json({
        success: false,
        message: "La risorsa richiesta non è stata trovata"
        // Risposta JSON standard con codice 404 (Not Found)
        // success: false → indica che l'operazione è fallita
        // message → messaggio chiaro per il client
    });
};
const errorHandler = (err, req, res, next) => {
    console.error('Errore:', err);
    // Logga l’errore completo nel terminale/server
    // Utile per debug in fase di sviluppo o per i log in produzione

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Controlla se lo status è ancora 200 (che non ha senso in caso di errore)
    // Se sì, lo imposta a 500 (Internal Server Error)
    // Altrimenti mantiene lo status già impostato da eventuali middleware precedenti

    res.status(statusCode).json({
        success: false,
        message: err.message || "Si è verificato un errore interno al server",
        // Restituisce un JSON con un messaggio d’errore chiaro
        // err.message mostra l'errore specifico, oppure un messaggio generico se assente
    });
};

module.exports = {
    notFound,
    errorHandler
};
// Esporta entrambi i middleware per poterli usare nel file principale (es. app.js o server.js)
// Possono essere montati come:
// app.use(notFound);
// app.use(errorHandler);