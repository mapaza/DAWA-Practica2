import getOnePerson from '../persons/application/getOnePerson'
import MongoPersonsRepository from '../persons/infraestructure/MongoPersonsRepository'
import MongoAccountsRepository from './infraestructure/MongoAccountsRepository'
import createAccount from './application/createAccount'
import getAccountsbyPerson from './application/getAccountsbyPerson'

const AccountRepository = new MongoAccountsRepository()
const PersonRepository = new MongoPersonsRepository()
/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export const newAccount = async (req, res, next) => {
  try {
    //Obtener la persona segun el dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const account = await querygetOnePerson(req.body)
    const nuevo_saldo = parseFloat(req.body.saldo)
    const newAccount = {
      id_person: account._id,
      nro_cuenta: req.body.nro_cuenta,
      saldo:nuevo_saldo
    }
    //Crear Cuenta
    const querycreateAccount = createAccount({ AccountRepository })
    const account_created = await querycreateAccount(newAccount)

    res.status(201).json({
      message: 'Se regitstro la Cuenta  con id:'+account._id,
      data: account_created,
    })
  } catch (e) {
    next(e)
  }
}


export const getAccountsbyPersonID = async (req, res, next) => {
  try {
    //Obtener persona segun dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    const account = await querygetOnePerson(req.params)
    //Almacenar id de la cuenta
    const id_person = {
      id_person: account._id
    }
    console.log(account)
    //obtener cuentas segun id_persona
    const querygetAccountsbyPerson = getAccountsbyPerson({ AccountRepository })
    const accounts = await querygetAccountsbyPerson(id_person) 
    res.status(200).json({
      message:  account.nombre +" tiene "+accounts.length+" cuentas:",
      data: accounts,
      
    }) 
  } catch (e) {
    next(e)
  }
}
