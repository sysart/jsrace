'use strict';

const defaultError = 'An error occured';
const defaultResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
  body: {}
};

function handler(promise, event, context, cb) {
  if(!isPromise(promise)) {
    cb(new Error(defaultError));
    return;
  }

  promise
    .then((response = {}) => {
      cb(null, { ...defaultResponse, ...response });
    })
    .catch(error => {
      console.error(error);
      cb(new Error(defaultError));
    });
}

function isPromise(promise) {
    return promise && typeof promise.then === 'function';
}

module.exports = handler;
