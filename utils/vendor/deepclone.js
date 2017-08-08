/**
 * 深度拷贝
 * @param {Object} 需要深度拷贝的对象
 */
module.exports = function deepclone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(v => {
      if (typeof v === 'object' && v !== null) return deepclone(v)
      else return v
    })
  } else {
    const newObj = {}

    Object.keys(obj).forEach(v => {
      if (typeof obj[v] === 'object' && obj[v] !== null) {
        newObj[v] = deepclone(obj[v])
      } else {
        newObj[v] = obj[v]
      }
    })

    return newObj
  }
}