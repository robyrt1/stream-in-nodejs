// process.stdin.pipe(process.stdout)
// .on('data', msg =>{
//     console.log(msg.toString())
// })
// .on('error', _ => console.log('erros>>',_))
// .on('end', _ => console.log('endd>>',_))
// .on('close', _ => console.log('close>>>',_))

//terminal 1
// socket -> duplex
// socket.pipe -> readableStream
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file


import http from 'http';
import { createReadStream ,readFileSync } from 'fs'
http.createServer((req, res) => {
    //má pratica
    // const file = readFileSync('big.file')
    // res.write(file)
    // res.end()

    createReadStream('big.file').pipe(res)

}).listen(3005, () => console.log("running at 3005"))
// curl localhost:3005 -o output.txt