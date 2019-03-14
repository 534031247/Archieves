// function ucFirst (str) {
//   return str = str.toUpperCase().slice(0, 1) + str.slice(1)
// }
// let string = 'john'
// console.log(ucFirst(string))
// function checkSpam (str) {
//   str = str.toLowerCase()
//   const res = (-1 != str.indexOf('viagra') || -1 != str.indexOf('xxx')) ? 'true' : 'false'
//   return res
// }
// console.log(checkSpam('innocent rabbit'))
// function truncate (str, length) {
//   // return str = str.slice(0, length) + str.length > length ? '...' : ''
//   const exten = str.length > 20 ? '...' : ''
//   // return str = str.slice(0, length - 1) + exten
//   return str = `"${ str.slice(0, length - 1) }${ exten }"`
// }
// console.log(truncate("What I'd like to tell on this topic is:", 20))
// console.log(truncate("Hi everyone!", 20))
const str = 'Hello world!'

console.log(str.startsWith('Hello', 0))
console.log(str.endsWith('Hello', 5))
