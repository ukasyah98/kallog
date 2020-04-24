// import { URL_PREFIX } from '../config/api'

const URL_PREFIX = 'http://localhost:8000'

const sleep = (timeout = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timeout);
    })
}

const requestServer = async (
  path = '/', options = {},
) => {
  const { method = 'GET', data, asFormData = false, respondBlob = false } = options

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
          ...(!asFormData ? { 'Content-Type': 'application/json' } : {})
        }
      }
    )

    const result = respondBlob ? await response.blob() : await response.json()
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
