import { Readable, Writable, Transform} from "node:stream";

class OndeToHundredSteam extends Readable {
    index = 1

    read() {
        const i = this.index++

        setTimeout(() => { 
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i)) // converte o número para uma string e depois para um buffer
                // o buffer é um objeto que representa uma sequência de bytes em memória
                this.push(buf)
            }
        }, 1000) // simula um atraso de 1 segundo para cada número
    }
}

class InverseNumberStresam extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1 // converte o buffer para uma string e depois para um número
        callback(null, Buffer.from(String(transformed))) // converte o número de volta para um buffer
    }
}

class MutiplyByTenStream extends Writable {
    write (chunk, encoding, callback) {
        console.log(chunk.toString() * 10)
        callback()
    }
}


new OndeToHundredSteam()
.pipe(new InverseNumberStresam())
.pipe(new MutiplyByTenStream())

