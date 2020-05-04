// import { URL_PREFIX } from '../config/api'

const URL_PREFIX = 'http://localhost:8000'

export const sleep = (timeout = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout);
  })
}

const requestServer = async (
  path = '/', options = {},
) => {
  const { method = 'GET', data, asFormData = false } = options

  try {
    await sleep()

    let body
    if (asFormData) {
      body = new FormData()
      Object.keys(data).forEach(key => {
        body.append(key, data[key])
      })
    } else {
      body = JSON.stringify(data)
    }

    const response = await fetch(
      URL_PREFIX + path,
      {
        method, body,
        credentials: 'include',
        headers: {
          // ...(!asFormData ? { 'Content-Type': 'application/json' } : {})
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    )

    const result = await response.json()

    // Validation error
    if (response.status === 422) {
      return [{ message: 'Validation error', data: result }, null]
    }

    if (!response.ok) {
      return [result, null]
    }
    return [null, result]
  } catch (error) {
    console.log(error);

    return [{ message: error.message }, null]
  }
}

export default requestServer
