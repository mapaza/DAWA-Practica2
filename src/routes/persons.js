import express from 'express'
import { getPersons, nuevaPersona } from '../components/persons/controller'
import { validationPerson } from '../components/persons/domain/persons'
import { validationHandler } from '../utils/middlewares/validationHandler'

const router = express.Router()

router.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

router.get('/api/persons', getPersons)

router.post('/api/persons', validationHandler(validationPerson), nuevaPersona)

export default router
