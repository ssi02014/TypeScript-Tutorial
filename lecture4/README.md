# 💻 TypeScript-Lecture-4
4강에 주요내용

<br />

## 👨🏻‍💻 함수 선언문
- 타입스크립트 함수 선언문은 자바스크립트 함수 선언문에서 매개변수와 함수 반환 값(return type)에 타입 주석을 붙이는 형태로 구성된다.
```ts
  function 함수 이름(매개변수1: 타입1, 매개변수2: 타입2): 반환값 타입 {
    함수 몸통
  }

  function add(a: number b: number): number {
    return a + b
  }
```

<br />

### 🏃 매개변수와 인자
- 일반적으로 `parameter`는 매개 변수라 하고, `argument`는 인수 혹은 인자라고 한다.
- 매개 변수는 함수 선언문에서 함수 이름 뒤 괄호 안에 선언하는 변수이다.
- 인자는 함수를 호출할 때 전달하는 값이다.

<br />

### 🏃 매개변수와 반환값의 타입 주석
- 변수 때와 마찬가지로 함수 선언문에서도 매개변수와 반환값에 대한 `타입 주석`을 생략할 수 있다.
- 하지만 이는 바람직하지 않다. 왜냐하면 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고 잘못 사용하기 쉽기 때문이다.

<br />

### 🏃 void 타입
- `void`는 값을 반환하지 않는 함수의 반환 타입이다.
- `void` 타입은 함수 반환 타입으로만 사용할 수 있다.
```ts
  function printMe(name: string, age: number): void {
    console.log(`name: ${name}, age: ${age}`);
  }
```

<br />

### 🏃 함수 시그니처
- 변수에 타입이 있듯이 함수 또한 타입이 있다. 함수의 타입을 `함수 시그니처(function signature)`라고 한다.
```ts
  let printMe: (string, number) => void = function(name: string, age: number): void {};
```

<br />

### 🏃 type 키워드로 타입 별칭 만들기
- 타입스크립트는 `type`이라는 키워드를 제공한다. `type`키워드는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용하 수 있게 해준다.
- 위와 같은 기능은 `타입 별칭(type alias)`라고 한다.
- 함수의 타입, 즉 함수 시그니처를 명시하면 `매개변수의 개수`나 `타입`, `반환 타입`이 다른 함수를 선언하는 잘못을 미연에 방지할 수 있다.
```ts
  // 타입 생략 (비추천. 특히 함수에서는 타입을 꼼꼼히 달아두자.)
  let test1 = (a, b) => {
    return a + b;
  };

  // 타입 주석
  let test2 = (a: number, b: number): number => {
    return a + b;
  };

  // 함수 시그니처 이용. type 키워드를 이용해 타입 별칭 만듦
  type addNumber = (arg2: number, arg1: number) => number;

  let test3: addNumber = (a, b) => {
    return a + b;
  };
```

<br />

### 🏃 선택적 매개 변수
- 인터페이스의 선택 속성 처럼 함수의 매개변수에도 이름 뒤에 `물음표`를 붙일 수 있다. 이를 `선택적 매개변수(optional parameter)`라고 한다.
```ts
  //타입 주석
  function fn(arg1: string, arg2?: number): void {
    console.log(`arg2: ${arg2}`);
  }

  fn('hello', 1) //arg: 1
  fn('hello') //arg: undefined

  //함수의 시그니처
  type OptionalArgFunc = (string, number?) => void;
```

<br />

## 👨🏻‍💻 함수 표현식
- 프로그래밍 언어에서 `표현식(express)`이라는 용어는 `리터럴(literal)`, `연산자(operator)`, `변수(variable)`, `함수 호출(functionc all)` 등이 복합적으로 구성된 코드 형태를 의미한다.
- 예로 들어, `1 + 2`는 1과 2라는 리터럴과 덧셈 연산자 +로 구성된 표현식이다.
- 표현식은 항상 `컴파일러`에 의해 `계산법(evaluation)`이 적용되어 어떤 값이 된다.

