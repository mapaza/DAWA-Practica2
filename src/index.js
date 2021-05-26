import express from 'express'
import personsRouter from './routes/persons'
import helmet from 'helmet'
import morgan from 'morgan'
import errorHandler from './utils/middlewares/errorHandlers'
import notFoundHandler from './utils/middlewares/notFoundHandler'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.use('/', personsRouter)
app.use(express.urlencoded({ extended: false }))
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Service is running at the port: ${PORT}`)
})
