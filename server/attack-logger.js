const fs = require('fs');
const path = require('path');

class AttackLogger {
    constructor() {
        this.logs = [];
        this.logDirectory = path.join(__dirname, '../logs');
        this.logFile = path.join(this.logDirectory, 'attacks.log');
        this.initLogSystem();
    }

    initLogSystem() {
        try {
            // Crea la directory se non esiste
            if (!fs.existsSync(this.logDirectory)) {
                fs.mkdirSync(this.logDirectory, { recursive: true });
            }
            
            // Crea il file se non esiste
            if (!fs.existsSync(this.logFile)) {
                fs.writeFileSync(this.logFile, '');
            }
        } catch (err) {
            console.error('❌ Errore nell\'inizializzazione del sistema di log:', err);
        }
    }

    log(attack) {
        const entry = {
            timestamp: new Date().toISOString(),
            type: attack.type,
            payload: attack.payload,
            ip: attack.ip || 'N/A',
            userAgent: attack.userAgent,
            cookies: attack.cookies,
            token: attack.token
        };

        try {
            // Scrittura sincrona con gestione errori
            fs.appendFileSync(
                this.logFile, 
                JSON.stringify(entry) + '\n',
                { flag: 'a' } // Assicura l'append
            );
            
            console.log('📥 Attacco salvato:', entry);
            
        } catch (err) {
            console.error('🔥 Errore nel salvataggio del log:', err);
        }

        // Mantieni gli ultimi 100 log in memoria
        this.logs = [entry, ...this.logs].slice(0, 100);
    }

    getLogs() {
        try {
            return fs.readFileSync(this.logFile, 'utf8')
                .split('\n')
                .filter(line => line.trim())
                .map(JSON.parse)
                .reverse();
        } catch (err) {
            console.error('📂 Errore nella lettura del file di log:', err);
            return [];
        }
    }

    clearLogs() {
        try {
            fs.writeFileSync(this.logFile, '');
            this.logs = [];
            console.log('🧹 Logs eliminati');
        } catch (err) {
            console.error('❌ Errore nella pulizia dei log:', err);
        }
    }
}

module.exports = new AttackLogger();