<br />

### 🏃 함수 표현식
```ts
//함수 표현식
  function(a, b) {
    return a + b;
  }
```

<br />

### 🏃 계산법
- 컴파일러는 표현식을 만나면 `계산법(evaluation)`을 적용해 어떤 값을 만든다.
- 계산법에는 `조급한 계산법(eager evaluation)`과 `느긋한(또는 지연) 계산법(lazy evaluation)` 두 가지가 있다.
- 컴파일러가 `1 + 2` 라는 표현식을 만나면 조급한 계산법을 적용해 3이라는 값을 만든다.
- `function(a, b) { return a + b; }`라는 함수 표현식을 만나면, 심벌a와 b가 어떤 값인지 알 수 없어서 느긋한 계산법을 적용한다.

<br />

### 🏃 함수 호출 연산자
- 어떤 변수가 함수 표현식을 담고 있다면, 변수 이름 뒤에 `함수 호출 연산자(function call operator)` 즉 `( )`를 붙여서 호출할 수 있다.
- `함수 호출`이란, 함수 표현식의 몸통 부분을 실행한다는 뜻이다. 만약, 매개변수를 요구한다면 `()`안에 필요한 매개변수를 명시할 수 있다.
- 컴파일러는 함수 호출문을 만나면 지금까지 미뤘던 함수 표현식에 `조급한 계산법`을 적용해 함수 표현식을 `값`으로 바꾼다.
```ts

  let functionExpression = function(a: number, b: number): number { return a + b; }
  let value = functionExpression(1, 2);

  console.log(value); //3
```

<br />

## 👨🏻‍💻 화살표 함수와 표현식 문
- ESNext(ES6 이후)부터는 function 키워드가 아닌 `=>` 기호로 만드는 화살표 함수도 제공한다.
- 화살표 함수의 몸통은 function때와는 다르게 중괄호를 사용할 수도 있고, 생략할 수도 있다.
- 그런데 흥미롭게도 중괄호 사용 여부에 따라 타입스크립트 문법이 동작하는 방식이 `실행문(execution statement)`과 `표현식 문(expression statement)`방식으로 달라진다.
```ts
  const arrow1 = (a: number, b: number): number => { return a + b };
  const arrow2 = (a: number, b: number): number => a + b;
```

<br />

### 🏃 실행문과 표현식문
- 프로그래밍 언어는 `실행문 지향 언어(execution-oriented language)`와 `표현식 지향 언어(express-oriented language)`로 구분되어 왔다.
- C언어가 대표적인 실행문 지향 언어이며, 스칼라가 대표적인 표현식 지향 언어이다.
- 자바스크립트는 ES5는 실행문 지향언이며, ES6와 TypeScript는 실행문과 표현식 문을 동시에 지원하다. 이런 언어를 `다중 패러다임 언어(multi-paradigm language)`라고 한다.
- 프로그래밍 언어에서 실행문은 `CPU에서 실행되는 코드`를 말한다. 실행문이 실행된 결과를 알려면 반드시 `return` 키워드를 사용해야 한다.
- 표현식 문은 CPU에서 실행된 결과를 굳이 `return` 키워드를 사용하지 않아도 알려준다.

<br />

```ts
  let x
  x = 1
```
- 변수에 값을 대입하는 것은 대표적인 실행문이다.

<br />

- 반면에 밑에 코드처럼 x > 0 부분은 CPU가 평가 한 후 true나 false라는 값으로 결과를 알려주지 않으면 if문이 정상적으로 동작할 수 없다.
```ts
  let x = 10;
  if (x > 0) x = 1
```
- 하지만 만일 프로그래밍 문법이 밑에 코드와 같다면 코드를 작성하기가 상당히 번거로워 진다.
```ts
  if (return x > 0) x = 1;
```
- 즉, 똑같이 CPU에서 실행되는 구문이라도 `x > 0`처럼 return 키워드 없이 결괏값을 반환하는 실행문이 필요하다. 이를 `표현식 문`이라고 구분해서 부른다.

