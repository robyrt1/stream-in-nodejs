const processWritable = (response) =>  new Writable({
    objectMode: true,
    write(chunk,encoding, callback){
        response.write((chunk) + '\n')
        callback()
    },
    final(callback) {
        console.log('stream finalizada')
        response.end();
        callback();
      }
})



const processTranform = Transform({
    objectMode: true,
    transform(chunk,encoding,callback){
        const data = JSON.stringify(chunk)
        callback(null, data)
    }
})