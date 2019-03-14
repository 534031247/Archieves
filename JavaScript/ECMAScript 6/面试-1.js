// 函数合成
const compose = f => g => x => f(g(x))
const f = compose(x => x * 5)(x => x + 2)
console.log(f(2))

function add (a) {
  let sum = a
  function f (b) {
    sum += b
    return f
  }
  f.toString = function () { return sum }
  return f
}
const res = add(10)(20)(30)
console.log(res)
// alert(res)