<br />

### 🏃 복합 실행문
- 프래그래밍 언어에서 `if`와 같은 구문은 다음처럼 조건을 만족하면 단순히 한 줄의 실행문만을 싱행하는 형태로 설계한다.
```ts
  let a = 2
  let b = 1

  if(a > b) console.log(a); 
```
- 위와 같은 설계가 가능한 이유는 `복합 실행문(compound statement)`이라는 또 다른 형태를 함께 제공하기 때문이다.
- 대부분의 언어에서 복합 실행문은 `중괄호 {}`를 사용해 이용한다.
```ts
  let a = 2;
  let b = 1;

  if (a > b) {
    console.log(a);
    console.log(a + b);
  }
```
- 복합 실행문은 컴파일로 하여금 여러 실행문을 한 개처럼 인식하게 한다. 따라서 컴파일러는 앞의 형태로 작성된 if문은 여전히 한 줄의 실행문으로 인식한다.

<br />

### 🏃 함수 몸통과 복합 실행문
- `function` 키워드로 만드는 함수는 반드시 몸통을 `중괄호 {}`로 감싸야 하는데, 중괄호는 복합 실행문을 의미한다.
- 따라서 함수 몸통은 여러 줄로 구현할 수 있다.
```ts
  function f() {
    let x = 1;
    let y = 2;
    let result = x + y + 10;
  }
```

<br />

### 🏃 retrun 키워드
- 실행문은 CPU에서 실행된 결과를 알려주지 않는다. 예를들어, 함수 몸통을 복합 실행문으로 구현한 다음 함수는 true나 false를 반환하지 않는다.
- 실행문 기반 언어는 이 문제를 해결하기 위해 `return`이라는 키워드를 도입했다.
```ts
  function isGreater(a: number, b: number): boolean {
    a > b; //true나 false를 반환하지 않음
  }

  function isGreater(a: number, b: number): boolean {
    return a > b; //true나 false를 반환 함
  }
```
- 그런데 `return` 키워드는 반드시 함수 몸통에서만 사용할 수 있다는 제약이 있다.
- `if(return x > 0) x = 1`과 같은 코드를 방지하기 위함이다.

<br />

### 🏃 표현식 문 스타일의 화살표 함수 구현
- 밑에 코드들은 같은 동작을 한다.
- 밑에 코드들 중에 두 번째 코드는 `{ a > b }`가 아닌 단순히 `a > b`로 구현되어 있다. 즉, 함수 몸통이 `표현식`으로 구현되어 있다. 그리고 표현식은 값을 반환하는 실행문이므로 `return`또한 생략되었다. 
```ts
  const isGreater = (a: number, b: number): boolean => {
    return a > b;
  };

  const isGreater = (a: number, b: number): boolean => a > b;
```

<br />

- `return`키워드는 복합 실행문 `{}` 안에서만 사용할 수 있어 다음과 같은 코드는 구문 오류가 발생한다.
```ts
  const isGreater = (a: number, b: number): boolean => return a > b; //구문 오류 발생
  const isGreater = (a: number, b: number): boolean => { return a > b }; //올바른 문법
```

<br />

## 👨🏻‍💻 일등 함수 살펴보기
### 🏃 콜백 함수
- `일등 함수(first-class function)`은 프로그래밍 언어가 제공하는 기능이다.
- 일등 함수 기능을 제공하는 언어에서 함수는 `함수 표현식`이라는 일종의 값이다. 따라서 변수에 담을 수 있다. 또한, 이 말은 함수 표현식을 매개변수로 받을 수 있다는 것을 의미한다.
- 매개변수 형태로 동작하는 함수를 `콜백 함수(callback function)`이라고 한다.
```ts
  export const init = (callback: () => void): void => {
    console.log('default initialization finished');
    callback();
    console.log('all initialization finished');
  }

  init(() => console.log('custom initialization finished'));

  //출력
  /*
    default initialization finished
    custom initialization finished
    all initialization finished
  */
```
<br />

