export default (object) => {
  let str = ''
  const keys = Object.keys(object)
  keys.forEach((k, i) => {
    str += `${k}=${object[k]}`
    str += i < keys.length - 1 ? '&' : ''
  })

  return str
}