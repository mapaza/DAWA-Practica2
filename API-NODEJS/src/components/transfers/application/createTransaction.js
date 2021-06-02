/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionsRepository')} obj.TransactionsRepository
 */
 import crypto from 'crypto'

 export default ({ TransactionRepository }) => {
  return async ({ id_account, nro_cuenta_origen, nro_cuenta_destino, tipo_transaction, cantidad, description }) => {
    const transaction = {
      id_account: id_account,
      nro_cuenta_origen:nro_cuenta_origen,
      nro_cuenta_destino:nro_cuenta_destino,
      token: crypto.randomBytes(20).toString('hex'),
      cantidad: cantidad,
      description: description,
      tipo_transaction: tipo_transaction,
      fecha_trans: new Date().toISOString()
    }
    return await TransactionRepository.add(transaction)
  }
}
// /**
//  * @param {Object} obj
//  * @param {import('../infraestructure/MongoTransactionsRepository')} obj.PersonRepository
//  */
//  export default ({ MovimientoRepository }) => {
//   return async ({ id_account,tipo_transaction, cantidad }) => {
//     const movimiento = {
//       id_account:id_account,
//       tipo_transaction: tipo_transaction,
//       cantidad: cantidad,
//       fecha_trans: new Date().toISOString(),
//     }
//     return await MovimientoRepository.add(movimiento)
//   }
// }

