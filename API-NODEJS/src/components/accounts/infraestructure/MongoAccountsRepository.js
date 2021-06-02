import MongoLib from '../../../lib/mongo'

class MongoAccountsRepository {
  constructor () {
    this.collection = 'accounts'
    this.mongoDB = new MongoLib()
  }

  async add (account) {
    const id = await this.mongoDB.create(this.collection, account)
    return { id, ...account }
  }

  async update (id, data) {
    return this.mongoDB.update(this.collection, id, data)
  }
  async getAll () {
    const query = null
    return this.mongoDB.getAll(this.collection, query)
  }
  async getbyId(id) {
    return this.mongoDB.getbyid(this.collection, id)
  }
  async getbyId_Persona(id) {
    return this.mongoDB.getbyid_persona(this.collection, id)
  }
  async getbyNro(id) {
    return this.mongoDB.getbynro(this.collection, id)
  }

  async getByNroCuenta({ id_person, nro_cuenta }) {
    return await this.mongoDB.get(this.collection, null, { id_person, nro_cuenta })
  }

  async getByPerson ({ id_person }) {
    return await this.mongoDB.getAll(this.collection, { id_person })
  }
  
}

export default MongoAccountsRepository

