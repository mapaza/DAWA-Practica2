import getAllPersons from './application/getAllPersons'
import crearPersona from './application/crearPersona'
import MongoPersonsRepository from './infraestructure/MongoPersonsRepository'
const PersonsRepository = new MongoPersonsRepository()

/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export const getPersons = async (_, res, next) => {
  try {
    const query = getAllPersons({ PersonsRepository })
    const persona = await query()
    res.status(200).json({
      data: persona,
      message: 'Persons listed'
    })
  } catch (e) {
    next(e)
  }
}

export const nuevaPersona = async (req, res, next) => {
  try {
    const query = crearPersona({ PersonsRepository })
    const persona = await query(req.body)
    res.status(201).json({
      data: persona,
      message: 'Persons create'
    })
  } catch (e) {
    next(e)
  }
}
