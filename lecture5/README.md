# 💻 TypeScript-Lecture-5
5강에 주요내용

<br />

## 👨🏻‍💻 배열 이해하기
### 🏃 자바스크립트에서 배열은 객체다
- 자바스크립트에서 배열은 다른 언어와 다르게 객체이다.
- 배열은 Array 클래스의 인스턴스인데, 클래스의 인스턴스는 객체이기 때문이다.

<br />

### 🏃 배열의 타입
- 타입스크립트에서 배열의 타입은 `아이템 타입[]`이다.
- 예를 들어, 배열의 아이템이 `number`타입이면 배열의 타입은 `number[]`이고, 아이템이 `string`타입이면 `string[]`이다.
```js
  let numArray: number[] = [1, 2, 3];
  let strArray: string[] = ['Hello', 'World'];

  type IPerson = {
    name: string;
    age?: number;
  }

  let personArray: IPerson[] = [{ name: 'Jack' }, { name: 'Jeon', age: 32 }];
  
  console.log(personArray); //[{ name: 'Jack' }, { name: 'Jeon', age: 32 }]
```

<br />

### 🏃 문자열과 배열 간 변화
- 타입스크립트에서는 문자 타입이 없고 문자열의 내용 또한 변경할 수 없다. 이러한 특징 때문에 문자열을 가공하려면 먼저 문자열을 배열로 전환해야 한다.
- 보통 문자열을 배열로 전환할 때는 `String`클래스의 `split` 메서드를 사용한다.
- `split`메서드는 문자열을 쪼개는 기준이 `구분자(delimiter)`를 입력받아 문자열을 `string[]`배열로 만들어 준다.
```ts
  const split = (str: string, delim: string = ''): string[] => str.split(delim);

  console.log(split('hello')); //[ 'h', 'e', 'l', 'l', 'o' ]
  console.log(split('h_e_l_l_o', '_')); //[ 'h', 'e', 'l', 'l', 'o' ]
```

<br />

- `join` 함수는 매개 변수로 전달받은 `string[]` 타입 배열과 구분자를 이용해 `String`클래스의 `join`메서드를 호출함으로써 문자와 구분자를 결합한 새 문자열을 반환한다.
```ts
  const join = (strArray: string[], delim: string = ''): string => strArray.join(delim);

  console.log(join(['h', 'e', 'l', 'l', 'o'])); 
  console.log(join(['h', 'e', 'l', 'l', 'o'], '_'));
```

<br />

### 🏃 인덱스 연산자
```ts
  const numbers: number[] = [1, 2, 3, 4, 5];
  
  for (let i = 0; i < numbers.length; i++) {
    const item: number = numbers[i];
    console.log(item);
  }
```

<br />

### 🏃 제네릭 방식 타입
- 배열을 다루는 함수를 작성할 때는 `number[]`와 같이 타입이 고정된 함수를 만들기보다는 `T[]`형태로 배열의 아이템 타입을 한꺼번에 표현하는 것이 편리하다.
- 타입을 `T`와 같은 일종의 변수로 취급하는 것을 `제네릭(Generics)타입` 이라고 한다.
- `number[]`, `string[]`, `IPerson[]` 등 다양한 아이템 타입을 가지는 배열에 똑같이 적용되게 하려면 다음처럼 배열의 타입 주석을 `T[]`로 표현한다.
```ts
  const arrayLength = (array: T[]): number => array.length;
```
- 위와 같은 코드로 짜면 `컴파일러`가 `T`의 의미를 알 수 있어야 한다. 즉, `T`가 `타입 변수(type variable)`라고 알려줘야 한다.

<br />

```ts
  const arrayLength = <T>(array: T[]): number => array.length;
  const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) === 0;

  let numArray: number[] = [1, 2, 3];
  let strArray: string[] = ['Hello', 'World'];

  type IPerson = { 
    name: string;
    age?: number; 
  }

  let PersonArray: IPerson[] = [{ name: 'Jack' }, { name: 'Jeon', age: 32 }];

  console.log(arrayLength(numArray));
  console.log(arrayLength(strArray));
  console.log(arrayLength(PersonArray));
  console.log(isEmpty([]));
  console.log(isEmpty([1]));
```

<br />

### 🏃 제네릭 함수의 타입 추론
```ts
  const identity = <T>(n: T): T => n;

  console.log(identity<boolean>(true)); //true
  console.log(identity(true)); //true
```
- 보통 제네릭 형태로 구현된 함수는 원칙적으로는 `identity<boolean>(true)`처럼 `타입 변수`를 다음과 같은형태로명시해 주어야 한다.
- 하지만 타입스크립트는 타입 변수 부분을 생략할 수 있게 한다. 타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 `타입 추론`을 통해 생략된 타입을 찾아낸다.

