import Joi from 'joi-browser'

export const TestCaseSchema = {
  id: Joi.string(),
  createdAt: Joi.number(),
  title: Joi.string().required(),
  description: Joi.string(),
  data: Joi.object().keys({
    setup: Joi.string().allow(''),
    tests: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required()
      })
    )
  })
}
