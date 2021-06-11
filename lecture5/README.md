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

<br />

## 👨🏻‍💻 배열의 filter, map, reduce,
### 🏃 filter
- filter 메서드는 `콜백 함수`의 결과 값을 `true`로 만드는 원소들로만 구성된 `별도의 배열`을 반환한다. 
```ts
  filter(callback: (value: T, index?: number): boolean): T[];
```
```ts
  const numList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let odd: number[] = numList.filter(value => value % 2 !== 0); 
  let even: number[] = numList.filter(value => value % 2 === 0); 

  console.log(odd); //[ 1, 3, 5, 7, 9 ]
  console.log(even); //[ 2, 4, 6, 8, 10 ]
```

<br />

### 🏃 map
- 배열의 각 원소별로 지정된 함수를 실행한 결과로 구성된 `새로운 배열`을 `반환`한다.
- forEach와 비슷하게 작동하지만 forEach는 새로운 배열을 반환하지 않음.
- map 메서드는 filter와 다르게 입력 타입과 다른 타입의 배열을 만들 수 있다.
```ts
  map(callback: (value: T, index?: number): Q): Q[];
```
```ts
  let squers: number[] = [1, 2, 3, 4, 5]

  squers = squers.map((value:number) => value * value);

  console.log(squers); //[ 1, 4, 9, 16, 25 ]
```

<br />

### 🏃 reduce
- `누산기(accumulator)`및 `배열의 각 값(좌에서 우)`에 대해 (누산된)`한 값`으로 줄도록 함수를 적용
```ts
  reduce(callback: (result: T, value: T), initialValue: T): T
```
```ts
  let reduceSum: number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .reduce((result: number, value: number) => result + value);

  console.log(reduceSum); //55
```

<br />

## 👨🏻‍💻 순수 함수와 배열
### 🏃 순수 함수
- 순수 함수는 `부수 효과(side-effect)`가 없는 함수를 말한다.
- 부수 효과란 함수가 가진 고유한 목적 이외에 다른 효과가 나타나는 것을 의미하며 `부작용`이라고 한다.
- 부수 효과가 있는 함수는 `불순 함수(impure function)`라고 한다.
- 다음은 순수 함수의 조건이다.
```
  1. 함수 몸통에 입출력 관련 코드가 없어야 한다.
  2. 함수 몸통에는 매개 변수 값을 변경시키지 않는다.(즉, const나 readonly 형태로만 사용한다)
  3. 함수는 몸통에서 만들어진 결과를 즉시 반환한다.
  4. 함수 내부에 전역 변수나 정적 변수를 사용하지 않는다.
  5. 함수가 예외를 발생시키지 않는다.
  6. 함수가 콜백 함수로 구현되었거나 함수 몸통에 콜백 함수를 사용하는 코드가 없다.
  7. 함수 몸통에 Promise와 같은 비동기 방식으로 동작하는 코드가 없다.
```

<br />

### 🏃 깊은 복사와 얕은 복사
- 프로그래밍 언어에서 어떤 변숫값을 다른 변숫값으로 설정하는 것을 복사(copy)라고 표현한다.
- 복사에는 `깊은 복사(deep-copy`와 `얕은 복사(shallow-copy)` 두 종류가 있다.
- 순수 함수를 구현할 때 매개변수가 `불변성을 유지`해야 하므로, 매개변수를 가공하려고 할 때 `깊은 복사`를 실행해 매개 변수 값이 변경되지 않게 해야 한다.
- 깊은 복사는 대상 변수 값이 바뀔 때 `원본 변수 값은 그대로인 형태로 동작`한다.

<br />

### 🏃 전개 연산자와 깊은 복사
- 배열에서 `전개 연산자(...)`를 사용해 배열을 복사하면 깊은 복사를 할 수 있다.
```ts
  const oArray: number[] = [1, 2, 3, 4];
  const deepCopiedArray: number[] = [...oArray];
  deepCopiedArray[0] = 0;
  console.log(oArray, deepCopiedArray) //[1, 2, 3, 4] [0, 2, 3, 4]
```

<br />

- Array클래스는 sort메서드를 제공한다. 그런데 sort 메서드는 원본 배열의 내용을 변경한다.
```ts
  export const pureSort = <T>(array: readonly T[]): T[] => {
    let deepCopied = [...array];
    return deepCopied.sort();
  }

  let beforeSort: number[] = [6, 2, 9, 0];
  const afterSort = pureSort<number>(beforeSort);

  console.log(beforeSort, afterSort); //[ 6, 2, 9, 0 ] [ 0, 2, 6, 9 ]
```
- 다음 `pustSort 함수`는 readonly 타입으로 입력 배열의 내용을 유지한 채 정렬할 수 있도록 `전개 연산자`의 깊은 복사 기능을 사용했다.

<br />

## 👨🏻‍💻 튜플
- 자바스크립트에서는 튜플이 없으며 단순히 배열의 한 종류로 취급된다.
- `any[]`의 형태는 타입스크립트의 타입 기능을 무력화하므로, 타입스크립트는 튜플의 타입 표기법을 배열과 다르게 선언한다.
```ts
  const array: number[] = [1, 2, 3, 4];
  const tuple: [boolean, string] = [true, 'thje result is ok'];
```

<br />

- 보통 튜플을 사용할 때는 `타입 별칭(alias)`으로 튜플의 의미를 명확하게 한다.
- 예를 들어, `[boolean, string]`이라고 타입을 지정하는 것보다 다음 처럼 타입 별칭을 사용해 이 튜플이 어떤 용도로 사용되는지 좀 더 분명하게 알려주는 것이 좋다.
```ts
  type ResultType =[boolean, string];

  const array: number[] = [1, 2, 3, 4];
  const tuple: ResultType = [true, 'the result is ok'];
```

<br />