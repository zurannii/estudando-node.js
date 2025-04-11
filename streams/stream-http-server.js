import http from 'http';
import { Transform } from 'node:stream';

const server = http.createServer((req, res) => {

    class InverseNumberStream extends Transform {
        _transform(chunk, encoding, callback) {
            const transformed = Number(chunk.toString()) * -1;

            console.log(transformed);
            callback(null, Buffer.from(String(transformed)));
        }
    }

    const server = http.createServer(async (req, res) => {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const fullStreamContent = Buffer.concat(buffers).toString();
        console.log(fullStreamContent);
     /*    return req
        .pipe(new InverseNumberStream())
        .pipe(res);*/
    }); 

    

});

server.listen(3334);
