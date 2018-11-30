// const apiUrl = 'http://localhost:4741'

const config = require('../config.js')
const apiUrl = config.apiUrl

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const apiCreateFinish = (finish, user) => {
  return fetch(apiUrl + '/finishes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      finish
    })
  })
}

export const apiUpdateFinish = (finish, finishId, user) => {
  return fetch(apiUrl + '/finishes/' + `${finishId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      finish
    })
  })
}

export const apiDeleteFinish = (finishId, user) => {
  return fetch(apiUrl + '/finishes/' + `${finishId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
