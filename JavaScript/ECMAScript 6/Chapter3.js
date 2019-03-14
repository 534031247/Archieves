// function * fibs () {
//   let a = 0
//   let b = 1
//   while (true) {
//     yield a
//     [a, b] = [b, a + b]
//   }
// }
// let [first, second, third, fourth, fifth, sixth] = fibs()
// console.log(first)
// let [x, y] = [1, 2]
// console.log(y)
// [[1, 2], [3, 4]].map(([a, b]) => console.log(a + b))
const str = 'As sly as a fox, as strong as an ox'
const target = 'as'
let pos = -1
while((pos = str.indexOf('as', pos + 1)) != -1) console.log(pos)