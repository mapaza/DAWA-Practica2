/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonsRepository')} obj.PersonsRepository
 */

export default ({ PersonRepository }) => {
  return async (dni) => { 
    return await PersonRepository.getByDNI(dni)
    
  }
}
