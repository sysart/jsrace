import Joi from 'joi-browser'

export const TestCaseSchema = {
  id: Joi.string(),
  createdAt: Joi.number(),
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  data: Joi.object().keys({
    setup: Joi.string().allow(''),
    tests: Joi.array().min(1).items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().allow(''),
        defer: Joi.boolean(),
        code: Joi.string().required()
      })
    )
  })
}
