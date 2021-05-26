import MongoLib from '../../../lib/mongo'

class MongoPersonsRepository {
  constructor () {
    this.collection = 'persons'
    this.mongoDB = new MongoLib()
  }

  async add (person) {
    const _id = await this.mongoDB.create(this.collection, person)
    return { _id, ...person }
  }

  async getAll () {
    return this.mongoDB.getAll(this.collection)
  }
}

export default MongoPersonsRepository
