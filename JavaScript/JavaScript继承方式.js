// // 原型链继承
// function Person (name, age) {
//   this.name = name,
//   this.age = age,
//   this.play = [1, 2, 3],
//   this.setName = function () {}
// }

// Person.prototype.setAge = function () {}

// // 子类型
// function Student (price) {
//   this.price = price
//   this.setScore = function () {}
// }

// Student.prototype = new Person()

// const s1 = new Student(120000)
// const s2 = new Student(100000)

// s1.play.push(4)
// console.log('s1', s1.play)
// console.log('s2', s2.play)

// // 组合继承
// function Person (name) {
//   this.name = name
//   this.play = [1, 2, 3]
// }

// Person.prototype.sayName = function () {
//   console.log(this.name)
// }

// function Student (name, age) {
//   Person.call(this, name)
//   this.age = age
// }

// Student.prototype = new Person()
// Student.prototype.constructor = Student
// Student.prototype.sayAge = function () {
//   console.log(this.age2)
// }

// const s1 = new Student('Yeoman', 21)
// const s2 = new Student('LYM', 17)
// s1.play.push(4)

// console.log(s1.play)  //  [ 1, 2, 3, 4 ]
// console.log(s2.play)  //  [ 1, 2, 3]

// s1.sayName()  //  Yeoman
// s2.sayName()  //  LYM

// 寄生组合继承
function inheritPrototype(subType, superType) {
  const prototype = Object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function Person (name) {
  this.name = name
  this.play = [1, 2, 3]
}

Person.prototype.sayName = function () {
  console.log(this.name)
}

function Student (name, age) {
  Person.call(this, name)
  this.age = age
}

inheritPrototype(Student, Person)
Student.prototype.sayAge = function () {
  console.log(this.age)
}

const s1 = new Student('Yeoman', 21)
const s2 = new Student('LYM', 17)
s1.play.push(4)

console.log(s1.play)  //  [ 1, 2, 3, 4 ]
console.log(s2.play)  //  [ 1, 2, 3]

s1.sayName()  //  Yeoman
s2.sayName()  //  LYM