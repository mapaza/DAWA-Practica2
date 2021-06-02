/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountsRepository')} obj.AccountsRepository
 */
 export default ({ AccountRepository }) => {
  return async (id, data) => {
    return await AccountRepository.update(id, data)
  }
}

