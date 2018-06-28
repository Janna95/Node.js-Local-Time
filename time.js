const fs = require('fs');
const moment = require('moment');
const { Readable, Writable, Transform } = require('stream');

const readable = new Readable({
    read(size) {
        setTimeout(() => {
            this.push(new Date().getTime().toString())
        },1000)
    }
})

const writable = new Writable({
    write(chunk, en, callback) {
        fs.appendFile('./f.txt', chunk.toString()+'\n',  (err) => {
            callback();
        } )
    }
})

const transform = new Transform({
    transform(chunk, en, callback) {
        this.push(
            moment(parseInt(chunk.toString())).format('MMMM Do YYYY, h:mm:ss a')
        )
        callback();
    }
})
readable.pipe(transform).pipe(writable);