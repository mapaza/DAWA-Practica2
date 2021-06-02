import express from 'express'
import { validationHandler } from '../utils/middlewares/validationHandler'
import { validationPerson } from '../components/persons/domain/persons'
import { newPerson, getPersons, getPerson } from '../components/persons/controller'
import {  getAccountsbyPersonID, newAccount } from '../components/accounts/controller'
import { validationAccount } from '../components/accounts/domain/accounts'
import {  getTransactions, depositarAccount, retirarAccount, getTransactionsbyID} from '../components/transactions/controller'
import {  transferirAccount } from '../components/transfers/controller'
import { validationTransfer } from '../components/transfers/domain/transfers'
import { validationTransaction } from '../components/transactions/domain/transactions'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()

router.get('/', function(req, res) {
  console.log(__dirname) 
  res.sendFile('index.html', {root: __dirname})
});


//Registrar entidades (personas o empresas juridicas) 
router.post('/api/persons', validationHandler(validationPerson), newPerson)

//Registrar cuentas cupo (similar a una cuenta de banco).
//Cada entidad puede abrir multiples cuenta cupo
router.post('/api/accounts', validationHandler(validationAccount), newAccount)

//Abonar y desembolsar dinero en una cuenta cupo 
router.post('/api/transactions/deposit', validationHandler(validationTransaction), depositarAccount)
router.post('/api/transactions/retire', validationHandler(validationTransaction), retirarAccount)

//Transferir Dinero
router.post('/api/transactions/transfer', validationHandler(validationTransfer), transferirAccount)

//Cada entidad puede ver todos los movimientos que fueron realizados en sus cuentas cupo
router.get('/api/transactions/:dni', getTransactions)
router.get('/api/transactions/:dni/:nro_cuenta', getTransactionsbyID)


//Cada entidad puede obtener el saldo de cada cuenta cupo
router.get('/api/accounts/:dni', getAccountsbyPersonID)


//Cada entidad pueda obtener el saldo total de todas sus cuenta
router.get('/api/persons/:dni', getPerson)

//Listar todas las Personas
router.get('/api/persons', getPersons)


export default router
