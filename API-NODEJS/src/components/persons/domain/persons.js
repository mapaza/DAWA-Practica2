import Joi from 'joi'

export const validationPerson = Joi.object({
  nombre: Joi.string().required(),
  dni: Joi.string().required(),
  telefono: Joi.string().required(),
  email: Joi.string().required(),
  direccion: Joi.string().required(),
})