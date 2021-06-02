import Joi from 'joi'

export const validationTransaction= Joi.object({
  dni: Joi.string().required(),
  nro_cuenta: Joi.string().required(),
  cantidad: Joi.string().required(),
  description: Joi.string().required()
})

export const validationTransfer = Joi.object({
  dni: Joi.string().required(),
  nro_cuenta_origen: Joi.string().required(),
  nro_cuenta_destino: Joi.string().required(),
  cantidad: Joi.string().required(),
  description: Joi.string().required()
})




