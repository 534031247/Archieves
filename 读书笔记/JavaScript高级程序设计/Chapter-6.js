// const person = {
//   name: 'lym',
//   age: 20,

//   sayName: function() {
//     console.log(this.name)
//   }

  // 输出undefined
  // sayName: () => {
  //   console.log(this.name)
  // }
// }
// person.name = "yeoman"
// person.sayName()
const book = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book, 'year', {
  get: function() {
    return this._year
  },
  set: function(val) {
    if (val > 2004) {
      this._year = val
      this.edition += val - 2004
    }
  }
})
book.year = 2007
console.log(book.edition)

