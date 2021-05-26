import Joi from 'joi'

export const validationPerson = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required()
})
