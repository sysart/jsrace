'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Joi = require('joi');
const schema = require('./schema');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Credentials" : true
};

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const validation = Joi.validate(event, schema);

  if(validation.error) {
    console.error(validation.error);
    callback(new Error('Invalid data'));
    return;
  }

  const item = {
    ...event,
    id: uuid.v1(),
    createdAt: timestamp,
  };

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: item,
  };

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create item.'));
      return;
    }

    callback(null, {
      id: item.id
    });
  });
};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.path.id,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    callback(null, result.Item);
  });
};

module.exports.list = (event, ctx, cb) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    AttributesToGet: [
      'id',
      'title',
      'createdAt',
      'description'
    ]
  };

  dynamoDb.scan(params, (err, data) => {
    if(err) {
      console.error(err);
      cb(new Error('An error occured'));
      return;
    }

    cb(null, data);
  });
};
