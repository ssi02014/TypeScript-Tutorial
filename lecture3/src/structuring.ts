import { IPerson, ICompany } from './IPerson_ICompany';

let jeon: IPerson = { name: 'Jeon', age: 27 };
let ject: IPerson = { name: 'Ject', age: 32 };

let apple: ICompany = { name: 'Apple Computer', age: 43 };
let ms: ICompany = { name: 'Micosoft', age: 44 };

//비구조화 할당
let { name, age } = jeon;

console.log(name, age);
