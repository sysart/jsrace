const URL = 'https://zy9li26hkf.execute-api.eu-west-1.amazonaws.com/dev'

export default class Api {
  static save (test) {
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
