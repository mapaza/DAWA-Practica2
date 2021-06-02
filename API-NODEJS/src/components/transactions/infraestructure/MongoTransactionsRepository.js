import MongoLib from '../../../lib/mongo'

class MongoTransactionsRepository {
  constructor () {
    this.collection = 'transactions'
    this.mongoDB = new MongoLib()
  }

  async add (entidad) {
    const id = await this.mongoDB.create(this.collection, entidad)
    return { id, ...entidad }
  }

  async getByPerson ( {id_account} ) {
    console.log(id_account)
    return await this.mongoDB.getAll(this.collection,{id_account})
  }

  async getAll () {
    const query = null
    return this.mongoDB.getAll(this.collection, query)
  }
   async getOne(id) {
    return this.mongoDB.get(this.collection, id)
  }

  async getbyId(id) {
    return this.mongoDB.getbyid(this.collection, id)
  }
  async getByAccount ({ id_account }) {
    return await this.mongoDB.getAll(this.collection, { id_account })
  }
}

export default MongoTransactionsRepository

