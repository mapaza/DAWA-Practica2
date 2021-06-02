import MongoPersonsRepository from '../persons/infraestructure/MongoPersonsRepository'
import getOnePerson from '../persons/application/getOnePerson'
import getOneAccount from '../accounts/application/getOneAccount'
import getAccountsbyPerson from '../accounts/application/getAccountsbyPerson'
import updateAccount from '../accounts/application/updateAccount'
import MongoAccountsRepository from '../accounts/infraestructure/MongoAccountsRepository'
import MongoTransactionsRepository from './infraestructure/MongoTransactionsRepository'
import createTransaction from './application/createTransaction'
import getTransactionsByAccount from './application/getTransactionsByAccount'
const AccountRepository = new MongoAccountsRepository()
const TransactionRepository = new MongoTransactionsRepository()
const PersonRepository = new MongoPersonsRepository()
import MongoDriver from 'mongodb'
const { MongoClient, ObjectId } = MongoDriver
/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const depositarAccount = async (req, res, next) => {
  try {

    //Obtener persona segun dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const dni = {
      dni: req.body.dni
    }
    const person = await querygetOnePerson(dni)

     //Obtener account segun nro_cuenta
    const querygetOneAccount = getOneAccount({ AccountRepository })

    const nro_cuenta = {
      id_person: person._id,
      nro_cuenta: req.body.nro_cuenta
    }

    const account = await querygetOneAccount(nro_cuenta)

    //Actualizar saldo deposito nuevo
    const queryupdateAccount = updateAccount({ AccountRepository })
    
    const nuevo_deposito = parseFloat(req.body.cantidad)
    const updatedAccount = {
      saldo: account.saldo + nuevo_deposito
    }
    await queryupdateAccount(account._id, updatedAccount)


    //Crear nueva Transaccion
    const querycreateTransaction = createTransaction({ TransactionRepository })
    
    const newTransaction = {
      id_account: account._id,
      tipo_transaction: 'deposito',
      cantidad: nuevo_deposito,
      description:req.body.description,
    }

    const  transaction = await querycreateTransaction(newTransaction)

    res.status(201).json({
      message: 'Se deposito :'+nuevo_deposito+ " a la cuenta N°"+req.body.nro_cuenta,
      data: transaction,
    })
    
  }  catch (e) {
      next(e)
  }
}

export const retirarAccount = async (req, res, next) => {
  try {

    //Buscar Cuenta por DNI
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const dni = {
      dni: req.body.dni
    }
  
    const person = await querygetOnePerson(dni)

  //Buscar account por nro_cuenta
    const querygetOneAccount = getOneAccount({ AccountRepository })
    const nro_cuenta = {
      id_person: person._id,
      nro_cuenta: req.body.nro_cuenta
    }
    const account = await querygetOneAccount(nro_cuenta)
    console.log(account)


    //Validar que el saldo sea suficiente
    const cantidad_retiro = parseFloat(req.body.cantidad)
    const falta = cantidad_retiro - account.saldo
    if(account.saldo < req.body.cantidad){
      res.status(400).json({
        message: 'El saldo es insuficiente. Solo tiene $'+account.saldo+ ". Le falta $"+ falta
      })

    }

    //Actualizar Cuenta
    const queryupdateAccount = updateAccount({ AccountRepository })
    const updatedAccount = {
      saldo: account.saldo - cantidad_retiro
    }
    await queryupdateAccount(account._id, updatedAccount)

    //Crear Transaccion
    const querycreateTransaction = createTransaction({ TransactionRepository })
    const newTransaction = {
      id_account: account._id,
      tipo_transaction: 'retiro',
      cantidad: cantidad_retiro,
      description:req.body.description
     
    }
    const transaction = await querycreateTransaction(newTransaction)

    res.status(201).json({
      message: 'Se retiro :'+cantidad_retiro+ " de la cuenta N°"+req.body.nro_cuenta,
      data: transaction,
    })
  }    catch (e) {
      next(e)
  }
}


export const getTransactionsbyID = async (req, res, next) => {
  
  try {

    //Obtener persona por dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const dni = {
      dni: req.params.dni
    }
    const person = await querygetOnePerson(dni)

     //Obtener account segun nro_cuenta
     const querygetOneAccount = getOneAccount({ AccountRepository })

     const nro_cuenta = {
       id_person: person._id,
       nro_cuenta: req.params.nro_cuenta
     }
     console.log(nro_cuenta)
 
     const account = await querygetOneAccount(nro_cuenta)
    //id_account
    const idAccount = {
      id_account: account._id
    }
    
    console.log(idAccount)

    //Obtener transaccioens de la cuenta
    const queryGetTransactionsByID = getTransactionsByAccount({ TransactionRepository })
    const transactions_byID = await queryGetTransactionsByID(idAccount)
    console.log(transactions_byID)

    //Respuesta
    res.status(200).json({
      message:  "Las transferencias de la cuenta N°: "+req.params.nro_cuenta+" son:",
      data: [{
        nombre_person:person.nombre,
        nro_cuenta: account.nro_cuenta,
        saldo_cuenta:account.saldo,
        transactions:transactions_byID
       }
      ], 
    }) 

  }   catch
  (e) {
       next(e)
  }
}

export const getTransactions = async (req, res, next) => {
  
  try {

    //Obtener persona por dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const dni = {
      dni: req.params.dni
    }
    const person = await querygetOnePerson(dni)

    //Obtener cuentas del cliente segun id_person
    const querygetAccountsbyPerson = getAccountsbyPerson({ AccountRepository })
    const id_person = {
      id_person: person._id
    }

    const accounts = await querygetAccountsbyPerson(id_person)
    console.log(accounts)
    const accountsbyID = []
    for(var i=0; i < accounts.length ; i++){
      const accountID = {
        id_account: accounts[i]._id
      }
      console.log("type of")
      console.log(typeof(accounts[i]._id))
      accountsbyID.push(accountID)
    }
    console.log("accounsbyID")
    console.log(accountsbyID)

    //Obtener transacciones de las cuentas by id_account
    const transactionsbyID = []
    for(var i=0; i < accountsbyID.length ; i++){
      const queryGetTransactionsByID = getTransactionsByAccount({ TransactionRepository })
      const transactions_byID = await queryGetTransactionsByID(accountsbyID[i])
      transactionsbyID.push(transactions_byID)
    }
    console.log(transactionsbyID)
    //Respuesta
    res.status(200).json({
      message:  person.nombre+" tiene "+accountsbyID.length+" cuentas y sus transferencias son:",
      cuentas: accountsbyID,
      data: transactionsbyID,
      
    }) 
    //console.log(id_account_person)

  } catch
  (e) {
  next(e)
  }
}
