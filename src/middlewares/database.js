import fs from 'node:fs/promises'
import { parse } from 'node:path'

export class Database {
  #database = {}

  constructor() {
    fs.readFile(Database, 'utf8').then(data =>{
        this.#database = JSON.parse(data)
    }) 
    .catch(() => {
      this.#persist()
    })
  }



  async #persist() {
    const databasePath = 'db.json'
    await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data 
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    await this.#persist()

    return data
  }
}
