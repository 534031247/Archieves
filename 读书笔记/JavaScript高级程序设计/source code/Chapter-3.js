// let arr = [0,1,2,3,4];
// for (temp of arr) {
//   switch (temp) {
//     case 0:
//       console.log("0");
//       break;
//     case 1:
//       console.log("0 and 1");
//       break;
//     case 2:
//       console.log("2");
//       break;
//     default:
//       console.log("default");
//       break;
//   }
//   console.log(typeof(temp));
// }
// console.log(arr instanceof Array);
// console.log(typeof arr);
// // var str = "dsfsd";
// var str = new String("dfsd");
// console.log(str instanceof String);
// console.log(typeof str);
// var str2 = "sdfds";
// console.log(typeof str2);
// console.log(str2 instanceof String);

// function fun(args) {
//   var output = '';
//   if (typeof args.name == 'string')
//     output += 'Name' + args.name + '\n';
//   if (typeof args.age == 'number')
//     output += 'Age' + args.age + '\n';
//   console.log(output);
// }
// fun({});
// fun({
//   name: 'yeoman'
// })
// fun({
//   name: 'lym',
//   age: 21
// })

// var arr1 = ['res', 'red'];
// console.log(arr1.toString())
// console.log(arr1.join())
// console.log(arr1.join('...'))

// var arr2 = [1, 2, 3, 5, 4, 2];
// arr2.sort((a, b) => {
//   if (a < b)  return -1
//   else if (a > b) return 1
//   else  return 0
// })
// console.log(arr2)
// console.log(arr2.reverse())
// console.log(arr2.join('....').split('....').toString())

// var add = function (num) {
//   return num + 100
// }
// function add2 (num) { return num + 200 }
// console.log(typeof add2)
// console.log(add2 instanceof Function)

// const arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];
// const compact = arr => arr.filter(Boolean).toString();
// console.log(compact(arrContainsEmptyVal));

// const randomStr = "hdjrwqpei";
// const isVowel = char => ['a', 'e', 'i', 'o', 'u'].includes(char);
// const isContainVowel = str => [...str].some(isVowel);
// console.log(isContainVowel(randomStr));
// console.log([...randomStr]);

// 找出第一个未成年人
// const users = [
//   { name: "Jim", age: 23 },
//   { name: "Lily", age: 17 },
//   { name: "Will", age: 12 }
// ];
// const findTeen = users => users.find(user => user.age < 18);
// console.log(findTeen(users));

// const arr = [1,2]
// console.log(...arr)

// const data = [{name: 'lym', age: 12}, {name: 'yeoman', age: 11}, {name: 'li', age: 22}]
// function Cmp (propertyName) {
//   return function (obj1, obj2) {
//     let a = obj1[propertyName]
//     let b = obj2[propertyName]
//     if (a > b)  return -1
//     else if (a == b)  return 0
//     else  return 1
//   }
// }
// console.log(data.sort(Cmp('age')))