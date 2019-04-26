function Person () {}
Person.prototype.name = 'Yeoman'
Person.prototype.age = 18
Person.prototype.sayName = function () {
  console.log(this.name)
}

const person1 = new Person()
console.log(Person.prototype.constructor)
console.log(person1.__proto__)
console.log(Object.getPrototypeOf(person1) === Person.prototype)
console.log(Object.getPrototypeOf(person1).name)
person1.__proto__.name = 'LYM'
console.log(person1.__proto__.name)
person1.sayName()
// console.log(Object.getOwnPropertyDescriptor(person1, 'sayName'))
console.log(4 & 1)
function Power(base, exponent)
{
  // write code here
  let exp = Math.abs(exponent)
  let r = 1.0
  while (exp) {
    if (exp & 1)  r *= base
    base *= base
    exp >>= 1
  }
  return exponent < 0 ? 1 / r : r
}
// const str = '123456789333fdfdsfdfs'
// const panttern = /\d{1,12}/
// console.log(panttern.test(str))
// const pattern = /^李[\u4e00-\u9fa5]{1,2}$/
// const lym = '李一鸣'
// const lyc = '李欣'
// const cc = '才才'
// console.log(pattern.test(lym))
// console.log(pattern.test(lyc))
// console.log(pattern.test(cc))
person1.sexual = 'male'
console.log('person1', person1)
console.log(Person.hasOwnProperty('sexual'))
console.log(person1.toString())
console.log(Object.prototype.toString.call(person1))

const a = {
  url: 'www'
}
const b = {
  name: 'b',
  url: a
}
console.log(b.url)