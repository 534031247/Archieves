// const tmp = addrs => `
//   <table>
//     ${ addrs.map(addr => `
//       <tr><td>${ addr.first }</td></tr>
//       <tr><td>${ addr.last }</td></tr>
//     `).join('') }
//   </table>
// `
// const data = [
//   { first: '<Jane>', last: 'Bond' },
//   { first: '<Jane>', last: '<sdfdsf>' }
// ]
// console.log(tmp(data))
// const str = 'return ' + '`Hello ${ name }!`'
// const fun = new Function('name', str)
// console.log(fun('world'))
// const a = 10
// const b = 5
// function tag(s, v1, v2) {
//   console.log(s[0])
//   console.log(s[1])
//   console.log(s[2])
//   console.log(v1)
//   console.log(v2)
// }
// tag `Hello${ a + b }World!${ a * b }`
const total = 30
function figureTax(literals) {
  let res = ''
  // for ( let i = 0; i < literals.length; ++i) {
  //   res += literals[i]
  //   if (i < arguments.length) {
  //     res += arguments[i]
  //   }
  // }
  let i = 0
  while (i < literals.length) {
    res += literals[i++]
    if (i < arguments.length) {
      res += arguments[i]
    }
  }
  // return res
  return arguments
}
// const res = figureTax`Your tax is (${ total * 0.15 } with tax!)`
// console.log(res)

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // // Escape special characters in the substitution.
    // s += arg.replace(/&/g, "&amp;")
    //         .replace(/</g, "&lt;")
    //         .replace(/>/g, "&gt;");

    // // Don't escape special characters in the template.
    // s += templateData[i];
    console.log(arg)
  }
  return s;
}
// const sender = `<script>console.log('test')</script>`
// console.log(SaferHTML`<p>${ sender } has sent you a message.</p>`)
function trusty (left, right, result) {
  if (Number.isSafeInteger(left) && Number.isSafeInteger(right) && Number.isSafeInteger(result)) {
    return result
  } else  throw new RangeError('Operation cannot be trusted!')
}
// const res = trusty(9007199254740993, 990, 9007199254740993 - 990)
const res = trusty(1, 2, 1 + 2)
// console.log(res)
const arr = [1, 2, 3]
const arr2 = arr.map(item => item * 2)
const arr3 = arr2.sort((a, b) => b - a)
console.log(arr3)