import { Readable, Writable } from'stream';

const readable = Readable({
    read(){
        this.push('Hello Word 1')
        this.push('Hello Word 2')
        this.push('Hello Word 3')
        this.push('Hello Word 4')

        this.push(null) // Informa que os dados acabaram)
    }
})

const writable = Writable({
    write(chunk, enconding, cb) {
        console.log('msg: ', chunk.toString())
        cb()
    }
})

readable.push('[readable] - hello from push');
readable
//writable é sempre a saida -> imprimir, salvar, ignorar
    // .pipe(process.stdout);
    .pipe(writable)