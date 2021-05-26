import createError from 'http-errors'

const error = (_, __, next) => {
  next(createError(404))
}

export default error
