const express = require('express');
const QueryStream = require('pg-query-stream')

const client = require('./db');
const query = require('./querys');

const { pipeline } = require('stream/promises');

const app = express();
const port = 4000;

// Readable
function queryToStream(query) {
    const queryStream = new QueryStream(query)
    return client.query(queryStream);
}

// Transform
async function* processTranform(stream) {
    for await (const chunk of stream) {
        yield JSON.stringify(chunk)
    }
}

app.get('/stream', async (req, res) => {
    try {
        const controller = new AbortController();
        const sql = query.users

        const readableStream = queryToStream(sql);

        await pipeline(
            readableStream,
            processTranform,
            res,
            { signal: controller.signal }
        )

        readableStream.on('end', async () => await client.end())
        console.log('Process has finished!')

    } catch (error) {
        console.error('[ERROR] - ', error)
        await client.end()
        res.end(JSON.stringify({
            statusCode: 500,
            message: "Ocorreu algum erro"
        }))
    }

});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
