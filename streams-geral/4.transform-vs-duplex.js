import { log } from 'console';
import { Duplex, Transform } from 'stream';

let count = 0;
const server = new Duplex({
    objectMode: true,// não precisa trabalhar com buffer => gastar mais memoria
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ < 5) {
                this.push(`My name is Robert [${count}]`)
                return
            }
            clearInterval(intervalContext);
            this.push(null)
        }
        setInterval(function () {
            everySecond(this)
        })
    },
    write(chunk, encoding, cb) {
        log('[Writable] saving', chunk)
        cb()
    }
})

// provar que são canais de comunicações diferentes!
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')

// on data -> loga o que rolou no .push do reable
// server.on('data', msg => log('[readable] ', msg))

//o push deixar você enviar mais dados
server.push(`[duplex] hey this is alson a readable!\n`)

// server.pipe(process.stdout)

const transformtoUpperCase = Transform({
    objectMode: true,
    transform(chunk, encoding, cb){
        
        cb(null, chunk.toUpperCase())
    }
})

// transfrm é também um duplex, mas nã possuem comunicação independente
// faz com que entre no transformtoUpperCase
transformtoUpperCase.write('[Transform] hello from write!') 

//o push vai ignorar o que você tem na função tranform
transformtoUpperCase.push('[Transform] hello from push')

server
    .pipe(transformtoUpperCase)
    // redireciona todos os dados da readable para writavke da duplex
    .pipe(server)