import _ from 'lodash'
const URL = process.env.NODE_ENV === 'development' ? 'https://9wgorjcawa.execute-api.eu-west-1.amazonaws.com/api' : '/api'

export default class Api {
  static save (test) {
    test = cleanObj(test)

    return fetch(`${URL}/testcases`, {
      method: 'POST',
      body: JSON.stringify(test),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    })
  }

  static get (id) {
    return fetch(`${URL}/testcases/${id}`)
      .then(response => {
        return response.json()
      })
  }
}

function cleanObj (test) {
  return _.reduce(test, (obj, value, key) => {
    let n
    if (_.isPlainObject(value)) {
      n = cleanObj(value)
    } else if (_.isArray(value)) {
      n = cleanArray(value)
    } else if (value) {
      n = value
    }

    if (n) {
      obj[key] = n
    }
    return obj
  }, {})
}

function cleanArray (test) {
  return _.reduce(test, (arr, value) => {
    if (_.isPlainObject(value)) {
      arr.push(cleanObj(value))
    } else if (_.isArray(value)) {
      arr.push(cleanArray(value))
    } else if (value) {
      arr.push(value)
    }
    return arr
  }, [])
}
