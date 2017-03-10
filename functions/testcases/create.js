'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const body = JSON.parse(event.body);

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
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify({
        id: item.id
      }),
    };

    callback(null, response);
  });
};
