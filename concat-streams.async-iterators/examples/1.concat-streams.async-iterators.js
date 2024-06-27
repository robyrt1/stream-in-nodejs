import axios from 'axios';
import { log } from 'console';
import { Writable } from 'stream';
import { pipeline } from 'stream/promises';

const API_1 = 'http://localhost:3005';
const API_2 = 'http://localhost:4000';

const requests = await Promise.all([
    axios({
        method: 'get',
        url: API_1,
        responseType: 'stream'
    }),

    axios({
        method: 'get',
        url: API_2,
        responseType: 'stream'
    })
])

const results = requests.map(({ data }) => data)

const output = Writable({
    write(chunk, encodingm, cb){
        const data = chunk.toString().replace(/\n/,"")
        // ?=- ele faz procurar a partir do - e olhar para traz
        // :"(?<name>.*) ele procura pelo conteudo dentro das aspas apos o : e extrai somente o nome
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        log('data', data)
        // log(`[${name.toLowerCase()}] ${data}`)
        cb()
    }
})

async function * merge(streams){
    for(const readable of streams){
        // faz trabalhar com objectMode
        readable.setEncoding("utf8")

        for await (const chunk of readable) {
            yield chunk
        }
    }
}


await pipeline(
    merge(results),
    output
)
// result[0].pipe(output)
// result[1].pipe(output)