### 🏃 중첩 함수
- 함수형 언어에서 함수는 변수에 담긴 함수 표현식이므로 함수 안에 또 다른 함수를 `중첩(nested)`해서 구현할 수 있다.
```ts
  const calc = (value: number, cb: (num: number) => void): void => {
    let add = (a: number, b: number): number => a + b;

    function multiply(a: number, b: number): number { 
      return a * b; 
    }

    let result = multiply(add(1, 2), value); //add(1, 2) === 3, value === 30
    cb(result);
  }

  calc(30, (result: number) => console.log(`result is ${result}`)); //result is 90
```

<br />

### 🏃 고차 함수와 클로저, 부분 함수
- `고차 함수(high-order function)`는 또 다른 함수를 반환하는 함수를 말한다.
- 함수형 언어에서 함수는 단순히 함수 표현식이라는 값이므로 다른 함수를 반환할 수 있다.
- 고차 함수 기능이 없다면 함수형 프로그래밍이 불가능할 정도로 고차 함수는 매우 중요한 기능이다.
```ts
  const add1 = (a: number, b: number): number => a + b; //보통 함수
  const add2 = (a: number): number => (number: number) => (b: number): number => a + b //고차 함수
```
- 위 코드에서 add1은 일반적인 함수로 선언되었지만 add2는 고차 함수로 선언되었다.
- 위 코드를 좀 더 이해하기 쉬운 형태로 다시 구현하면 밑에 코드처럼 구현할 수 있다.
```ts
  type NumberToNumberFunc = (number: number) => number; //함수 시그니처 정의

  export const add = (a: number): NumberToNumberFunc => {
    const _add: NumberToNumberFunc = (b: number): number => {
      return a + b; //클로저
    }
    return _add;
  }

  let fn: NumberToNumberFunc = add(1);
  let result = fn(2);

  console.log(result); //3
  console.log(add(1)(2)); //3
```
- 위 코드에서 흥미로운 것은 `a`는 `add 함수`의 매개 변수이고 `b`는 `_add 함수`의 매개 변수이다. 즉, `_add 함수`의 관점에서 보면 `a`는 `외부에 선언된 변수`이다. 함수형 프로그래밍에서 이와 같은 형태를 `클로저(Closure)`라고 한다.
- 고차 함수는 이 `클로저` 기능이 반드시 필요하다.

<br />

## 👨🏻‍💻 함수 구현 기법
### 🏃 매개변수 기본값 지정
- 선택적 매개변수는 항상 그 값이 `undefined`로 고정되어 있다. 만일, 함수 호출 시 인수를 전달하지 않더라도 매개변수에 어떤 값을 설정하고 싶다면 매개 변수의 기본 값을 지정할 수 있다. 이를 `디폴트 매개변수(default parameter)`라고 한다.
```ts
  export type Person = { name: string, age: number };

  export const makePerson = (name: string, age: number = 10): Person => {
    const person = { name: name, age: age }
    //const person = { name, age } 
    //타입스크립트는 매개변수의 이름과 똑같은 이름의 속성 가진 객체를 생성 시 속성 값 생략이 가능하다.

    return person;
  }

  console.log(makePerson('Jeon')); // { name: 'Jeon', age: 10 }
  console.log(makePerson('Jeon', 27)); // { name: 'Jeon', age: 27 }
```

<br />

### 🏃 객체를 반환하는 화살표 함수
```ts
  export const makePerson = (name: string, age: number = 10): Person => { name, age };
```
- 위와 같은 코드로 구현하면 타입스크립트 컴파일러는 `중괄호 {}`를 객체가 아닌 복합 실행문으로 해석합니다. 
- 따라서 컴파일러가 `{}` 를 객체로 해석하게 하려면 다음처럼 객체를 소괄호로 감싸주어야 합니다.
```ts
  export const makePerson = (name: string, age: number = 10): Person => ({ name, age });
```

