import MongoPersonsRepository from './infraestructure/MongoPersonsRepository'
import MongoAccountsRepository from '../accounts/infraestructure/MongoAccountsRepository'
import createPerson from './application/createPerson'
import getAllPersons from './application/getAllPersons'
import getOnePerson from './application/getOnePerson'
import getAccountsbyPerson from '../accounts/application/getAccountsbyPerson'
const PersonRepository = new MongoPersonsRepository()
const AccountRepository = new MongoAccountsRepository()


/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export const newPerson = async (req, res, next) => {
  try {

    //Crear Persona
    const querycreatePerson = createPerson({ PersonRepository })
    const persona = await querycreatePerson(req.body)
    res.status(201).json({
      message: 'Se registro la nueva Persona con DNI:'+req.body.dni,
      data: persona
     
    })
  } catch (e) {
    next(e)
  }
}

export const getPersons = async (req, res, next) => {
  try {
    //Obtener todas las personas
    const querygetAllPersons = getAllPersons({ PersonRepository })
    const personas = await querygetAllPersons()
    res.status(200).json({
      message: 'Se listan todas las Personas Registradas:',
      data: personas
      
    })
  } catch (e) {
    next(e)
  }
}

export const getPerson = async (req, res, next) => {
  try {
    //Obtener persona segun dni
    const querygetOnePerson = getOnePerson({ PersonRepository })
    console.log(req.params)
    ////Encontrar persona segun el parametro de id que es dni
    const persona = await querygetOnePerson(req.params)
    console.log(persona)

    //Encontrar las cuentas donde id_person sea igual al id_persona
    const querygetAccountsbyPerson = getAccountsbyPerson({ AccountRepository })
    const id = {
      id_person: persona._id
    }
    const accounts = await querygetAccountsbyPerson(id)
    //Total cuentas person
    //console.log("acountss")
    //console.log(accounts)

    let sum = accounts.reduce((a, b) => +a + +b.saldo, 0);
    res.status(200).json({
      message: 'El Saldo Total de todas las cuentas de '+persona.nombre+' es: ',
      nombre: persona.nombre,
      saldo: sum
    })
  } catch (e) {
    next(e)
  }
}
