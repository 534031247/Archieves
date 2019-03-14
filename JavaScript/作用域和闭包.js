// function f () {
//   // let num = 1
//   num = 1
//   function add () {
//     num += 1
//     return add
//   }
//   function print () {
//     console.log(num)
//     return print
//   }
//   return { add, print }
// }
// const { add } = f()
// const { print } = f()
// print()
// add()
// print()

// arr = []
// for (var i = 0; i < 10; ++i) {
//   arr[i] = (function () {
//     var temp = i
//     var f = function () {
//       console.log(temp)
//     }
//     return f
//   })()
// }
// arr[3]()
function f() {
	let num = 1 // 里面的变量
	function add() {
		num += 1
	}
	function log() {
		console.log(num)
	}
	return { add, log } // 我要到外面去了
}

const { add, log } = f()

log() // 1 我从里面来，我在外面被调用，还是可以获得里面的变量
add()
log() // 2