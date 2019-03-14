// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'timeout!')
//     })
// }

// timeout(2000).then((msg) => console.log(msg))
// function fun() {
//     return new Promise((res, rej) => {
//         return res(1)
//         console.log('test')
//     })
// }
// fun().then(msg => console.log(msg))
const p1 = new Promise((res, rej) => {
    setTimeout(() => res(new Error('fail')), 500)
})

const p2 = new Promise((res, rej) => {
    setTimeout(() => res(p1), 1000)
})

p2.then(msg => console.log('msg'))
  .catch(err => console.log(err))