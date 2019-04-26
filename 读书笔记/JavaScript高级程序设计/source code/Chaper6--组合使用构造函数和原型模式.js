
// 原型模式也有自己的问题
// function Person () {}
// Person.prototype = {
//   constructor: Person,
//   name: 'Yeoman',
//   age: 22,
//   job: 'student',
//   friends: ['1', '2'],
//   sayName: function () {
//     console.log(this.name)
//   }
// }
// let person1 = new Person()
// let person2 = new Person()
// friends数组存在于Person.prototype中，而非person1中，
// 所以也会修改person2的friends
/*person1.friends.push('3')
console.log(person1.friends)
console.log(person2.friends)
console.log(person1.friends === person2.friends)*/
// 组合使用构造函数模式和原型模式
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.friends = ['1', '2'];
  }
}

Person.prototype = {
  sayName: function () {
    console.log(this.name)
  }
}

let person1 = new Person('lym', 22)
let person2 = new Person('yeoman', 21)

person1.friends.push('3')
console.log(person1.friends)
console.log(person2.friends)
console.log(person1.friends === person2.friends)
console.log(person1.sayName === person2.sayName)