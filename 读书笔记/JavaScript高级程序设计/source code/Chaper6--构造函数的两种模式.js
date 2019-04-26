// ES2015写法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // this.sayName = function () {
    //   console.log(this.name)
    // }

    this.sayName = sayName
  }
}

const person1 = new Person('Yeoman', 22)
const person2 = new Person('LiYiMing', 18)
person1.sayName()
console.log(person1.constructor === Person)
console.log(person1.constructor == person2.constructor)
console.log(person1.sayName == person2.sayName)
/*
  构造函数的每个方法都要在每个实例上重新创建一遍，
  所以person1和person2的sayName这个Function对象
  不相同
*/

// 解决方案
function sayName () {
  console.log(this.name)
}

/*
  但是这样的问题是：全局作用域中定义的函数只能被某个对象调用。
  并且如果对象需要定义很多方法，那么就要定义很多全局函数，
  于是我们这个自定义的引用类型就丝毫没有封装性可言了。
*/

// console.log(Person.prototype.isPrototypeOf(person1))
// console.log(Person.prototype.isPrototypeOf(person2))
console.log(Object.getPrototypeOf(person1))
console.log(Object.getPrototypeOf(sayName))
console.log(person1.hasOwnProperty('name'))

// 原型模式
class Car {
  constructor() { }
}
// Car.prototype.brand = 'Benz'
// Car.prototype.isNew = true
// Car.prototype.sayBrand = function () {
//   console.log('this.brand')
// }
Car.prototype = {
  constructor: Car,
  brand: 'Benz',
  isNew: true,
  sayBrand: function () {
    console.log(this.brand)
  }
}
let car1 = new Car()
let car2 = new Car()

const hasPrototypeProperty =  (obj, name) => {
  return !obj.hasOwnProperty(name) && (name in obj)
}

console.log(car1.hasOwnProperty('brand'))
console.log('原型有：' + hasPrototypeProperty(car1, 'brand'))
console.log('brand' in car1)
car1.brand = 'Audio'
console.log(car1.hasOwnProperty('brand'))
console.log('原型有：' + hasPrototypeProperty(car1, 'brand'))
delete car1.brand
console.log(car1.hasOwnProperty('brand'))
console.log('原型有：' + hasPrototypeProperty(car1, 'brand'))