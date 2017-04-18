'use strict';

const Joi = require('joi');

module.exports = {
  id: Joi.string(),
  createdAt: Joi.number(),
  title: Joi.string().required(),
  description: Joi.string(),
  data: Joi.object().keys({
    setup: Joi.string().allow(''),
    tests: Joi.array().min(1).items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string(),
        defer: Joi.boolean(),
        code: Joi.string().required()
      })
    )
  })
};
