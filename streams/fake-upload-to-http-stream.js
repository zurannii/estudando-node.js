import { Readable } from 'node:stream'

class OndeToHundredSteam extends Readable {
    index = 1

    read() {
        const i = this.index++

        setTimeout(() => { 
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i)) 
                
                this.push(buf)
            }
        }, 1000) 
    }
}

fetch('http://localhost:3334', { 
    method: 'POST',
    body: new OndeToHundredSteam()
}).then(response => {
    response.text().then(date => {
        console.log(date)
    })
})