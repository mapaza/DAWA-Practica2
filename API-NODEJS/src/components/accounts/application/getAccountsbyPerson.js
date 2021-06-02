/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountsRepository')} obj.AccountsRepository
 */
 export default ({ AccountRepository }) => {
  return async (person) => { 
    return await AccountRepository.getByPerson(person)
  }
}
