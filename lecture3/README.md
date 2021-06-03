# 💻 TypeScript-Lecture-3
3강에 주요내용

<br />

## 👨🏻‍💻 타입스크립트 변수 선언문
### 🏃 타입스크립트 기본 제공 타입
<table>
  <th>
    <td>자바스크립트</td>
    <td>타입스크립트</td>
  </th>
  <tr>
    <td>수 타입</td>
    <td>Number</td>
    <td>number</td>
  </tr>
  <tr>
    <td>불리언 타입</td>
    <td>Boolean</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>문자열 타입</td>
    <td>String</td>
    <td>string</td>
  </tr>
  <tr>
    <td>객체 타입</td>
    <td>Object</td>
    <td>object</td>
  </tr>
</table>

<br />

### 🏃 타입 주석
- 타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시할 수 있습니다. 이를 `타입 주석(Type Annotation)`이라고 한다.
- 타입스크립트는 자바스크립트와 다르게 `let`으로 선언한 변수 값은 `타입 주석`으로 명시한 타입에 해당하는 값으로만 바꿀 수 있다.
```ts
  let n: number = 1;
  let b: boolean = true;
  let s: string = "hello";
  let o: object = {};

  n = 'a'; // 타입 불일치 오류
  b = 1; //타입 불일치 오류
  s = false; //타입 불일치 오류
  o = { name: 'Jeon', age: 32 };
```

<br />

### 🏃 타입 추론
- 타입스크립트는 자바스크립트와 호환성을 위해 타입 주석 부분을 생략할 수 있다.
- 타입스크립트 컴파일러는 대입 연산자(=) 오른쪽 값에 따라 변수 타입을 지정한다. 이를 `타입 추론(Type Inference)`이라 한다.
- 즉, 변수 선언문에 타입 주석을 명시하지 않았지만, 컴파일러가 초깃값에 따라 타입을 추론하므로 각 변수는 초깃값에 해당하느 타입으로 지정된다. 따라서, 이후에 각 변수에는 해당 타입의 값만 저장할 수 있다.
```ts
  let n = 1; //n의 타입을 number로 판단
  let b = true; //b의 타입을 boolean으로 판단
  let s = 'hello'; //s의 타입을 string으로 판단
  let o = {} //o의 타입을 object로 판단
```

<br />

### 🏃 any 타입
- 타입스크립트는 자바스크립트와 호환을 위해 any라는 이름의 타입을 제공한다.
- any타입은 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있다.
```ts
  let a: any = 0;
  a = 'hello';
  a = true;
  a = {};
```

<br />

### 🏃 undefined 타입
- 자바스크립트에서 `undefined`는 값이다. 변수를 초기화하지 않으면 해당 변수는 `undefined`값을 가진다.
- 타입스크립트에서는 `undefined`는 타입이기도 하고 값이기도 한다.
```ts
  let u: undefined = undefined;
  u = 1; //Type '1' is not assignable to type 'undefined' 오류 발생
```

<br />
<br />

### 🏃 타입스크립트 타입 계층도
- 타입의 상속 관계를 보면 `any`는 모든 타입의 루트 타입, 즉 최상위 타입이다.
- `undefined`는 모든 타입의 최하위 타입이다.

