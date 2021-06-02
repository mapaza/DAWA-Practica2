/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionsRepository')} obj.TransactionsRepository
 */
 export default ({ TransactionRepository }) => {
    return async (id_account) => { 
      return await TransactionRepository.getByAccount(id_account)
    }
  }