/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountsRepository')} obj.AccountsRepository
 */
 export default ({ AccountRepository }) => {
  return async (id_cuenta) => { 
    return await AccountRepository.getByNroCuenta(id_cuenta)
  }
}
