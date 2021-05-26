/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonsRepository')} obj.PersonsRepository
 */
export default ({ PersonsRepository }) => {
  return async () => {
    return PersonsRepository.getAll()
  }
}
