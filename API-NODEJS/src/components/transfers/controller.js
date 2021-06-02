import getOnePerson from '../persons/application/getOnePerson'
import MongoPersonsRepository from '../persons/infraestructure/MongoPersonsRepository'
import getOneAccount from '../accounts/application/getOneAccount'
import GetCuentas from '../accounts/application/getAccountsbyPerson'
import ActualizarCuenta from '../accounts/application/updateAccount'
import updateAccount from '../accounts/application/updateAccount'
import MongoAccountsRepository from '../accounts/infraestructure/MongoAccountsRepository'
import MongoTransactionsRepository from './infraestructure/MongoTransfersRepository'
import createTransaction from './application/createTransaction'
import GetMovimientos from '../transactions/application/getOneTransaction'
import getTransactionsByAccount from '../transactions/application/getTransactionsByAccount'


const AccountRepository = new MongoAccountsRepository()
const TransactionRepository = new MongoTransactionsRepository()
const PersonRepository = new MongoPersonsRepository()

/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

 export const transferirAccount = async (req, res, next) => {
  try {
    
    //Obtener person por DNI
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const dni = {
      dni: req.body.dni
    }
  
    const person = await querygetOnePerson(dni)

    //Buscar account por nro_cuenta_origen
    const querygetOneAccount = getOneAccount({ AccountRepository })
    const cuenta_origen = {
      id_person: person._id,
      nro_cuenta: req.body.nro_cuenta_origen
    }
    //Buscar account por nro_cuenta_destino
    const cuenta_destino = {
      id_person: person._id,
      nro_cuenta: req.body.nro_cuenta_destino
    }
    
    const accountOrigen = await querygetOneAccount(cuenta_origen)
    const accountDestino = await querygetOneAccount(cuenta_destino)

    //Validar que ambas cuentas sean del mismo cliente
    if(accountDestino!= null && accountOrigen!=null){
    const id_ac_destino = accountDestino.id_person.toString
    const id_ac_origen = accountOrigen.id_person.toString

      //console.log(typeof(id_ac_destino.toString()))
      //Validar que el saldo sea suficiente
      const cantidad_trans = parseFloat(req.body.cantidad)
      const falta = cantidad_trans - accountOrigen.saldo

      if(accountOrigen.saldo < cantidad_trans){
        res.status(400).json({
          message: 'El saldo es insuficiente. Solo tiene $'+accountOrigen.saldo+ ". Le falta $"+ falta
        })
    }else{

    //Actualizar CuentaOrigen
    const queryupdateAccount = updateAccount({ AccountRepository })
    const updatedOrigen = {
      saldo: accountOrigen.saldo - cantidad_trans
    }
    await queryupdateAccount(accountOrigen._id, updatedOrigen)

    //Actualizar saldo de CuentaDestino
    
    //const queryupdateAccount = updateAccount({ AccountRepository })
    const updatedDestino = {
      saldo: accountDestino.saldo + cantidad_trans
    }
    await queryupdateAccount(accountDestino._id, updatedDestino)

    //Crear nueva Transaccion de Transferencia
    const querycreateTransaction = createTransaction({ TransactionRepository })
    
    const newTransaction = {
      id_account: accountDestino._id,
      nro_cuenta_origen: accountOrigen.nro_cuenta,
      nro_cuenta_destino: accountDestino.nro_cuenta,
      tipo_transaction: 'transferencia',
      cantidad: cantidad_trans,
      description:req.body.description
    }

    const transaction = await querycreateTransaction(newTransaction)

    res.status(201).json({
      message: 'Se hizo la transferencia a la cuenta N°'+accountDestino.nro_cuenta,
      data: transaction,
    })
    }
  }else{
      res.status(400).json({
        message: 'Las cuentas no pertenecen al mismo usuario. Intentelo Nuevamente'
      })
    }

  } catch (e) {
    next(e)
  }
}