![타입계층도](https://user-images.githubusercontent.com/64779472/120641173-4079a680-c4ae-11eb-90c3-09847ecea769.PNG)

<br />

## 👨🏻‍💻 객체와 인터페이스
- `object`타입은 `인터페이스`와 `클래스`의 상위 타입이다.
- object타입으로 선언된 변수는 number, boolean, string 타입의 값을 가질 수 없지만, 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있다.
```ts
  let o: object = { name: 'Jeon', age: 32 };
  o = { 
    first: 1, 
    second: 2, 
    third: [1, 2, 3, 4], 
    fourth: { a: 1, b: 2 },
    fifth: false,
  };

  /* 
    출력
    { 
      first: 1, 
      second: 2, 
      third: [1, 2, 3, 4], 
      fourth: { a: 1, b: 2 }, 
      fifth: false 
    }
  */
```

<br />

### 🏃 인터페이스 선언문
- 타입스크립트는 객체의 타입을 정의할 수 있게 하는 `interface`라는 키워드를 제공한다.
- 인터페이스는 `객체의 타입을 정의`하는 것이 목적이므로 다음처럼 객체를 의미하는 `중괄호({})`로 속성의 이름과 타입을 나열하는 형태로 사용한다.
- 인터페이스 속성들을 여러 주로 구현할 때는 `쉼표(,)`대신 `세미콜론(;)`을 구분자로 쓰거나 단순히 `줄바꿈`만해도 된다.
```ts
  interface IPerson {
    name: string;
    age: number;
  }
```

<br />

- IPerson `인터페이스의 목적`은 name과 age라는 이름의 속성이 둘다 있는 객체만 유효하도록 `객체의 타입 범위를 좁히는데 있다.`
- 따라서 아래 코드처럼 IPerson 인터페이스의 조건을 벗어나는 코드를 오류가 발생한다. 
```ts
  interface IPerson {
    name: string;
    age: number;
  }

  let good: IPerson = { name: 'Jeon', age: 27 };
  
  let bad1: IPerson = { name: 'Jeon' }; // age 속성이 없어서 오류
  let bad2: IPerson = { age: 27 }; //name 속성이 없어서 오류
  let bad3: IPerson = {}; //name과 age가 없어서 오류
  let bad4: IPerson = { name: 'Jeon', age: 27, etc: true }; //etc 속성이 있어서 오류
```

<br />

### 🏃 선택 속성 구문
- 인터페이스를 설계할 때 어떤 속성은 반드시 있어야 하지만, 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때가 있다. 이러한 속성을 `선택 속성(Option Property)`이라 한다.
- 선택 속성은 `물음표 기호(?)` 붙여서 만든다.
```ts
  interface IPerson {
    name: string;
    age: number;
    etc?: boolean;
  }
```

<br />

### 🏃 익명 인터페이스
- 타입스크립트는 `interface`키워드로 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있다. 이를 `익명 인터페이스(anonymous interface)`라고 한다.
```ts
  let ai: {
    name: string;
    age: number;
    etc?: boolean
  } = { name: 'Jeon', age: 32 };

  //함수에서 사용된 익명 인터페이스
  function printMe(me: { name: string, age: number, etc?: boolean }) {
    console.log(me.etc ? `${me.name} ${me.age} ${me.etc}` : `${me.name} ${me.age}`);
  }

  printMe(ai);
```

<br />

## 👨🏻‍💻 객체와 클래스
### 🏃 클래스 선언문
- 타입스크립트는 C++이나 자바와 같은 객체지향 언어에서 흔히 볼 수 있는 class, private, public, protected, implements, extend와 같은 키워드를 제공한다.
```ts
  //이 코드는 TSError가 뜨는 코드임 교육용으로 작성된 것을 참고 바람

  //name과 age라는 속성을 가진 클래스를 선언
  class Person1 {
    name: string;
    age?: number;
  }

  let jeon1: Person1 = new Person1();

  jeon1.name = 'Jeon';
  jeon1.age = 32;

  console.log(jeon1); // Person1 { name: 'Jeon', age: 32 }
```
- 위 코드는 Person1 클래스에 `new 연산자`를 적용해 jeon1라는 이름의 Person1타입 변수를 만든다.
- jeon1은 name과 age 속성을 가지는 타입이므로 `jeon1.name = 'Jeon'; jeon1.age = 32;`과 같이 작성할 수 있다.

<br />

### 🏃 접근 제한자
- 클래스의 속성은 public, private, protect와 같은 `접근 제한자(access modifier)`를 이름 앞에 붙일 수 있다.
- 생략하면 모두 `public`으로 간주한다.

<br />

### 🏃 생성자
- 타입스크립트 클래스는 constructor라는 이름의 특별한 메서드를 포함하는데, 이를 `생성자(Constructor)`라고 한다.
- 타입스크립트 클래스는 아래와 같은 형태로 클래스의 속성(name, age)을 선언할 수 있다.
```ts
  class Person2 {
    constructor(public name: string, public age?: number) {}
  }

  let jeon2: Person2 = new Person2('Jeon', 32);
  console.log(jeon2); // Person2 { name: 'Jeon', age: 32 }
```
- 타입스크립트는 생성자의 매개변수에 public과 같은 접근 제한자를 붙이면 해당 매개변수의 이름을 가진 속성이 클래스에 선언된 것처럼 동작한다.
- 즉, Person2는 밑에 코드에서 Person3 클래스처럼 장황하게 구현된 것을 함축해서 구현한 것이다.
```ts
  class Person3 {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
  }

  let jeon3: Person3 = new Person3('Jeon', 32);
  console.log(jeon3); // Person3 { name: 'Jeon', age: 32 }
```

<br />

### 🏃 인터페이스 구현
- 타입스크립트는 다른 객체지향 언어와 마찬가지로 인터페이스를 구현할 수 있다.
- 인터페이스를 구현할 때는 다음처럼 `implements` 키워드를 사용한다.
```ts
  interface IPerson4 {
    name: string;
    age?: number;
  }

  class Person4 implements IPerson4 {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
  }

  let jeon4: Person4 = new Person4('Jeon', 32);
  console.log(jeon4); // Person4 { name: 'Jeon', age: 32 }
```
- 다음 코드에서 기억해야 될 점은 인터페이스는 이러이러한 속성이 있어야 한다는 `규약(spec)`에 불과한다. 즉, 물리적으로 해당 속성을 만들지 않는다는 점이다.
- 따라서 클래스 몸통에 반드시 인터페이스가 정의하고 있는 속성을 `멤버 속성으로 포함`해야 한다.

<br />

### 🏃 추상 클래스와 클래스의 상속
- 타입스크립트는 다른 언어처럼 `abstract`키워드를 사용해 추상 클래스를 만들 수 있다.
- 추상 클래스는 `abstract` 키워드를 `class`키워드 앞에 붙여서 만든다.
- 추상 클래스는 자신의 속성이나 메서드 앞에 `abstract`를 붙여 나를 상속하는 다른 클래스에서 이 속성이나 메서드를 구현하게 한다.
- 타입스크립트는 클래스의 상속은 `extends` 키워드를 사용해 상속 클래스를 만든다.
```ts
  abstract class AbstractPerson5 {
    abstract name: string;
    age?: number;
  
  constructor(age?: number) {
    this.age = age;
  }
}

  class Person5 extends AbstractPerson5 {
    name: string;

    constructor(name: string, age?: number) {
      super(age);
      this.name = name;
    }
  }

  let jeon5: Person5 = new Person5('Jeon', 32);
  console.log(jeon5);
```
- 위 코드에서 Person5 클래스는 AbstractPerson5 추상 클래스를 상속해 AbstractPerson5가 구현한 `age`를 얻고, AbstractPerson5를 상속받는 클래스가 구현해야 할 `name `속성을 구현한다.
- 타입스크립트에서 부모 클래스의 생성자(Constructor)를 `super 키워드`로 호출할 수 있다. 


<br />

### 🏃 static 속성
- 타입스크립트 클래스는 정적인 속성을 가질 수 있다.
- 정적 속성은 `클래스 이름.정적 속성 이름`형태의 `점 표기법(dot notation)`을 사용해 값을 얻거나 설정한다.
```ts
  class A {
    static initValue = 1;
  }

  let initVal = A.initValue;

  console.log(initVal);
```

<br />

## 👨🏻‍💻 객체의 구조화와 비구조화 할당
- 인터페이스나 클래스를 사용해 관련된 정보를 묶어 새로운 타입으로 표현하는 것을 `구조화(structuring)`이라고 한다.
```ts
  export interface IPerson {
    name: string;
    age: number;
  }

  export interface ICompany {
    name: string;
    age: number;
  }
```
- 코드를 위에 처럼 구조화하면 아래 코드처럼 비슷한 유형의 변수를 쉽게 만들 수 있고, 코드의 기능 확장이 수월하다.
- 비구조화 할당도 포함되어 있는데, 비구조화 할당은 name과 age 변수가 `새롭게 만들어지고`, name 변수는 jeon.name의 값, age 변수는 jeon.age의 값을 각각 `초깃값으로 할당` 받는다.
<br />

```ts
import { IPerson, ICompany } from './IPerson_ICompany';

let jeon: IPerson = { name: 'Jeon', age: 27 };
let ject: IPerson = { name: 'Ject', age: 32 };

let apple: ICompany = { name: 'Apple Computer', age: 43 };
let ms: ICompany = { name: 'Micosoft', age: 44 };

//비구조화 할당
let { name, age } = jeon;

console.log(name, age); //Jeon 27
```

<br />

### 🏃 잔여 연산자와 전개 연산자
- 잔여 연산자 예제
```ts
  let address: any = {
    country: 'KOREA',
    city: 'SEOUL',
    address1: 'GANGNAM',
    address2: 'SINSA-DONG',
    address3: '789 STREET',
  };

  const { country, city, ...detail } = address;
  console.log(detail); // { address1: 'GANGNAM', address2: 'SINSA-DONG', address3: '789 STREET' }
```

<br />

- 전개 연산자 예제
```ts
  let part1: object = { name: 'jeon' };
  let part2: object = { age: '22' };
  let part3: object = { city: 'seoul', country: 'KR' };

  let merged = { ...part1, ...part2, ...part3 };

  console.log(merged); // { name: 'jeon', age: '22', city: 'seoul', country: 'KR' }
```

<br />

## 👨🏻‍💻 객체의 타입 변환
- 타입이 있는 언어들은 특정 타입의 변수 값으로 다른 타입의 값으로 변화할 수 있는 기능을 제공합니다. 이를 `타입 변환(type conversion)`이라고 한다.
```ts
  let person: object = { name: 'jeon', age: 32 };
  console.log(person.name); // 오류! 
```
- 위 코드는 person의 변수 타입은 object이다. 그런데 object 타입은 name 속성을 가지지 않으므로 오류가 발생한다.

<br />

```ts
  let person: object = { name: 'jeon', age: 32 };
  console.log((<{name: string}>person).name);  //jeon
```
- 위에 오류난 코드를 타입 변환 구문을 사용해 해결한 코드이다. person 변수를 일시적으로 name 속성이 있는 타입, 즉 `{ name: string }` 타입으로 변화해 person.name 속성 값을 얻게 했다.

<br />

### 🏃 타입 단언
- 타입스크립트는 독특하게 타입 변환이 아닌 `타입 단언(type assertion)`이라는 용어를 사용한다.
- 타입 단언문은 다음 두가지 형태가 있다.
```
  (<타입>객체)
  (객체 as 타입)
```

<br />

- 타입 단언 예제
```ts
  export default interface INameable {
    name: string;
  }
```

```ts
  import INameable from './INameable';

  let obj: object = { name: 'Jeon' };

  let name1 = (<INameable>obj).name;
  let name2 = (obj as INameable).name;

  console.log(name1, name2) //Jeon Jeon
```

<br />