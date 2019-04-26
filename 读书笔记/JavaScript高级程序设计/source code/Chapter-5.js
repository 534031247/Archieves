const data = [{name: 'lym', age: 12}, {name: 'yeoman', age: 11}, {name: 'li', age: 22}]
function Cmp (propertyName) {
  return function (obj1, obj2) {
    let a = obj1[propertyName]
    let b = obj2[propertyName]
    if (a > b)  return -1
    else if (a == b)  return 0
    else  return 1
  }
}
console.log(data.sort(Cmp('age')))

// this.color = 'red'
// const o = { color: 'blue' }
// function sayColor() {
//   console.log(this.color)
// }
// o.sayColor = sayColor
// this.sayColor()
// o.sayColor()
// sayColor.call(this)
// sayColor.apply(this)
// sayColor.call(o)
// sayColor.apply(o)
