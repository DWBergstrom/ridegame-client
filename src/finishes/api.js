const apiUrl = 'http://localhost:4741'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const apiCreateFinish = (finish, user) => {
  console.log('finish in apiCreateExample is ', finish)
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
