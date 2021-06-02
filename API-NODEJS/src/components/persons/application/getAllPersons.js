/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonsRepository')} obj.PersonsRepository
 */
 export default ({ PersonRepository }) => {
  return async () => { 
    return await PersonRepository.getAll()
  }
}

