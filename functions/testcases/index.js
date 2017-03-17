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
  const body = JSON.parse(event.body);
  const validation = Joi.validate(body, schema);

  if(validation.error) {
    console.error(validation.error);
    callback(new Error('Invalid data'));
    return;
  }

  const item = {
    id: uuid.v1(),
    data: body.data,
    createdAt: timestamp,
    title: body.title,
    description: body.description
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

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: item.id
      }),
    };

    callback(null, response);
  });
};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item),
    };

    callback(null, response);
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

    const res = {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

    cb(null, res);
  });
};
