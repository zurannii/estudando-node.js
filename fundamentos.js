// Netflix & Spotify

// importação de clientes via CSV (excel)
// 1gb - 1.000.000
// POST /upload import.csv

//10mb/s -- 100s
// 100 -> inserções no banco de dados

//10mb/s -> 10.000

//ler os dados aos poucos e processando o arquivo ainda tá sendo enviado pelo servidor

// readable streams / writable streams

//process.stdin
//.pipe(process.stdout)

import {Readable, readable} from 'node:stream'

class OndeToHundredSteam extends Readable {

    index = 1

    _read() {
        const i = this.index++

        if (i > 100) {
            this.push(null)
        } else {

            const buf = Buffer.from(String(i))
            this.push(buf)
        }
    }
}

new OndeToHundredSteam().pipe(process.stdout)