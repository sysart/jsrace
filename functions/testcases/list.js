'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, ctx, cb) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    AttributesToGet: [
      'id',
      'title',
      'createdAt'
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
      body: JSON.stringify(data)
    };

    cb(null, res);
  });
};
