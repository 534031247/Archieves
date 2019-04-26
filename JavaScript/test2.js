// function SuperType () {
//   this.property = true
// }

// SuperType.prototype.getSuperValue = function () {
//   // return this.property
//   return true
// }

// function SubType () {
//   this.subproperty = false
// }

// SubType.prototype = new SuperType()

// SubType.prototype = {
//   getSubValue: function () {
//     return this.subproperty
//   },

//   someOtherMethod: function () {
//     return false
//   }
// }

// const instance = new SubType()
// console.log(instance.getSuperValue()) //  error
function SuperType (str) {
  this.data = [1, 2, 3],
  this.str = str
}

function SubType (name) {
  SuperType.call(this, name)
}

const instance1 = new SubType('instance1')
instance1.data.push(4)
console.log(instance1)  //  SubType { data: [ 1, 2, 3, 4 ], str: 'instance1' }

const instance2 = new SubType('instance2')
console.log(instance2)  //  SubType { data: [ 1, 2, 3 ], str: 'instance2' }

// function SubType () { }
// SubType.prototype = new SuperType()

// const instance1 = new SubType()
// instance1.data.push(4)
// console.log(instance1.data) //  [ 1, 2, 3, 4 ]

// const instance2 = new SubType()
// console.log(instance2.data) //  [ 1, 2, 3, 4 ]

var c = 1
function c (c) {
  console.log(c)
}
c(2)