/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountsRepository')} obj.AccountsRepository
 */
 export default ({ AccountRepository }) => {
  return async () => {
    return await AccountRepository.getAll()
  }
}
