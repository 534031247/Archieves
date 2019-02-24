function test(person) {
    person.age = 0
    person = {
        age: 99,
        name: 'old'
    }
    return person
}
const p1 = {
    name: 'Yeoman',
    age: 21
}
const p2 = test(p1)
console.log(p1)
console.log(p2)
console.log(typeof `123`)

const arr = [1, 2, 3]
console.log(4 + arr)
console.log(4 + arr.toString())
