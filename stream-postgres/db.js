const { Pool, Query, Client } = require('pg');

// Configuração do pool do PostgreSQL
const client = new Client({
    user: 'catalago-db',
    host: 'localhost',
    database: 'catalago-db',
    password: 'catalago-db',
    port: 5446,
});
client.connect();

module.exports = client