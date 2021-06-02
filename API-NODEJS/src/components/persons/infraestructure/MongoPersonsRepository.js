import MongoLib from '../../../lib/mongo'

class MongoPersonsRepository {
  constructor () {
    this.collection = 'persons'
    this.mongoDB = new MongoLib()
  }

  async add (entidad) {
    const id = await this.mongoDB.create(this.collection, entidad)
    return { id, ...entidad }
  }

  async getByDNI ({ dni }) {
    return await this.mongoDB.get(this.collection,null, { dni})
  }

  async getAll () {
    const query = null
    return this.mongoDB.getAll(this.collection, query)
  }
  async getOne(id) {
    return this.mongoDB.get(this.collection, id)
  }
  async getbyNro(id) {
    return this.mongoDB.getbynro(this.collection, id)
  }
}

export default MongoPersonsRepository

