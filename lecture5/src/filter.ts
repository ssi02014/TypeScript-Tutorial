import { range } from './range';

const numList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let odd: number[] = numList.filter(value => value % 2 !== 0); 
let even: number[] = numList.filter(value => value % 2 === 0); 

console.log(odd); //[ 1, 3, 5, 7, 9 ]
console.log(even); //[ 2, 4, 6, 8, 10 ]