<br />

### 🏃 매개변수에 비구조화 할당문 사용하기
- 함수의 매개변수도 변수의 일종이므로 비구조화 할당문을 적용할 수 있다.
```ts
  export type Person = { name: string, age: number };

  const printPerson = ({ name, age }: Person): void => {
    console.log(`name: ${name}, age: ${age}`);
  };

  printPerson({ name: 'Jack', age: 10 });
```

<br />

### 🏃 색인 키와 값으로 객체 만들기
- ES6 이후 자바스크립트에서는 다음과 같은 코드를 작성할 수 있습니다.
```ts
  const makeObject = (key, value) => ({
    [key]: value,
  });
```
- 위 코드는 `[key]`의 부분이 'name'이면, `{ name: value }`형태, 'firstName'이면 `{ firstName: value }` 형태의 객체를 생성합니다.
```ts
  export type KeyValueType = {
    [key: string]: string
  }

  const makeObject = (key: string, value: string): KeyValueType => ({
    [key]: value,
  });

console.log(makeObject('name', 'Jeon')); // { name: 'Jeon' }
console.log(makeObject('firstName', 'Jeon')); // { firstName: 'Jeon' }
```

<br />

## 👨🏻‍💻 클래스와 메서드
### 🏃 function 함수와 this 키워드
- 타입스크립트의 `function` 키워드로 만든 함수는 `Function`이란 클래스의 인스턴스, 즉 함수는 객체입니다.
- 객체 지향 언어에서 인스턴스는 `this` 키워드를 사용할 수 있습니다.
- 따라서, 타입스크립트에서 `function` 키워드로 만든 함수에 `this` 키워드를 사용할 수 있습니다.
- 반면에 화살표 함수에는 `this`키워드를 사용할 수 없습니다.

<br />

### 🏃 메서드
- 타입스크립트에서 `메서드(method)`는 function으로 만든 함수 표현식을 담고 있는 속성입니다.
- 함수와 메서드의 차이는 쉽게 말하면 메서드는 `클래스 및 객체(Object)`와 연관되어 있는 함수이다. 즉, 클래스 또는 객체 내에 선언되어 있는 함수이다.
- 함수는 클래스 및 객체와 상관없이 `독립적으로 존재`하는 것을 함수라 한다. 즉, 함수가 메서드보다 더 큰 개념이라고 생각할 수 있다.
```ts
  export class A {
    constructor(public value: number = 1) {
      this.value = value;
    } 

    method(): void {
      console.log(`value: ${this.value}`);
    }
  }

  let a = new A(2);
  a.method(); //value: 2
```

<br />

### 🏃 정적 메서드
- 클래스의 속성은 `static 수정자(modifier)`를 속성 앞에 붙여서 정적으로 만들 수 있다.
- 메서드 또한 속성이므로 이름 앞에 `static`을 붙여 정적 메서드를 만들 수 있다.
- 정적 메서드는 `인스턴스 생성 없이 바로 호출`할 수 있습니다. 단, 인스턴스에서는 호출 할 수 없습니다.
```ts
  export class C {
    static whoAreYou(): string {
      return `I'm class C`;
    }
  }

  export class D {
    static whoAreYou(): string {
      return `I'm class D`;
    }

    hi(): string {
      return `hi`;
    }
  }

  console.log(C.whoAreYou());
  console.log(D.whoAreYou());

  let d: D = new D;

  console.log(d.whoAreYou()) //오류
  console.log(d.hi());
```
- 위 코드는 C와 D라는 두 클래스가 whoAreYou라는 같은 이름의 정적 메서드를 구현하고 있다.
- 클래스 메서드는 `클래스 이름.정적 메서드()`형태로 호출한다.

<br />