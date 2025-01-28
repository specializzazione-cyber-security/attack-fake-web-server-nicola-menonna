# Obbiettivo
- Questa applicazione simula un web server di un attaccante per memorizzare i dati sensibili degli utenti.

# Configurare il progetto
Assicurarsi di essere all'interno del progetto prima di lanciare i seguenti comandi da terminale:
- npm install

# Avviare il server API
`npm run start:api`

- Questo comando avvierà il server API sulla porta 3001. Dovresti vedere un messaggio nella console che conferma l'avvio del server:
`🔒 API Server running on http://localhost:3001`


## Test del Server
Per testare il server, puoi utilizzare strumenti come Postman o curl per inviare richieste HTTP al server e verificare che i log vengano correttamente memorizzati.

### Esempio di richiesta POST per loggare un attacco:

- aprire una nuova finestra del terminale e lanciare il comando con curl:
```
curl -X POST http://localhost:3001/log-attack \
-H "Content-Type: application/json" \
-d '{
    "type": "XSS",
    "payload": "<script>alert(\'XSS\')</script>",
    "userAgent": "Mozilla/5.0",
    "cookies": "sessionId=12345",
    "token": "abc123"
}'
```

- se l'attacco va a buon fine, dovreste vedere nel file attacks.log, i dati memorizzati.

# Attenzione
- controllare nel file api-server.js che la porta del Live Server lanciato per i rispettivi selfwork corrisponda a quello che c'e' scritto nella riga 10;
- ad esempio: se avete nel file --> http://127.0.0.1:5500, controllate che il Live Server del selfwork su cui state lavorando sia aperto sulla porta 5500, altrimenti dovete cambiare la porta nel codice e riavviare il web server dell'attaccante