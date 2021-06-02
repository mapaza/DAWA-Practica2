/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountsRepository')} obj.AccountsRepository
 */
 export default ({ AccountRepository }) => {
  return async ({ id_person, nro_cuenta, saldo}) => {
    const newaccount = {
      id_person: id_person,
      nro_cuenta: nro_cuenta,
      saldo: saldo,
      tipo: "Cuenta de Ahorros",
      fecha_creacion:new Date().toISOString(),
    }
    return await AccountRepository.add(newaccount)
  }
}
