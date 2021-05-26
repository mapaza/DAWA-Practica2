/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonsRepository')} obj.PersonsRepository
 */
export default ({ PersonsRepository }) => {
  return async ({ name, number }) => {
    const newperson = {
      name: name,
      number: number
    }
    return PersonsRepository.add(newperson)
  }
}
