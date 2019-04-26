const obj = {
  name: 'Yeoman',
  age: 18,
  a: {
    b: 'origin'
  }
}
// 判断数据类型
function checkType (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
// 深拷贝
function deepClone (target) {
  let res
  const targetType = checkType(target)
  // 首先判断类型
  if ('Object' == targetType) {
    res = {}
  } else if ('Array' == targetType) {
    res = []
  } else {
    return res
  }
  for (let i in target) {
    const value = target[i]
    if ('Object' == checkType(value) || 'Array' == checkType(value)) {
      // 对象、数组，那么就递归遍历取基本类型值
      res[i] = deepClone(value)
    } else {
      res[i] = value
    }
  }
  return res
}

const obj2 = deepClone(obj)
obj2.name = 'LYM'
obj2.age = 23
obj2.a.b = 'change!'

console.log('obj', obj)
console.log('obj2', obj2)
// function changeObj (obj) {
//   obj.name = 'lym'
//   obj.age = 32
//   obj.sex = 'man'
// }

// console.log('obj', obj)
// changeObj(obj)
// console.log('change', obj)

