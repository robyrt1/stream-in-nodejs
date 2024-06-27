import { Readable, Transform, Writable } from 'stream';
import { createWriteStream } from 'fs'

const readable = Readable({
    read() {
        for (let index = 0; index < 1e2; index++) {
            const person = {
                id: Date.now() + index, name: `Robert - ${index}`
            }
            const data = JSON.stringify(person)
            this.push(data)
        }

        this.push(null) // Informa que os dados acabaram)
    }
})

// processamento dos dados

const mapFields = Transform({
    transform(chunk, enconding, cb) {
        const data = JSON.parse(chunk);
        const result = `${data.id},${data.name.toUpperCase()}\n`
        cb(null, result)
    }
})

const mapHeaders = Transform({
    transform(chunk, enconding, cb) {
        this.counter = this.counter ?? 0;
        if (this.counter) {
            return cb(null, chunk)
        }
        this.counter += 1;
        cb(null, "id,name\n".concat(chunk))
    }
})

//saida de dados
const writable = Writable({
    write(chunk, enconding, cb) {
        console.log('msg: ', chunk.toString())
        cb()
    }
})

const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    //writable é sempre a saida -> imprimir, salvar, ignorar
    // .pipe(process.stdout);
    // .pipe(writable)
    .pipe(createWriteStream('my.csv'));

    pipeline.on('end', ()=>console.log('acabou'))