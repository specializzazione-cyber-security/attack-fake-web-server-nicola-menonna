const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 👉 Importa cookie-parser
const attackLogger = require('./attack-logger');

const app = express();

// Configura CORS per accettare richieste da http://127.0.0.1:5500
app.use(cors({
    origin: 'http://127.0.0.1:5500', // 👈 Specifica l'origine del frontend
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permette il passaggio di cookie e token
}));

// 👇 Usa cookie-parser come middleware
app.use(cookieParser());

// Middleware per il parsing JSON
app.use(express.json());

// Endpoint per il logging
app.post('/log-attack', (req, res) => {
    const attackData = {
        ...req.body,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };
    
    attackLogger.log(attackData);
    res.sendStatus(200);
});

// Endpoint per recuperare i log
app.get('/attack-logs', (req, res) => {
    res.json(attackLogger.getLogs());
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🔒 API Server running on http://localhost:${PORT}`);
});