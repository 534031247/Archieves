// const obj = {
//     toString () {
//         return '123'
//     }
// }
// const s = Symbol(obj)
// console.log(s)
// console.log(obj.toString())

// const a = {
//     [s]: '你好！'
// }
// console.log(a[s])
// const log = {}
// log.levels = {
//     DEBUG: Symbol('debug'),
//     INFO: Symbol('info'),
//     WARN: Symbol('warn')
// }
// console.log(log.levels.DEBUG === log.levels.WARN)
// console.log(log.levels.INFO)

const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);
// console.log(objectSymbols)

let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
console.log(s1 === s2)