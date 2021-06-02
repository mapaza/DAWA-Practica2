/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionsRepository')} obj.TransactionsRepository
 */
 import crypto from 'crypto'

 export default ({ TransactionRepository }) => {
  return async ({ id_account, tipo_transaction, cantidad, description }) => {
    const transaction = {
      id_account: id_account,
      token: crypto.randomBytes(20).toString('hex'),
      cantidad: cantidad,
      description: description,
      tipo_transaction: tipo_transaction,
      fecha_trans: new Date().toISOString()
    }
    return await TransactionRepository.add(transaction)
  }
}
