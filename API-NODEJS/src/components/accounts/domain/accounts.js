import Joi from 'joi'

export const validationAccount = Joi.object({
  dni: Joi.string().required(),
  nro_cuenta: Joi.string().required(),
  saldo: Joi.string().required()
})
