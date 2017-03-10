'use strict';

const Joi = require('joi');

module.exports = {
  id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string(),
  data: Joi.object().keys({
    tests: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required()
      })
    )
  })
};
